---
draft: true
title: Profiling Scala Play Applications
author: Joe
layout: post
date: 2016-01-20
url: /2016/01/20/2016-01-20-profiling-scala-play-applications/
categories:
  - Scala
---

Profiling asynchronous Scala frameworks via legacy Java tooling isn't simple. The following is a review of setting up and using 4 tools to instrument load testing a Play! Framework application.

For code profiling you've got several choices, most of which are not free. The below were used with the Oracle [HotSpot JVM](https://en.wikipedia.org/wiki/HotSpot), so YMMV with other JVM's.

1. Dynatrace - $7000
1. JProfiler - [$499](https://www.ej-technologies.com/buy/jprofiler/select)
1. YourKit - [$499](https://www.yourkit.com/purchase/content.jsp)
1. Code Timers
1. The Hard Way™

I'll skip Dynatrace since it's more elaborate to setup, and my employer won't spring for a license.

## YourKit

Setup for YourKit was easy, as was remote monitoring. We'll focus on remote monitoring, via the commandline, since this is realistic for RealWorld applications.

#### Setup Client

1. Download from [YourKit site](https://www.yourkit.com/download)
2. Untar and run executable

	```bash
	tar -xvfj  yjp-2015-build-15084-linux.tar.bz2
	./yjp-2015-build-15084/bin/yjp.sh
	```

3. Get your trial key

#### Profile Application

For a trivial application, you can [profile it from ScalaIDE](https://www.yourkit.com/docs/80/help/eclipse.jsp), however, trivial applications don't pay the bills. Our Play! application uses a lot of startup flags to configure all its options. Shoehorning that into an Eclipse prompt would be painful, plus our dev and release workflows would then diverge.

For our Linux dev environment, where we installed YourKit to `/opt/yourkit/`, just add __-agentpath__. See [YourKit Manual Profiling](https://www.yourkit.com/docs/80/help/agent.jsp) for details.

```bash
# run your Play app - example for localhost:9000
sbt run -jvm-debug 9898 -J-agentpath:/opt/yourkit/bin/linux-x86-64/libyjpagent.so  -Dhttp.port=9000

# Or run your executable
./bin/my-app -J-agentpath:/opt/yourkit/bin/linux-x86-64/libyjpagent.so 
```


## JProfiler

#### Setup

JProfiler has many more options than YourKit, but also is more complicated to use and slower.

#### Client Setup

1. Download from [JProfiler site](https://www.ej-technologies.com/download/jprofiler/files)
2. Untar and run executable

	```bash
	tar -zxvf jprofiler_linux_9_1_1.tar.gz
	./jprofiler9/bin/jprofiler
	```
3. Select `Evaluation` and use JProfiler

### Profile Application

Let's manually add the agent. Like YourKit, just add the agent to the JVM at startup. However, the default behavior of JProfiler is to wait until a JProfiler client attaches. This won't do for SBT or remote server deployments, so add the `nowait` flag for immeadiate startup. The below assumes JProfile is untar'd to `/opt/jprofiler`.

```bash    
# run your Play app - example for localhost:9000
sbt run -jvm-debug 9898 -J-agentpath:/opt/jprofiler/bin/linux-x64/libjprofilerti.so=nowait  -Dhttp.port=9000

# Or run your executable
./bin/my-app -J-agentpath:/opt/jprofiler/bin/linux-x64/libjprofilerti.so=nowait
```
There are many more [start params](http://resources.ej-technologies.com/jprofiler/help/doc/sessions/remoteTable.html), remember to separate them with a comma like `libjprofilerti.so=noWait,offline,id=172`.

On my 4 core box, where YourKit started up nearly instantly, JProfiler took __forever__ to reinstrument code. Our project only has ~250 Scala files, so the rest was instrumenting of 3rd party libraries.

```bash
JProfiler> Using dynamic instrumentation
JProfiler> Time measurement: elapsed time
JProfiler> CPU profiling enabled
JProfiler> Updating configuration.
JProfiler> Retransforming 12681 class files.
# Took 9min 32sec to get to next step...
```

Ouch. Disable the "Classloaders" probe and this will be cleane up.

```bash
JProfiler> CPU profiling enabled
JProfiler> Updating configuration.
JProfiler> Retransforming 141 class files.
JProfiler> Configuration updated.
# Time - 5s, that's more like it
```

Pros:

* Intercept database calls/time for JDBC, Hibernate/JPA, and H2
* Cassandra & Mongo instrumenting
