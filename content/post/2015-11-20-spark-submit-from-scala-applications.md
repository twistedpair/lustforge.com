---
draft: true
title: Spark-Submit from Scala Applications
author: Joe
layout: post
date: 2015-11-20
url: /2015/11/20/spark-submit-from-scala-applications/
categories:
  - Apache Spark
  - Scala
---

Want a simple example? Nope. Here's a complicated example.

http://www.scriptscoop.com/t/9de1169e61f0/adding-spark-cassandra-connector-as-dependency-causes-my-job-to-fail.html

http://blog.prabeeshk.com/blog/2014/04/08/creating-uber-jar-for-spark-project-using-sbt-assembly/

https://github.com/sbt/sbt-assembly

Config to start remote server in debugging mode:

 export SPARK_MASTER_OPTS="-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=4000,suspend=n"
export SPARK_JAVA_OPTS="-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=4000,suspend=n"
/opt/spark/sbin/start-master.sh --host $SPARK_MASTER --properties-file /etc/spark/spark-env.sh --properties-file /etc/spark/spark-de


Spark is a cruel master. So much power, so many flags, such convoluted advise around the interwebs.

On Dependencies

You only want to run a 20KB jar, but you need so many more dependencies. In the There are Several Ways to Sortof Do That(TM) design of Spark, we can try the following:

Local libs on Workers

We can place the code on each of our workers. This sounds great, but as your cluster grows, it's a PITA to copy that lib around all over the place. Added to this, you'll eventually conflict and need to have multiple versions of libraryX on the same worker.

Uber Jar Deps

Some suggest [http://christopher-batey.blogspot.com/2015/01/spark-cassandra-basics-connecting-to.html] taking dependencies like the Spark Cassandra Connector [link] and building them as assemblies (i.e. Uber jars in Scala), but now you still need this on each worker node and if you iterate (i.e v1.4.0-RC3 vs v1.4.0-RC4) you'll need to repackage and sent it out to all the workers again and then make sure it's in your `--jars` directive. Not much fun. Much easier (though less zenful) to make your apps Uber.

Uber Jar Apps

Why deploy a 20KB application when 60MB will do? For Java the Maven Uber jar plugin works very nicely to package Uber Jars [example, link] (and call's them Uber :) ), but in Scala the sbt-assembly [link] plugin leaves much to be desired as many dependencies will conflict

[insert conflicting trace]

[error] (*:assembly) deduplicate: different file contents found in the following:
[error] /home/lust/.ivy2/cache/io.dropwizard.metrics/metrics-core/bundles/metrics-core-3.1.0.jar:com/codahale/metrics/ConsoleReporter$1.class
[error] /home/lust/.ivy2/cache/com.codahale.metrics/metrics-core/bundles/metrics-core-3.0.2.jar:com/codahale/metrics/ConsoleReporter$1.class
(excerpt for few hundred line trace)
 
Some people resolved this, but only for old versions of Spark and Sbt-Assembly.
 
http://blog.prabeeshk.com/blog/2014/04/08/creating-uber-jar-for-spark-project-using-sbt-assembly/ and example [https://github.com/prabeesh/SparkTwitterAnalysis]
 
Serving your Jars
You can put everything in your /opt/spark/lib/ dir, on each node, but I find it quite a bit easier to use the HDFS plugin. Now you can deploy the jars to your HDFS store, or to S3 if you don't have one ( not s3n:// jar prefix.)
 
However, Spark won't pull in directives to `--jars`, `--driver-library-path`, or `--driver-class-path`from S3, but it will pull in S3 jars set in the `primaryResource` directive. So, if you want to use S3, you'll need to use Uber jars.
 