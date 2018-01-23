import Tab from './Tab';
import Tabs from './Tabs';

export default (editor, config = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const linkType = dc.getType('link');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const linkModel = linkType.model;
  const linkView = linkType.view;
  const opts = {
    ...config,
    defaultModel,
    defaultView,
    linkModel,
    linkView,
  };

  Tab(dc, opts);
  Tabs(dc, opts);
}
