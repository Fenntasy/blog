---
layout: post
title:  "My takeaways from dotSecurity 2016"
date:   2016-05-22 22:00:00 +0200
categories: "conf"
cover:  "dot-security-2016.jpg"
cover_position: "0 15%"
---
This article is not a review or the conference, you can find better articles for that. I'm just using this platform to remember my takeaways and have a return point to what I've learned.

That said, dotSecurity was a really good surprise for the first edition of the little sister of dotScale: really good talks and really good rythm. Talks were not that technical and as promised, the security part was comprehensible for webdevs. And for my main takeway, a security conference is a place where a speacker will show how easy it is to break a server, enter as root and delete everything so you might want to always upgrade your stack to avoid having old vulnerabilites and make it easy to break your servers.

## Let's encrypt everywhere

First huge takeaway, let's encrypt has now became a mean for https everywhere. They have issued more than a million certificates for more than 2,4 million domains. I need to get on that even if this blog is just html pages. Https everywhere is cleary in the tracks for the future.

## Multi factor auth

A really great talk about multi factor authentification with an emphasis on the drawbacks of each method that exists for the moment. You need to be aware that it's not an imprenetrable security, even with physical tokens, you could have a breach and you need to know how to respond when someone loses its key: a lost physical token, a lost phone or a phone number change. You can't have the support people just throw a new one by weakly ("what's your birthday?") verifying the identity of the caller because you become susceptible to social engineering. There are ways around that, but you need to put this into consideration when choosing multi auth.

## Content Security Policy

I had no idea that this thing existed but it's really interesting. Content Security Policy or CSP is a header that your server can send with your pages that inform your browser on what resources are allowed on your site and how they are to be served (https or not). You can be as drastic as you want and allow just a whitelist of scripts to be executed. You can also deactivate all usage of inline scripts on your site and severely limit the cross scripting risks that go with it. The talks about CSP were largely a shout-out to this standard and I agree that it should be known and considered on every project.

The best thing is that you can just set this to be informative: it will just print warnings on the console to let you know what would happen if you enforced these policies. You could also use [report-uri.io](https://report-uri.io), a tool built by Scott Helme to build reporting around CSP.

You can find more about CSP on this article [Content Security Policy - an introduction](https://scotthelme.co.uk/content-security-policy-an-introduction/).


## Conclusion

And to finish this post, a quote from Paul Mockapetris, Creator of the DNS:

> "Hardware is like milk, you want the freshest but software is like wine, you want it a little aged".
