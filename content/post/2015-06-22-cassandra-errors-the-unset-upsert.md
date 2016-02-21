---
title: 'Cassandra Errors: The UnSet Upsert'
author: Joe
layout: post
date: 2015-06-22
url: /2015/06/22/cassandra-errors-the-unset-upsert/
categories:
  - Cassandra

---
During a late night coding session I got the following trace from the Datastax Cassandra Java Driver:

```bash
com.datastax.driver.core.exceptions.SyntaxError: line 1:36 mismatched input 'WHERE' expecting K_SET (UPDATE my_table [WHERE] id...)
at com.datastax.driver.core.Responses$Error.asException(Responses.java:101) ~[cassandra-driver-core-2.1.5.jar:na]
at com.datastax.driver.core.DefaultResultSetFuture.onSet(DefaultResultSetFuture.java:140) ~[cassandra-driver-core-2.1.5.jar:na]
at com.datastax.driver.core.RequestHandler.setFinalResult(RequestHandler.java:293) ~[cassandra-driver-core-2.1.5.jar:na]
at com.datastax.driver.core.RequestHandler.onSet(RequestHandler.java:455) ~[cassandra-driver-core-2.1.5.jar:na]
at com.datastax.driver.core.Connection$Dispatcher.messageReceived(Connection.java:734) ~[cassandra-driver-core-2.1.5.jar:na]
at org.jboss.netty.channel.SimpleChannelUpstreamHandler.handleUpstream(SimpleChannelUpstreamHandler.java:70) ~[netty-3.10.1.Final.jar:na]
```

Ok. Let&#8217;s think it through:

* Did we not put a key column in the `WHERE` clause? Nope. 
* Did we put a non-key column in the `WHERE` clause? Nope. 
* Did we put a key column in the `SET` clause? Nope. 

OK, what then?

Well&#8230; my code has many `setIfNonNull(...)` helpers. Turns out my testing dataset had all `NULL`s. Thus, nothing was being set! Obviously an `UPDATE` must update something (though the lines are blurred in C* Upsert land).

So, this cryptic message from C* should really read **&#8220;Update statement missing SET clause, you fool.&#8221;** Now if I could <a href="https://github.com/apache/cassandra/search?utf8=%E2%9C%93&q=mismatched" target="_blank">find it in the source</a>, I&#8217;d submit a PR.

