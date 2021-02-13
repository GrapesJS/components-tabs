export const role = 'tablist';

export default (dc, config) => {
  const classKey = config.classTabContainer;
  const selectorTab = config.selectorTab;
  const typeTabs = config.typeTabs;
  const typeTabContent = config.typeTabContent;

  dc.addType(config.typeTabContainer, {
    model: {
      defaults: {
        name: 'Tab Container',
        draggable: `[data-gjs-type="${typeTabs}"]`,
        droppable: `[data-gjs-type="${config.typeTab}"]`,
        copyable: false,
        removable: false,
        highlightable: false,
        attributes: { role },
        ...config.tabContainerProps
      },

      init() {
        classKey && this.addClass(classKey);
        const tabs = this.components();
        // this.listenTo(tabs, 'add', this.onAdd);
        // this.listenTo(tabs, 'remove', this.onRemove);
        // aria-labelledby
      },

      onRemove(model) {
        // I'll remove the tabContent only if I'm sure that tab is
        // removed from the collection
        model.tabContent && setTimeout(() => {
          const id = model.getControlId();
          this.closestType(typeTabs).findContents()
            .filter(c => c.getId() === id)
            .map(c => c.remove());
        }, 0);
      },

      onAdd(model, value, opts = {}) {
        const attrs = model.getAttributes();

        if (!model.tabContent && !opts.avoidStore) {
          const selCont = attrs[selectorTab];
          const modelTabs = this.closestType(typeTabs);
          const tabContents = selCont ? modelTabs.findType(typeTabContent) : [];
          // const tabContEl = selCont && modelTabs.view.$el.find(selCont);
          const tabContEl = tabContents.filter(cont => cont.getId() == selCont)[0];

          // If the tab content was found I'll attach it to the tab model
          // otherwise I'll create e new one
          if (tabContEl) {
            model.tabContent = tabContEl;
          } else {
            const tabContent = modelTabs.components().add({ // TODO select CONTENTS
              type: typeTabContent,
              components: config.templateTabContent,
            });
            const id = tabContent.getId();
            tabContent.addAttributes({ id });
            model.addAttributes({ [selectorTab]: id });
            model.tabContent = tabContent;
            tabContent.getEl().style.display = 'none';
          }
        }
      }
    },
  });
}
