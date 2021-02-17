export default (dc, {
  typeTab, typeTabContent, typeTabContents, typeTabContainer, style, ...config
}) => {
  const type = config.typeTabs;

  const script = function(props) {
    const el = this;
    const classTabActive = props.classactive;
    const selectorTab = props.selectortab;
    const { history, _isEditor } = window;
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

    const getTabId = item => item.getAttribute(selectorTab)
    const qS = (elem, qs) => elem.querySelector(qs);
    const getAllTabs = () => el.querySelectorAll(roleTab);
    const upTabIdx = (item, val) => !_isEditor && (item[attrTabindex] = val);

    const activeTab = (tabEl) => {
      each(getAllTabs(), (item) => {
        item.className = item.className.replace(classTabActive, '').trim();
        item[attrSelected] = 'false';
        upTabIdx(item, '-1');
      });
      hideContents();
      tabEl.className += ' ' + classTabActive;
      tabEl[attrSelected] = 'true';
      upTabIdx(tabEl, '0');
      const tabContentId = getTabId(tabEl);
      const tabContent = tabContentId && qS(el, `#${tabContentId}`);
      tabContent && (tabContent.hidden = false);
    };

    const getTabByHash = () => {
      const hashId = (location.hash || '').replace('#', '');
      const qrStr = att => `${roleTab}[${att}=${hashId}]`;
      return hashId && qS(el, qrStr(selectorTab));
    };

    const getSelectedTab = (target) => {
      let found;
      each(getAllTabs(), (item) => {
        if (found) return;
        if (item.contains(target)) found = item;
      });
      return found;
    };

    let tabToActive = qS(el, `.${classTabActive}${roleTab}`);
    tabToActive = tabToActive || getTabByHash() || qS(el, roleTab);
    tabToActive && activeTab(tabToActive);

    el.addEventListener('click', (ev) => {
      let { target } = ev;
      let found = matches.call(target, roleTab);

      if (!found) {
        target = getSelectedTab(target);
        if (target) found = 1;
      }

      if (found && !ev.__trg && target.className.indexOf(classTabActive) < 0) {
        ev.preventDefault();
        ev.__trg = 1;
        activeTab(target);
        const id = getTabId(target);
        try {
          history && history.pushState(null, null, `#${id}`);
        } catch (e) {}
      }
    });
  };
  const defTabs = [1, 2, 3].map(i => ({ type: typeTab }));
  const traits = [
    {
      full: 1,
      type: 'button',
      label: false,
      text: 'Add Tab',
      command: ed => {
          const sel = ed.getSelected();
          sel && sel.addTab();
      },
    }
  ];

  dc.addType(type, {
    model: {
      defaults: {
        name: 'Tabs',
        classactive: config.classTabActive,
        selectortab: config.selectorTab,
        'script-props': ['classactive', 'selectortab'],
        script,
        traits,
        components: [
          { type: typeTabContainer, components: defTabs },
          { type: typeTabContents },
          style && `<style>${style(config)}</style>`
        ],
        ...config.tabsProps
      },

      init() {
        this.findTabs().map(this.__onTab);
        this.listenTo(this.getTabContainerType().components(), 'add', this.__onTab);
      },

      __onTab(tab, v, opts = {}) {
        !opts.avoidStore && !opts.temporary && tab.__initTab && tab.__initTab();
      },

      getTabContainerType() {
        return this.findType(typeTabContainer)[0];
      },

      getContentsType() {
        return this.findType(typeTabContents)[0] || this;
      },

      findTabs() {
        return this.findType(typeTab);
      },

      findContents() {
        return this.findType(typeTabContent);
      },

      addTab(content) {
        const cnt = this.getTabContainerType();
        cnt.append({
            type: typeTab,
            components: content,
        });
      },
    },
  });
}
