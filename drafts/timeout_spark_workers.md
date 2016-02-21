Timing out Spark Jobs

Some Spark jobs hang in the "RUNNING" state. After a few of these, my pipeline is jammed and everything queues up. 

See
http://apache-spark-user-list.1001560.n3.nabble.com/Advices-if-your-worker-die-often-td820.html

[bash]
export SPARK_DAEMON_JAVA_OPTS="-Dspark.worker.timeout=600 -Dspark.akka.timeout=200 -Dspark.shuffle.consolidateFiles=true"
export SPARK_JAVA_OPTS="-Dspark.worker.timeout=600 -Dspark.akka.timeout=200 -Dspark.shuffle.consolidateFiles=true"
[/bash]
