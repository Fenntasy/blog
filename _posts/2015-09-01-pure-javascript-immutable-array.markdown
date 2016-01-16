---
layout: post
title:  "Pure javascript immutable arrays"
cover:  "Vasquez_Rocks_County_Park.jpg"
cover_position: "0 40%"
date:   2015-09-01 22:19:00 +0100
categories: javascript
---
About a year ago, I started developping an app in React. I chose React on a whim because I wanted to learn a new framework and was not fond of the ~~java~~ angular way of doing things. I learned about immutability shortly after but did not pay so much attention to it. In my mind, the state of a React component was kind of immutable[^1] and that was enough for me. Boy did I change my mind.

Spend a day fighting a bug that was caused by mutability and you could change your mind too. Unfortunately, I still don't use immutability everywhere but my new code is using it, a lot!

But why wouldn't I use a library like [ImmutableJS](https://facebook.github.io/immutable-js/) or the [update addong of React](https://facebook.github.io/react/docs/update.html) and just be done with it you ask? Well, I could and in fact, I am in some places, but if immutability can be achieved just from vanilla javascript, it's at least good to know. You could need it just in one place and don't want to bother getting a library just for that.

I'll start by talking about arrays because ES2015 is just adding syntaxic sugar on top on existing functions.

Firstly, I went to see every basic function of the Array prototype and immutability will rely on these functions: concat, filter, map, reduce, reduceRight and reduceRight. These functions don't mutate the array but return a copy or a new array.

The mutative functions are [push](#push), [pop](#pop), [shift](#shift), [unshift](#unshift), [sort](#sort), [reverse](#reverse), [splice](#splice) and [delete](#delete) (kind of). You can click on each one to see an immutable equivalent. The other functions just test or go through the array without doing anything to it.

Disclaimer: I voluntarily forgot the new ES2015 functions (fill and copyWithin) for simplicity and because I have no idea how to use these functions for the moment.

#### Push

```javascript
// ES2015
function immutablePush(arr, newEntry){
  return [ ...arr, newEntry ]      
}
```

```javascript
// ES5
function immutablePush(arr, newEntry){
  return [].concat(arr, newEntry)
}
```

<hr>

#### Pop

```javascript
function immutablePop(arr){
  return arr.slice(0, -1)     
}
```

<hr>

#### Shift

```javascript
function immutableShift(arr){
  return arr.slice(1)     
}
```

<hr>

#### Unshift

```javascript
// ES2015
function immutableUnshift(arr, newEntry){
  return [ newEntry, ...arr ]
}
```

```javascript
// ES5
function immutableUnshift(arr, newEntry){
  return [].concat(newEntry, arr)
}
```

<hr>

#### Sort

This one is a bit of a downer because the Array.sort function will mutate your array and I don't think it will be useful to recode it. So the simplest way of getting a new sorted array is to make a copy, then sort it.

```javascript
// ES2015
function immutableSort(arr, compareFunction) {
  return [ ...arr ].sort(compareFunction)
}
```

```javascript
// ES5
function immutableSort(arr, compareFunction) {
  return arr.concat().sort(compareFunction)
}
```

<hr>

#### Reverse

Array.reverse has the same problem than Array.sort, it's not practical to rewrite the function and just simpler to make a copy of the array before reversing it.

```javascript
// ES2015
function immutableReverse(arr) {
  return [ ...arr ].reverse()
}
```

```javascript
// ES5
function immutableReverse(arr) {
  return arr.concat().reverse()
}
```

<hr>

#### Splice

```javascript
// ES2015
function immutableSplice(arr, start, deleteCount, ...items) {
  return [ ...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount) ]
}
```

```javascript
// ES5
function immutableSplice(arr, start, deleteCount) {
  var _len = arguments.length
  var items = Array(_len > 3 ? _len - 3 : 0)
  for (var _key = 3; _key < _len; _key++) {
    items[_key - 3] = arguments[_key];
  }
  return [].concat(arr.slice(0, start), items, arr.slice(start + deleteCount))
}
```

<hr>

#### Delete

```javascript
function immutableDelete (arr, index) {
   return arr.slice(0,index).concat(arr.slice(index+1))
}
```

<hr>

### Copy an array

Maybe you just want to copy an array. This is the way. It could be useful if you need the return value of the previous mutable functions. Just make a copy and then use your function.

```javascript
// ES2015
var arr = ['a', 'b', 'c']
var newArr = [ ...arr ]
```

```javascript
// ES5
var arr = ['a', 'b', 'c'];
var newArr = [].concat(arr);
```

[^1]: I thought that this.setState was the only way of updating the state but you can in fact mutate the objects in this.state and have the state change (without triggering an update of the component and watch everything go wrong on the next update).

Cover image credits : [Rennet Stowe](https://www.flickr.com/photos/tomsaint/3850206920/)

