---
title: 'MyBatis Query Optimization : Dollar Sign be Damned'
author: Joe
layout: post
date: 2014-02-05
url: /2014/02/05/mybatis-query-optimization-dollar-sign-be-damned/
categories:
  - Java

---
I discovered a shocking truth today. We use MyBatis on my current project for read only queries. Recently we had a cache populating job that ran rather slowly. We optimized and optimized cleaning up the queries and adjusting the database indexes and statistics tables. Try as we may, the job still required 30+ minutes each day.

Miraculously the job dropped to 3 minutes yesterday. It must be broken! Check the logs! Alas, all of the outputs were correct. To the source control, what changed?

```bash
... where id = ${id} ...
..octothorpe
 .where id = #{id} ...
```

A dev had correctly fixed their query to use an [octothorpe](https://en.wiktionary.org/wiki/octothorpe) rather than dollar sign, since $ is an SQL inject inviting anti-pattern in MyBatis. However, $ also makes the query DML dynamic and as such MyBatis and subsequently **Oracle never cached the query and the execution plans**, instead recalculating them each time.

So, yet another reason to never use `$` in MyBatis. I&#8217;ve searched for a way to disable it in MyBatis, but haven&#8217;t seen a flag yet. Shout out in the comments if you know a way. <img src="https://lustforge.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />