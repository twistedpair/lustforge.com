---
draft: false 
title: "Upgrading to Google Cloud Functions 2nd Gen"
author: Joe Lust
layout: post
date: 2022-08-04
featured_image: /img/gcf_next_gen.jpeg
image: /img/gcf_next_gen.jpeg
url: /2022/08/04/upgrading-cloud-functions-gen2/
summary: "Take the leap, upgrade to 2nd Gen Google Cloud Functions!"
tags:
  - cloud-functions
  - cloud-run 
  - serverless
  - google-cloud-platform
  - cloud
  - upgrade 
  - gco
---

GCF 2nd gen is [GA][0] this week 🎉. Let’s get you upgraded to the [2nd gen Cloud Functions runtime][0]! What is this “2nd gen” I speak of? It’s Cloud Functions, but running on [Cloud Run][3], behind the scenes, enabling many new features. 

# Compelling Reasons to Upgrade

First, why should you upgrade? There are many benefits, including:
- **Timeout Length** goes from 9min to 60min
- **Memory** goes from 8GiB to 16GiB
- **CPU** goes from 1 vCPU to 4 vCPUs
- **Concurrency control:** now one GCF instance may service multiple requests/events
- **Traffic Splitting:** now send X% of traffic to a given deployed version (impossible before)
- **New Events:** Trigger your function with over [90 Eventarc event types][2] from GCP



# Let’s Upgrade. On, to 2nd Gen!

Excellent choice. We’ll need to make a few changes to your deployment scripts. Here’s what changed:

## Stuff that’s gone

**Security Level** is a GCF feature that lets an HTTP triggered function redirect HTTP requests to HTTPS (a.k.a. upgrade to TLS). By default, GCF will accept HTTP or HTTPS, but using HTTP is insecure, so this is a great feature.

If you use the `--security-level=secure-always` flag in gcloud, you’ll need to remove it.

Don't worry, `secure-always` is the new default for 2nd Gen 🔒. Three cheers for security!

## Stuff that’s added

**Gen2** has a new flag. Add the `--gen2` flag when deploying a GCF, so it uses the 2nd gen runtime.

**Region** is now required. GCF needs to know what region you’re deploying to, so pass the `--region` flag. This way you can deploy to `us-central1`, `us-west2`, etc (ProTip™ checkout the [Region Picker Tool][4]).

**Run Service Account** takes the place of `--service-account`. Use `--run-service-account` to pass the runtime service account you previously passed in 1st Gen.

**Artifact Registry** now stores the compiled GCF output. Our container images will live here, so Cloud Run can access them. [Artifact Registry][7] is the new home of containers on GCP.

### Stuff that might break: What’s in a name?

### Name Limits

We said earlier that GCF 2nd Gen runs on Cloud Run, “behind the scenes”. Unfortunately, some of that Cloud Run magic leaks through the abstractions in 2nd Gen. Specifically, Cloud Functions names must now comply with [RFC 1123 naming conventions][5].

Here are example names that you cannot use:
- `myAwesomeFunction` - nope, has capital letters
- `1-fist-2-fish` - nah, cannot start with a number
- `convert-base64` - nada, cannot end with a number
- `snake_cased` - nyet, no underscores, only dashes (`-`)
- `google-cloud-function-that-does-amazing-stuff-with-cloud-capybara` - too long, must be ≤ 63 char

This change is especially challenging for Java and similar languages that stardize on [camelCase][12] function names.

### URL Changes

Now that we’re actually running in Cloud Run, the HTTP triggered function URLs will be of the format:

**1st Gen**: `https://<REGION_NAME>-<PROJECT_NAME>.cloudfunctions.net/<FUNCTION_NAME>`

**2nd Gen**: `https://<FUNCTION_NAME>-<MAGIC_HASH_BYTES>-<REGION_SHORT_CODE>.a.run.app`

What’s the impact:
You’ll need to update anything calling these URLs (e.g. webhooks calling your function). Any [HTTP push Pub/Sub subscriptions][6] will need to be replaced with the proper 2nd Gen URL.


