---
draft: false 
title: "Quick Upgrade Trick for App Engine Java 11/17"
author: Joe Lust
layout: post
date: 2024-10-01
featured_image: /img/gcf_next_gen.jpeg
image: /img/java-17-upgrade.webp
url: /2024/10/01/quick-upgrade-app-engine-java-11-17/
summary: "Quickly modernize your App Engine Java 8 codebase to run on Java 11 & 17!"
tags:
  - app-engine 
  - app-engine-flex 
  - serverless
  - google-cloud-platform
  - cloud
  - upgrade 
  - java
  - java-8
  - java-11
  - java-17
---

Java modernization is sweeping over Google Cloud App Engine 🎉. While Java 8 support dates back to [circa 2015][0], after many [+1 votes][1] the feature was delivered to App Engine Flex [in 2022][2]. Now however comes the deprecation reckoning. Java 8 must go.

If you've seen this error message, this article is for you:

```bash
ERROR: (gcloud.app.deploy) INVALID_ARGUMENT: Error(s) encountered validating runtime. Your runtime version for java is past End of Support. Please upgrade to the latest runtime version available..
```

Fear not, your app will keep running during [End of Support][16], but it'll be completely [impossible to update or redeploy][17] after **2025-07-10** and **2025-10-31** respectively for Java 8 and Java 11. Since your boss and users probably like the idea of deploying updates, and getting Google Cloud security updates, it's best to get your upgrade on.

Easy peasy, right? Not exactly. We now need to bring our own web server as we don’t get everything for free from App Engine. This is both a challenge and a benefit, as now you’ve got more control over the code you’re running. Before you worry about rearchitecting your app, let me share a little known trick that can make this upgrade quite simple and easy 😁.

## Ride the Whale
Ready for it? **Just use a container!**

You’re scratching your head, right? I bet you thought that [Java on App Engine Flex][3] is just for running Java apps. Touche! App Engine can run containers now to, meaning you don’t need to use [Google Kubernetes Engine][4] or [Google Cloud Run][5] to execute a custom containerized server. As I said, we don’t need to rearchitect your app or move it to a new service, we can just deploy with `--image-url <URL>` (see the [command details][6]) and we’re back in business!

## Let’s Upgrade This Java App

Here’s some examples of how to easily upgrade your app.

### Build a Container

We’ll use a Jetty container. Why Jetty? Because it’s the app server that App Engine Flex [used internally][9] for Java 8. Lucky for us, there’s a [Jetty image on Dockerhub][11] that we can use. I’m using the Temurin JRE here, since the Oracle JRE is license encumbered, and OpenJDK isn’t as well maintained. 

```Dockerfile
# Dockerfile
# Use Jetty 9 or 11 - depending on what your app supports (change :9 to :11 below)
FROM jetty:9-jre17-eclipse-temurin

# Set the WORKDIR, further commands will run in this context
WORKDIR /app

# Set any custom server configurations in your server.ini files - OPTIONAL if you're not customizing Jetty
COPY server.ini /var/lib/jetty/start.d/
# Copy in your classic WAR file you used to deploy to App Engine
COPY server.war /var/lib/jetty/webapps/ROOT.war

ENTRYPOINT ["sh", "-c"]
# JETTY_BASE & JETTY_HOME are set by base image
# PORT is set by App Engine
# org.eclipse.jetty.servlet.Default.dirAllowed=false is a security hardening measure
CMD ["java \
    -Djetty.base=$JETTY_BASE \
    -Djetty.http.port=${PORT:-8080} \
    -Dorg.eclipse.jetty.servlet.Default.dirAllowed=false \
    -Dfile.encoding=UTF-8 \
    -jar $JETTY_HOME/start.jar --module=http"]
```

### Ensure Things Run on Java 11/17

This is the tricky part, and I can't help you there, but since you've got a containerized Java app + server now, you can just run it and see what breaks.
Code fix, build, re-run. It's a quick dev/test iteration cycle.

For example, you can now run:

```bash
docker build -t my-java-17-app-server .
docker run --rm my-java-17-app-server
```

Good luck there. Just use Stackoverflow and the LLM of your choice to chase down any issues you bump into.

### Push your App Container Up to the Cloud

Once things are looking good, you can just push this image to [Google Artifact Registry][20].
That might look something like 

```bash
gcloud auth configure-docker us-docker.pkg.dev
docker tag my-java-17-app-server us-docker.pkg.dev/YOUR-PROJECT/YOUR-REPO/my-java-17-app-server
docker push us-docker.pkg.dev/YOUR-PROJECT/YOUR-REPO/my-java-17-app-server
```

