export default {
    // Object to extend the default tabs block, eg. `{ label: 'Tabs', attributes: { ... } }`
    // Pass a falsy value to avoid adding the block
    tabsBlock: {},

    // Object to extend the default tabs properties, eg. `{ name: 'My Tabs', droppable: false, ... }`
    tabsProps: { attributes: { class: 'tabs-main-container' } },

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
        .tabs-main-container {
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            max-width: 760px;
            margin: 30px auto;
        }

        .${config.classTab} {
            padding: 10px 5px;
            display: flex;
            border-radius: 3px;
            flex: 0 1 100%;
            cursor: pointer;
            min-width: 40%;
            text-transform: uppercase;
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            font-family: Inter;
            font-size: 12px;
            line-height: 1.6;
            // letter-spacing: 0.7px;
            font-weight: 700;
            min-height: 80px;
            align-items: center;
            justify-content: center;
            text-align: center;
            word-break: break-word;
        }


        .${config.classTab}:hover {
            background-color: #EFEFEF;
        }

        .${config.classTab}:focus {
            outline: none;
        }

        .${config.classTab}.${config.classTabActive} {
            background-color: #ffffff;
            color: #009D62;
            border-bottom-color: transparent;
        }

        .${config.classTabContainer} {
            display: flex;
            overflow: auto;
        }

        .${config.classTabContent} {
            animation: fadeEffect 0.5s;
            padding: 20px 30px 35px;
            font-size: 16px;
            font-family: Inter;
            word-break: break-word;
        }

        .${config.classTabContents} {
            min-height: 100px;
            padding: 10px;
            font-family: Inter;
        }

        @media (min-width: 480px) {
            .${config.classTab} {
                min-width: 30%;
                padding: 10px 20px;
            }
        }

        @media (min-width: 720px) {
            .${config.classTab} {
                min-width: 23%;
                padding: 10px 20px;
            }
        }

        @keyframes fadeEffect {
            from {opacity: 0;}
            to {opacity: 1;}
        }
    `
};