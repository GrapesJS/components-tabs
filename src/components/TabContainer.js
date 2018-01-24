export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'tab-container';
  const attrKey = config.attrTabContainer;
  const classKey = config.classTabContainer;

  dc.addType(type, {
    model: defaultModel.extend({
      defaults: { ...defaultModel.prototype.defaults,
        name: 'Tab Container',
        draggable: `[${config.attrTabs}]`,
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
