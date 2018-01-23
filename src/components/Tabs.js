export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'tabs';

  dc.addType(type, {
    model: defaultModel.extend({
      defaults: { ...defaultModel.prototype.defaults,
        name: 'Tabs',
        script() {
        },
        ...config.tabsProps
      },
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(config.attrTabs)) {
          return { type };
        }
      },
    }),
    view: defaultView.extend({
      init() {
        /*
        const props = ['slides-to-scroll', 'enable-mouse-events', 'slide-speed',
          'rewind-speed', 'snap-back-speed', 'infinite', 'rewind', 'ease'];
        const reactTo = props.map(prop => `change:${prop}`).join(' ');
        this.listenTo(this.model, reactTo, this.render);
        */
        const comps = this.model.components();

        // Add a basic template if it's not yet initialized
        !comps.length && comps.add(config.template);
      }
    })
  });
}
