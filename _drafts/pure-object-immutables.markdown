---
layout: post
title:  "Pure javascript immutable objects"
cover:  "Vasquez_Rocks_County_Park.jpg"
cover_position: "0 40%"
date:   2015-09-01 22:19:00 +0100
categories: javascript
---
#### Copy an object

Managing object is really simpler in ES2015 for objects. Even though you just need to have some functions ready in ES5 (either yours or by using lodash or underscore). I need to add a warning here because the copy of an object is shallow. If you have nested objects, only the first level deep will be really a copy: the nested objects will still be a reference to the original object.

```javascript
// ES2015
var obj = { a: 'letter', b: 'letter', 1: 'number' }
var copy = { ...obj, a: 'number' }
console.log(obj)
// { a: 'letter', b: 'letter', 1: 'number' }
console.log(copy)
// { a: 'number', b: 'letter', 1: 'number' }
```

```javascript
// ES5
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

var obj = { a: 'letter', b: 'letter', 1: 'number' }
var copy = _extends({}, obj, {a: 'number'})
console.log(obj)
// { a: 'letter', b: 'letter', 1: 'number' }
console.log(copy)
// { a: 'number', b: 'letter', 1: 'number' }

```