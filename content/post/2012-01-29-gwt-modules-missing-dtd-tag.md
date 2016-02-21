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

{{< figure src="/img/gwt_modules_tag_missing.png" title="GWT Module AutoSuggestion Magic" >}}

DTD&#8217;s are great. They let IDE&#8217;s like Eclipse know what is and is not valid XML. And, when you&#8217;re unsure or inquisitive, you can just `ALT+ENTER` and learn every available tag. That is amazing. Alas, **it seems that Google and GWT continue to ignore this standard**.

However, you can add these tags yourself and get the IDE auto-validation auto-suggestion features. Just change the top of your module.get.xml **to the following**.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE module SYSTEM "http://google-web-toolkit.googlecode.com/svn/releases/2.1/distro-source/core/src/gwt-module.dtd">
...
```

You probably noticed that is the **DTD for GWT 2.1** and we&#8217;re currently at GWT `2.`4. Beyond `2.1`, they don&#8217;t seem to have DTD&#8217;s available. Let me know if you find them and I&#8217;ll update this entry.

Note this was initially brought up in GWT 1.6 by Kazik Pogoda <a title="Kazik Pogoda's Post" href="http://blog.xemantic.com/2008/09/gwt-module-dtd.html" target="_blank">here</a>.

### Missing jdoconfig Schema

Yep, this one is missing too. Come on GWT, does anyone read the Eclipse errors before rolling out a &#8220;_New Web Application_&#8221; GWT Wizard?

```xml
<?xml version="1.0" encoding="utf-8"?>
<jdoconfig xmlns="http://java.sun.com/xml/ns/jdo/jdoconfig"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/jdo/jdoconfig http://java.sun.com/xml/ns/jdo/jdoconfig_3_0.xsd">
```

### Additional Missing GWT/GAE DTD&#8217;s and XSD&#8217;s

You&#8217;ll also find that other missing DTD/XSD&#8217;s. Google says they are in the SDK docs if you want them. However, all of these that I&#8217;ve tried with Eclipse have been rejected for having invalid formatting issues (i.e. tags with missing attributes). Here they are if you want to fix them up.

- <a title="appengine-web.xsd" href="http://googleappengine.googlecode.com/svn-history/r83/trunk/java/docs/appengine-web.dtd" target="_blank">Most recent appengine-web.dtd</a>
- <a title="appengine-web.xsd" href="http://googleappengine.googlecode.com/svn-history/r58/trunk/java/docs/appengine-web.xsd" target="_blank">Most recent appengine-web.xsd</a>