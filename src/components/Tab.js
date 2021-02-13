export const role = 'tab';

export default (dc, { linkModel, ...config }) => {
  const type = config.typeTab;
  const attrKey = config.attrTab;
  const classKey = config.classTab;
  const selectorTab = config.selectorTab;

  dc.addType(type, {
    extend: 'link',

    isComponent: el => el.hasAttribute && el.hasAttribute(attrKey),

    model: {
      defaults: {
        name: 'Tab',
        draggable: `[data-gjs-type="${config.typeTabContainer}"]`,
        attributes: {
          role,
          // aria-controls refer to the id of the tab panel
        },
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
