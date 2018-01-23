import grapesjs from 'grapesjs';
import loadComponents from './components/index';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('grapesjs-tabs', (editor, opts = {}) => {
  const options = { ...{
    // Object to extend the default tabs block, eg. `{ label: 'Tabs', attributes: { ... } }`
    // Pass a falsy value to avoid adding the block
    tabsBlock: {},

    // Object to extend the default tab properties, eg. `{ name: 'My Tab', draggable: false, ... }`
    tabProps: {},
  },  ...opts };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // TODO Remove
  editor.on('load', () => editor.addComponents(`<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>`))
});
