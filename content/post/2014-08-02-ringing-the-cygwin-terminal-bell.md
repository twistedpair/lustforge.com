---
title: Ringing the Cygwin Terminal Bell
author: Joseph Lust
layout: post
date: 2014-08-02
url: /2014/08/02/ringing-the-cygwin-terminal-bell/
tags:
  - Cygwin

---
Let&#8217;s say you&#8217;ve sadly been running several processes in a row. They take time, so you catch up on your blog reading while they run, but have to keep checking back on the terminal to see if they&#8217;re done. Wouldn&#8217;t it be nice to know when a command is complete? Easy, just have it **ring the Cygwin Terminal Bell**!

For example, download a big file, untar it, and let me know when you&#8217;re done:


```bash
wget fatFile.tar.gz; tar -xf fatFile.tar.gz; echo -e "\a";
```

So, be sure to `\a` to ring the bell from now on:

```bash
echo -e "\a"
```
