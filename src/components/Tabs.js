export default (dc, { typeTab, typeTabContent, ...config}) => {
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

  dc.addType(type, {
    model: {
      defaults: {
        name: 'Tabs',
        classactive: config.classTabActive,
        selectortab: config.selectorTab,
        'script-props': ['classactive', 'selectortab'],
        script,
        components: `
          <nav data-gjs-type="tab-container">
            <span aria-controls="tab1" data-gjs-type="tab">Tab 1</span>
            <span aria-controls="tab2" data-gjs-type="tab">Tab 2</span>
            <span aria-controls="tab3" data-gjs-type="tab">Tab 3</span>
          </nav>
          <div id="tab1" data-gjs-type="tab-content">
            <div>Tab 1 Content</div>
          </div>
          <div id="tab2" data-gjs-type="tab-content">
            <div>Tab 2 Content</div>
          </div>
          <div id="tab3" data-gjs-type="tab-content">
            <div>Tab 3 Content</div>
          </div>
        `,
        ...config.tabsProps
      },
    },

    // view: {
    //   onRender() {
    //     const tabContainer = this.model.findType(config.typeTabContainer)[0];
    //     tabContainer && tabContainer.components().each(tab => {
    //       tabContainer.onAdd(tab);
    //     });
    //   }
    // }
  });
}
