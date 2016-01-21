---
title: GWT SuperDevMode Compile Button Missing
author: Joe
layout: post
date: 2013-07-26
url: /2013/07/26/gwt-superdevmode-compile-button-missing/
categories:
  - Google Web Toolkit (GWT)

---
So you are trying out SuperDevMode on your GWT project, but you&#8217;re getting the bookmarklet popup without a compile button? Boo.

<span class="frame-outer  small aligncenter size-full wp-image-130"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2013/07/Selection_021.png"><img class="aligncenter size-full wp-image-130" src="http://www.lustforge.com/wp-content/uploads/2013/07/Selection_021.png" alt="Selection_021" width="415" height="98" /></a></span></span></span></span></span>

If you&#8217;re like me, can&#8217;t sleep and decided to attempt SuperDevMode at 5:10AM, then you might not have read the <a href="http://www.gwtproject.org/articles/superdevmode.html" target="_blank">official documentation</a> that well. Luckily there is a more <a href="http://stackoverflow.com/questions/11356714/getting-started-with-the-superdevmode?answertab=votes#tab-top" target="_blank">detailed write</a> up that will admonish your insomnia addled pate. You see, you&#8217;ve almost made it, but **forgotten to enable SupperDevMode in your project&#8217;s module.gwt.xml** file. Just add the below and you&#8217;ll be off to the races.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=128&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;"> &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- For local work, use Super Dev Mode --&gt;&lt;/span>
 &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">set-configuration-property&lt;/span> &lt;span class="attribute" style="color: #008080;">name&lt;/span>=&lt;span class="value" style="color: #dd1144;">"devModeRedirectEnabled"&lt;/span> &lt;span class="attribute" style="color: #008080;">value&lt;/span>=&lt;span class="value" style="color: #dd1144;">"true"&lt;/span>/&gt;&lt;/span>
 &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">set-property&lt;/span> &lt;span class="attribute" style="color: #008080;">name&lt;/span>=&lt;span class="value" style="color: #dd1144;">"compiler.useSourceMaps"&lt;/span> &lt;span class="attribute" style="color: #008080;">value&lt;/span>=&lt;span class="value" style="color: #dd1144;">"true"&lt;/span> /&gt;&lt;/span>
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgeG1sPGJyPiAmbHQ7IS0tIEZvciBsb2NhbCB3b3JrLCB1c2UgU3VwZXIgRGV2IE1vZGUgLS0m
Z3Q7PGJyPiAmbHQ7c2V0LWNvbmZpZ3VyYXRpb24tcHJvcGVydHkgbmFtZT0iZGV2TW9kZVJlZGly
ZWN0RW5hYmxlZCIgdmFsdWU9InRydWUiLyZndDs8YnI+ICZsdDtzZXQtcHJvcGVydHkgbmFtZT0i
Y29tcGlsZXIudXNlU291cmNlTWFwcyIgdmFsdWU9InRydWUiIC8mZ3Q7PGJyPmBgYA==">
    ​
  </div>
</div>

Ah, that&#8217;s more like it!

<span class="frame-outer  small aligncenter size-full wp-image-129"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2013/07/Selection_022.png"><img class="aligncenter size-full wp-image-129" src="http://www.lustforge.com/wp-content/uploads/2013/07/Selection_022.png" alt="Selection_022" width="415" height="104" srcset="https://lustforge.com/wp-content/uploads/2013/07/Selection_022-300x75.png 300w, https://lustforge.com/wp-content/uploads/2013/07/Selection_022.png 482w" sizes="(max-width: 482px) 100vw, 482px" /></a></span></span></span></span></span>