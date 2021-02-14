import loadComponents from './components/index';
import loadBlocks from './blocks';
import defOptions from './options';

export default (editor, opts = {}) => {
  const options = {
    ...defOptions,
    ...opts
  };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);
};
