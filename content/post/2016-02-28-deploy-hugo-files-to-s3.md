---
title: "Deploy Hugo Files to S3"
author: Joseph Lust
layout: post
date: 2016-02-28
url: /2016/02/28/deploy-hugo-files-to-s3/
summary: Easily deploy your Hugo static website on S3 with AWS CLI
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

Note the CloudFront [invalidation pricing][6]. An `InvalidationRequest` is when you ask to purge the cache for a given path. 

Some examples include:

- purge one file using `/blah/file.txt`
- purge all files at a path using `/blah/*`
- purge everything using `/*`

Though these may purge from one to thousands of files, each counts as a **single invalidation request**. The first 1K monthly requests are free, but they are `¢0.5` there after, which could rack up if you were invalidating thousands of files individually, or redeploying with a commit hook frequently.

While you could always invalidate the entire distribution with `/*`, this will force all 50 worldwide edge locations to reload every file for you site on the next visit ("cache miss"), defeating the purpose of your CDN. As such, it's often better to invalidate just the affected files, as long as there are not many. This is why I'm only invalidating about 6 files above.

Alternatively, use unique asset names if they will change frequently, or [URL fingerprinting][3] and you won't ever need to invalidate.


 [1]: https://en.wikipedia.org/wiki/Edward_Snowden#Technology_industry
 [2]: https://github.com/twistedpair/lustforge.com/blob/master/deploy_site.sh
 [3]: https://developers.google.com/speed/docs/insights/LeverageBrowserCaching
 [4]: https://aws.amazon.com/s3/
 [5]: https://gohugo.io/
 [6]: https://aws.amazon.com/cloudfront/pricing/#Request_Pricing_for_All_HTTP_Methods_(per_10,000)
 [11]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html
 [10]: {{< ref "2016-02-27-deploy-hugo-on-aws.md" >}} 
 
 
