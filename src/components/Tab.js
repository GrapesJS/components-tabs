export default (dc, { linkModel, linkView, ...config }) => {
  const type = 'tab';

  dc.addType(type, {
    model: linkModel.extend({
      defaults: { ...linkModel.prototype.defaults,
        name: 'Tab',
        draggable: `[${config.attrTabs}]`,
        droppable: false,
        ...config.tabProps
      },
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(config.attrTab)) {
          return { type };
        }
      },
    }),
    view: linkView,
  });
}
