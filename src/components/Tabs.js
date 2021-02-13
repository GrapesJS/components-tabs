export default (dc, config) => {
  const type = config.typeTabs;

  const script = function() {
    const el = this;
    const classTabActive = '{[ class-tab-active ]}';
    const selectorTab = '{[ selector-tab ]}';
    const { history } = window;
    const attrTabindex =  'tabIndex';
    const attrSelected =  'ariaSelected';
    const roleTab = '[role=tab]';
    const roleTabContent = '[role=tabpanel]';
    const { body, location } = document;
    const matches = body.matchesSelector || body.webkitMatchesSelector
      || body.mozMatchesSelector || body.msMatchesSelector;
    const each = (items, clb) => {
      const arr = items || [];
      for (let i = 0; i < arr.length; i++) clb(arr[i], i)
    }

    const hideContents = () => {
      each(el.querySelectorAll(roleTabContent), i => i.style.display = 'none');
    }

    const activeTab = (tabEl) => {
      each(el.querySelectorAll(roleTab), (item) => {
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

    let tabToActive = el.querySelector(`.${classTabActive}${roleTab}`);
    tabToActive = tabToActive || el.querySelector(roleTab);
    tabToActive && activeTab(tabToActive);

    el.addEventListener('click', (ev) => {
      const { target } = ev;
      if (matches.call(target, roleTab)) {
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
    model: {
      defaults: {
        name: 'Tabs',
        'class-tab-active': config.classTabActive,
        'selector-tab': config.selectorTab,
        components: config.template,
        script,
        ...config.tabsProps
      },
    },

    view: {
      onRender() {
        const tabContainer = this.model.findType(config.typeTabContainer)[0];
        tabContainer && tabContainer.components().each(tab => {
          tabContainer.onAdd(tab);
        });
      }
    }
  });
}
