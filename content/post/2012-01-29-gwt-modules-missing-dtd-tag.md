---
title: GWT Module’s Missing DTD Tag
author: Joe
layout: post
date: 2012-01-29
url: /2012/01/29/gwt-modules-missing-dtd-tag/
categories:
  - Google Web Toolkit (GWT)
tags:
  - Google Web Toolkit (GWT)

---
<div id="attachment_57" style="width: 310px" class="wp-caption alignright">
  <span class="frame-outer  small size-medium wp-image-57"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2012/01/autosuggestionMagic.png"><img class="size-medium wp-image-57" title="GWT/Eclipse AutoSuggestion Magic" src="http://www.lustforge.com/wp-content/uploads/2012/01/autosuggestionMagic-300x127.png" alt="" width="300" height="127" srcset="https://lustforge.com/wp-content/uploads/2012/01/autosuggestionMagic-300x127.png 300w, https://lustforge.com/wp-content/uploads/2012/01/autosuggestionMagic.png 532w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  
  <p class="wp-caption-text">
    GWT Module AutoSuggestion Magic
  </p></span></span></span></span></span>
</div>

DTD&#8217;s are great. They let IDE&#8217;s like Eclipse know what is and is not valid XML. And, when you&#8217;re unsure or inquisitive, you can just **[ALT+ENTER]** and learn every available tag. That is amazing. Alas, **it seems that Google and GWT continue to ignore this standard**.

However, you can add these tags yourself and get the IDE auto-validation auto-suggestion features. Just change the top of your module.get.xml **to the following**.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=56&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="pi" style="color: rgb(153, 153, 153); font-weight: bold;">&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;/span>
&lt;span class="doctype" style="color: rgb(153, 153, 153); font-weight: bold;">&lt;!DOCTYPE module SYSTEM "http://google-web-toolkit.googlecode.com/svn/releases/2.1/distro-source/core/src/gwt-module.dtd"&gt;&lt;/span>
...
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgeG1sPGJyPiZsdDs/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9IlVURi04Ij8mZ3Q7PGJy
PiZsdDshRE9DVFlQRSBtb2R1bGUgU1lTVEVNICJodHRwOi8vZ29vZ2xlLXdlYi10b29sa2l0Lmdv
b2dsZWNvZGUuY29tL3N2bi9yZWxlYXNlcy8yLjEvZGlzdHJvLXNvdXJjZS9jb3JlL3NyYy9nd3Qt
bW9kdWxlLmR0ZCImZ3Q7PGJyPi4uLjxicj5gYGA=">
    ​
  </div>
</div>

You probably noticed that is the **DTD for GWT 2.1** and we&#8217;re currently at GWT 2.4. Beyond 2.1, they don&#8217;t seem to have DTD&#8217;s available. Let me know if you find them and I&#8217;ll update this entry.

Note this was initially brought up in GWT 1.6 by Kazik Pogoda <a title="Kazik Pogoda's Post" href="http://blog.xemantic.com/2008/09/gwt-module-dtd.html" target="_blank">here</a>.

### Missing jdoconfig Schema

Yep, this one is missing too. Come on GWT, does anyone read the Eclipse errors before rolling out a &#8220;_New Web Application_&#8221; GWT Wizard?

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=56&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="pi" style="color: #999999; font-weight: bold;">&lt;?xml version="1.0" encoding="utf-8"?&gt;&lt;/span>
&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">jdoconfig&lt;/span> &lt;span class="attribute" style="color: #008080;">xmlns&lt;/span>=&lt;span class="value" style="color: #dd1144;">"http://java.sun.com/xml/ns/jdo/jdoconfig"&lt;/span>
    &lt;span class="attribute" style="color: #008080;">xmlns:xsi&lt;/span>=&lt;span class="value" style="color: #dd1144;">"http://www.w3.org/2001/XMLSchema-instance"&lt;/span>
    &lt;span class="attribute" style="color: #008080;">xsi:schemaLocation&lt;/span>=&lt;span class="value" style="color: #dd1144;">"http://java.sun.com/xml/ns/jdo/jdoconfig http://java.sun.com/xml/ns/jdo/jdoconfig_3_0.xsd"&lt;/span>&gt;&lt;/span>
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgeG1sPGJyPiZsdDs/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9InV0Zi04Ij8mZ3Q7PGJy
PiZsdDtqZG9jb25maWcgeG1sbnM9Imh0dHA6Ly9qYXZhLnN1bi5jb20veG1sL25zL2pkby9qZG9j
b25maWciPGJyPiAgICB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1h
LWluc3RhbmNlIjxicj4gICAgeHNpOnNjaGVtYUxvY2F0aW9uPSJodHRwOi8vamF2YS5zdW4uY29t
L3htbC9ucy9qZG8vamRvY29uZmlnIGh0dHA6Ly9qYXZhLnN1bi5jb20veG1sL25zL2pkby9qZG9j
b25maWdfM18wLnhzZCImZ3Q7PGJyPmBgYA==">
    ​
  </div>
</div>

### Additional Missing GWT/GAE DTD&#8217;s and XSD&#8217;s

You&#8217;ll also find that other missing DTD/XSD&#8217;s. Google says they are in the SDK docs if you want them. However, all of these that I&#8217;ve tried with Eclipse have been rejected for having invalid formatting issues (i.e. tags with missing attributes). Here they are if you want to fix them up.

  * <a title="appengine-web.xsd" href="http://googleappengine.googlecode.com/svn-history/r83/trunk/java/docs/appengine-web.dtd" target="_blank">Most recent appengine-web.dtd</a>
  * <a title="appengine-web.xsd" href="http://googleappengine.googlecode.com/svn-history/r58/trunk/java/docs/appengine-web.xsd" target="_blank">Most recent appengine-web.xsd</a>