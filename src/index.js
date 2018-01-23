import grapesjs from 'grapesjs';
import loadComponents from './components/index';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('grapesjs-tabs', (editor, opts = {}) => {
  const options = { ...{
    // Object to extend the default tabs block, eg. `{ label: 'Tabs', attributes: { ... } }`
    // Pass a falsy value to avoid adding the block
    tabsBlock: {},

    // Object to extend the default tabs properties, eg. `{ name: 'My Tabs', droppable: false, ... }`
    tabsProps: {},

    // Object to extend the default tab properties
    tabProps: {},

    // Tabs attribute identifier (main component)
    attrTabs: 'data-tabs',

    // Tab attribute identifier
    attrTab: 'data-tab',

    // Tab content attribute identifier
    attrTabContent: 'data-tab-content',

    // The attribute used inside tabs as a selector for tab contents
    selectorTab: 'href',

    template: `
      <nav>
        <a href="#tab1" data-tab>Tab 1</a>
        <a href="#tab2" data-tab>Tab 2</a>
        <a href="#tab3" data-tab>Tab 3</a>
      </nav>
      <div id="tab1">Tab 1 Content<div>
      <div id="tab2">Tab 2 Content<div>
      <div id="tab3">Tab 3 Content<div>
    `,
  },  ...opts };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // TODO Remove
  editor.on('load', () => editor.addComponents(`<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>`))
});
