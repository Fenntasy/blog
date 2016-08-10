Disclaimer: I encountered this problem with Ember 1.9.2, I don't know if it is relevant for other versions.

If you want to invoke a callback each time something is added, removed or changed inside an array in Ember, you can use an observer call, but you have to specifiy `.[]` in order to observe the content of the array, like this:

```javascript
controller.addObserver("myArray.[]", controller, "handleMyArrayChange");
```

But, if you need to remove this observer (keep your memory), you will need to remove it two times like this:

```javascript
controller.removeObserver("myArray.[]", controller, "handleMyArrayChange");
controller.removeObserver("myArray", controller, "handleMyArrayChange");
```

Just removing on `myArray.[]` won't do the trick and to completely remove the call to `handleMyArrayChange`, you'll need to also remove the observer on `myArray`.
