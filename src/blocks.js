export default (editor, config = {}) => {
  const bm = editor.BlockManager;
  const tabsBlock = config.tabsBlock;
  const type = 'tabs';

  tabsBlock && bm.add(type, {
    label: `
      <svg class="gjs-block-svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 0H2a2 2 0 0 0-2 2v22c0 1.1.9 2 2 2h28a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 2v2h-8V2h8zM12 2h8v2h-8V2zm18 22H2V2h8v4h20v18z"/><path d="M5 11c0 .6.4 1 1 1h20a1 1 0 0 0 0-2H6a1 1 0 0 0-1 1zm21 3H6a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2zm0 4H6a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2z"/>
      </svg>
      <div class="gjs-block-label">Tabs</div>
    `,
    content: { type },
    ...tabsBlock
  });
}
