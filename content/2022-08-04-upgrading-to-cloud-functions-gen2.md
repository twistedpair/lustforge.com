---
draft: false 
title: "Upgrading to Google Cloud Functions Gen2"
author: Joseph Lust
layout: post
date: 2022-08-04
url: /2022/08/04/upgrading-cloud-functions-gen2/
image: /img/gcf_next_gen.jpeg
summary: "Take the leap, upgreade your Google Cloud Functions to the Gen2 runtime!"
tags:
  - cloud-functions
  - cloud-run 
  - google-cloud-platform
  - cloud
  - gen2
  - gen1
  - upgrade 
---

GCF Gen2[^1] is [GA][0] this week 🎉. Let’s get you upgraded to the [Gen2 Cloud Functions runtime][0]! What is this “Gen2” I speak of? It’s Cloud Functions, but running on [Cloud Run][3], behind the scenes, enabling many new features. 

# Compelling Reasons to Upgrade

First, why should you upgrade? There are many benefits, including:
- **Timeout Length** goes from 9min to 60min
- **Memory** goes from 8GiB to 16GiB
- **CPU** goes from 1 vCPU to 4 vCPUs
- **Concurrency control:** now one GCF instance may service multiple requests/events
- **Traffic Splitting:** now send X% of traffic to a given deployed version (impossible before)
- **New Events:** Trigger your function with over [90 Eventarc event types][2] from GCP



# Let’s Upgrade. On, to Gen2!

Excellent choice. We’ll need to make a few changes to your deployment scripts. Here’s what changed:

## Stuff that’s gone

**Security Level** is a GCF feature that lets an HTTP triggered function redirect HTTP requests to HTTPS (a.k.a. upgrade to TLS). By default, GCF will accept HTTP or HTTPS, but using HTTP is insecure, so this is a great feature.

If you use the `--security-level=secure-always` flag in gcloud, you’ll need to remove it.

Don't worry, `secure-always` is the new default for Gen2 🔒. Three cheers for security!

## Stuff that’s added

**Gen2** has a new flag. Add the `--gen2` flag when deploying a GCF, so it uses the Gen2 runtime.

**Region** is now required. GCF needs to know what region you’re deploying to, so pass the `--region` flag. This way you can deploy to `us-central1`, `us-west2`, etc (ProTip™ checkout the [Region Picker Tool][4]).

**Run Service Account** takes the place of `--service-account`. Use `--run-service-account` to pass the runtime service account you previously passed in Gen1.

**Artifact Registry** now stores the compiled GCF output. Our container images will live here, so Cloud Run can access them. [Artifact Registry][7] is the new home of containers on GCP.

### Stuff that might break: What’s in a name?

### Name Limits

We said earlier that GCF Gen2 runs on Cloud Run, “behind the scenes”. Unfortunately, some of that Cloud Run magic leaks through the abstractions in Gen2. Specifically, Cloud Functions names must now comply with [RFC 1123 naming conventions][5].

Here are example names that you cannot use:
- `myAwesomeFunction` - nope, has capital letters
- `1-fist-2-fish-red-fish-blue_-ish` - nah, cannot start with a number
- `convert-base64` - nada, cannot end with a number
- `snake_caser` - nyet, no underscores, only dashes (`-`)
- `google-cloud-function-that-does-amazing-stuff-with-cloud-capybara` - too long, must be ≤ 63 char

This change is especially challenging for Java and similar languages that stardize on [camelCase][12] function names.

### URL Changes

Now that we’re actually running in Cloud Run, the HTTP triggered function URLs will be of the format:

**Gen1**: `https://<REGION_NAME>-<PROJECT_NAME>.cloudfunctions.net/<FUNCTION_NAME>`

**Gen2**: `https://<FUNCTION_NAME>-<MAGIC_HASH_BYTES>-<REGION_SHORT_CODE>.a.run.app`

What’s the impact:
You’ll need to update anything calling these URLs (e.g. webhooks calling your function). Any [HTTP push Pub/Sub subscriptions][6] will need to be replaced with the proper Gen2 URL.


# Full before/after example

Enough reading already, let’s deploy a Gen2 GCF! Let’s compare the following two deploys

## Before: Gen1 GCF Deploy

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

This took an average of 73s to deploy[^2], since Cloud Build needs to make a container image behind the scenes. This isn't as fast as AWS Lambda's 1s deploy, but in a CI/CD pipeline, this difference is trivial (and the GCP interface and UX sure are better).

## After: Gen2 GCF Deploy

We'll need to make several changes. The effective command is below. We'll walk through how we arrived at it next.

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

Let's try deploying to Gen2. Oh no, we got an error message:

