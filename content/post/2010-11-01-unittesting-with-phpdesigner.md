---
title: Unittesting with PhpDesigner and SimpleTest
author: Joe
layout: post
date: 2010-11-01
url: /2010/11/01/unittesting-with-phpdesigner/
categories:
  - PHP
tags:
  - PHP

---
Here is how to unitest within PhpDesigner. The following was done on a Windows 7 machine with PhpDesigner 7.2.

1. Install <a title="Download WAMP" href="http://www.wampserver.com/en/download.php" target="_blank">WAMP server</a> on your windows machine. This is needed because the default PhpDesigner PHP engine cannot connect to databases (i.e. MySQL).

  * Just use the default installer setup and location
  * We&#8217;ll assume your WAMP is installed in **c:\wamp**

2. Now point your PhpDesigner at the WAMP.

  * PhpDesigner > Tools > Preferences&#8230;
  * Set the _Debugger_ to use the _PHP Interpreter_ your **c:\wamp\bin\php\php5.3.0\php-cgi.exe** and the init file **c:\WAMP\bin\php\php5.3.0\php.ini**
<li style="list-style-type: none;">
  <span class="frame-outer  alignnone size-full wp-image-17"><span><span><span><span><a href="../wp-content/uploads/2010/10/phpd_phpengine1.png"><img class="alignnone size-full wp-image-17" title="Update Debugger Settings" src="../wp-content/uploads/2010/10/phpd_phpengine1_sm.png" alt="" width="300" height="219" /></a></span></span></span></span></span>
</li>
  * Set the _Syntax Checker_ to use the above values too
<li style="list-style-type: none;">
  <span class="frame-outer  alignnone size-full wp-image-15"><span><span><span><span><a href="../wp-content/uploads/2010/10/phpd_phpengine2.png"><img class="alignnone size-full wp-image-15" title="Update Syntax Checker Settings" src="../wp-content/uploads/2010/10/phpd_phpengine2_sm.png" alt="" width="300" height="219" /></a></span></span></span></span></span>
</li>
  * Set _Run_ to use the above values too
<li style="list-style-type: none;">
  <span class="frame-outer  alignnone size-full wp-image-13"><span><span><span><span><a href="../wp-content/uploads/2010/10/phpd_phpengine3.png"><img class="alignnone size-full wp-image-13" title="Update Run Settings" src="../wp-content/uploads/2010/10/phpd_phpengine3_sm.png" alt="" width="300" height="219" /></a></span></span></span></span></span>
</li>
  * Point your _Localhost_ folder to the WAMP localhost c:\wamp\www\
<li style="list-style-type: none;">
  <span class="frame-outer  alignnone size-full wp-image-11"><span><span><span><span><a href="../wp-content/uploads/2010/10/phpd_phpengine4.png"><img class="alignnone size-full wp-image-11" title="Update Localhost Settings" src="../wp-content/uploads/2010/10/phpd_phpengine4_sm.png" alt="" width="300" height="219" /></a></span></span></span></span></span>
</li>
  * Restart your PhpDesigner installation

3. Now download and install the <a title="Download SimpleTest" href="http://www.simpletest.org/en/download.html" target="_blank">SimpleTest </a>unittesting framework

  * Just download the files (**1.0.1 recommended**, I could not get 1.1 released 2 days ago to run)
  * Unzip the files to the location of your PHP project

4. Create a helloworld test and run it from the comfort of PhpDesginer!

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=8&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-php" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="preprocessor" style="color: rgb(153, 153, 153); font-weight: bold;">&lt;?php&lt;/span>
&lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// hide warnings from  SimpleTest 1.0.1&lt;/span>
&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">require_once&lt;/span>(dirname(__FILE__).&lt;span class="string" style="color: rgb(221, 17, 68);">'/error_suppress.inc'&lt;/span>);
&lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// autorun this test&lt;br /&gt;&lt;/span>
&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">require_once&lt;/span>(dirname(__FILE__).&lt;span class="string" style="color: rgb(221, 17, 68);">'/simpletest/autorun.php'&lt;/span>);
&lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// test all harvesters&lt;/span>
&lt;span class="class" style="color: rgb(68, 85, 136); font-weight: bold;">&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">class&lt;/span> &lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(68, 85, 136); font-weight: bold;">TestOfHelloWorld&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">extends&lt;/span> &lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(68, 85, 136); font-weight: bold;">UnitTestCase&lt;/span> {&lt;/span>
 &lt;span class="function">&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">function&lt;/span> &lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;">testHelloWorld&lt;/span>&lt;span class="params">()&lt;/span>   {&lt;/span>
 &lt;span class="variable" style="color: rgb(0, 128, 128);">$this&lt;/span>-&gt;assertEqual( &lt;span class="number" style="color: rgb(0, 153, 153);">4&lt;/span>, &lt;span class="number" style="color: rgb(0, 153, 153);">4&lt;/span>, &lt;span class="string" style="color: rgb(221, 17, 68);">'Numbers do not match'&lt;/span>);
 }
}
&lt;span class="preprocessor" style="color: rgb(153, 153, 153); font-weight: bold;">?&gt;&lt;/span>
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgcGhwPGJyPiZsdDs/cGhwPGJyPi8vIGhpZGUgd2FybmluZ3MgZnJvbcKgIFNpbXBsZVRlc3Qg
MS4wLjE8YnI+cmVxdWlyZV9vbmNlKGRpcm5hbWUoX19GSUxFX18pLicvZXJyb3Jfc3VwcHJlc3Mu
aW5jJyk7PGJyPi8vIGF1dG9ydW4gdGhpcyB0ZXN0Jmx0O2JyIC8mZ3Q7PGJyPnJlcXVpcmVfb25j
ZShkaXJuYW1lKF9fRklMRV9fKS4nL3NpbXBsZXRlc3QvYXV0b3J1bi5waHAnKTs8YnI+Ly8gdGVz
dCBhbGwgaGFydmVzdGVyczxicj5jbGFzcyBUZXN0T2ZIZWxsb1dvcmxkIGV4dGVuZHMgVW5pdFRl
c3RDYXNlIHs8YnI+IGZ1bmN0aW9uIHRlc3RIZWxsb1dvcmxkKCnCoMKgIHs8YnI+ICR0aGlzLSZn
dDthc3NlcnRFcXVhbCggNCwgNCwgJ051bWJlcnMgZG8gbm90IG1hdGNoJyk7PGJyPiB9PGJyPn08
YnI+PyZndDs8YnI+YGBg">
    ​
  </div>
