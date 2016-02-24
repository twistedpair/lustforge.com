---
title: YUI Compressor CSS Barfs on Unclosed Apostrophe
author: Joe
layout: post
date: 2011-05-24
url: /2011/05/24/yui-compressor-css-barfs-on-unclosed-apostrophe/
tags:
  - JavaScript
---
I was running my deployment script last night, which includes the [YUI compressor][1], and it went KABOOM! Not good.

I knew from the massive stack trace that it failed during YUI CSS processing. The stacktrace was a mile long, too long to be contained in the 5000 line terminal buffer, so I did a quick binary search removing files from the include list, and then lines from the culprit CSS file. This was the problem:

```css
background-image: url(http://foo.com/img.gif');
```

Obvious, right? The lack of a closing &#8216; made YUI go ape and give a useless stack track. However, my pain is your gain! If only PDT had syntax checking for CSS.

If you have such an error, just run the following regex search on your code base:

```bash
rgrep "url([^’].*?’)|url(‘[^’)]*)|url([^\”].*?”)|url(\“[^\”)]*)" .
```

The stack track in question:

```bash
at java.util.regex.Pattern$GroupHead.match(Unknown Source)
at java.util.regex.Pattern$Loop.match(Unknown Source)
at java.util.regex.Pattern$GroupTail.match(Unknown Source)
at java.util.regex.Pattern$BranchConn.match(Unknown Source)
at java.util.regex.Pattern$CharProperty.match(Unknown Source)
at java.util.regex.Pattern$Branch.match(Unknown Source)
at java.util.regex.Pattern$GroupHead.match(Unknown Source)
at java.util.regex.Pattern$Loop.match(Unknown Source)
at java.util.regex.Pattern$GroupTail.match(Unknown Source)
at java.util.regex.Pattern$BranchConn.match(Unknown Source)
at java.util.regex.Pattern$CharProperty.match(Unknown Source)
at java.util.regex.Pattern$Branch.match(Unknown Source)
at java.util.regex.Pattern$GroupHead.match(Unknown Source)
at java.util.regex.Pattern$Loop.match(Unknown Source)
at java.util.regex.Pattern$GroupTail.match(Unknown Source)
at java.util.regex.Pattern$BranchConn.match(Unknown Source)
at java.util.regex.Pattern$CharProperty.match(Unknown Source)
at java.util.regex.Pattern$Branch.match(Unknown Source)
at java.util.regex.Pattern$GroupHead.match(Unknown Source)
at java.util.regex.Pattern$Loop.match(Unknown Source)
at java.util.regex.Pattern$GroupTail.match(Unknown Source)
at java.util.regex.Pattern$BranchConn.match(Unknown Source)
at java.util.regex.Pattern$CharProperty.match(Unknown Source)
at java.util.regex.Pattern$Branch.match(Unknown Source)
at java.util.regex.Pattern$GroupHead.match(Unknown Source)
at java.util.regex.Pattern$Loop.match(Unknown Source)
at java.util.regex.Pattern$GroupTail.match(Unknown Source)
at java.util.regex.Pattern$BranchConn.match(Unknown Source)
```

 [1]: https://yui.github.io/yuicompressor
