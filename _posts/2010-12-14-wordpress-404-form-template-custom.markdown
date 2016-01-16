---
layout: post
title:  "Custom Form with Wordress results in 404"
date:   2010-12-14 17:39:00 +0100
categories: wordpress
---
I recently needed to make a custom register form for a Wordpress website, so I used a custom template with both form and treatment to make it simple. But, I came across a rather annoying bug : the form would constantly result in 404 error.

The solution is quite simple : you can't use a "name" field in your form. If you do, the field is interpreted by Wordpress and you end up with an error. So you will have to look for

{% highlight html %}
<input name="name" type="text" />
{% endhighlight %}

and then you have to chose between getting rid of it or renaming it.
