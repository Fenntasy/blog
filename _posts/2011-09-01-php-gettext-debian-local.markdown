---
layout: post
title:  "Gettext on a debian server doesn't work"
cover:  "debian.png"
cover_position: "0 30%"
date:   2011-09-01 10:21:00 +0100
categories: linux
---
<strong>Gettext</strong> is a powerful tool to manage translations in a website but sometimes it just desn't want to work. You use it on a windows test environment with wamp or easyPHP and everything works just fine and when you put your files on your server, it just don't.

When searching the net you will find comments about the <strong>permissions</strong> of you translations files but that's rarely the problem. You will have to check if the <strong>locales</strong> you want to use are correctly configured on your server with :

```
dpkg-reconfigure locales
```

Choose wisely the locales you want to use and mind the <strong>encoding</strong>. You will have less problems with UTF-8 locales. But it's not quite finished yet. When you've configured the locales, you will have to use their complete name in your php code with the encoding. You can have the names with :

```
locale -a
```

In my case, I had to use fr_FR.utf8 and en_US.utf8. It wouldn't work without the ".utf8" part. So here is the code needed by my application to work on my server

```php
$language = 'fr_FR.utf8';
putenv('LC_ALL=' . $language);
setlocale(LC_ALL, $language);

// Specify location of translation tables
$domain = 'messages';
bindtextdomain($domain, './languages');
bind_textdomain_codeset($domain, 'UTF-8');
textdomain($domain);
```

Cover image credits: [Riccardo Magini](https://www.flickr.com/photos/rcrmgn/6198192848)