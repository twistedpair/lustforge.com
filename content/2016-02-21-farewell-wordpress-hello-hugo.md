---
draft: false
title: Farewell WordPress, Hello Hugo! 
author: Joseph Lust
layout: post
date: 2016-02-21
url: /2016/02/21/farewell-wordpress-hello-hugo/
summary: Ditch the slow WordPress platform for high speed, static Hugo sites
tags:
  - Go
  - WordPress
  - CloudFront
  - AWS
  - Hugo
---

After nearly eight years on WordPress, I finally had enough. Why wait 5 seconds to load a page of 100% static content? Why use the slow and clunky WordPress UI to mangle new posts? And why pay a host [$299/yr][3] for your custom WordPress domain and theme? No sir. I had enough.

For years I worked on webapps where every facet was burnished to perfection. Dependencies were inlined, dead code elided, artifacts combined and compressed, and every millisecond of load time scrutinized. Blogging about such practices on a WP blog was always a comedic foil. I could go on ad nauseum disparaging WordPress and PHP, but I'll not. It is a tool that works well for many, providing them a functional presence online. WordPress simply didn't meet my needs.

Today **LustForge.com** now runs from [AWS CloudFront][1], backed by [S3][4], rather than [DreamHost LLC][2] where it lived since 2008. Instead of costing $119/yr, the blog now costs me `¢0.3/yr` in storage, and `¢12/yr` in bandwidth. If we count the domain, that's `$12.12/yr`. Not bad for a superior product, served from 45 edge nodes worldwide and backed with 11 nines durability. Read [the complete howto][6], order use my [AWS Blog Hosting Calculator][7] to see what your blog would cost to hose.

Farewell WordPress. Hello, [Hugo][5].

 [1]: https://aws.amazon.com/cloudfront/
 [2]: https://www.dreamhost.com/
 [3]: https://store.wordpress.com/plans/
 [4]: https://aws.amazon.com/s3/
 [5]: https://gohugo.io/
 [6]: {{< ref "2016-02-27-deploy-hugo-on-aws.md" >}}
 [7]: https://docs.google.com/spreadsheets/d/1-ymzKpTd6M1AYvTrfCGxEt5u6fr4zHim3tSqz1qk94c/edit?usp=sharing

 
