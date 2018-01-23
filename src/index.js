import grapesjs from 'grapesjs';
import loadComponents from './components/index';
import loadBlocks from './blocks';

const attrTab = 'data-tab';
const attrTabs = 'data-tabs';
const attrTabContent = 'data-tab-content';

export default grapesjs.plugins.add('grapesjs-tabs', (editor, opts = {}) => {
  const options = { ...{
    // Object to extend the default tabs block, eg. `{ label: 'Tabs', attributes: { ... } }`
    // Pass a falsy value to avoid adding the block
    tabsBlock: {},

    // Object to extend the default tabs properties, eg. `{ name: 'My Tabs', droppable: false, ... }`
    tabsProps: {},

    // Object to extend the default tab properties
    tabProps: {},

    // Object to extend the default tab content properties
    tabContentProps: {},

    // Tabs attribute identifier (main component)
    attrTabs,

    // Tab attribute identifier
    attrTab,

    // Tab content attribute identifier
    attrTabContent,

    // Default class to use on tab
    classTab: 'tab',

    // Class used on tabs when active
    classTabActive: 'tab-active',

    // Default class to use on tab content
    classTabContent: 'tab-content',

    // The attribute used inside tabs as a selector for tab contents
    selectorTab: 'href',

    template: `
      <nav>
        <a href="#tab1" ${attrTab}>Tab 1</a>
        <a href="#tab2" ${attrTab}>Tab 2</a>
        <a href="#tab3" ${attrTab}>Tab 3</a>
      </nav>
      <div id="tab1" ${attrTabContent}>
        <div>Tab 1 Content</div>
      </div>
      <div id="tab2" ${attrTabContent}>
        <div>Tab 2 Content</div>
      </div>
      <div id="tab3" ${attrTabContent}>
        <div>Tab 3 Content</div>
      </div>
    `,
  },  ...opts };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // TODO Remove
  editor.on('load', () => editor.addComponents(`<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>`))
});
