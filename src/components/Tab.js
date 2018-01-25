export default (dc, { linkModel, linkView, ...config }) => {
  const type = 'tab';
  const attrKey = config.attrTab;
  const classKey = config.classTab;
  const selectorTab = config.selectorTab;

  dc.addType(type, {
    model: linkModel.extend({
      defaults: { ...linkModel.prototype.defaults,
        name: 'Tab',
        draggable: `[${config.attrTabContainer}]`,
        droppable: false,
        ...config.tabProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[attrKey] = 1;
        this.setAttributes(attrs);
        classKey && this.addClass(classKey);
      },

      clone() {
        const cloned = linkModel.prototype.clone.apply(this, arguments);
        cloned.addAttributes({ [selectorTab]: '' });
        return cloned;
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
