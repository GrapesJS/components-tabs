export const role = 'tabpanel';

export default (dc, config) => {
  const classKey = config.classTabContent;

  dc.addType(config.typeTabContent, {
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
        classKey && this.addClass(classKey);
      }
    },
  });
}
