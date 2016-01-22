---
draft: true
title: Home Cooked Apache Spark Builds
author: Joe
layout: post
date: 2016-01-07
url: /2016/01/07/home-cooked-apache-spark-builds/
categories:
  - Scala
  - Apache Spark
---

We use Apache Spark for various applications at [my job](https://mc10inc.com), but Spark is still relatively unstable, as evidenced by the 11K+ pull requests against the project. To maintain our developer velocity, we regularly patch show stopper bugs in the Spark source. The process is simple.

1. Install JDK 6, which is required for PySpark (or you'll get a lengthy warning)

	```bash
	sudo apt-get install oracle-java6-installer
	```

2. Fork the [Apache Spark repo](https://github.com/apache/spark) so you can submit a Pull Request later
3. Clone it locally, check out your tag of interest

	```bash
	git clone git@github.com:mc10-inc/spark.git special-spark
	cd special-spark
	git checkout v1.4.1 # Tag of interest
	JAVA_HOME="/usr/lib/jvm/java-6-oracle" # In case you've got 7/8/9 installed
	./make-distribution.sh --name al-dente-spark --tgz
	# On my 4 core box, total time: 23:16.918s
	```
4. Fire up your custom spark build like any other

    ```bash
    ./dist/bin/spark-shell
    ```

5. Copy the Spark assembly jar to your servers and reboot. Be sure to remove the old artifact, otherwise the ClassLodaer will load both versions and be vexed.

    ```bash
    #Move original assembly to backup location
    mv /<your spark path>/lib/spark-assembly-1.<spark version>-hadoop2.4.0.jar spark-assembly-backup.jar
    cp dist/lib/spark-assembly-<spark version>-hadoop2.2.0.jar /<your spark path>/lib/
    ./bin/spark-shell # Contact!
    ```

## Additional Tricks

Scala 2.10 is old hat. Most people develop on Scala 2.11, and 2.12 will be released in 2 months. To run Spark on Scala 2.11, you must build it yourself.

TODO add details

### Possible Failures

Possible error message below, if you don't use Java 6. I use PySpark, so I need that integration. Why Python needs a version of Java EoL'd [3 years ago](http://www.oracle.com/technetwork/java/eol-135779.html) is beyond me, but then again, Python 3 split from Python 2 eight years ago.

```bash
+ echo '***NOTE***: JAVA_HOME is not set to a JDK 6 installation. The resulting'
***NOTE***: JAVA_HOME is not set to a JDK 6 installation. The resulting
+ echo '            distribution may not work well with PySpark and will not run'
            distribution may not work well with PySpark and will not run
+ echo '            with Java 6 (See SPARK-1703 and SPARK-1911).'
            with Java 6 (See SPARK-1703 and SPARK-1911).
+ echo '            This test can be disabled by adding --skip-java-test.'
            This test can be disabled by adding --skip-java-test.
+ echo 'Output from '\''java -version'\'' was:'
Output from 'java -version' was:
+ echo 'java version "1.8.0_66"
Java(TM) SE Runtime Environment (build 1.8.0_66-b17)
Java HotSpot(TM) 64-Bit Server VM (build 25.66-b17, mixed mode)'
java version "1.8.0_66"
Java(TM) SE Runtime Environment (build 1.8.0_66-b17)
Java HotSpot(TM) 64-Bit Server VM (build 25.66-b17, mixed mode)
+ read -p 'Would you like to continue anyways? [y,n]: ' -r
```
