---
draft: false
title: Remote Debugging Apache Spark Clusters
author: Joe
layout: post
date: 2016-01-01
url: /2016/01/01/remote-debugging-apache-spark-clusters/
tags:
  - Scala
  - Apache Spark
---

Debugging Apache Spark can be tricky. Sure, everything works on your `--master local[4]` cluster, but not when run on a real cluster. In these cases, you need to drop to a debug breakpoint in the running cluster. 

# Get Debugger Listening

Simply update the launch args wherever you start Spark like so. Note: `SPARK_JAVA_OPTS` won't do the trick.

```bash

  export SPARK_WORKER_OPTS="-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=4000,suspend=n"
  export SPARK_MASTER_OPTS="-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=4000,suspend=n"
  /opt/spark/sbin/start-master.sh
```

Open an SSH tunnel to your remote cluster machine, mapping `localhost:4000` to `spark-master.foo.com:5000`, assuming the cluster is at `spark-master.foo.com`, listening on port `5000`. 

```bash
ssh -L localhost:4000:spark-master.foo.com:5000  you@spark-master.foo.com
```

Now Eclipse will think you're just debugging a local Spark process.

# Set Eclipse Breakpoint 

Let's checkout the [Spark source](https://github.com/apache/spark) and set that breakpoint. Let's say you want to sniff around the Spark Master when a [Worker gets disconnected](https://github.com/apache/spark/blob/v1.6.0/core/src/main/scala/org/apache/spark/deploy/master/Master.scala#L503), in release v1.6.0.

```bash
git clone https://github.com/apache/spark.git
git checkout v1.6.0
```

Now import the Spark `core` module into ScalaIDE. There are a *lot* of modules, you only need `spark-core`.

Set your breakpoint and create a Remote Java Application debugger config as shown below.

{{< figure src="/img/debug_config_eclipse_spark.png" title="ScalaIDE Debugger Configuration" >}}

That's it! Now you can debug on your live cluster as if it were your desktop.
