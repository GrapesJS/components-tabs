export default (dc, config) => {
  const type = 'tab-content';
  const attrKey = config.attrTabContent;
  const classKey = config.classTabContent;

  dc.addType(type, {
    isComponent: el => el.hasAttribute && el.hasAttribute(attrKey),

    model: {
      defaults: {
        name: 'Tab Content',
        draggable: false,
        copyable: false,
        removable: false,
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
