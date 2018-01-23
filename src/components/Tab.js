export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'tab';

  dc.addType(type, {
    model: defaultModel.extend({
      defaults: { ...defaultModel.prototype.defaults, ...config.tabProps, {
        name: 'Tab',
        draggable: false,
        droppable: false,
        copyable: false,
        removable: false,
        script: function () {
        },
      },
    }, {
      isComponent(el) {
        if(el.getAttribute &&
          el.getAttribute('data-gjs-type') == burgerType) {
          return {type: burgerType};
        }
      },
    }),
    view: defaultView,
  });
}
