export const role = 'tab';

export default (dc, {
  defaultModel, typeTabs, selectorTab, editor, ...config
}) => {
  const prevSelectorTab = 'data-prev';
  const traits = [
    {
      full: 1,
      type: 'button',
      label: false,
      text: 'Style Active',
      command: (ed) => {
        const openSm = ed.Panels.getButton('views', 'open-sm');
        openSm && openSm.set('active', 1);
        const cls = `.${config.classTab}.${config.classTabActive}`;
        ed.StyleManager.setTarget(cls, { targetIsClass: 1 })
      },
    },
  ];
  const getPrevCntId = cmp => cmp.getAttributes()[prevSelectorTab];

  dc.addType(config.typeTab, {
    model: {
      defaults: {
        name: 'Tab',
        draggable: `[data-gjs-type="${config.typeTabContainer}"]`,
        attributes: { role },
        components: config.templateTab,
        classes: config.classTab,
        traits,
        ...config.tabProps
      },

      init() {
        this.on('removed', this.__onRemove);
      },

      __initTab() {
        if (this.tabContent) return;
        let content = this.getTabContent();

        // In case the content was found via previous id (cloned from parent)
        if (content && getPrevCntId(content)) {
          const id = content.getId();
          const tabId = this.getId();
          content.addAttributes({ id, 'aria-labelledby': tabId, hidden: true });
          content.removeAttributes(prevSelectorTab);
          this.addAttributes({ [selectorTab]: id, id: tabId });
        }

        // If the tab content was found I'll attach it to the tab model
        // otherwise I'll create e new one
        if (!content) {
          const tabs = this.getTabsType();
          const cnts = tabs.getContentsType();
          content = cnts.append({
            type: config.typeTabContent,
            components: config.templateTabContent(this),
          })[0];
          const id = content.getId();
          const tabId = this.getId();
          content.addAttributes({ id, 'aria-labelledby': tabId, hidden: true });
          this.addAttributes({ [selectorTab]: id, id: tabId });
          this.tabContent = content;
        }

        this.tabContent = content;
      },

      __onRemove() {
        const content = this.getTabContent();
        content && content.remove();
        this.getTabsType().trigger('rerender')
      },

      getTabsType() {
        return this.closestType(typeTabs);
      },

      getTabContent() {
        const id = this.getAttributes()[selectorTab];
        const tabs = this.getTabsType();
        if (!tabs || !id) return;
        const contents = tabs.findContents();
        const content = contents.filter(c =>
          c.getId() == id || getPrevCntId(c) == id
        )[0];
        return content;
      },

      clone(opts = {}) {
        const fromParent = opts._inner;
        if (fromParent) {
          const tabCont = this.getTabContent();
          tabCont && tabCont.addAttributes({ [prevSelectorTab]: tabCont.getId() });
        }
        const cloned = defaultModel.prototype.clone.apply(this, arguments);
        !fromParent && cloned.addAttributes({ [selectorTab]: '' });
        return cloned;
      }
    },
  });
}
