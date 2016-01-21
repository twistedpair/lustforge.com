---
title: Spring’s RememberMe and BadCredentialsException
author: Joe
layout: post
date: 2012-10-17
url: /2012/10/17/springs-rememberme-and-badcredentialsexception/
categories:
  - Java
  - Spring

---
Spring is pretty swell, but the documentation is never what you need. It would be like reading an anatomy book about every organ in the body, but never being shown a picture of all of them together, and then trying to conduct a surgery.

I was assembling Spring Security for a rewrite of [RunPartner.com][1] and read the <a title="Read more" href="http://static.springsource.org/spring-security/site/docs/3.0.x/reference/remember-me.html" target="_blank">RememberMe chapter of Spring Security</a>.

They first show a trivial case. As is often the case, this is too trivial a case to be of much use.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=91&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">http&lt;/span>&gt;&lt;/span>
    ...
    &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">remember-me&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">key&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"myAppKey"&lt;/span>/&gt;&lt;/span>
&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;/&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">http&lt;/span>&gt;&lt;/span>
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgeG1sPGJyPiZsdDtodHRwJmd0Ozxicj4gICAgLi4uPGJyPiAgICAmbHQ7cmVtZW1iZXItbWUg
a2V5PSJteUFwcEtleSIvJmd0Ozxicj4mbHQ7L2h0dHAmZ3Q7PGJyPmBgYA==">
    ​
  </div>
</div>

Because I needed a database backed implementation, so I liked the next example.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=91&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">bean&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">id&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"rememberMeFilter"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">class&lt;/span>=
 "&lt;span class="attribute" style="color: rgb(0, 128, 128);">org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationFilter&lt;/span>"&gt;&lt;/span>
  &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">property&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">name&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"rememberMeServices"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">ref&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"rememberMeServices"&lt;/span>/&gt;&lt;/span>
  &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">property&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">name&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"authenticationManager"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">ref&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"theAuthenticationManager"&lt;/span> /&gt;&lt;/span>
&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;/&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">bean&lt;/span>&gt;&lt;/span>

&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">bean&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">id&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"rememberMeServices"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">class&lt;/span>=
 "&lt;span class="attribute" style="color: rgb(0, 128, 128);">org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices&lt;/span>"&gt;&lt;/span>
  &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">property&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">name&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"userDetailsService"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">ref&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"myUserDetailsService"&lt;/span>/&gt;&lt;/span>
  &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">property&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">name&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"key"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">value&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"springRocks"&lt;/span>/&gt;&lt;/span>
&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;/&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">bean&lt;/span>&gt;&lt;/span>

&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">bean&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">id&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"rememberMeAuthenticationProvider"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">class&lt;/span>=
 "&lt;span class="attribute" style="color: rgb(0, 128, 128);">org.springframework.security.authentication.rememberme.RememberMeAuthenticationProvider&lt;/span>"&gt;&lt;/span>
  &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">property&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">name&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"key"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">value&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"springRocks"&lt;/span>/&gt;&lt;/span>
&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;/&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">bean&lt;/span>&gt;&lt;/span>
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgeG1sPGJyPiZsdDtiZWFuIGlkPSJyZW1lbWJlck1lRmlsdGVyIiBjbGFzcz08YnI+ICJvcmcu
c3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LndlYi5hdXRoZW50aWNhdGlvbi5yZW1lbWJlcm1lLlJl
bWVtYmVyTWVBdXRoZW50aWNhdGlvbkZpbHRlciImZ3Q7PGJyPiAgJmx0O3Byb3BlcnR5IG5hbWU9
InJlbWVtYmVyTWVTZXJ2aWNlcyIgcmVmPSJyZW1lbWJlck1lU2VydmljZXMiLyZndDs8YnI+ICAm
bHQ7cHJvcGVydHkgbmFtZT0iYXV0aGVudGljYXRpb25NYW5hZ2VyIiByZWY9InRoZUF1dGhlbnRp
Y2F0aW9uTWFuYWdlciIgLyZndDs8YnI+Jmx0Oy9iZWFuJmd0Ozxicj48YnI+Jmx0O2JlYW4gaWQ9
InJlbWVtYmVyTWVTZXJ2aWNlcyIgY2xhc3M9PGJyPiAib3JnLnNwcmluZ2ZyYW1ld29yay5zZWN1
cml0eS53ZWIuYXV0aGVudGljYXRpb24ucmVtZW1iZXJtZS5Ub2tlbkJhc2VkUmVtZW1iZXJNZVNl
cnZpY2VzIiZndDs8YnI+ICAmbHQ7cHJvcGVydHkgbmFtZT0idXNlckRldGFpbHNTZXJ2aWNlIiBy
ZWY9Im15VXNlckRldGFpbHNTZXJ2aWNlIi8mZ3Q7PGJyPiAgJmx0O3Byb3BlcnR5IG5hbWU9Imtl
eSIgdmFsdWU9InNwcmluZ1JvY2tzIi8mZ3Q7PGJyPiZsdDsvYmVhbiZndDs8YnI+PGJyPiZsdDti
ZWFuIGlkPSJyZW1lbWJlck1lQXV0aGVudGljYXRpb25Qcm92aWRlciIgY2xhc3M9PGJyPiAib3Jn
LnNwcmluZ2ZyYW1ld29yay5zZWN1cml0eS5hdXRoZW50aWNhdGlvbi5yZW1lbWJlcm1lLlJlbWVt
YmVyTWVBdXRoZW50aWNhdGlvblByb3ZpZGVyIiZndDs8YnI+ICAmbHQ7cHJvcGVydHkgbmFtZT0i
a2V5IiB2YWx1ZT0ic3ByaW5nUm9ja3MiLyZndDs8YnI+Jmx0Oy9iZWFuJmd0Ozxicj5gYGA=">
    ​
  </div>
