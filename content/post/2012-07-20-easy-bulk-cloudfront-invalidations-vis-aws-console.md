---
title: Easy Bulk CloudFront Invalidations vis AWS Console
author: Joe
layout: post
date: 2012-07-20
url: /2012/07/20/easy-bulk-cloudfront-invalidations-vis-aws-console/
tags:
  - Amazon Cloudfront
  - AWS

---
Google for invalidating a bunk of CloudFront files and you&#8217;ll find many utilities to help you, but did you know you can do it easily through the AWS Console?

Just visit **CloudFront > Distribution Settings > Invalidations > Create Invalidation**

Now provide the folder and wildcard to blow away a bunch of files!

```bash
i.e. images/*
```

{{< figure src="/img/cloudfront_invalidations.png" >}}

See, and you did not need to write a rate controlled script, pay a 3rd party monthly website, or enter your secret AWS credentials into some shady webapp!