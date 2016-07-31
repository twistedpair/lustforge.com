---
title: “Add a Browser” – GWT Eclipse Plugin
author: Joseph Lust
layout: post
date: 2012-06-02
url: /2012/06/02/add-a-browser-gwt-eclipse-plugin/
tags:
  - Google Web Toolkit (GWT)

---
Ever get annoyed that you need to &#8220;Add a Browser&#8221; to the GWT Eclipse Plugin&#8217;s launch panel every use to launch Google Chrome or Mozilla Firefox? I think I&#8217;ve done this about a hundred times over the last year, so I figured out how to fix it and now this answer will be on Google to help everyone else.

## The Problem

{{< figure src="/img/gwt_browser.png" >}}

You close Eclipse and those browsers you added have been forgotten the next time you want to run a GWT Web Application. And so, you add then yet again&#8230;

## The Solution

{{< figure src="/img/gwt_browser_2.png" >}}

  * In Eclipse, select **Window > Preferences > General > Web Browser **
  * Click **New** and add your sought after browser
  * Done!

Now the browser&#8217;s will be available when you launch a GWT Web Application.

{{< figure src="/img/gwt_browser_3.png" >}}