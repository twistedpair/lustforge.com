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
As anyone using the [Google Web Toolkit JSNI][1] knows, there are certain reserved variables, or &#8220;dollar words,&#8221; exposed by the GWT runtime. While you may be familiar with `$wnd` and `$doc`, there are more undocumented words. See the exhaustive (as of GWT `2.5.0`) list below taken from [source][2].

### $wnd
Reference to the root browser window GWT widgets are being rendered to. Note that when called from the iframe linker, GWT code runs in an iframe, not the root browser window, so calling window will reference the wrong window.

### $doc
Same as above, but referencing the document, not window. Same as `$wnd.document`.

### $gwt_version
The X.Y.Z version of GWT this code was compiled with. Because Google uses the GWT trunk in their apps, they will return `0.0.999`.

### $moduleName
The name of the compiled GWT module. Note, you may have assumed this was obfuscated. It’s not.

### $moduleBase
The root URL for this module’s entrypoint.

### $strongName
The MD5 hash for this module.

### $hosted
Url and port of code server in hosted mode. i.e. `127.0.0.1:9997`.

### $hostedHtml Version
Version of hosted HTML page (hosted.html) in use. This is the page that shows error traces in browser in hosted mode.

### $sessionId
Used when collecting stats in hosted mode. Same value as `window.__gwt_SessionID`

### $stats()
Undocumented. Used to collect stats in hosted mode.

### $entry()
Method that makes code reentry safe. This should wrap GWT code that will be called  from outside of GWT via Javascript calls you wish to expose from your GWT application. See docs for more.

### $stack, $stackDepth, $location
Undocumented. Trace information used by JsStackEmulator.

## Example of accessing GWT Version

To determine the running version of a GWT application, you can use JSNI to return that version.

```java
// easily get the GWT version
public static native String getGwtVersion() /*-{
    return $gwt_version;
}-*/;
```

From outside the application you can walk the DOM of the page to find the iframe containing the running GWT code and access the version like below.

```javascript
var gwtVersion = null;
var frames = document.getElementsByTagName('iframe');
for (var i=0; i<frames.length; i++) {
    // prevent security access errors
    try {
        if(frames[i].contentWindow.$gwt_version) {
            gwtVersion = frames[i].contentWindow.$gwt_version;
            break;
        }
    }
    catch(e) {}
}
```

This is the mechanism I used to detect GWT apps in the [Library Detector Chrome Extension][3] ([Github](https://github.com/twistedpair/Library-Detector-for-Chrome)). Note the wrapping in a `try/catch`. This is because some iframes are cross domain and will throw a security exception if you try to access them.

 [1]: https://developers.google.com/web-toolkit/doc/latest/DevGuideCodingBasicsJSNI
 [2]: http://code.google.com/p/google-web-toolkit/source/browse/trunk/dev/core/src/com/google/gwt/dev/js/ast/JsRootScope.java?r=9287
 [3]: https://chrome.google.com/webstore/detail/library-detector/cgaocdmhkmfnkdkbnckgmpopcbpaaejo
