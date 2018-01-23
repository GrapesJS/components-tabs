export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'tab';

  dc.addType(type, {
    model: defaultModel.extend({
      defaults: { ...defaultModel.prototype.defaults,
        name: 'Tab',
        draggable: false,
        droppable: false,
        copyable: false,
        removable: false,
        script() {
        },
        ...config.tabProps
      },
    }, {
      isComponent(el) {
        if(el.getAttribute &&
          el.getAttribute('data-gjs-type') == type) {
          return { type };
        }
      },
    }),
    view: defaultView,
  });
}
