export default (dc, { linkModel, ...config }) => {
  const type = 'tab';
  const attrKey = config.attrTab;
  const classKey = config.classTab;
  const selectorTab = config.selectorTab;

  dc.addType(type, {
    extend: 'link',

    isComponent: el => el.hasAttribute && el.hasAttribute(attrKey),

    model: {
      defaults: {
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
    },
  });
}
