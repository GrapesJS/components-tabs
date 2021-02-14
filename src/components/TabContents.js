export default (dc, config) => {

  dc.addType(config.typeTabContents, {
    model: {
      defaults: {
        name: 'Tab Contents',
        draggable: false,
        droppable: false,
        copyable: false,
        removable: false,
        classes: config.classTabContents,
        ...config.tabContentsProps
      }
    },
  });
}
