---
title: Cygwin Visible Bell Enable
author: Joe
layout: post
date: 2011-10-03
url: /2011/10/03/cygwin-visible-bell-enable/
tags:
  - Cygwin
---
Cygwin is amazing for those of us stuck on Windows. The bell is not always so grand. I prefer a visible bell (like in [Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)) rather than a &#8220;ding!&#8221; when I&#8217;ve got my music going.

To enable the visible bell add the following to `~/.bashrc`

```bash
set bell-style visible
```

Ah, that's much better! Thanks again Cygwin!
