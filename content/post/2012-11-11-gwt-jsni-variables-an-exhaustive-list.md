---
title: GWT JSNI Variables – An Exhaustive List
author: Joe
layout: post
date: 2012-11-11
url: /2012/11/11/gwt-jsni-variables-an-exhaustive-list/
categories:
  - Google Web Toolkit (GWT)
  - Java

---
As anyone using the [Google Web Toolkit JSNI][1] knows, there are certain reserved variables, or &#8220;dollar words,&#8221; exposed by the GWT runtime. While you may be familiar with `$wnd` and `$doc`, there are more undocumented words. See the exhaustive (as of GWT 2.5.0) list below taken from [source][2].

<div>
  <dl class="customList">
    <dt>
      $wnd
    </dt>
    
    <dd>
      Reference to the root browser window GWT widgets are being rendered to. Note that when called from the iframe linker, GWT code runs in an iframe, not the root browser window, so calling <em>window</em> will reference the wrong window.
    </dd>
    
    <dt>
      $doc
    </dt>
    
    <dd>
      Same as above, but referencing the document, not window. Same as $wnd.document
    </dd>
    
    <dt>
      $gwt_version
    </dt>
    
    <dd>
      The X.Y.Z version of GWT this code was compiled with. Because Google uses the GWT trunk in their apps, they will return <em>0.0.999</em>.
    </dd>
    
    <dt>
      $moduleName
    </dt>
    
    <dd>
      The name of the compiled GWT module. Note, you may have assumed this was obfuscated. It&#8217;s not.
    </dd>
    
    <dt>
      $moduleBase
    </dt>
    
    <dd>
      The root URL for this module&#8217;s entrypoint.
    </dd>
    
    <dt>
      $strongName
    </dt>
    
    <dd>
      The MD5 hash for this module.
    </dd>
    
    <dt>
      $hosted
    </dt>
    
    <dd>
      Url and port of code server in hosted mode. i.e. <code>127.0.0.1:9997</code>
    </dd>
    
    <dt>
      $hostedHtml Version
    </dt>
    
    <dd>
      Version of hosted HTML page (<a href="http://code.google.com/p/google-web-toolkit/source/browse/trunk/dev/core/src/com/google/gwt/core/ext/linker/impl/hosted.html?r=5393">hosted.html</a>) in use.This is the page that shows error traces in browser in hosted mode.
    </dd>
    
    <dt>
      $sessionId
    </dt>
    
    <dd>
      Used when collecting stats in hosted mode. Same value as <code>window.__gwt_SessionID</code>
    </dd>
    
    <dt>
      $stats()
    </dt>
    
    <dd>
      Undocumented. Used to collect stats in hosted mode.
    </dd>
    
    <dt>
      $entry()
    </dt>
    
    <dd>
      Method that makes code reentry safe. This should wrap GWT code that will be called  from outside of GWT via Javascript calls you wish to expose from your GWT application. See <a href="https://developers.google.com/web-toolkit/doc/latest/DevGuideCodingBasicsJSNI#calling">docs</a> for more.
    </dd>
    
    <dt>
      $stack, $stackDepth, $location
    </dt>
    
    <dd>
      Undocumented. Trace information used by JsStackEmulator.
    </dd>
  </dl>
</div>

<div>
</div>

### Example of accessing GWT Version

To determine the running version of a GWT application, you can use JSNI to return that version.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=98&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-java" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="comment" style="color: #999988; font-style: italic;">// easily get the GWT version&lt;/span>
&lt;span class="keyword" style="color: #333333; font-weight: bold;">public&lt;/span> &lt;span class="keyword" style="color: #333333; font-weight: bold;">static&lt;/span> &lt;span class="keyword" style="color: #333333; font-weight: bold;">native&lt;/span> String getGwtVersion() &lt;span class="comment" style="color: #999988; font-style: italic;">/*-{
    return $gwt_version;
}-*/&lt;/span>;
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgamF2YTxicj4vLyBlYXNpbHkgZ2V0IHRoZSBHV1QgdmVyc2lvbjxicj5wdWJsaWMgc3RhdGlj<br />
IG5hdGl2ZSBTdHJpbmcgZ2V0R3d0VmVyc2lvbigpIC8qLXs8YnI+CXJldHVybiAkZ3d0X3ZlcnNp<br />
b247PGJyPn0tKi87PGJyPmBgYA==">
    ​
  </div>
