---
layout: post
title:  "Choose the height of a facebook application"
cover:  "facebook.jpg"
cover_position: "0 30%"
date:   2011-06-18 23:41:00 +0100
categories: facebook
---
By default, a facebook app will have a maximum width of 760 pixels if you choose to use an automatic resize of your application. But doing this, the default height is about 800 pixels and you can't have a scrollbar this way. Choosing scrollbars for your application is a way of having virtually unlimited height but you will see that facebook also add an horizontal scrollbar even if it will be unused, like this :

![facebook-scrollbars](/assets/facebook-scrollbars.jpg)

Fortunately, there is a way to choose precisely (well more or less) the height of your application. You just have to choose the automated resize and use a bit of javascript. Keep in mind that this code is made for applications only and may not work with pages.

```javascript
<div id="fb-root">
<script src="http://connect.facebook.net/en_US/all.js"></script>
<script type="text/javascript">
window.fbAsyncInit = function () {
  FB.init({
    appId:'YOUR_APP_ID',
    status:true,
    cookie:true,
    xfbml:true
  });
  FB.Canvas.setSize({ width: 700, height: 1000 });
};
(function() {
  var e = document.createElement('script');
  e.async = true;
  e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
  document.getElementById('fb-root').appendChild(e); }());
</script>
</div>
```

Don't ask me why you have to repeat twice the same code (the second half is just another way of doing the first) but you have to do it and to put this snippet of code just after your &lt;body&gt; tag to make it work. As you can see, I choose an height of 1000 pixels. It seems facebook is doing a bit of dark mathematics there, so you'd be wise to put a little more than what you need in order to have the height you want.

Facebook is known to often change its API so this code works as of now but I can't say for sure it will still do in a few months. Check the date, hope for the best, enjoy long facebook applications.

Cover image credits: [Thos Ballantyne](https://www.flickr.com/photos/thos003/5986220278)