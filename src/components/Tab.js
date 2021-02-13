export const role = 'tab';

export default (dc, { defaultModel, ...config }) => {
  const classKey = config.classTab;
  const selectorTab = config.selectorTab;

  dc.addType(config.typeTab, {
    model: {
      defaults: {
        name: 'Tab',
        draggable: `[data-gjs-type="${config.typeTabContainer}"]`,
        attributes: { role },
        ...config.tabProps
      },

      init() {
        classKey && this.addClass(classKey);
      },

      getControlId() {
        return this.getAttribute(selectorTab);
      },

      clone() {
        const cloned = defaultModel.prototype.clone.apply(this, arguments);
        cloned.addAttributes({ [selectorTab]: '' });
        return cloned;
      }
    },
  });
}
