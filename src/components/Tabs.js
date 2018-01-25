export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'tabs';
  const attrTabs = config.attrTabs;

  dc.addType(type, {

    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        name: 'Tabs',
        'attr-tabs': config.attrTabs,
        'attr-tab': config.attrTab,
        'attr-tab-content': config.attrTabContent,
        'class-tab-active': config.classTabActive,
        'selector-tab': config.selectorTab,
        script() {
          var i;
          var el = this;
          var attrTabs = '[' + '{[ attr-tabs ]}' + ']';
          var attrTab = '[' + '{[ attr-tab ]}' + ']';
          var attrTabContent = '[' + '{[ attr-tab-content ]}' + ']';
          var classTabActive = '{[ class-tab-active ]}';
          var selectorTab = '{[ selector-tab ]}';
          var body = document.body;
          var matches = body.matchesSelector || body.webkitMatchesSelector
            || body.mozMatchesSelector || body.msMatchesSelector;

          var hideContents = function() {
            var tabContents = el.querySelectorAll(attrTabContent) || [];
            for (i = 0; i < tabContents.length; i++) {
                tabContents[i].style.display = 'none';
            }
          }

          var activeTab = function(tabEl) {
            var tabs = el.querySelectorAll(attrTab) || [];

            for (i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                var newClass = tab.className.replace(classTabActive, '').trim();
                tab.className = newClass;
            }

            hideContents();
            tabEl.className += ' ' + classTabActive;
            var tabContSelector = tabEl.getAttribute(selectorTab);
            var tabContent = el.querySelector(tabContSelector);
            tabContent && (tabContent.style.display = '');
          };

          var tabToActive = el.querySelector('.' + classTabActive + attrTab);
          tabToActive = tabToActive || el.querySelector(attrTab);
          tabToActive && activeTab(tabToActive);

          el.addEventListener('click', function(e) {
            var target = e.target;
            matches.call(target, attrTab) && activeTab(target);
          });
        },
        ...config.tabsProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[config.attrTabs] = 1;
        this.setAttributes(attrs);
      }
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(attrTabs)) {
          return { type };
        }
      },
    }),

    view: defaultView.extend({
      init() {
        const comps = this.model.components();
        !comps.length && comps.add(config.template);
      },

      onRender() {
        const tabContainer = this.model.find(`[${config.attrTabContainer}]`)[0];
        tabContainer && tabContainer.components().each(tab => {
          tabContainer.onAdd(tab);
        });
      }
    })
  });
}