# Full before/after example

Enough reading already, let’s deploy a 2nd Gen GCF! Let’s compare the following two deploys

## Before: 1st Gen GCF Deploy

Here we've got the simplest Hello World function you can make. Let's deploy it.

```javascript
// index.js
module.exports.helloWorld = (req, resp) => {
  resp.status(200).send('Hi, brave world!');
}
```

We'll use `gcloud` and the following command:

```bash
gcloud functions deploy helloWorld \
  --project lust-dev-demo \
  --trigger-http \
  --allow-unauthenticated \
  --service-account=gcf-no-privilege@lust-dev-demo.iam.gserviceaccount.com \
  --runtime=nodejs16 \
  --security-level="secure-always"
```

The function can be reached at `https://us-central1-lust-dev-demo.cloudfunctions.net/helloWorld` (I've since taken it down). We'll test it with `curl`.

```bash
curl https://us-central1-lust-dev-demo.cloudfunctions.net/helloWorld
```
> Hi, brave world!

This took an average of 73s to deploy[^1], since Cloud Build needs to make a container image behind the scenes. This isn't as fast as AWS Lambda's couple second deploy, but in a CI/CD pipeline, this difference is trivial (and the GCP interface and UX sure are better). Add to that the extra work Cloud Run is doing, giving us full blown containers and traffic splitting.

## After: 2nd Gen GCF Deploy

We'll need to make several changes. The effective command is below for the simplest case. We'll walk through how we arrived at it next.

```bash
gcloud functions deploy hello \
  --project lust-dev-demo \
  --trigger-http \
  --allow-unauthenticated \
  --run-service-account=gcf-no-privilege@lust-dev-demo.iam.gserviceaccount.com \
  --runtime=nodejs16 \
  --gen2 \
  --region=us-central1
```

Here's the difference in commands, visually:

[{{< figure src="/img/command_compare.png">}}](/img/command_compare.png)


Let's try deploying to 2nd Gen. Oh no, we got an error message:

> API [artifactregistry.googleapis.com] not enabled on project [lust-dev-demo]. Would you like to enable and retry (this will take a few minutes)? (y/N)?

GCP is nudging us to use [Artifact Registry][7] (with [many new features][9]), rather than the older [Container Registry][8] (GCR). Let's enable that API.

> ERROR: (gcloud.functions.deploy) INVALID_ARGUMENT: Could not create Cloud Run service helloWorld. metadata.name: Resource name must use only lowercase letters, numbers and '-'. Must begin with a letter and cannot end with a '-'. Maximum length is 63 characters.

Darn, we got another error. `helloWorld` is an invalid name in Kubernetes land. What do we do now?

### Updating your cloud functions signature

If you get the following errors, you need to update you function signature to a legal identifier[^3]:

> ERROR: (gcloud.functions.deploy) OperationError: code=3, message=Could not create or update Cloud Run service hello-world, Container Healthcheck failed. Cloud Run error: The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable. Logs for this revision might contain more information.

> Function 'hello-world' is not defined in the provided module.
> Did you specify the correct target function to execute?


You've got two choices:
1. Use a signature that is legal, and you won't need to import libraries. (e.g. `helloworld`)
2. Use the new `@google-cloud/functions-framework` dependency to set your function name to a non RFC 1123 name.

### 1. The vanilla JS Option

First let's do **option 1**, which is the example code above. It's vanilla JS, with no libraries needed. We'll rename our function and its signature to `hello`. Here goes:

> Preparing function...done.                                                                                                                                      
✓ Deploying function...                                                                                                                                         
  ✓ [Build] Logs are available at [https://console.cloud.google.com/cloud-build/builds;region=us-central1/d0066814-1c90-4af0-909b-4c81bb832bdf?project=344128826
  217]                                                                                                                                                          
  ✓ [Service]                                                                                                                                                   
  . [ArtifactRegistry]                                                                                                                                          
  . [Healthcheck]                                                                                                                                               
  . [Triggercheck]                                                                                                                                              
Done.

We made it! **Welcome to 2nd Gen!** 🎉 And checkout those faster deploy times[^2]. Only 55s.

Note that now the URL to test is `https://hello-qfttn6wsxq-uc.a.run.app`. This is very different from the old GCF URL. You'll need to update anything that points to this, meaning you cannot move from 1st Gen to 2nd Gen while "online" and serving traffic. You'll need to cut over and rewire Pub/Sub subscriptions, webhooks, [Cloud Scheduler HTTP triggers][11], etc.

### 2. The Functions Framework Option

OK, now how about the extra libraries needed for **option 2**. We need to import the [Functions Framework][13] dependency, and pass it the name of the function we want to bind to, as a work aroud to Kubernetes not being able to use our function name directly.

Let's install the package in your code directory:

```bash
npm i -S @google-cloud/functions-framework
```

And update the code:

```javascript
// index.js
const functions = require('@google-cloud/functions-framework');

// Note: rather than exporting a function, we now wrap the
// function in the Functions Framework handler.
functions.http('helloWorld', (req, resp) => {
  resp.status(200).send('Hi, brave world!');
});
```

OK, so now we can set the function name to `helloWorld`, but how do we tell Cloud Functions to call this name, since it's an illegal name in Kubernetes land? Easy, we will use the `--entry-point=helloWorld` gcloud override. This lets you call a function signature that doesn't match your Cloud Function's name.

Pulling it all together now:

```javascript
gcloud functions deploy hello-world \
  --project lust-dev-demo \
  --trigger-http \
  --allow-unauthenticated \
  --run-service-account=gcf-no-privilege@lust-dev-demo.iam.gserviceaccount.com \
  --runtime=nodejs16 \
  --gen2 \
  --entry-point=helloworld \
  --region=us-central1
```

You'll notice this option has the same end result, but made us install libraries and change how we declare functions. This is easy to do if you're creating new functions from scratch, but more work than you might want to do if retrofitting an old 1st Gen function. Either way, **you'll need to rename your Cloud Function** (but not necessarily your exported method) to make it run on 2nd Gen.

# Conclusions

- Cloud Functions 2nd Gen offers many improvements over 1st Gen
- 2nd Gen deploys ~25% faster than 1st Gen (non-scientic analysis)
- Make sure you're running on Artifact Registry before moving to 2nd Gen
- Be prepared to change the name of your deployed Cloud Function
- Be prepared to install additional libraries and change your exported function signature
- Be prepared to update everything that points HTTP functions as the URLs will change

Finally, if cutting over existing code to 2nd Gen, I'd suggesting keeping up the 1st Gen functions, and deploying the 2nd Gen functions beside them in parallel. Once the 2nd Gen functions are clearly up and running well, take down the legacy 1st Gen deployments. Enjoy!

Story image backdrop courtesy of [Kelly Sikkema](https://unsplash.com/@kellysikkema)
 
 [^1]: 1st Gen sample deploys 1:23/1:01/1:10
 [^2]: 2nd Gen sample deploys 0:55/0:55/0:55/0:55 (very consistent!)
 [^3]: If you thought you could point to a different function name with `--entry-point=helloWold`, nice try, but you'll need to use `option 2` for that.

 [0]: https://cloud.google.com/functions/docs/release-notes#August_03_2022
 [1]: https://cloud.google.com/functions/docs/concepts/version-comparison
 [2]: https://cloud.google.com/eventarc/docs/reference/supported-events
 [3]: https://cloud.google.com/run
 [4]: https://cloud.withgoogle.com/region-picker
 [5]: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names
 [6]: https://cloud.google.com/pubsub/docs/push
 [7]: https://cloud.google.com/artifact-registry
 [8]: https://cloud.google.com/container-registry
 [9]: https://cloud.google.com/blog/products/application-development/understanding-artifact-registry-vs-container-registry
 [10]: https://en.wikipedia.org/wiki/Eventual_consistency
 [11]: https://cloud.google.com/scheduler/docs/creating
 [12]: https://en.wikipedia.org/wiki/Camel_case
 [13]: https://cloud.google.com/functions/docs/functions-framework
