@# Getting Started
Construct-ui is a [Mithril.js](https://github.com/MithrilJS/mithril.js) UI library

## Installation
```sh
 npm i --save construct-ui 
```

## Usage
```javascript
import { Button, Icons } from 'construct-ui';

const page = {
  view() {
    return m(Button, {
      iconLeft: Icons.FILTER,
      intent: 'primary',
      label: 'Button',
      size: 'xl'
    });
  }
}

m.mount(document.body, page)
```

Include the main CSS file:

```javascript
// Use with a bundler like webpack or parcel
import 'path/to/node_modules/construct-ui/lib/index.css'
```

## Browser Support
+ Chrome >= 54
+ Firefox >= 52
+ Edge >= 14
+ IE 11 (requires a polyfill for  `Array.findIndex`, `Array.find` and `Array.includes`)
+ Safari 9 +
