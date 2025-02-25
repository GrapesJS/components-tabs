import type { Editor, Plugin } from 'grapesjs';
import loadComponents from './components/index';
import loadBlocks from './blocks';
import type { TabsOptions } from './types';
import defaultOptions from './options';

export type PluginOptions = TabsOptions;

const plugin: Plugin<PluginOptions> = (editor: Editor, opts: Partial<PluginOptions> = {}) => {
  const options = {
    ...defaultOptions,
    ...opts,
  };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);
};

export default plugin;
