---
title: Installing Oracle JDK on Ubuntu 11.10
author: Joe
layout: post
date: 2012-02-25
url: /2012/02/25/installing-oracle-jdk-on-ubuntu-11-10/
categories:
  - Ubuntu
tags:
  - Ubuntu

---
It&#8217;s a shame IBM didn&#8217;t buy Sun, since the guys at Oracle are just not much fun. Case in point, you can&#8217;t just apt-get the Oracle JDK/JRE. No, that would be too easy and Oracle does not want you to be their friend. Rather, they&#8217;d prefer you register with their site, accept their legal terms, and download/install everything manually because this is the _right_ way to discourage the use of Java.

Here&#8217;s how:

<div class="step">
  <span class="stepNumber">1</span> Download the JRE/JDK files (the <strong>.bin</strong> files, <strong>not .rpm</strong> files) from <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">Oracle&#8217;s site</a> (sign up, become their friend, accept their licenses&#8230;).
</div>

<div class="step">
  <span class="stepNumber">2</span> Follow the below commands (<strong>note:</strong> change version to match your download)</p> 
  
  <div class="bash">
    cd /usr/lib/jvm/</p> 
    
    <p>
      sudo cp ~/Downloads/*.bin .<br /> sudo chmod a+x *.bin<br /> sudo unzip *.bin
    </p>
    
    <p>
      sudo ./jdk-6u30-linux-x64.bin<br /> sudo ./jre-6u30-linux-x64.bin
    </p>
    
    <p>
      sudo update-alternatives &#8211;install &#8220;/usr/bin/java&#8221; &#8220;java&#8221; &#8220;/usr/lib/jvm/jre1.6.0_30/bin/java&#8221; 1<br /> sudo update-alternatives &#8211;set java /usr/lib/jvm/jre1.6.0_30/bin/java 1
    </p>
    
    <p>
      sudo update-alternatives &#8211;install &#8220;/usr/lib/jvm&#8221; &#8220;javac&#8221; &#8220;/usr/lib/jvm/jdk1.6.0_30/bin/javac&#8221; 1<br /> sudo update-alternatives &#8211;set java /usr/lib/jvm/jre1.6.0_30/bin/java
    </p>
  </div>
</div>

<div class="step">
  <span class="stepNumber">3</span> Confirm that the new JRE/JDK are the default versions:</p> 
  
  <div class="bash">
    java -version<br /> javac -version
  </div>
</div>

<div class="step">
  <span class="stepNumber">4</span> Clean up:</p> 
  
  <div class="bash">
    . /etc/profile<br /> sudo rm *.bin
  </div>
</div>

Sure, you may ask what is wrong with OpenJDK, which does have a nice auto installer? Simply, for many enterprise Java bits, it just does not fly, and if Oracle had their way, it would not exist. Again, too bad Oracle is [working to kill Java][1].

 [1]: http://blogs.adobe.com/open/2010/08/oracle-closed-minds-and-open-source.html