> API [artifactregistry.googleapis.com] not enabled on project [lust-dev-demo]. Would you like to enable and retry (this will take a few minutes)? (y/N)?

GCP is nudging us to use [Artifact Registry][7] (with [many new features][9]), rather than the older [Container Registry][8] (GCR). Let's enable that API.

> ERROR: (gcloud.functions.deploy) INVALID_ARGUMENT: Could not create Cloud Run service helloWorld. metadata.name: Resource name must use only lowercase letters, numbers and '-'. Must begin with a letter and cannot end with a '-'. Maximum length is 63 characters.

Darn, we got another error. `helloWorld` is an invalid name in Kubernetes land. We'll need to rename to `hello-world` (remember, `hello_world` is no bueno too). Let's try again.

> ERROR: (gcloud.functions.deploy) OperationError: code=7, message=Cloud Functions uses Artifact Registry to store function docker images. Artifact Registry API is not enabled in your project. To enable the API, visit https://console.cloud.google.com/marketplace/product/google/artifactregistry.googleapis.com or use the gcloud command 'gcloud services enable artifactregistry.googleapis.com'.

Darn. gcloud just told me that the API is enabled... but seems we're still not enabled. Better head to the GCP web console to see what this fuss is about.

[{{< figure src="/img/artifact_registry_enabled.png">}}](/img/artifact_registry_enabled.png)

Interesting, web console (pictured) says it is enabled. This must be one of those [eventually consitent][10] parts of GCP. Let's give it a moment and try again.

> ERROR: (gcloud.functions.deploy) OperationError: code=3, message=Could not create or update Cloud Run service hello-world, Container Healthcheck failed. Cloud Run error: The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable. Logs for this revision might contain more information.

OK, we're getting closer. Why didn't our function "start" and listen? Geeze, the fact we're running on Cloud Run really is leaking through now. Let's check those linked Cloud Build logs:

> Function 'hello-world' is not defined in the provided module.
> Did you specify the correct target function to execute?

💡We need to change our entry point. GCF is looking for a function named `hello-world`, but our Javascript method is named `helloWorld`. Maybe we can use the `--entry-point=helloWorld` argument to override this? 🤞 One more time!

> ERROR: (gcloud.functions.deploy) OperationError: code=3, message=Could not create or update Cloud Run service hello-world, Container Healthcheck failed. Cloud Run error: The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable. Logs for this revision might contain more information.

OK. Seems this doesn't work. Same error. Note: we cannot name the Javascript function `hello-world` because that's not a valid Javascript function name 🤦. 💡💡Final idea, just call this thing `hello` in the deployment command and in the Javascript. Here we go, pray for Mojo.

> Preparing function...done.                                                                                                                                      
✓ Deploying function...                                                                                                                                         
  ✓ [Build] Logs are available at [https://console.cloud.google.com/cloud-build/builds;region=us-central1/d0066814-1c90-4af0-909b-4c81bb832bdf?project=344128826
  217]                                                                                                                                                          
  ✓ [Service]                                                                                                                                                   
  . [ArtifactRegistry]                                                                                                                                          
  . [Healthcheck]                                                                                                                                               
  . [Triggercheck]                                                                                                                                              
Done.

We made it! **Welcome to Gen2!** 🎉 And checkout those faster deploy times[^3]. Only 55s.

Note that now the URL to test is `https://hello-qfttn6wsxq-uc.a.run.app`. This is very different from the old GCF URL. You'll need to update anything that points to this, meaning you cannot move from Gen1 to Gen2 while "online" and serving traffic. You'll need to cut over and rewire Pub/Sub subscriptions, webhooks, [Cloud Scheduler HTTP triggers][11], etc.

Here's the difference in commands, visually:

[{{< figure src="/img/command_compare.png">}}](/img/command_compare.png)

# Conclusions

- Cloud Functions Gen2 offers many improvements over Gen1
- Gen2 deploys ~25% faster than Gen1 (non-scientic analysis)
- Make sure you're running on Artifact Registry before moving to Gen2
- Be prepared to rename your functions in both code and deployment tooling
- Be prepared to update everything that points HTTP functions as the URLs will change

Finally, if cutting over existing code to Gen2, I'd suggesting keeping up the Gen1 functions, and deploying the Gen2 functions beside them in parallel. Once the Gen2 functions are clearly up and running well, take down the legacy Gen1 deployments. Enjoy!

 [^1]: GCF documentation now uses "1st Gen" and "2nd Gen", but I use "gen2" here since that's what gcloud uses. Plus, it just sounds better.
 [^2]: Gen1 sample deploys 1:23/1:01/1:10
 [^3]: Gen2 sample deploys 0:55/0:55/0:55 (very consistent!)

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
