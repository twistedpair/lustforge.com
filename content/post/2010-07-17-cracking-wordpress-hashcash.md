---
title: Cracking WordPress Hashcash
author: Joe
layout: post
date: 2010-07-17
url: /2010/07/17/cracking-wordpress-hashcash/
categories:
  - Hashcodes
  - Hidden in plain Site
  - PHP
tags:
  - Hashcodes
  - PHP

---
As many know, WordPress Hashcash is not a <a href="http://en.wikipedia.org/wiki/Hashcash" target="_blank">hashcash</a> at all. This is more than merely semantics. A true hashcash would provide protections to blogs from spam bots, but WPHC does no such thing. Rather WPHC merely projects an aura of protection that even the most novitiate script kiddie can crack.

According to the <a href="http://wordpress-plugins.feifei.us/hashcash/" target="_blank">authors of WPHC</a>:

> _WP Hashcash is an antispam plugin that eradicates comment spam on WordPress blogs._

Not really, let me explain why.

WPHC inserts javascript into your blog&#8217;s webpage. By default, a spam bot will not load and run this code because it is only run by web browsers. However, the spam bot makers are no Luddites and can easily pull this javascript code from the page, run it, and return the hashcash code.

To prove this fact, see the below PHP class UnHashcash which takes the HTML of a blog post, processes the javascript, and returns the purportedly secure hashcash code.
  
 <span style="margin-top: 20px; margin-bottom: 20px; display: block;"></span>

> <span style="margin-top: 20px; margin-bottom: 20px; padding: 10px; background-color: #ebebeb;">Download <a href="http://www.lustforge.com/wp-content/downloads/UnHashcash.class.zip">UnHashcach.clas.php</a> (zip 2KB)</span>

I present this code as a clear example of why people should not assume that WPHC will protect their blogs from spam. The simplest solution is to require member sign up or use captchas and Akismet.

Oh, and I know this blog is running WPHC. I&#8217;m looking forward to some spam bots. Spam Ahoy!