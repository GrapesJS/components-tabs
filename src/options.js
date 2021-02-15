export default {
    // Object to extend the default tabs block, eg. `{ label: 'Tabs', attributes: { ... } }`
    // Pass a falsy value to avoid adding the block
    tabsBlock: {},

    // Object to extend the default tabs properties, eg. `{ name: 'My Tabs', droppable: false, ... }`
    tabsProps: {},

    // Object to extend the default tab container properties
    tabContainerProps: {},

    // Object to extend the default tab properties
    tabProps: {},

    // Object to extend the default tab content properties
    tabContentProps: {},

    // Object to extend the default tab contents properties
    tabContentsProps: {},

    // Default class to use on tab
    classTab: 'tab',

    // Default class to use on tab container
    classTabContainer: 'tab-container',

    // Class used on tabs when active
    classTabActive: 'tab-active',

    // Default class to use on tab content
    classTabContent: 'tab-content',

    // Default class to use on tab contents
    classTabContents: 'tab-contents',

    // The attribute used inside tabs as a selector for tab contents
    selectorTab: 'aria-controls',

    // Tabs component id
    typeTabs: 'tabs',

    // TabContainer component id
    typeTabContainer: 'tab-container',

    // Tab component id
    typeTab: 'tab',

    // TabContent component id
    typeTabContent: 'tab-content',

    // TabContents component id
    typeTabContents: 'tab-contents',

    // Default template for new tabs
    templateTab: tab => '<span data-gjs-highlightable="false">Tab</span>',

    // Default template for new tab contents
    templateTabContent: tab => '<div>Tab Content</div>',

    // Default style for tabs
    style: (config) => `
        .${config.classTab} {
            padding: 7px 14px;
            display: inline-block;
            border-radius: 3px;
            margin-right: 10px;
        }

        .${config.classTab}:focus {
            outline: none;
        }

        .${config.classTab}.${config.classTabActive} {
            background-color: #0d94e6;
            color: white;
        }

        .${config.classTabContainer} {
            display: inline-block;
        }

        .${config.classTabContent} {
            animation: fadeEffect 1s;
        }

        .${config.classTabContents} {
            min-height: 100px;
            padding: 10px;
        }

        @keyframes fadeEffect {
            from {opacity: 0;}
            to {opacity: 1;}
        }
    `
};