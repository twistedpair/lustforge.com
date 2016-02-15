---
draft: true
title: Remove Debugging Apache Spark Clusters
author: Joe
layout: post
date: 2016-01-01
url: /2016/01/01/2016-01-20-remote-debugging-apache-spark-clusters/
categories:
  - Scala
  - Apache Spark
---


```bash

  export SPARK_WORKER_OPTS="-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=4000,suspend=n -Dlog4j.properties=/opt/spark/conf/log4j.properties"
  export SPARK_MASTER_OPTS="-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=4000,suspend=n -Dlog4j.properties=/opt/spark/conf/log4j.properties"
  #export SPARK_JAVA_OPTS="-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=4000,suspend=n"
  /opt/spark/sbin/start-master.sh --host $SPARK_MASTER --properties-file /etc/spark/spark-env.sh --properties-file /etc/spark/spark-defaults.
```

Open an SSH tunnel to your remote cluster machine, mapping `localhost:4000` to `spark-master.foo.com:5000`, assuming the cluster is at `spark-master.foo.com`, listening on port `5000`. 

```bash
ssh -L localhost:4000:spark-master.foo.com:5000  you@spark-master.foo.com
```
