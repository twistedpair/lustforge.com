---
title: 'Caused by: java.lang.ClassNotFoundException: org.apache.ibatis.mapping.DatabaseIdProvider'
author: Joe
layout: post
date: 2013-07-27
url: /2013/07/27/caused-by-java-lang-classnotfoundexception-org-apache-ibatis-mapping-databaseidprovider/
categories:
  - Java
  - Spring

---
Perhaps you&#8217;ve had this trace recently while trying to get myBatis working on Spring:

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=132&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;"> Caused by: java.lang.ClassNotFoundException: org.apache.ibatis.mapping.DatabaseIdProvider
 at java.net.URLClassLoader&lt;span class="variable" style="color: #008080;">$1&lt;/span>.run(URLClassLoader.java:&lt;span class="number" style="color: #009999;">217&lt;/span>)
 at java.security.AccessController.&lt;span class="keyword" style="color: #333333; font-weight: bold;">do&lt;/span>Privileged(Native Method)
 at java.net.URLClassLoader.findClass(URLClassLoader.java:&lt;span class="number" style="color: #009999;">205&lt;/span>)
 at java.lang.ClassLoader.loadClass(ClassLoader.java:&lt;span class="number" style="color: #009999;">321&lt;/span>)
 at sun.misc.Launcher&lt;span class="variable" style="color: #008080;">$AppClassLoader&lt;/span>.loadClass(Launcher.java:&lt;span class="number" style="color: #009999;">294&lt;/span>)
 at java.lang.ClassLoader.loadClass(ClassLoader.java:&lt;span class="number" style="color: #009999;">266&lt;/span>)
 ... &lt;span class="number" style="color: #009999;">57&lt;/span> more
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj4gQ2F1c2VkIGJ5OiBqYXZhLmxhbmcuQ2xhc3NOb3RGb3VuZEV4Y2VwdGlvbjog b3JnLmFwYWNoZS5pYmF0aXMubWFwcGluZy5EYXRhYmFzZUlkUHJvdmlkZXI8YnI+IGF0IGphdmEu bmV0LlVSTENsYXNzTG9hZGVyJDEucnVuKFVSTENsYXNzTG9hZGVyLmphdmE6MjE3KTxicj4gYXQg amF2YS5zZWN1cml0eS5BY2Nlc3NDb250cm9sbGVyLmRvUHJpdmlsZWdlZChOYXRpdmUgTWV0aG9k KTxicj4gYXQgamF2YS5uZXQuVVJMQ2xhc3NMb2FkZXIuZmluZENsYXNzKFVSTENsYXNzTG9hZGVy LmphdmE6MjA1KTxicj4gYXQgamF2YS5sYW5nLkNsYXNzTG9hZGVyLmxvYWRDbGFzcyhDbGFzc0xv YWRlci5qYXZhOjMyMSk8YnI+IGF0IHN1bi5taXNjLkxhdW5jaGVyJEFwcENsYXNzTG9hZGVyLmxv YWRDbGFzcyhMYXVuY2hlci5qYXZhOjI5NCk8YnI+IGF0IGphdmEubGFuZy5DbGFzc0xvYWRlci5s b2FkQ2xhc3MoQ2xhc3NMb2FkZXIuamF2YToyNjYpPGJyPiAuLi4gNTcgbW9yZTxicj4gYGBg">
    ​
  </div>
</div>

It is the bane of open source. You can&#8217;t always depend on quality releases. Don&#8217;t worry, you followed the tutorial correctly. Let&#8217;s take a look at the package&#8217;s history in Maven Central.

<span class="frame-outer  aligncenter size-full wp-image-133"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2013/07/Selection_023.png"><img class="aligncenter size-full wp-image-133" src="http://www.lustforge.com/wp-content/uploads/2013/07/Selection_023.png" alt="Selection_023" width="415" height="140" srcset="https://lustforge.com/wp-content/uploads/2013/07/Selection_023-300x101.png 300w, https://lustforge.com/wp-content/uploads/2013/07/Selection_023.png 553w" sizes="(max-width: 553px) 100vw, 553px" /></a></span></span></span></span></span>

Maybe something is not quite right with 1.2.0? Let&#8217;s try using **1.1.1** instead.

Bingo! That did it. Just stay away from 1.2.0. Hope that helped someone.

But what else could we do to use the newer build? Just use the new dependency, which the project&#8217;s site sadly has incorrectly listed.

&nbsp;

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=132&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">
&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
 &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>org.mybatis&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
 &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>mybatis&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
 &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>3.2.2&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>
 &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:PHA+YGBgeG1sPC9wPjxwPiZsdDtkZXBlbmRlbmN5Jmd0Ozxicj4gJmx0O2dyb3VwSWQmZ3Q7b3Jn
Lm15YmF0aXMmbHQ7L2dyb3VwSWQmZ3Q7PGJyPiAmbHQ7YXJ0aWZhY3RJZCZndDtteWJhdGlzJmx0
Oy9hcnRpZmFjdElkJmd0Ozxicj4gJmx0O3ZlcnNpb24mZ3Q7PHN0cm9uZz4zLjIuMjwvc3Ryb25n
PiZsdDsvdmVyc2lvbiZndDs8YnI+ICZsdDsvZGVwZW5kZW5jeSZndDs8L3A+PHA+YGBgPC9wPg==">
    ​
  </div>
</div>

&nbsp;