---
title: Download InfoQ Books and PDFs without Login
author: Joe
layout: post
date: 2013-02-27
url: /2013/02/27/download-infoq-books-and-pdfs-without-login/
categories:
  - Hidden in plain Site
  - 'Tips &amp; Tricks'

---
I just read [Good Relationships][1] by Michael Hunger. It was a great read to get up to speed on Spring Data Neo4J quickly, and also the only reference out there.

But, it requires you join InfoQ and give them your personal information to sell to whoever they please. No thanks.

{{< figure src="/img/infoq_login.png" >}}

Well, let&#8217;s look at those links, what do they really do? Pop open the inspector and look at the link. We see that it calls `loginAndDisplayDownloadLink()`. Ok, so what is this function? Well, we can see it displays the content of `afterLogin` once complete. So, what is in that element? Oh, I see, the download links!

{{< figure src="/img/infoq_login_js.png" >}}

A crappy website, right? Why manage sessions and login state when you can just have a form post away user information from the page and reveal what was always there? Understandably a lower overhead implementation, but not secure by any measure.

So, to get the links, just run this on the page:

```javascript
document.getElementById(‘afterLogin’).style.display = ‘block’
```

Or use the download links, since the are in a publicly accessible page after all 😉

  * <span style="line-height: 13px;"><a href="http://www.infoq.com/resource/minibooks/good-relationships-spring-data/en/pdf/GoodRelationships-Neo4J-MichaelHunger.pdf">PDF</a> (128MB!) &#8211; Update: this file appears to be the only secured file</span>
  * [ePub][2]
  * [mobi][3]

Of course, this is quite common since [MicroSoft Does it Too](http://www.lustforge.com/2011/07/02/windows-downloads-without-windows-genuine-advantage/).

## UPDATE:
The above links are now dead due to a rework of InfoQ. It was great while it lasted.

 [1]: http://www.infoq.com/minibooks/good-relationships-spring-data
 [2]: http://www.infoq.com/resource/minibooks/good-relationships-spring-data/en/epub/Good-Relationships-Neo4j.epub
 [3]: http://www.infoq.com/resource/minibooks/good-relationships-spring-data/en/mobi/9781105065569.mobi
 
 