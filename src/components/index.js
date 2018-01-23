import Tab from './Tab';
import Tabs from './Tabs';

export default (editor, config = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const opts = { ...config,  defaultModel,  defaultView };

  Tab(dc, opts);
  Tabs(dc, opts);
}
