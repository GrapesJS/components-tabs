export default (dc, { linkModel, linkView, ...config }) => {
  const type = 'tab';
  const attrKey = config.attrTab;

  dc.addType(type, {
    model: linkModel.extend({
      defaults: { ...linkModel.prototype.defaults,
        name: 'Tab',
        draggable: `[${config.attrTabs}]`,
        droppable: false,
        ...config.tabProps
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
    view: linkView,
  });
}
