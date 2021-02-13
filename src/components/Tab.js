export const role = 'tab';

export default (dc, { defaultModel, typeTabs, ...config }) => {
  const classKey = config.classTab;
  const selectorTab = config.selectorTab;

  dc.addType(config.typeTab, {
    model: {
      defaults: {
        name: 'Tab',
        draggable: `[data-gjs-type="${config.typeTabContainer}"]`,
        attributes: { role },
        ...config.tabProps
      },

      init() {
        classKey && this.addClass(classKey);
      },

      __initTab() {
        console.log('init tab', this);
        const content = this.getTabContent();

        // If the tab content was found I'll attach it to the tab model
        // otherwise I'll create e new one
        if (content) {
          this.tabContent = content;
        } else {
          const tabs = this.closestType(typeTabs);
          const cnts = tabs.getContentsType();
          const tabContent = cnts.append({
            type: config.typeTabContent,
            components: config.templateTabContent,
          })[0];
          const id = tabContent.getId();
          const tabId = this.getId();
          tabContent.addAttributes({ id, 'aria-labelledby': tabId });
          this.addAttributes({ [selectorTab]: id, id: tabId });
          this.tabContent = tabContent;
        }
      },

      getTabContent() {
        const id = this.getControlId();
        const tabs = this.closestType(typeTabs);
        if (!tabs || !id) return;
        const contents = tabs.findContents();
        return contents.filter(c => c.getId() == id)[0];
      },

      getControlId() {
        return this.getAttributes()[selectorTab];
      },

      clone() {
        const cloned = defaultModel.prototype.clone.apply(this, arguments);
        cloned.addAttributes({ [selectorTab]: '' });
        return cloned;
      }
    },
  });
}
