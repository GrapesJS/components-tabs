import type { Editor } from 'grapesjs';
import type { TabsOptions } from '../types';
import Tab from './Tab';
import Tabs from './Tabs';
import TabContent from './TabContent';
import TabContents from './TabContents';
import TabContainer from './TabContainer';

type ComponentLoader = (editor: Editor, config: TabsOptions) => void;

// Define loading order for proper dependency resolution
const components: ComponentLoader[] = [
  TabContainer, // Load container first
  TabContent, // Then content components
  TabContents,
  Tab, // Then individual tabs
  Tabs, // Finally the main tabs component
];

export default (editor: Editor, config: TabsOptions): void => {
  const opts = {
    ...config,
    defaultModel: editor.DomComponents.getType('default').model,
    editor,
  };

  components.forEach((component) => component(editor, opts));
};
