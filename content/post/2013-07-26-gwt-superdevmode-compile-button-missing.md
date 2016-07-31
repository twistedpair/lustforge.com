---
title: GWT SuperDevMode Compile Button Missing
author: Joseph Lust
layout: post
date: 2013-07-26
url: /2013/07/26/gwt-superdevmode-compile-button-missing/
tags:
  - Google Web Toolkit (GWT)

---
So you are trying out SuperDevMode on your GWT project, but you&#8217;re getting the bookmarklet popup without a compile button? Boo.

{{< figure src="/img/gwt_dev_mode_copmile_button.png" >}}

If you&#8217;re like me, can&#8217;t sleep and decided to attempt SuperDevMode at 5:10AM, then you might **not** have read the [official documentation](http://www.gwtproject.org/articles/superdevmode.html) that well. Luckily there is a more [detailed write](http://stackoverflow.com/questions/11356714/getting-started-with-the-superdevmode?answertab=votes#tab-top) up that will admonish your insomnia addled pate. You see, you&#8217;ve almost made it, but **forgotten to enable SupperDevMode in your project&#8217;s module.gwt.xml** file. Just add the below and you&#8217;ll be off to the races.

```xml
 <!-- For local work, use Super Dev Mode -->
 <set-configuration-property name="devModeRedirectEnabled" value="true"/>
 <set-property name="compiler.useSourceMaps" value="true" />
```

Ah, that&#8217;s more like it!