</div>

  * Note I&#8217;ve made a PHP file to hide Warnings from SimpleTest 1.0.1

error_suppress.php

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=8&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-php" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="preprocessor" style="color: #999999; font-weight: bold;">&lt;?php&lt;/span>
&lt;span class="comment" style="color: #999988; font-style: italic;">//Include this to override some common warnings when running SimpleTest in PhpDesigner&lt;/span>
error_reporting(E_ALL &amp; ~E_DEPRECATED);&lt;span class="comment" style="color: #999988; font-style: italic;">// surpress dep errors - using old testing scripts&lt;/span>
date_default_timezone_set(&lt;span class="string" style="color: #dd1144;">'US/Eastern'&lt;/span>);       &lt;span class="comment" style="color: #999988; font-style: italic;">// suppress errors of unset timezone&lt;/p&gt;&lt;/span>
&lt;span class="preprocessor" style="color: #999999; font-weight: bold;">?&gt;&lt;/span>
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgcGhwPGJyPiZsdDs/cGhwPGJyPi8vSW5jbHVkZSB0aGlzIHRvIG92ZXJyaWRlIHNvbWUgY29t
bW9uIHdhcm5pbmdzIHdoZW4gcnVubmluZyBTaW1wbGVUZXN0IGluIFBocERlc2lnbmVyPGJyPmVy
cm9yX3JlcG9ydGluZyhFX0FMTCAmYW1wO2FtcDsgfkVfREVQUkVDQVRFRCk7Ly8gc3VycHJlc3Mg
ZGVwIGVycm9ycyAtIHVzaW5nIG9sZCB0ZXN0aW5nIHNjcmlwdHM8YnI+ZGF0ZV9kZWZhdWx0X3Rp
bWV6b25lX3NldCgnVVMvRWFzdGVybicpO8KgwqDCoMKgwqDCoCAvLyBzdXBwcmVzcyBlcnJvcnMg
b2YgdW5zZXQgdGltZXpvbmUmbHQ7L3AmZ3Q7PGJyPj8mZ3Q7PGJyPmBgYA==">
    ​
  </div>
</div>

  * Click **Run** and look for the green lights! 
    <pre><span class="frame-outer  alignnone size-full wp-image-19"><span><span><span><span><a href="../wp-content/uploads/2010/11/phpd_phpengine6.png"><img class="alignnone size-full wp-image-19" title="Click Run" src="../wp-content/uploads/2010/11/phpd_phpengine6_sm.png" alt="" width="300" height="159" /></a></span></span></span></span></span></pre>

Note: If you are a Dreamhost user (like me)

  * For database unittests, you&#8217;ll need to open an external IP on your database
  * Login to panel.dreamhost.com for your account
  * Click Goodies >MySQL Databases [on left]
  * Click on the name of your database user [in &#8220;Users with Access&#8221; column]
  * Copy your local computer&#8217;s IP address to the list of allowed address and click &#8220;Modify&#8221;
<li style="list-style-type: none;">
  <span class="frame-outer  alignnone size-full wp-image-9"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2010/10/phpd_phpengine5.png"><img class="alignnone size-full wp-image-9"  title="Setup Dreamhost Database External Access" src="http://www.lustforge.com/wp-content/uploads/2010/10/phpd_phpengine5_sm.png" alt="" width="300" height="252" /></a></span></span></span></span></span>
</li>