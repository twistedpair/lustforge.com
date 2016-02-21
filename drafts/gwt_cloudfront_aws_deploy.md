GWT deployment to AWS and Cloudfront


This is part of a larger problem of deploying versioned GWT apps to AWS with the API on EC2 and the JS on CloudFront. Doing that requires a way to prestage the JS in the CDN before the index.html cutover in EC2 (only file served from there).

Also note that invalidation of CDN cache entries is slow, expensive, and not preferred. So everything that is new must have a unique URL.

We want to cache what we can. Big images, css, stuff like that.

On each new deployment, assuming something in the core app changed we know that
myapp.nocache.js // must be redeployed
deferredjs//#.cache.js // will change, so must redeploy

// App starts from here
www.site.com/index.html

inlined
env = [p,s,i,d] <-
id = 5b43d48e

// Application requests served from here
www.site.com/app/rpc/
www.site.com/app/api/

// Actual source for application, css, js, inlined images
static.site.com/a/5b43d48e/ static.site.com/a/5b43d48e/defferredjs//
static.site.com/a/5b43d48e/app/
static.site.com/a/5b43d48e/app.nocache.js

// site created content (user images, files, downloads)
// dynamically set in app based on $env flag
static.site.com/p/content/ static.site.com/s/content/
static.site.com/i/content/
static.site.com/d/content/

a - app code
p - production
s - staging
i - integration
d - development
