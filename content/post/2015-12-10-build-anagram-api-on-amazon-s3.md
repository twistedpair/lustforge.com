---
draft: true
title: Build an Anagram API on Amazon S3
author: Joseph Lust
layout: post
date: 2015-12-10
url: /2015/12/10/build-anagram-api-on-amazon-s3/
tags:
  - AWS
  - S3
  - Lambda
---

1. Download words from Princeton's WordNet
https://wordnet.princeton.edu/wordnet/download/standoff/
http://wordnetcode.princeton.edu/2.1/

2. Parse word data and build Index
3. Push index to S3
4. Configure CloudFront
5. Simple front end with Lambda/APIG

6. Add 404 catch all

7. Add custom domain for vanity - https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html





Make uploader parallel http://ls.pwd.io/2013/06/parallel-s3-uploads-using-boto-and-threads-in-python/

Wire up to Lambda for redirect:

Examples of APIG redirect, without Lambda

 
How To: HTTP redirects with API Gateway and Lambda
 
Unfortunately AWS Lambda and API Gateway are still immature platforms. To do the trivial, Hello World level task of running a single line of Python, to redirect to another URL, took me the better of 3 hours. The AWS docs are very sparse, and the only help to be found are the AWS Forum Posts where their engineers inform developers that many features like setting a response header from a Lambda call are not supported.

Let's take the Play! Framework approach:

def myHandler(input:String) = Action { successful( Redirect( s"http://$input") ) }

# Routes file

/api/blah/:input com.blah.MyController(input)

That's as complex as this action should be. Now let's do it the API Gateway way.

You better know some VTL (Velocity Template Language), a hearkening back to the days when Struts ruled the web. And then you'll need some JSON. And you'll need to know "JSON-Schema", plus other proprietary markup for various parts of the API Gateway plumbing. You'll need your input models, input mappings, input templates.... enough, I'll just show you how it did it.

This won't help you

https://docs.aws.amazon.com/apigateway/api-reference/resource/integration-response/

This doesn't intimate you need to return a dict(), NOT json

https://docs.aws.amazon.com/lambda/latest/dg/python-programming-model-handler-types.html

This gets you partially there to realizing how to reference lambda response bodies

https://docs.aws.amazon.com/apigateway/latest/developerguide/request-response-data-mappings.html#mapping-response-parameters

This lengthy document isn't very useful:

https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-dg.pdf



TODO consolidate word types in to array, rather than dupe
