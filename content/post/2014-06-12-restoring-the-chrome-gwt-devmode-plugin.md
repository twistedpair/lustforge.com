---
title: Restoring the Chrome GWT DevMode Plugin
author: Joseph Lust
layout: post
date: 2014-06-12
url: /2014/06/12/restoring-the-chrome-gwt-devmode-plugin/
tags:
  - Google Web Toolkit (GWT)

---
{{< figure src="/img/noNappi.png" >}}

Did your DevMode Chrome extension stop working recently? Welcome to the party. The powers of divine wisdom on the Google Chrome team [decided that NPAPI was a superannuated][2] security hole and must die. The fact that they proposed no clear alternative solution has led many a plugin (Java, GWT DevMode, Linux Garmin Connect, VDPAU, GNOME Shell Integration, VMware VSphere Client, Nemid) to [wither][3] and [die][4]. But what about Flash!? Well, to keep important plugins from being impacted, they&#8217;ve been whitelisted, but for the rest of us who depend on the Chrome DevMode Plugin&#8230; too bad.

> _The timing is unfortunate, but the number of Linux users that require NPAPI plugins that aren&#8217;t Flash is just too small to justify this effort._
> 
> &#8211;<a href="https://groups.google.com/a/chromium.org/forum/#!msg/chromium-dev/xEbgvWE7wMk/D_07G2lftacJ" target="_blank">Matt Giuca</a>

To boot, the aforementioned plugins &#8220;could be rewritten&#8221; from scratch in javascript, just for Chrome, using the [various new API&#8217;s](http://www.chromium.org/developers/npapi-deprecation), but it will be a swift death blow for many an OSS plugin where no one has the time to completely rewrite the project. Will a phoenix rise from the ashes? Certainly. It will be an opportunity for many to reinvent the wheel using toothpicks. However, in the mean time, many of us will be without wheels, especially in the Google Web Toolkit dev community.

### Retrograde GWT Plugin Install

You&#8217;ll need to revert to the less secure Chrome 34 build. Generally speaking, _it's a bad idea_, so be careful with this. Don&#8217;t do things requiring security on it. Sadly, the Chrome team has left us little choice, while also saying you shouldn&#8217;t do the above 😉 .

  1. <a href="http://sourceforge.net/projects/portableapps/files/Google%20Chrome%20Portable/Additional%20Versions/" target="_blank">Download</a> and install the Chrome 34 Portable Installer (has no updater)
  2. Reenable drag and drop <a href="http://stackoverflow.com/questions/23399644/chrome-install-extensioncrx-manually-doesnt-work-anymore" target="_blank">install of disabled .crx extensions</a>
  3. Install <a href="https://chrome.google.com/webstore/detail/gwt-developer-plugin/jpjpnpmbddbjkfaccnmhnkdgjideieim" target="_blank">GWT Chrome extension</a> from the Chrome Web Store

Hopefully that works for you. Now you can continue developing GWT until Chrome adds more road blocks, but you should really consider moving to <a href="http://www.gwtproject.org/articles/superdevmode.html" target="_blank">SuperDevMode</a>. If you&#8217;re keen to help, please contribute to the <a href="https://github.com/sdbg/sdbg" target="_blank">SDBG Eclipse Dev Mode replacement project</a>.

 [2]: http://blog.chromium.org/2013/09/saying-goodbye-to-our-old-friend-npapi.html
 [3]: http://ubuntuforums.org/showthread.php?t=2225277
 [4]: https://forums.garmin.com/showthread.php?76009-Announcement-Concerning-Garmin-Connect "Garmin Connect Plugin"