In the above example `us-docker.pkg.dev/YOUR-PROJECT/YOUR-REPO/my-java-17-app-server` will be the `--image-url` parameter you'll set when deploying your app with `gcloud`.

### Bump Your App Java Version
Additionally, we want to make sure we’re running on Java 17 in Google Cloud, since [Java 11 will be end of support][17] on Halloween 2024 per the [deprecation lifecycle][13]. These changes will make App Engine use Java 17. Update your [`app.yaml` file][15].

```yaml
# app.yaml
runtime_config:
  operating_system: ubuntu22
  runtime_version: 17
```

### Will it Blend? Deploy to App Engine

Final step, will your container boot and run in App Engine on Java 17?
Let's take one precaution here. If you're post [End of Service date][17] for your existing app's Java runtime, you **can no longer deploy your app**. That means that your app might still be running happily in the cloud, but now we'll deploy a broken version over it. Not good.

So, I'd suggest either deploying a new canary app (just deploy a temporary App Engine app that you'll take down later), or only push this _new_ version to App Engine, but don't cut over traffic to it yet, using App Engine [traffic splitting][21]. Remember that you can still access a non-production serving version of your running app using the [per-version URL syntax][23] in App Engine.

Deploying your new and improved app would look something like the following, though you probably have extra flags you're using in your CI/CD deployment scripts:

```bash
# Set YOUR-NEW-APP-VERSION to a version name (arbitrary string) that differentiates this release from others
# then your can access it via the version specific URLs mentioned above
# Set CONTAINER_IMAGE_URL to the tag we pushed to Cloud Artifact Registry earlier in the article
gcloud app deploy app.yaml \
  --project YOUR-PROJECT \
  --version=YOUR-NEW-APP-VERSION \
  --no-stop-previous-version \
  --image-url=CONTAINER_IMAGE_URL \
  --no-promote
```

Note that the above config won't replace the existing serving code, so if it breaks, you'll be able to review the [App Engine Flex logs][30] to see what went wrong.

Did it run? Nice work. You've got JVM ninja skillz now.

# Conclusions

There are various ways to migrate from Java 8 to Java 11, 17 and beyond (anyone say 21?) in App Engine Flex today. This includes [buildpacks][32], and the [App Engine Gradle plugin][31]. While these are useful for green field Java projects, _many many_ Java apps in the wild are using older Java runtimes and are simply being maintained rather than actively developed. For these cases, the easiest way to upgrade Java versions on App Engine is to simply build the containers mentioned above.

In short, it boils down to:
1. Ensuring your code will run on Java 17 (or higher)
2. Building a container image w/ a built in app server and copying in your compiled WAR file
3. Pushing this container to Cloud Artifact Registry
4. Bumping the Java runtime version in your `app.yaml` file
5. Deploying to the newer runtime and ensuring the lights come on

**Congrats**, you're on Java 17, which is [supported][17] by App Engine until **October 2027**.
Take it easy, _or_ be an overachiever and move on to Java 21 which is supported until **October 2031** 😉.


[0]: https://cloud.google.com/appengine/docs/legacy/standard/java/release-notes#August_14_2015
[1]: https://issuetracker.google.com/issues/145762507?pli=1
[2]: https://cloud.google.com/appengine/docs/standard/java-gen2/release-notes#August_14_2015
[3]: https://cloud.google.com/appengine/docs/flexible/java/runtime
[4]: https://cloud.google.com/kubernetes-engine
[5]: https://cloud.google.com/run 
[6]: https://cloud.google.com/sdk/gcloud/reference/app/deploy#--image-url
[9]: https://groups.google.com/g/google-appengine/c/7hhJnR8Uj0Y/m/8bqFInjEAAAJ
[11]: https://hub.docker.com/_/jetty
[13]: https://cloud.google.com/appengine/docs/flexible/lifecycle/runtime-lifecycle
[15]: https://cloud.google.com/appengine/docs/flexible/java/runtime
[16]: https://cloud.google.com/appengine/docs/flexible/lifecycle/runtime-lifecycle#end_of_support
[17]: https://cloud.google.com/appengine/docs/flexible/lifecycle/support-schedule#java
[20]: https://cloud.google.com/artifact-registry
[21]: https://cloud.google.com/appengine/docs/flexible/splitting-traffic
[23]: https://cloud.google.com/appengine/docs/standard/how-requests-are-routed?tab=python
[30]: https://cloud.google.com/appengine/docs/flexible/writing-application-logs?tab=java#view_logs
[31]: https://cloud.google.com/appengine/docs/flexible/java/using-gradle
[32]: https://cloud.google.com/docs/buildpacks/overview
