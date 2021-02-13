export default (dc, config) => {
  const type = config.typeTabs;
  const attrTabs = config.attrTabs;

  const script = function() {
    const el = this;
    const attrTab = '[' + '{[ attr-tab ]}' + ']';
    const attrTabContent = '[' + '{[ attr-tab-content ]}' + ']';
    const classTabActive = '{[ class-tab-active ]}';
    const selectorTab = '{[ selector-tab ]}';
    const { history } = window;
    const attrTabindex =  'tabIndex';
    const attrSelected =  'ariaSelected';
    const { body, location } = document;
    const matches = body.matchesSelector || body.webkitMatchesSelector
      || body.mozMatchesSelector || body.msMatchesSelector;
    const each = (items, clb) => {
      const arr = items || [];
      for (let i = 0; i < arr.length; i++) clb(arr[i], i)
    }

    const hideContents = () => {
      each(el.querySelectorAll(attrTabContent), i => i.style.display = 'none');
    }

    const activeTab = (tabEl) => {
      each(el.querySelectorAll(attrTab), (item) => {
        item.className = item.className.replace(classTabActive, '').trim();
        item[attrTabindex] = '-1';
        item[attrSelected] = 'false';
      });
      hideContents();
      tabEl.className += ' ' + classTabActive;
      tabEl[attrTabindex] = '0';
      tabEl[attrSelected] = 'true';
      const tabContSelector = tabEl.getAttribute(selectorTab);
      const tabContent = el.querySelector(tabContSelector);
      tabContent && (tabContent.style.display = '');
    };

    let tabToActive = el.querySelector('.' + classTabActive + attrTab);
    tabToActive = tabToActive || el.querySelector(attrTab);
    tabToActive && activeTab(tabToActive);

    el.addEventListener('click', (ev) => {
      const { target } = ev;
      if (matches.call(target, attrTab)) {
        ev.preventDefault();
        activeTab(target);
        const hash = target.getAttribute('href');
        try {
          history && history.pushState(null, null, hash);
        } catch (e) {}
      }
    });
  };

  dc.addType(type, {
    isComponent: el => el.hasAttribute && el.hasAttribute(attrTabs),

    model: {
      defaults: {
        name: 'Tabs',
        'attr-tab': config.attrTab,
        'attr-tab-content': config.attrTabContent,
        'class-tab-active': config.classTabActive,
        'selector-tab': config.selectorTab,
        components: config.template,
        script,
        ...config.tabsProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[config.attrTabs] = 1;
        this.setAttributes(attrs);
      }
    },

    view: {
      onRender() {
        const tabContainer = this.model.find(`[${config.attrTabContainer}]`)[0];
        tabContainer && tabContainer.components().each(tab => {
          tabContainer.onAdd(tab);
        });
      }
    }
  });
}
