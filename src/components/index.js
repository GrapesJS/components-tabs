import Tab from './Tab';

export default (editor, config = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const opts = { ...config,  defaultModel,  defaultView };

  Tab(dc, opts);
}
