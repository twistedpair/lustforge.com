---
title: Never Use Glassdoor From Work
author: Joe
layout: post
date: 2014-11-02
url: /2014/11/02/never-user-glassdoor-from-work/
categories:
  - Public Service Announcement

---
### Asymmetric Information

<div id="attachment_196" style="width: 316px" class="wp-caption alignright">
  <span class="frame-outer  small wp-image-196 size-full"><span><span><span><span><a href="https://lustforge.com/wp-content/uploads/2014/11/whereIsTheSSL.png"><img class="wp-image-196 size-full" src="https://lustforge.com/wp-content/uploads/2014/11/whereIsTheSSL.png" alt="whereIsTheSSL" width="306" height="81" srcset="https://lustforge.com/wp-content/uploads/2014/11/whereIsTheSSL-300x79.png 300w, https://lustforge.com/wp-content/uploads/2014/11/whereIsTheSSL.png 306w" sizes="(max-width: 306px) 100vw, 306px" /></a>
  
  <p class="wp-caption-text">
    Can you find the SSL in this URL? Hint, you won&#8217;t.
  </p></span></span></span></span></span>
</div>

Glassdoor is a great idea. Add transparency to the job market by making salaries, interview details, and internal company reviews public. This is information that employers intensely attempt to keep private, despite its dissemination being totally legal. One trick many companies use is telling you that you cannot do something that you legally can do. For example, saying a user cannot do something in the Terms of Service, despite the courts ruling <a href="http://www.wsgr.com/WSGR/Display.aspx?SectionName=publications/PDFSearch/wsgralert-barnes-noble.htm" target="_blank">ToS unenforceable</a>. Or, at bonus and raise time, telling employees that they cannot discuss their pay, even though the <a href="http://www.twc.state.tx.us/news/efte/salary_discussions.html" target="_blank">courts have declared employers cannot take recourse to prevent salaries discussions</a>.

Glassdoor breaches this carefully crafted bastion of asymmetric information wide open. However, they allow **fail to use SSL on the site**! That&#8217;s right, when you look around for a new job, perusing salaries, or when you write up a review that&#8217;s brutally honest about your firm, Glassdoor sends those cookies and content around the corporate network with no encryption at all.

### Malicious or Stupid?

SSL used to be complicated, a decade ago. Welcome to the 21st century. Your Facebook posts, Tweets, and cat videos are all protected by encryption, but your clandestine Glassdoor interactions are not. I&#8217;ve twice written their engineering team about it to only be brushed off. Despite Snowden revealing that everyone is listening to the wire, Glassdoor does not make any attempt to protect that information. However, it&#8217;s not a foreign government you have to fear as many employers are using network appliances to monitor packets. I&#8217;ve no doubt a vendor presently let&#8217;s you run a report of who has been posting to Glassdoor from within the network, and given the unsecured cookies, they could easily peruse the site as that employee, discovering everything posted from their account. This might sound far fetched, but employers have long been using <a href="http://beta.slashdot.org/story/199007" target="_blank">automated MITM attacks to intercept employee traffic</a>.

Of note, Glassdoor runs off CloudFlare. CloudFlare makes SSL trivial to enable, but that would mean that Glassdoor couldn&#8217;t use the FREE account. That&#8217;s right, Glassdoor would actually have to pay money to run a site that sells advertising and job postings. What a horrible pain to endure. Think of the Subway sandwich worth of SSL fees they would rack up each day.

### Browse Securely

Until the IT team at Glassdoor decides to spend a few dollars a to implement SSL like everyone else in the industry, make sure you stay away from the site on any shared or corporate link, unless you want to let your benevolent HR department know your deepest thoughts about them.

&nbsp;