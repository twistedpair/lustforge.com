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
Just read [Good Relationships by Michael Hunger][1]. It was a great read to get up to speed on Spring Data Neo4J quickly, and also the only reference out there.

But, it requires you join InfoQ and give them your personal information to sell to whoever they please. No thanks.

<div id="attachment_110" style="width: 474px" class="wp-caption aligncenter">
  <span class="frame-outer  small size-full wp-image-110"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2013/03/Capture.png"><img class="size-full wp-image-110" alt="Login to our evil lair" src="http://www.lustforge.com/wp-content/uploads/2013/03/Capture.png" width="415" height="86" srcset="https://lustforge.com/wp-content/uploads/2013/03/Capture-300x62.png 300w, https://lustforge.com/wp-content/uploads/2013/03/Capture.png 464w" sizes="(max-width: 464px) 100vw, 464px" /></a>
  
  <p class="wp-caption-text">
    Login to our evil lair
  </p></span></span></span></span></span>
</div>

Well, let&#8217;s look at those links, what do they really do? Pop open the inspector and look at the link. We see that it calls _loginAndDisplayDownloadLink()_. Ok, so what is this function? Well, we can see it displays the content of _afterLogin_ once complete. So, what is in that element? Oh, I see, the download links!

<span class="frame-outer  aligncenter size-full wp-image-111"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2013/03/Capture2.png"><img class="aligncenter size-full wp-image-111" alt="Capture2" src="http://www.lustforge.com/wp-content/uploads/2013/03/Capture2.png" width="415" height="235" /></a></span></span></span></span></span>

A crappy website, right? Why manage sessions and login state when you can just have a form post away user information from the page and reveal what was always there? Understandably a lower overhead implementation, but not secure by any measure.

So, to get the links, just run this on the page: _document.getElementById(&#8216;afterLogin&#8217;).style.display = &#8216;block&#8217;_

Or use the download links, since the are in a publicly accessible page after all 😉

  * <span style="line-height: 13px;"><a href="http://www.infoq.com/resource/minibooks/good-relationships-spring-data/en/pdf/GoodRelationships-Neo4J-MichaelHunger.pdf">PDF</a> (128MB!) &#8211; Update: this file appears to be the only secured file</span>
  * [ePub][2]
  * [mobi][3]

Of course, this is quite common since [MicroSoft Does it Too][4].

 [1]: http://www.infoq.com/minibooks/good-relationships-spring-data
 [2]: http://www.infoq.com/resource/minibooks/good-relationships-spring-data/en/epub/Good-Relationships-Neo4j.epub
 [3]: http://www.infoq.com/resource/minibooks/good-relationships-spring-data/en/mobi/9781105065569.mobi
 [4]: http://www.lustforge.com/2011/07/02/windows-downloads-without-windows-genuine-advantage/