---
title: Installing Oracle JDK on Ubuntu 11.10
author: Joe
layout: post
date: 2012-02-25
url: /2012/02/25/installing-oracle-jdk-on-ubuntu-11-10/
tags:
  - Ubuntu
  - Linux
---
It&#8217;s a shame IBM didn&#8217;t buy Sun, since the guys at Oracle are just not much fun. Case in point, you can&#8217;t just `apt-get` the Oracle JDK/JRE. No, that would be too easy and Oracle does not want you to be their friend. Rather, they&#8217;d prefer you register with their site, accept their legal terms, and download/install everything manually because this is the _right_ way to discourage the use of Java.

### Here&#8217;s how:

1. Download the JRE/JDK files (the **.bin** files, **not .rpm** files) from [Oracle's site](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
2. Sign up, become their friend, accept their licenses.
3. Follow the below commands (note: change version to match your download)

    ```bash
    cd /usr/lib/jvm/
    sudo cp ~/Downloads/*.bin .
    sudo chmod a+x *.bin
    sudo unzip *.bin

    sudo ./jdk-6u30-linux-x64.bin
    sudo ./jre-6u30-linux-x64.bin

    sudo update-alternatives –install “/usr/bin/java” “java” “/usr/lib/jvm/jre1.6.0_30/bin/java” 1
    sudo update-alternatives –set java /usr/lib/jvm/jre1.6.0_30/bin/java 1

    sudo update-alternatives –install “/usr/lib/jvm” “javac” “/usr/lib/jvm/jdk1.6.0_30/bin/javac” 1
    sudo update-alternatives –set java /usr/lib/jvm/jre1.6.0_30/bin/java
    ```
    
4. Confirm that the new JRE/JDK are the default versions

    ```bash
    java -version
    javac -version
    ```

5. Cleanup

    ```bash
    . /etc/profile
    sudo rm *.bin
    ```

Sure, you may ask what is wrong with OpenJDK, which does have a nice auto installer? Simply, for many enterprise Java bits, it just does not fly, and if Oracle had their way, it would not exist. Again, too bad Oracle is [working to kill Java][1].

## Update: 3 Feb 2015

It's far easier now due to the `WebUpd8Team`:

```bash
sudo apt-get purge openjdk*
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

 [1]: http://blogs.adobe.com/open/2010/08/oracle-closed-minds-and-open-source.html
 
 
