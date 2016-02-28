---
title: "Deploy Hugo Files to S3"
author: Joe
layout: post
date: 2016-02-28
url: /2016/02/28/deploy-hugo-files-to-s3/
tags:
  - Go
  - CloudFront
  - AWS
  - Hugo
---

We discussed AWS S3, CloudFront, and Route53 setup in the [previous post][10]. The last step is to deploy those files to S3 each time you've made new [Hugo][5] posts.

## Site Configuration
We're going to use SSL because [you can't trust anyone][1]. Make sure your site configuration uses **SSL**. I also found you need a **trailing slash**, or many templates create invalid URL's.

```yaml
# config.toml
baseurl = "https://yoursite.com/"
```


## Deployment

This really is the easy part. We'll:

1. Build a fresh copy of the blog
2. Sync all posts and files, ignoring duplicates in the `post` directory
3. Ensure they're marked as **public-read** so folks can read them
4. Use S3 encryption because we're paranoid, and it's free
4. Invalidate the root page, and page listings

```bash
set -e # Fail fast

DISTRIBUTION_ID=K823EJPPN4O2K9O
BUCKET_NAME=mysite.com-cdn

# Build a fresh copy
hugo -v 

# Copy over pages - not static js/img/css/downloads
aws s3 sync --acl "public-read" --sse "AES256" public/ s3://$BUCKET_NAME --exclude 'post'

# Invalidate root page and page listings
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths /index.html / /page/*
```

You can turn this into a sheel script like the one that [deploys this blog][2].

## Invalidation Costs

Note the CloudFront [invalidation pricing][6]. The first 1K files invalidated per month are free, but they are `¢0.5` there after, which could rack up if you were invalidating thousands of files.

This is why I'm only invalidating about 6 files above. Use unique asset names if they will change frequently, or [URL fingerprinting][3].


 [1]: https://en.wikipedia.org/wiki/Edward_Snowden#Technology_industry
 [2]: https://github.com/twistedpair/lustforge.com/blob/master/deploy_site.sh
 [3]: https://developers.google.com/speed/docs/insights/LeverageBrowserCaching
 [4]: https://aws.amazon.com/s3/
 [5]: https://gohugo.io/
 [6]: https://aws.amazon.com/cloudfront/pricing/#Request_Pricing_for_All_HTTP_Methods_(per_10,000)
 [11]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html
 [10]: {{< ref "post/2016-02-27-deploy-hugo-on-aws.md" >}} 
 
 