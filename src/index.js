import grapesjs from 'grapesjs';
import loadComponents from './components/index';
import loadBlocks from './blocks';

const attrTab = 'data-tab';
const attrTabs = 'data-tabs';
const attrTabContent = 'data-tab-content';
const attrTabContainer = 'data-tab-container';

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

    // Object to extend the default tab container properties
    tabContainerProps: {},

    // Tabs attribute identifier (main component)
    attrTabs,

    // Tab attribute identifier
    attrTab,

    // Tab content attribute identifier
    attrTabContent,

    // Tab container attribute identifier
    attrTabContainer,

    // Default class to use on tab
    classTab: 'tab',

    // Class used on tabs when active
    classTabActive: 'tab-active',

    // Default class to use on tab content
    classTabContent: 'tab-content',

    // Default class to use on tab container
    classTabContainer: 'tab-container',

    // The attribute used inside tabs as a selector for tab contents
    selectorTab: 'href',

    // Default tabs template
    template: `
      <nav ${attrTabContainer}>
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

    // Default template for new added tab contents
    templateTabContent: `<div>New Tab Content</div>`,

    style: `
      .tab {
        text-decoration: none;
        color: inherit;
        padding: 7px 14px;
        transition: opacity 0.3s;
        display: inline-block;
        border-radius: 3px;
        margin-right: 10px;
      }

      .tab.tab-active {
        background-color: #0d94e6;
        color: white;
      }

      .tab-content {
        padding: 6px 12px;
        min-height: 100px;
        animation: fadeEffect 1s;
      }

      @keyframes fadeEffect {
        from {opacity: 0;}
        to {opacity: 1;}
      }
    `
  },  ...opts };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);
});
