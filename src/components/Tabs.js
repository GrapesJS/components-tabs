export default (dc, {
  typeTab, typeTabContent, typeTabContents, typeTabContainer, ...config
}) => {
  const type = config.typeTabs;

  const script = function(props) {
    const el = this;
    const classTabActive = props.classactive;
    const selectorTab = props.selectortab;
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
      each(el.querySelectorAll(roleTabContent), i => i.hidden = true);
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
      const tabContentId = tabEl.getAttribute(selectorTab);
      const tabContent = tabContentId && el.querySelector(`#${tabContentId}`);
      tabContent && (tabContent.hidden = false);
    };

    let tabToActive = el.querySelector(`.${classTabActive}${roleTab}`);
    tabToActive = tabToActive || el.querySelector(roleTab);
    tabToActive && activeTab(tabToActive);

    el.addEventListener('click', (ev) => {
      const { target } = ev;
      if (matches.call(target, roleTab)) {
        ev.preventDefault();
        activeTab(target);
        const id = target.getAttribute(selectorTab);
        try {
          history && history.pushState(null, null, `#${id}`);
        } catch (e) {}
      }
    });
  };
  const defTabs = ['1', '2', '3'];

  dc.addType(type, {
    model: {
      defaults: {
        name: 'Tabs',
        classactive: config.classTabActive,
        selectortab: config.selectorTab,
        'script-props': ['classactive', 'selectortab'],
        script,
        components: `
          <nav data-gjs-type="${typeTabContainer}">
            ${defTabs.map(i =>
              `<span aria-controls="tab${i}" data-gjs-type="${typeTab}">Tab ${i}</span>`
            ).join('')}
          </nav>
          <div data-gjs-type="${typeTabContents}">
          </div>
        `,
        ...config.tabsProps
      },

      init() {
        this.findTabs().map(this.__onTab);
        this.listenTo(this.getTabContainerType().components(), 'add', this.__onTab);
      },

      __onTab(tab, v, opts = {}) {
        !opts.avoidStore && !opts.temporary &&  tab.__initTab && tab.__initTab();
      },

      getTabContainerType() {
        return this.findType(typeTabContainer)[0];
      },

      getContentsType() {
        return this.findType(typeTabContents)[0];
      },

      findTabs() {
        return this.findType(typeTab);
      },

      findContents() {
        return this.findType(typeTabContent);
      },
    },
  });
}