</div>

But there is a lot of cruft there you don&#8217;t need, and I wanted a different cookie TTL and cookie name. So I used the below, which _seemed_ to work.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=91&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">http&lt;/span>&gt;&lt;/span>
    ...
    &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">remember-me&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">services-ref&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"rememberMeServices"&lt;/span>/&gt;&lt;/span>
&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;/&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">http&lt;/span>&gt;&lt;/span>
&lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">&lt;!-- Handles auto login from remember me token --&gt;&lt;/span>
&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">beans:bean&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">id&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"rememberMeServices"&lt;/span>
    &lt;span class="attribute" style="color: rgb(0, 128, 128);">class&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices"&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">beans:property&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">name&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"userDetailsService"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">ref&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"userService"&lt;/span> /&gt;&lt;/span>
    &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">beans:property&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">name&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"key"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">value&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"secretKey"&lt;/span> /&gt;&lt;/span>
    &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">beans:property&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">name&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"cookieName"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">value&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"customRememberName"&lt;/span> /&gt;&lt;/span>
    &lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">beans:property&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">name&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"tokenValiditySeconds"&lt;/span> &lt;span class="attribute" style="color: rgb(0, 128, 128);">value&lt;/span>=&lt;span class="value" style="color: rgb(221, 17, 68);">"604800"&lt;/span> /&gt;&lt;/span>
&lt;span class="tag" style="color: rgb(0, 0, 128); font-weight: normal;">&lt;/&lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(0, 0, 128); font-weight: normal;">beans:bean&lt;/span>&gt;&lt;/span>
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgeG1sPGJyPiZsdDtodHRwJmd0Ozxicj4JLi4uPGJyPgkmbHQ7cmVtZW1iZXItbWUgc2Vydmlj
ZXMtcmVmPSJyZW1lbWJlck1lU2VydmljZXMiLyZndDs8YnI+Jmx0Oy9odHRwJmd0Ozxicj4mbHQ7
IS0tIEhhbmRsZXMgYXV0byBsb2dpbiBmcm9tIHJlbWVtYmVyIG1lIHRva2VuIC0tJmd0Ozxicj4m
bHQ7YmVhbnM6YmVhbiBpZD0icmVtZW1iZXJNZVNlcnZpY2VzIjxicj4JY2xhc3M9Im9yZy5zcHJp
bmdmcmFtZXdvcmsuc2VjdXJpdHkud2ViLmF1dGhlbnRpY2F0aW9uLnJlbWVtYmVybWUuVG9rZW5C
YXNlZFJlbWVtYmVyTWVTZXJ2aWNlcyImZ3Q7PGJyPgkmbHQ7YmVhbnM6cHJvcGVydHkgbmFtZT0i
dXNlckRldGFpbHNTZXJ2aWNlIiByZWY9InVzZXJTZXJ2aWNlIiAvJmd0Ozxicj4JJmx0O2JlYW5z
OnByb3BlcnR5IG5hbWU9ImtleSIgdmFsdWU9InNlY3JldEtleSIgLyZndDs8YnI+CSZsdDtiZWFu
czpwcm9wZXJ0eSBuYW1lPSJjb29raWVOYW1lIiB2YWx1ZT0iY3VzdG9tUmVtZW1iZXJOYW1lIiAv
Jmd0Ozxicj4JJmx0O2JlYW5zOnByb3BlcnR5IG5hbWU9InRva2VuVmFsaWRpdHlTZWNvbmRzIiB2
YWx1ZT0iNjA0ODAwIiAvJmd0Ozxicj4mbHQ7L2JlYW5zOmJlYW4mZ3Q7PGJyPmBgYA==">
    ​
  </div>
