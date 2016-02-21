---
title: Disable JavaScript validation in Eclipse
author: Joe
layout: post
date: 2013-04-07
url: /2013/04/07/disable-javascript-validation-in-eclipse/
categories:
  - Eclipse

---
Ever seen this gem before popup when working on a Google Web Toolkit project?

```bash
Errors running builder 'JavaScript Validator' on project 'com.your.project'.1"
```

Here is the trouble. Let&#8217;s say you&#8217;ve not marked your `target/` directory as `derived`, so that the GWT Eclipse plugin can launch DevMode from there. Since Eclipse can see these files, it will try to validate that compile, minified JS that GWT created and sometimes die. You don&#8217;t want this.

So, disable JS validation on your GWT project since the GWT Compiler will take care of that validation for you. Just visit:

**Window > Preferences&#8230; > JavaScript > Validator > Errors/Warnings** and uncheck the box.

{{< figure src="/img/disable_eclipse_js_validation.png" >}}