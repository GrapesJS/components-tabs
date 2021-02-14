export default (dc, config) => {

  dc.addType(config.typeTabContents, {
    model: {
      defaults: {
        name: 'Tab Contents',
        classes: config.classTabContents,
        draggable: false,
        droppable: false,
        copyable: false,
        removable: false,
        ...config.tabContentsProps
      }
    },
  });
}
