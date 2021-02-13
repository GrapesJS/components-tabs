export const role = 'tabpanel';

export default (dc, config) => {
  const attrKey = config.attrTabContent;
  const classKey = config.classTabContent;

  dc.addType(config.typeTabContent, {
    isComponent: el => el.hasAttribute && el.hasAttribute(attrKey),

    model: {
      defaults: {
        name: 'Tab Content',
        draggable: false,
        copyable: false,
        removable: false,
        attributes: { role },
        ...config.tabContentProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[attrKey] = 1;
        this.setAttributes(attrs);
        classKey && this.addClass(classKey);
      }
    },
  });
}
