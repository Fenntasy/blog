---
layout: post
title:  "My takeaways from dotSecurity 2016"
date:   2016-05-15 16:15:00 +0200
categories: conf"
cover:  "dot-security-2016.jpg"
cover_position: "0 15%"
---
This article is not a review or the conference, you can find better articles for that. I'm just using this platform to remember my takeaways and have a return point to what I've learned.

That said, dotSecurity was a really good surprise for the first edition of the little sister of dotScale: really good talks and really good rythm. Talks were not that technical and as promised, the security part was comprehensible for webdevs.

## Let's encrypt everywhere

First huge takeaway, let's encrypt has now became a mean for https everywhere. They have issued more than a million certificates for more than 2,4 million domains. I need to get on that even if this blog is just html pages.

## Multi factor auth

A really great talk about multi factor authentification with an emphasis on the drawbacks of each method that exists for the moment. There are differents ways for multi factor auth : SMS auth, app auth and physical token. Each of these has the same difficulty: what happens if you lose your tokens. If you want to have a multi factor auth, you will need to think about UX and cost, not really about security because - even if it's better - it's not full proof. Loosing a master key for physical tokens will force you to renew every token.
