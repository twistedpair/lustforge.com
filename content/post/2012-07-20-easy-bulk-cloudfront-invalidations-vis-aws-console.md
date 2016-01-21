---
title: Easy Bulk CloudFront Invalidations vis AWS Console
author: Joe
layout: post
date: 2012-07-20
url: /2012/07/20/easy-bulk-cloudfront-invalidations-vis-aws-console/
categories:
  - Amazon Cloudfront
  - AWS

---
Google for invalidating a bunk of CloudFront files and you&#8217;ll find many utilities to help you, but did you know you can do it easily through the AWS Console?

Just visit **CloudFront > Distribution Settings > Invalidations > Create Invalidation**

Now provide the folder and wildcard to blow away a bunch of files!

> <pre>I.e. images/*</pre>

<span class="frame-outer  aligncenter size-full wp-image-77"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2012/07/Selection_0311.png"><img src="http://www.lustforge.com/wp-content/uploads/2012/07/Selection_0311.png" alt="" title="Selection_031" width="415" height="386" class="aligncenter size-full wp-image-77" srcset="https://lustforge.com/wp-content/uploads/2012/07/Selection_0311-300x279.png 300w, https://lustforge.com/wp-content/uploads/2012/07/Selection_0311.png 579w" sizes="(max-width: 579px) 100vw, 579px" /></a></span></span></span></span></span>

See, and you did not need to write a rate controlled script, pay a 3rd party monthly website, or enter your secret AWS credentials into some shady webapp!