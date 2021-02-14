export const role = 'tablist';

export default (dc, config) => {
  const typeTabs = config.typeTabs;

  dc.addType(config.typeTabContainer, {
    model: {
      defaults: {
        name: 'Tab Container',
        draggable: `[data-gjs-type="${typeTabs}"]`,
        droppable: `[data-gjs-type="${config.typeTab}"]`,
        copyable: false,
        removable: false,
        highlightable: false,
        attributes: { role },
        ...config.tabContainerProps
      },
    },
  });
}
