---
title: 'Caused by: java.lang.ClassNotFoundException: org.apache.ibatis.mapping.DatabaseIdProvider'
author: Joe
layout: post
date: 2013-07-27
url: /2013/07/27/caused-by-java-lang-classnotfoundexception-org-apache-ibatis-mapping-databaseidprovider/
tags:
  - Java
  - Spring

---
Perhaps you&#8217;ve had this trace recently while trying to get myBatis working on Spring:

```bash
 Caused by: java.lang.ClassNotFoundException: org.apache.ibatis.mapping.DatabaseIdProvider
 at java.net.URLClassLoader$1.run(URLClassLoader.java:217)
 at java.security.AccessController.doPrivileged(Native Method)
 at java.net.URLClassLoader.findClass(URLClassLoader.java:205)
 at java.lang.ClassLoader.loadClass(ClassLoader.java:321)
 at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:294)
 at java.lang.ClassLoader.loadClass(ClassLoader.java:266)
 ... 57 more
```

It is the bane of open source. You can&#8217;t always depend on quality releases. Don&#8217;t worry, you followed the tutorial correctly. Let&#8217;s take a look at the package&#8217;s history in Maven Central.

{{< figure src="/img/ibatis_mapping_maven_central.png" >}}

Maybe something is not quite right with `1.2.0`? Let&#8217;s try using **1.1.1** instead.

Bingo! That did it. Just stay away from `1.2.0`. Hope that helped someone.

But what else could we do to use the newer build? Just use the new dependency, which the project&#8217;s site sadly has incorrectly listed.

```xml
<dependency>
 <groupId>org.mybatis</groupId>
 <artifactId>mybatis</artifactId>
 <version>3.2.2</version>
 </dependency>
```