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

      onRemove(model) {
        const content = model.tabContent;
        content && content.collection.remove(content);
      },

      onAdd(model, value, opts = {}) {
        const comps = this.components();
        const counter = comps.counter || comps.length;
        const attrs = model.getAttributes();
        comps.counter = counter + 1;

        if (!model.tabContent && !opts.avoidStore) {
          const modelTabs = this.closest(`[${attrTabs}]`);

          if (modelTabs) {
            const tabCont = modelTabs.components().add({
              type: 'tab-content',
              components: config.templateTabContent,
            });
            const id = tabCont.getId();
            tabCont.addAttributes({ id });
            model.addAttributes({ [selectorTab]: `#${id}` });
            model.tabContent = tabCont;
            tabCont.getEl().style.display = 'none';
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
