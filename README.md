# GrapesJS Tabs

Simple tabs component plugin for GrapesJS

<p align="center"><img src="http://grapesjs.com/img/tabs.gif" alt="GrapesJS Tabs" align="center"/></p>


[Demo](http://grapesjs.com/demo.html)


## Requirements
* GrapesJS v0.13.8 or higher


## Summary

* Plugin name: `grapesjs-tabs`
* Components
  * `tabs` - Main tabs component
  * `tab-container` - Component which contains single tabs
  * `tab` - Single tab component
  * `tab-content` - Tab's content
* Blocks
  * `tabs`





## Options

|Option|Description|Default|
|-|-|-
| `tabsBlock` | Object to extend the default tabs block, eg. `{ label: 'Tabs', attributes: { ... } }`. Pass a falsy value to avoid adding the block| `{}` |
| `tabsProps` | Object to extend the default tabs properties, eg. `{ name: 'My Tabs', droppable: false, ... }` | `{}` |
| `tabProps` | Object to extend the default tab properties | `{}` |
| `tabContentProps` | Object to extend the default tab content properties | `{}` |
| `tabContainerProps` | Object to extend the default tab container properties | `{}` |
| `attrTabs` | Tabs attribute identifier (main component) | `data-tabs` |
| `attrTab` | Tab attribute identifier | `data-tab` |
| `attrTabContent` | Tab content attribute identifier | `data-tab-content` |
| `attrTabContainer` | Tab container attribute identifier | `data-tab-container` |
| `classTab` | Default class to use on tab | `tab` |
| `classTabActive` | Class used on tabs when active | `tab-active` |
| `classTabContent` | Default class to use on tab content | `tab-content` |
| `classTabContainer` | Default class to use on tab container | `tab-container` |
| `selectorTab` | The attribute used inside tabs as a selector for tab contents | `href` |
| `template` | Default tabs template | `<nav ....` (check the source) |
| `templateTabContent` | Default template for new added tab contents | `<div>New Tab Content</div>` |
| `style` | Default style for tabs | `.tab { ....` (check the source) |



## Download

* CDN
  * `https://unpkg.com/grapesjs-tabs`
* NPM
  * `npm i grapesjs-tabs`
* GIT
  * `git clone https://github.com/artf/grapesjs-tabs.git`





## Usage

```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-tabs.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      ...
      plugins: ['grapesjs-tabs'],
      pluginsOpts: {
        'grapesjs-tabs': {
          // options
        }
      }
  });
</script>
```





## Development

Clone the repository

```sh
$ git clone https://github.com/artf/grapesjs-tabs.git
$ cd grapesjs-tabs
```

Install dependencies

```sh
$ npm i
```

The plugin relies on GrapesJS via `peerDependencies` so you have to install it manually

```sh
$ npm i grapesjs --no-save
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
