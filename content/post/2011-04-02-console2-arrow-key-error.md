---
title: Console2 Arrow Keys Madness
author: Joe
layout: post
date: 2011-04-02
url: /2011/04/02/console2-arrow-key-error/
categories:
  - Cygwin
  - 'Tips & Tricks'
tags:
  - Cygwin
  - 'Tips & Tricks'

---

{{< figure src="/img/cygwin_wtf.png" >}}

I&#8217;m writing to tell you how to fix this error since it just drove me mad for 20 minutes.

If you are an avid user of [Console2](http://sourceforge.net/projects/console/), which any Windows user should be, you might notice one day that your **arrow keys scroll up and down, rather than select the most recent command**. Why the heck would that happen? It does not happen in the Microsoft cmd window, but it will in [Cygwin](http://www.cygwin.com/install.html) and Cmd under Console2.

You see, you&#8217;ve left on the **SCROLL LOCK**, that anachronistic key that we never understand. No other terminal on your machine will act weird, but][1] will. Just unclick it (wherever they&#8217;ve hidden it on your keyboard) and sanity will return. Ah, I feel better already.
