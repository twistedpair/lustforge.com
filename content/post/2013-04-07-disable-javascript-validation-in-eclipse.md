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

<pre><span style="color: #ff0000;">"Errors occurred during the build.</span>
<span style="color: #ff0000;"> Errors running builder 'JavaScript Validator' on project 'com.your.project'.1"</span></pre>

Here is the trouble. Let&#8217;s say you&#8217;ve not marked your _target/_ directory as derived, so that the GWT Eclipse plugin can launch DevMode from there. Since Eclipse can see these files, it will try to validate that compile, minified JS that GWT created and sometimes die. You don&#8217;t want this.

So, disable JS validation on your GWT project since the GWT Compiler will take care of that validation for you. Just visit:

**Window > Preferences&#8230; > JavaScript > Validator > Errors/Warnings** and uncheck the box.

<span class="frame-outer  aligncenter size-full wp-image-119"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2013/04/Selection_004.png"><img class="aligncenter size-full wp-image-119" alt="Selection_004" src="http://www.lustforge.com/wp-content/uploads/2013/04/Selection_004.png" width="415" height="353" srcset="https://lustforge.com/wp-content/uploads/2013/04/Selection_004-300x255.png 300w, https://lustforge.com/wp-content/uploads/2013/04/Selection_004.png 734w" sizes="(max-width: 734px) 100vw, 734px" /></a></span></span></span></span></span>