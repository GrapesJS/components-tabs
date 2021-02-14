export const role = 'tablist';

export default (dc, config) => {

  dc.addType(config.typeTabContainer, {
    model: {
      defaults: {
        name: 'Tab Container',
        draggable: `[data-gjs-type="${config.typeTabs}"]`,
        droppable: `[data-gjs-type="${config.typeTab}"]`,
        copyable: false,
        removable: false,
        highlightable: false,
        attributes: { role },
        classes: config.classTabContainer,
        ...config.tabContainerProps
      },
    },
  });
}
