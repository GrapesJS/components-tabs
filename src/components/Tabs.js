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
        script() {
          var i;
          var el = this;
          var attrTabs = '[' + '{[ attr-tabs ]}' + ']';
          var attrTab = '[' + '{[ attr-tab ]}' + ']';
          var attrTabContent = '[' + '{[ attr-tab-content ]}' + ']';
          console.log(attrTabs, attrTab, attrTabContent);

          var tabContents = el.querySelector(attrTabContent) || [];
          var tabContentLen = tabContents.length || 0;
          for (i = 0; i < tabContents.length; i++) {
              tabContents[i].style.display = '';
          }
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

        // Add a basic template if it's not yet initialized
        !comps.length && comps.add(config.template);
      }
    })
  });
}
