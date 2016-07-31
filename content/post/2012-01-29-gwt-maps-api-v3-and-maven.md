---
title: GWT Maps API v3 and Maven
author: Joseph Lust
layout: post
date: 2012-01-29
url: /2012/01/29/gwt-maps-api-v3-and-maven/
tags:
  - Google Web Toolkit (GWT)
  - Maven
---

### Deprecated
This post was for building the pre-alpha version of the[GWT-Maps-V3-API](https://github.com/branflake2267/GWT-Maps-V3-Api). However, it&#8217;s now fully Mavenized and hosted on [GitHib](https://github.com/branflake2267/GWT-Maps-V3-Api). Please check it out from there and simply build it.

### Original Post
I&#8217;ve been a great fan of [Brandon Donnelson&#8217;s](https://plus.google.com/u/1/111739836936169749229/posts) ongoing [gwt-maps-api](http://code.google.com/p/gwt-maps-api/) project. However, I also love the simplicity Maven brings to my projects and life as a whole. The following is how to build the _gwt-maps-api_ project using Maven (m2e) and Eclipse (Indigo). Note that since the project is still prebeta, the below are subject to change. Post a comment if you have an issue or suggestion.

## Assumptions:

  * Eclipse Indigo installed w/ Maven integration.
  * GWT Eclipse plugin installed (for Indigo 3.7).

  Google how to do these tasks if unsure. They should be straight forward.

## Checkout the project

Using Tortoise or your subversion client of choice, check out

```bash
http://gwt-maps-api.googlecode.com/svn/trunk/Apis_Google_Maps/
```

## Import to Eclipse

1. From the Eclipse Project Explorer: **Right Click > Import&#8230; > General > Existing Projects into Workspace.**
2. Click **Browse** and find the location you checked the source out to under **Selected root directory.**
3. Click **Finish** on the Import Wizard.

## Prune Missing Dependencies

First let&#8217;s get rid of the hardcoded references to missing external libraries in the project since these are making Eclipse give your error messages.

  1. **Right Click** your project on the **Projects Explorer > Build Path > Configure Build Path&#8230;** .
  2. Remove the links to other projects under **Projects** tab.
  3. Remove links to external _ajaxloader_, _gwt-user_, _gwt-dev_, and _validation-api_ jars under the **Libraries** tab.

### Mavenize the Project

The project is not currently under Maven dependency control. How sad :(. Let&#8217;s fix that.

  1. **Right Click** on the project in the Project Explorer and click **Maven2 > Enable Dependency Management** (and **Finish**, ignore config options). Now Maven will try to resolve dependencies.
  2. You&#8217;ll need to give it a POM  file to tell it the dependencies and configure the build process. Replace the contents of **pom.xml** in your project root with the below xml and save. Maven will now download and configure the dependencies.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <scm>
        <url>http://gwt-maps-api.googlecode.com/svn</url>
        <connection>scm:svn:http://gwt-maps-api.googlecode.com/svn/trunk/</connection>
        <developerConnection>scm:svn:http://gwt-maps-api.googlecode.com/svn/trunk/</developerConnection>
    </scm>

    <!-- Artifact details that people will use search for this project -->
    <groupId>com.google.gwt.maps</groupId>
    <artifactId>gwt-maps-api-v3</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>Google Web Toolkit Maps API V3</name>
    <url>http://code.google.com/p/gwt-maps-api/</url>

    <!-- Example license -->
    <licenses>
        <license>
            <!-- <name>LGPLv3</name> <url>http://www.gnu.org/licenses/lgpl-3.0.txt</url> -->
        </license>
    </licenses>

    <!-- Dev info -->
    <developers>
        <developer>
            <name>Brandon Donnelson</name>
            <email>branflake2267@gmail.com</email>
            <organization>Gone Vertical LLC</organization>
            <url>http://gonevertical.com/</url>
        </developer>
    </developers>

    <properties>
        <!-- Java props -->
        <javaVersion>1.6</javaVersion>
        <no.unittests>false</no.unittests>
        <webappDirectory>${project.build.directory}/${project.build.finalName}</webappDirectory>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

        <!-- GWT props -->
        <gwt.version>2.4.0</gwt.version>
        <gwt.extraJvmArgs>-Xmx1024m -Xss8m</gwt.extraJvmArgs>
        <gwt.test.skip>false</gwt.test.skip>
    </properties>

    <!-- Actual build instructions and sequences -->
    <build>

        <!-- Generate compiled stuff in the folder used for developing mode -->
        <!--<outputDirectory>${project.build.directory}/war/WEB-INF/classes</outputDirectory> -->
        <outputDirectory>${basedir}/war/WEB-INF/classes</outputDirectory>
        <testOutputDirectory>${basedir}/target/test-classes</testOutputDirectory>

        <!-- Build this code -->
        <sourceDirectory>src</sourceDirectory>
        <testSourceDirectory>test</testSourceDirectory>

        <!-- Plugins needed for building -->
        <plugins>
            <!-- Build and package module as GWT jar w/ .gwt inside -->
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>gwt-maven-plugin</artifactId>
                <version>2.4.0</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>resources</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <module>com.google.gwt.maps.Apis_Google_Maps</module>
                </configuration>
            </plugin>
            <!-- Build using java 1.6. GWT requires at least Java 1.5 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.3.2</version>

                <configuration>
                    <source>${javaVersion}</source>
                    <target>${javaVersion}</target>
                </configuration>
            </plugin>
            <!-- Deploy source code in the repository -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-source-plugin</artifactId>
                <version>2.1.2</version>

                <executions>
                    <execution>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <!-- Deploy javadoc in the repository -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-javadoc-plugin</artifactId>
                <version>2.8</version>

                <executions>
                    <execution>
                        <id>attach-javadocs</id>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>

    </build>

    <!-- External project dependencies -->
    <dependencies>

        <!-- Other Google -->
        <dependency>
            <groupId>com.google.gwt.google-apis</groupId>
            <artifactId>gwt-ajaxloader</artifactId>
            <version>1.1.0</version>
        </dependency>
        <!-- Just the necessary GWT bits -->
        <dependency>
            <groupId>com.google.gwt</groupId>
            <artifactId>gwt-user</artifactId>
            <version>${gwt.version}</version>
            <scope>provided</scope> <!-- don't copy to jar -->
        </dependency>
        <dependency>
            <groupId>com.google.gwt</groupId>
            <artifactId>gwt-dev</artifactId>
            <version>${gwt.version}</version> <!-- don't copy to jar -->
        </dependency>
        <!-- Testing -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.7</version>
            <scope>test</scope> <!-- don't copy to jar -->
        </dependency>

    </dependencies>

</project>
```

## Make Project a GWT Project

This will enable the GWT Eclipse plugin functionality for this project.

  1. **Right Click** project from **Project Explorer > Google > Google Web Toolkit Settings&#8230;** .
  2. Check (or uncheck and recheck) **Use Google Web Toolkit** checkbox. It should be using the second radio button **Use specific SDK** which is the maven GWT  jar.

## Build and Install Project

Now we&#8217;ll build the project and package it into a GWT Library.

  1. **Right Click** project from **Project Explorer > Run as > Run Configurations&#8230;** .
  2. **Right Click** on **Maven Build** and click **New**.
  3. Under **Name** give your this configuration a name like &#8220;_Build gwt-maps-api Library._&#8220;
  4. Under **Base Directory** click **Browse Worldspace&#8230;** and select the current project.
  5. Under **Goals** enter _clean compile package install_. This will clean out the project, compile it, package it into a jar and install it in your local Maven repo.
  6. Click **Apply** and click **Run**. Now you should see a bunch of output ending in _BUILD SUCCESS._

Horay!

You&#8217;ve now built the API and can use it. To stay up today, update your project via Subversion and just rebuild it! That was easy.

## Using the Library in your Project

  For your new map API consuming GWT project, either add the above jar file into your <strong>Build Path</strong> as an <strong>External JAR</strong> or add the following dependency if it is a Maven project (easier, Maven rocks!).

```xml
<dependency>
 <groupId>com.google.gwt.maps</groupId>
 <artifactId>gwt-maps-api-v3</artifactId>
 <version>1.0.0-SNAPSHOT</version>
</dependency>
```

Now just inheirt this in your module that uses it. In the <em>yourModule.gwt.xml</em> add:

```xml
...
  <!-- Load the gwt maps api -->
  <inherits name='com.google.gwt.maps.Apis_Google_Maps'/>
...
```