</div>

From outside the application you can walk the DOM of the page to find the iframe containing the running GWT code and access the version like below.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=98&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-javascript" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="keyword" style="color: #333333; font-weight: bold;">var&lt;/span> gwtVersion = &lt;span class="literal">null&lt;/span>;
&lt;span class="keyword" style="color: #333333; font-weight: bold;">var&lt;/span> frames = document.getElementsByTagName(&lt;span class="string" style="color: #dd1144;">'iframe'&lt;/span>);
&lt;span class="keyword" style="color: #333333; font-weight: bold;">for&lt;/span> (&lt;span class="keyword" style="color: #333333; font-weight: bold;">var&lt;/span> i=&lt;span class="number" style="color: #009999;">0&lt;/span>; i&lt;frames.length; i++) {
    &lt;span class="comment" style="color: #999988; font-style: italic;">// prevent security access errors&lt;/span>
    &lt;span class="keyword" style="color: #333333; font-weight: bold;">try&lt;/span> {
        &lt;span class="keyword" style="color: #333333; font-weight: bold;">if&lt;/span>(frames[i].contentWindow.$gwt_version) {
            gwtVersion = frames[i].contentWindow.$gwt_version;
            &lt;span class="keyword" style="color: #333333; font-weight: bold;">break&lt;/span>;
        }
    }
    &lt;span class="keyword" style="color: #333333; font-weight: bold;">catch&lt;/span>(e) {}
}
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgamF2YXNjcmlwdDxicj52YXIgZ3d0VmVyc2lvbiA9IG51bGw7PGJyPnZhciBmcmFtZXMgPSBk<br />
b2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaWZyYW1lJyk7PGJyPmZvciAodmFyIGk9MDsg<br />
aSZsdDtmcmFtZXMubGVuZ3RoOyBpKyspIHs8YnI+ICAgIC8vIHByZXZlbnQgc2VjdXJpdHkgYWNj<br />
ZXNzIGVycm9yczxicj4gICAgdHJ5IHs8YnI+ICAgICAgICBpZihmcmFtZXNbaV0uY29udGVudFdp<br />
bmRvdy4kZ3d0X3ZlcnNpb24pIHs8YnI+ICAgICAgICAgICAgZ3d0VmVyc2lvbiA9IGZyYW1lc1tp<br />
XS5jb250ZW50V2luZG93LiRnd3RfdmVyc2lvbjs8YnI+ICAgICAgICAgICAgYnJlYWs7PGJyPiAg<br />
ICAgICAgfTxicj4gICAgfTxicj4gICAgY2F0Y2goZSkge308YnI+fTxicj5gYGA=">
    ​
  </div>
</div>

This is the mechanism I used to detect GWT apps in the [Library Detector Chrome Extension][3] ([Github][4]). Note the wrapping in a try/catch. This is because some iframes are cross domain and will throw a security exception if you try to access them.

 [1]: https://developers.google.com/web-toolkit/doc/latest/DevGuideCodingBasicsJSNI
 [2]: http://code.google.com/p/google-web-toolkit/source/browse/trunk/dev/core/src/com/google/gwt/dev/js/ast/JsRootScope.java?r=9287
 [3]: https://chrome.google.com/webstore/detail/library-detector/cgaocdmhkmfnkdkbnckgmpopcbpaaejo
 [4]: https://github.com/twistedpair/Library-Detector-for-Chrome