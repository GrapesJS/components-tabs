export const role = 'tab';

export default (dc, {
  defaultModel, typeTabs, selectorTab, editor, ...config
}) => {
  const classKey = config.classTab;
  let tm;

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
        this.on('removed', this.__onRemove);
      },

      __initTab() {
        if (this.tabContent) return;
        let content = this.getTabContent();
        console.log('init tab', this, { content }, this.tabContent);

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
          content.addAttributes({ id, 'aria-labelledby': tabId });
          this.addAttributes({ [selectorTab]: id, id: tabId });
          this.tabContent = content;
          this.__updateTabs();
        }

        this.tabContent = content;
      },

      __onRemove() {
        const content = this.getTabContent();
        content && content.remove();
        this.__updateTabs(1);
        console.log('tab removed', this, { content });
      },

      __updateTabs(now) {
        const emit = () => this.getTabsType().trigger('rerender');
        if (now) {
          emit();
        } else {
          tm && clearTimeout(tm);
          tm = setTimeout(emit);
        }
      },

      getTabsType() {
        return this.closestType(typeTabs);
      },

      getTabContent() {
        const id = this.getControlId();
        const tabs = this.getTabsType();
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
