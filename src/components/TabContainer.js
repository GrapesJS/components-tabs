export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'tab-container';
  const attrTabs = config.attrTabs;
  const attrKey = config.attrTabContainer;
  const classKey = config.classTabContainer;
  const selectorTab = config.selectorTab;

  dc.addType(type, {
    model: defaultModel.extend({
      defaults: { ...defaultModel.prototype.defaults,
        name: 'Tab Container',
        draggable: `[${attrTabs}]`,
        droppable: `[${config.attrTab}]`,
        copyable: false,
        removable: false,
        ...config.tabContainerProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[attrKey] = 1;
        this.setAttributes(attrs);
        classKey && this.addClass(classKey);
        const tabs = this.components();
        this.listenTo(tabs, 'add', this.onAdd);
        this.listenTo(tabs, 'remove', this.onRemove);
      },

      onRemove(model, value, opts = {}) {
        const tabContent = model.tabContent;

        // I'll remove the tabContent only if I'm sure that tab is
        // removed from the collection
        tabContent && setTimeout(() => {
          const coll = model.collection;
          const tabColl = tabContent.collection;
          !coll && tabColl && tabColl.remove(tabContent);
        }, 0);
      },

      onAdd(model, value, opts = {}) {
        const comps = this.components();
        const attrs = model.getAttributes();

        if (!model.tabContent && !opts.avoidStore) {
          const selCont = attrs[selectorTab];
          const modelTabs = this.closest(`[${attrTabs}]`);
          const modelTabsV = modelTabs.view;
          const tabContEl = selCont && modelTabs.view.$el.find(selCont);

          // If the tab content was found I'll attach it to the tab model
          // otherwise I'll create e new one
          if (tabContEl.length) {
            model.tabContent = tabContEl.data('model');
          } else {
            const tabContent = modelTabs.components().add({
              type: 'tab-content',
              components: config.templateTabContent,
            });
            const id = tabContent.getId();
            tabContent.addAttributes({ id });
            model.addAttributes({ [selectorTab]: `#${id}` });
            model.tabContent = tabContent;
            tabContent.getEl().style.display = 'none';
          }
        }
      }
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(attrKey)) {
          return { type };
        }
      },
    }),

    view: defaultView,
  });
}
