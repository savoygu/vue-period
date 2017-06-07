# vue-period

> Vue-based time selection component

## Install

Get source from npm or yarn.

``` bash
# Npm
$ npm install vue-period --save

# Yarn (recommend)
$ yarn add vue-period
```

Support UMD library and individual CSS file.

```bash
./lib/
├── vue-period.js
└── vue-period.css
./src/
├── /components/
│   ├── period.vue
│   └── period-part.vue
├── /util/
│   └── util.js
└── index.js
```

```javascript
// For ES6 module
import Period from 'vue-period'

// For commonJS
const Period  = require('vue-period').default

// Import from src code for debugging or self building
import Period from 'vue-period/src';
```

And import CSS file:
```javascript
require('vue-period/lib/vue-period.css');
```


## Usage

```template
<template>
    <div id="app">
        <period
            :initStatus="[{ day: 1, start: 6, end: 10 }, { day: 2, start: 13, end: 13 }]"
            :isFormat="true"
            :customProperty="{ day: 'weekday', start: 'startHour', end: 'endHour' }"
            :periodClass="[]"
            @change="handleChange">
        </period>
    </div>
</template>
```

```javascript
export default {
    name: 'app',
    data () {
      return {
        week: []
      }
    },
    methods: {
      handleChange (week) {
        this.week = week
      }
    }
}
```


## API

Props

| Property | Description | Type | Default |
| ----- | ----- | ----- | ----- |
| initStatus | Initialize unselected boxes. | Array | [] |
| isFormat | Format the returned data. | Boolean | true |
| customProperty | Customize the key value for the returned data | Object | {day: 'day', start: 'start', end: 'end'} |
| periodClass | Custom style | String/Array/Object | - |

Events

| Event Name | Description | Return Value |
| ----- | ----- | ----- |
| change | Callback when clicking button or boxes. | [{day: '', start: '', end: ''}] |


## Build Setup

``` bash
# install dependencies
npm install / yarn install

# serve with hot reload at localhost:8080
npm run demo:dev

# build for demo with minification
npm run demo:build

# build for gh-pages with minification
npm run demo:prepublish

# build for production with minification
npm run build
```


# TODO

- [ ] Remove the dependency on element-ui



## License

MIT