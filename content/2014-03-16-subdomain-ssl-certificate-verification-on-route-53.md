---
title: Subdomain SSL Certificate Verification on Route 53
author: Joseph Lust
layout: post
date: 2014-03-16
url: /2014/03/16/subdomain-ssl-certificate-verification-on-route-53/
tags:
  - Amazon S3

---
### Sadly a GoDaddy User

I use GoDaddy for a few domains and some SSL. Every time I need to set something up, it is like pulling teeth. First you&#8217;ve got to get through four layers of sales pitches, cross sells, and upsells. Then you finally get to the admin UI&#8217;s. Not the UI, the UI&#8217;s. Each one of them appears to have been designed by team with a different design philosophy. To boot the doc&#8217;s appear to have been written by someone that never actual used the UI they&#8217;re prescribing the use of.

### SSL Domain Verification

Here&#8217;s the problem. You&#8217;ve got 2 domains to issue SSL certificates on. Let&#8217;s say

  * foo.com
  * staging.foo.com

According to the doc&#8217;s you need to put a TXT record on &#8220;dzc.&#8221; + your domain. OK, so that would be

  * dzc.foo.com TXT=&#8221;fooVal1&#8243;
  * dzc.staging.foo.com TXT=&#8221;fooVal2&#8243;

Great, looks good. What? Why is it that only one SSL domain is validated and the cert issued? We&#8217;ll, it&#8217;s your fault for [following the directions](http://support.godaddy.com/help/article/4678/creating-a-txt-record-for-ssl-validation?locale=en).

The rub is that **all subdomain TXT values must be placed on the root domain**. Awesome. Does everyone in control of a subdomain have control of the root? Certainly not. Hopefully you learned this by trial and error.

### Hope it Helps

I&#8217;ve jotted down these little ditties as time and time again, I have to experiment with GoDaddy settings as following them to the letter rarely works. GoDaddy, please read your own docs!