</div>

Yet an enigma ensued. No stack traces would enlighten me, but when I tried deleting the JSESSIONID to trigger auto login, I kept being returned to the login page. After setting many breakpoints, and walking through the spring code, I discovered that _there were two keys being set_ and the curious **BadCredentialsException** exception being thrown and caught, silently. Shhh. A quick Google search and <a href="http://forum.springsource.org/showthread.php?76606-might-Remember-Me-bug-for-rememver-user-and-concurrent-session/page2" target="_blank">forum post</a> were not helpful.

This is the trouble with <span style="text-decoration: underline;">automagical</span> areas of Spring. If they don&#8217;t work out of the box, you&#8217;d better be shovel ready to analyze some sources. The offending comparison takes place in the following method or _org.springframework.security.authentication.RememberMeAuthenticationProvider_:

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=91&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-java" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> Authentication authenticate(Authentication authentication) &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">throws&lt;/span> AuthenticationException {
    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">if&lt;/span> (!supports(authentication.getClass())) {
        &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">return&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">null&lt;/span>;
    }

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">if&lt;/span> (this.key.hashCode() != ((RememberMeAuthenticationToken) authentication).getKeyHash()) {
        &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">throw&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">new&lt;/span> BadCredentialsException(messages.getMessage(&lt;span class="string" style="color: rgb(221, 17, 68);">"RememberMeAuthenticationProvider.incorrectKey"&lt;/span>,
                &lt;span class="string" style="color: rgb(221, 17, 68);">"The presented RememberMeAuthenticationToken does not contain the expected key"&lt;/span>));
    }

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">return&lt;/span> authentication;
}
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgamF2YTxicj5wdWJsaWMgQXV0aGVudGljYXRpb24gYXV0aGVudGljYXRlKEF1dGhlbnRpY2F0
aW9uIGF1dGhlbnRpY2F0aW9uKSB0aHJvd3MgQXV0aGVudGljYXRpb25FeGNlcHRpb24gezxicj4J
aWYgKCFzdXBwb3J0cyhhdXRoZW50aWNhdGlvbi5nZXRDbGFzcygpKSkgezxicj4JCXJldHVybiBu
dWxsOzxicj4JfTxicj48YnI+CWlmICh0aGlzLmtleS5oYXNoQ29kZSgpICE9ICgoUmVtZW1iZXJN
ZUF1dGhlbnRpY2F0aW9uVG9rZW4pIGF1dGhlbnRpY2F0aW9uKS5nZXRLZXlIYXNoKCkpIHs8YnI+
CQl0aHJvdyBuZXcgQmFkQ3JlZGVudGlhbHNFeGNlcHRpb24obWVzc2FnZXMuZ2V0TWVzc2FnZSgi
UmVtZW1iZXJNZUF1dGhlbnRpY2F0aW9uUHJvdmlkZXIuaW5jb3JyZWN0S2V5Iiw8YnI+CQkJCSJU
aGUgcHJlc2VudGVkIFJlbWVtYmVyTWVBdXRoZW50aWNhdGlvblRva2VuIGRvZXMgbm90IGNvbnRh
aW4gdGhlIGV4cGVjdGVkIGtleSIpKTs8YnI+CX08YnI+PGJyPglyZXR1cm4gYXV0aGVudGljYXRp
b247PGJyPn08YnI+YGBg">
    ​
  </div>
</div>

# The Fix

**The Spring RememberMe docs don&#8217;t tell you, but you must set the key in both the TokenBasedRememberMeServices bean and in the tag.**

Make sure you define the same key in both places. Update the first tag to be as below to work with my code segment:

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=91&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">http&lt;/span>&gt;&lt;/span>
    ...
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">remember-me&lt;/span> &lt;span class="attribute" style="color: #008080;">services-ref&lt;/span>=&lt;span class="value" style="color: #dd1144;">"rememberMeServices"&lt;/span> &lt;span class="attribute" style="color: #008080;">key&lt;/span>=&lt;span class="value" style="color: #dd1144;">"secretKey"&lt;/span>/&gt;&lt;/span>
&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">http&lt;/span>&gt;&lt;/span>
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgeG1sPGJyPiZsdDtodHRwJmd0Ozxicj4JLi4uPGJyPgkmbHQ7cmVtZW1iZXItbWUgc2Vydmlj
ZXMtcmVmPSJyZW1lbWJlck1lU2VydmljZXMiIGtleT0ic2VjcmV0S2V5Ii8mZ3Q7PGJyPiZsdDsv
aHR0cCZndDs8YnI+YGBg">
    ​
  </div>
</div>

That was easy, but not as easy as a complete, realistic, production RememberMe example on the Spring docs would have been. <img src="https://lustforge.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

 [1]: http://www.runpartner.com