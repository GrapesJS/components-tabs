export const role = 'tab';

export default (dc, { linkModel, ...config }) => {
  const type = config.typeTab;
  const classKey = config.classTab;
  const selectorTab = config.selectorTab;

  dc.addType(type, {
    extend: 'link',

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
