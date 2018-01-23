export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'tab-content';
  const attrKey = config.attrTabContent;

  dc.addType(type, {
    model: defaultModel.extend({
      defaults: { ...defaultModel.prototype.defaults,
        name: 'Tab Content',
        draggable: `[${config.attrTabs}]`,
        ...config.tabContentProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[attrKey] = 1;
        this.setAttributes(attrs);
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
