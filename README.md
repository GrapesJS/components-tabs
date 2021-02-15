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
  * `tab-contents` - Component containing tab contents
* Blocks
  * `tabs`





## Options

You can see all the available options [here](https://github.com/artf/grapesjs-tabs/blob/master/src/options.js).



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

Start the development server

```sh
$ npm start
```





## License

BSD 3-Clause
