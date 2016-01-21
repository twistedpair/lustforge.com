---
title: GWT Maps API v3 and Maven
author: Joe
layout: post
date: 2012-01-29
url: /2012/01/29/gwt-maps-api-v3-and-maven/
categories:
  - Google Web Toolkit (GWT)
  - Maven
tags:
  - Google Web Toolkit (GWT)
  - Maven

---
<span class="deprecated">Deprecated<br /> This post was for building the pre-alpha version of the <a href="https://github.com/branflake2267/GWT-Maps-V3-Api">GWT-Maps-V3-API</a>. However, it&#8217;s now fully Mavenized and hosted on <a href="https://github.com/branflake2267/GWT-Maps-V3-Api">GitHib</a>. Please check it out from there and simply build it.</span>

I&#8217;ve been a great fan of <a title="Brandon's Google+ page" href="https://plus.google.com/u/1/111739836936169749229/posts" target="_blank">Brandon Donnelson&#8217;s</a> ongoing <a title="Project Google Code Page" href="http://code.google.com/p/gwt-maps-api/" target="_blank">gwt-maps-api</a> project. However, I also love the simplicity Maven brings to my projects and life as a whole. The following is how to build the _gwt-maps-api_ project using Maven (m2e) and Eclipse (Indigo). Note that since the project is still prebeta, the below are subject to change. Post a comment if you have an issue or suggestion.

**Assumptions:**

  * Eclipse Indigo installed w/ Maven integration.
  * GWT Eclipse plugin installed (for Indigo 3.7).

<div>
  Google how to do these tasks if unsure. They should be straight forward.
</div>

<div>
</div>

### Checkout the project

Using Tortoise or your subversion client of choice, check out

    <strong>http://gwt-maps-api.googlecode.com/svn/trunk/Apis_Google_Maps/</strong>

### Import to Eclipse

From the Eclipse Project Explorer: **Right Click > Import&#8230; > General > Existing Projects into Workspace.**

Click **Browse** and find the location you checked the source out to under **Selected root directory.**

Click **Finish** on the Import Wizard.

### Prune Missing Dependencies

First let&#8217;s get rid of the hardcoded references to missing external libraries in the project since these are making Eclipse give your error messages.

  1. **Right Click** your project on the **Projects Explorer > Build Path > Configure Build Path&#8230;** .
  2. Remove the links to other projects under **Projects** tab.
  3. Remove links to external _ajaxloader_, _gwt-user_, _gwt-dev_, and _validation-api_ jars under the **Libraries** tab.

### Mavenize the Project

The project is not currently under Maven dependency control. How sad :(. Let&#8217;s fix that.

  1. **Right Click** on the project in the Project Explorer and click **Maven2 > Enable Dependency Management** (and **Finish**, ignore config options). Now Maven will try to resolve dependencies.
  2. You&#8217;ll need to give it a POM  file to tell it the dependencies and configure the build process. Replace the contents of **pom.xml** in your project root with the below xml and save. Maven will now download and configure the dependencies.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=54&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">project&lt;/span> &lt;span class="attribute" style="color: #008080;">xmlns&lt;/span>=&lt;span class="value" style="color: #dd1144;">"http://maven.apache.org/POM/4.0.0"&lt;/span> &lt;span class="attribute" style="color: #008080;">xmlns:xsi&lt;/span>=&lt;span class="value" style="color: #dd1144;">"http://www.w3.org/2001/XMLSchema-instance"&lt;/span>
 &lt;span class="attribute" style="color: #008080;">xsi:schemaLocation&lt;/span>=&lt;span class="value" style="color: #dd1144;">"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"&lt;/span>&gt;&lt;/span>

    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">modelVersion&lt;/span>&gt;&lt;/span>4.0.0&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">modelVersion&lt;/span>&gt;&lt;/span>

    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">scm&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">url&lt;/span>&gt;&lt;/span>http://gwt-maps-api.googlecode.com/svn&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">url&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">connection&lt;/span>&gt;&lt;/span>scm:svn:http://gwt-maps-api.googlecode.com/svn/trunk/&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">connection&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">developerConnection&lt;/span>&gt;&lt;/span>scm:svn:http://gwt-maps-api.googlecode.com/svn/trunk/&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">developerConnection&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">scm&lt;/span>&gt;&lt;/span>

    &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Artifact details that people will use search for this project --&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>com.google.gwt.maps&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>gwt-maps-api-v3&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>1.0.0-SNAPSHOT&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">name&lt;/span>&gt;&lt;/span>Google Web Toolkit Maps API V3&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">name&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">url&lt;/span>&gt;&lt;/span>http://code.google.com/p/gwt-maps-api/&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">url&lt;/span>&gt;&lt;/span>

    &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Example license --&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">licenses&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">license&lt;/span>&gt;&lt;/span>
            &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- &lt;name&gt;LGPLv3&lt;/name&gt; &lt;url&gt;http://www.gnu.org/licenses/lgpl-3.0.txt&lt;/url&gt; --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">license&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">licenses&lt;/span>&gt;&lt;/span>

    &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Dev info --&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">developers&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">developer&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">name&lt;/span>&gt;&lt;/span>Brandon Donnelson&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">name&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">email&lt;/span>&gt;&lt;/span>branflake2267@gmail.com&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">email&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">organization&lt;/span>&gt;&lt;/span>Gone Vertical LLC&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">organization&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">url&lt;/span>&gt;&lt;/span>http://gonevertical.com/&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">url&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">developer&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">developers&lt;/span>&gt;&lt;/span>

    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">properties&lt;/span>&gt;&lt;/span>
        &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Java props --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">javaVersion&lt;/span>&gt;&lt;/span>1.6&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">javaVersion&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">no.unittests&lt;/span>&gt;&lt;/span>false&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">no.unittests&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">webappDirectory&lt;/span>&gt;&lt;/span>${project.build.directory}/${project.build.finalName}&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">webappDirectory&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">project.build.sourceEncoding&lt;/span>&gt;&lt;/span>UTF-8&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">project.build.sourceEncoding&lt;/span>&gt;&lt;/span>

        &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- GWT props --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">gwt.version&lt;/span>&gt;&lt;/span>2.4.0&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">gwt.version&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">gwt.extraJvmArgs&lt;/span>&gt;&lt;/span>-Xmx1024m -Xss8m&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">gwt.extraJvmArgs&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">gwt.test.skip&lt;/span>&gt;&lt;/span>false&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">gwt.test.skip&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">properties&lt;/span>&gt;&lt;/span>

    &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Actual build instructions and sequences --&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">build&lt;/span>&gt;&lt;/span>

        &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Generate compiled stuff in the folder used for developing mode --&gt;&lt;/span>
        &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!--&lt;outputDirectory&gt;${project.build.directory}/war/WEB-INF/classes&lt;/outputDirectory&gt; --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">outputDirectory&lt;/span>&gt;&lt;/span>${basedir}/war/WEB-INF/classes&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">outputDirectory&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">testOutputDirectory&lt;/span>&gt;&lt;/span>${basedir}/target/test-classes&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">testOutputDirectory&lt;/span>&gt;&lt;/span>

        &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Build this code --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">sourceDirectory&lt;/span>&gt;&lt;/span>src&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">sourceDirectory&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">testSourceDirectory&lt;/span>&gt;&lt;/span>test&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">testSourceDirectory&lt;/span>&gt;&lt;/span>

        &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Plugins needed for building --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">plugins&lt;/span>&gt;&lt;/span>
            &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Build and package module as GWT jar w/ .gwt inside --&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">plugin&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>org.codehaus.mojo&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>gwt-maven-plugin&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>2.4.0&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">executions&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">execution&lt;/span>&gt;&lt;/span>
                        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">goals&lt;/span>&gt;&lt;/span>
                            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">goal&lt;/span>&gt;&lt;/span>resources&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">goal&lt;/span>&gt;&lt;/span>
                        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">goals&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">execution&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">executions&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">configuration&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">module&lt;/span>&gt;&lt;/span>com.google.gwt.maps.Apis_Google_Maps&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">module&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">configuration&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">plugin&lt;/span>&gt;&lt;/span>
            &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Build using java 1.6. GWT requires at least Java 1.5 --&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">plugin&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>org.apache.maven.plugins&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>maven-compiler-plugin&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>2.3.2&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>

                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">configuration&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">source&lt;/span>&gt;&lt;/span>${javaVersion}&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">source&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">target&lt;/span>&gt;&lt;/span>${javaVersion}&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">target&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">configuration&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">plugin&lt;/span>&gt;&lt;/span>
            &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Deploy source code in the repository --&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">plugin&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>org.apache.maven.plugins&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>maven-source-plugin&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>2.1.2&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>

                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">executions&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">execution&lt;/span>&gt;&lt;/span>
                        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">goals&lt;/span>&gt;&lt;/span>
                            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">goal&lt;/span>&gt;&lt;/span>jar&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">goal&lt;/span>&gt;&lt;/span>
                        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">goals&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">execution&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">executions&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">plugin&lt;/span>&gt;&lt;/span>
            &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Deploy javadoc in the repository --&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">plugin&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>org.apache.maven.plugins&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>maven-javadoc-plugin&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>2.8&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>

                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">executions&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">execution&lt;/span>&gt;&lt;/span>
                        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">id&lt;/span>&gt;&lt;/span>attach-javadocs&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">id&lt;/span>&gt;&lt;/span>
                        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">goals&lt;/span>&gt;&lt;/span>
                            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">goal&lt;/span>&gt;&lt;/span>jar&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">goal&lt;/span>&gt;&lt;/span>
                        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">goals&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">execution&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">executions&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">plugin&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">plugins&lt;/span>&gt;&lt;/span>

    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">build&lt;/span>&gt;&lt;/span>

    &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- External project dependencies --&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">dependencies&lt;/span>&gt;&lt;/span>

        &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Other Google --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>com.google.gwt.google-apis&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>gwt-ajaxloader&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>1.1.0&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
        &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Just the necessary GWT bits --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>com.google.gwt&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>gwt-user&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>${gwt.version}&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">scope&lt;/span>&gt;&lt;/span>provided&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">scope&lt;/span>&gt;&lt;/span> &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- don't copy to jar --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>com.google.gwt&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>gwt-dev&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>${gwt.version}&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span> &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- don't copy to jar --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
        &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Testing --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>junit&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>junit&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>4.7&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">scope&lt;/span>&gt;&lt;/span>test&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">scope&lt;/span>&gt;&lt;/span> &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- don't copy to jar --&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>

    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">dependencies&lt;/span>&gt;&lt;/span>

&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">project&lt;/span>&gt;&lt;/span>
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgeG1sPGJyPiZsdDtwcm9qZWN0IHhtbG5zPSJodHRwOi8vbWF2ZW4uYXBhY2hlLm9yZy9QT00v<br /><br />
NC4wLjAiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFu<br /><br />
Y2UiPGJyPiB4c2k6c2NoZW1hTG9jYXRpb249Imh0dHA6Ly9tYXZlbi5hcGFjaGUub3JnL1BPTS80<br /><br />
LjAuMCBodHRwOi8vbWF2ZW4uYXBhY2hlLm9yZy94c2QvbWF2ZW4tNC4wLjAueHNkIiZndDs8YnI+<br /><br />
PGJyPiAgICAmbHQ7bW9kZWxWZXJzaW9uJmd0OzQuMC4wJmx0Oy9tb2RlbFZlcnNpb24mZ3Q7PGJy<br /><br />
Pjxicj4gICAgJmx0O3NjbSZndDs8YnI+ICAgICAgICAmbHQ7dXJsJmd0O2h0dHA6Ly9nd3QtbWFw<br /><br />
cy1hcGkuZ29vZ2xlY29kZS5jb20vc3ZuJmx0Oy91cmwmZ3Q7PGJyPiAgICAgICAgJmx0O2Nvbm5l<br /><br />
Y3Rpb24mZ3Q7c2NtOnN2bjpodHRwOi8vZ3d0LW1hcHMtYXBpLmdvb2dsZWNvZGUuY29tL3N2bi90<br /><br />
cnVuay8mbHQ7L2Nvbm5lY3Rpb24mZ3Q7PGJyPiAgICAgICAgJmx0O2RldmVsb3BlckNvbm5lY3Rp<br /><br />
b24mZ3Q7c2NtOnN2bjpodHRwOi8vZ3d0LW1hcHMtYXBpLmdvb2dsZWNvZGUuY29tL3N2bi90cnVu<br /><br />
ay8mbHQ7L2RldmVsb3BlckNvbm5lY3Rpb24mZ3Q7PGJyPiAgICAmbHQ7L3NjbSZndDs8YnI+PGJy<br /><br />
PiAgICAmbHQ7IS0tIEFydGlmYWN0IGRldGFpbHMgdGhhdCBwZW9wbGUgd2lsbCB1c2Ugc2VhcmNo<br /><br />
IGZvciB0aGlzIHByb2plY3QgLS0mZ3Q7PGJyPiAgICAmbHQ7Z3JvdXBJZCZndDtjb20uZ29vZ2xl<br /><br />
Lmd3dC5tYXBzJmx0Oy9ncm91cElkJmd0Ozxicj4gICAgJmx0O2FydGlmYWN0SWQmZ3Q7Z3d0LW1h<br /><br />
cHMtYXBpLXYzJmx0Oy9hcnRpZmFjdElkJmd0Ozxicj4gICAgJmx0O3ZlcnNpb24mZ3Q7MS4wLjAt<br /><br />
U05BUFNIT1QmbHQ7L3ZlcnNpb24mZ3Q7PGJyPiAgICAmbHQ7bmFtZSZndDtHb29nbGUgV2ViIFRv<br /><br />
b2xraXQgTWFwcyBBUEkgVjMmbHQ7L25hbWUmZ3Q7PGJyPiAgICAmbHQ7dXJsJmd0O2h0dHA6Ly9j<br /><br />
b2RlLmdvb2dsZS5jb20vcC9nd3QtbWFwcy1hcGkvJmx0Oy91cmwmZ3Q7PGJyPjxicj4gICAgJmx0<br /><br />
OyEtLSBFeGFtcGxlIGxpY2Vuc2UgLS0mZ3Q7PGJyPiAgICAmbHQ7bGljZW5zZXMmZ3Q7PGJyPiAg<br /><br />
ICAgICAgJmx0O2xpY2Vuc2UmZ3Q7PGJyPiAgICAgICAgICAgICZsdDshLS0gJmx0O25hbWUmZ3Q7<br /><br />
TEdQTHYzJmx0Oy9uYW1lJmd0OyAmbHQ7dXJsJmd0O2h0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNl<br /><br />
cy9sZ3BsLTMuMC50eHQmbHQ7L3VybCZndDsgLS0mZ3Q7PGJyPiAgICAgICAgJmx0Oy9saWNlbnNl<br /><br />
Jmd0Ozxicj4gICAgJmx0Oy9saWNlbnNlcyZndDs8YnI+PGJyPiAgICAmbHQ7IS0tIERldiBpbmZv<br /><br />
IC0tJmd0Ozxicj4gICAgJmx0O2RldmVsb3BlcnMmZ3Q7PGJyPiAgICAgICAgJmx0O2RldmVsb3Bl<br /><br />
ciZndDs8YnI+ICAgICAgICAgICAgJmx0O25hbWUmZ3Q7QnJhbmRvbiBEb25uZWxzb24mbHQ7L25h<br /><br />
bWUmZ3Q7PGJyPiAgICAgICAgICAgICZsdDtlbWFpbCZndDticmFuZmxha2UyMjY3QGdtYWlsLmNv<br /><br />
bSZsdDsvZW1haWwmZ3Q7PGJyPiAgICAgICAgICAgICZsdDtvcmdhbml6YXRpb24mZ3Q7R29uZSBW<br /><br />
ZXJ0aWNhbCBMTEMmbHQ7L29yZ2FuaXphdGlvbiZndDs8YnI+ICAgICAgICAgICAgJmx0O3VybCZn<br /><br />
dDtodHRwOi8vZ29uZXZlcnRpY2FsLmNvbS8mbHQ7L3VybCZndDs8YnI+ICAgICAgICAmbHQ7L2Rl<br /><br />
dmVsb3BlciZndDs8YnI+ICAgICZsdDsvZGV2ZWxvcGVycyZndDs8YnI+PGJyPiAgICAmbHQ7cHJv<br /><br />
cGVydGllcyZndDs8YnI+ICAgICAgICAmbHQ7IS0tIEphdmEgcHJvcHMgLS0mZ3Q7PGJyPiAgICAg<br /><br />
ICAgJmx0O2phdmFWZXJzaW9uJmd0OzEuNiZsdDsvamF2YVZlcnNpb24mZ3Q7PGJyPiAgICAgICAg<br /><br />
Jmx0O25vLnVuaXR0ZXN0cyZndDtmYWxzZSZsdDsvbm8udW5pdHRlc3RzJmd0Ozxicj4gICAgICAg<br /><br />
ICZsdDt3ZWJhcHBEaXJlY3RvcnkmZ3Q7JHtwcm9qZWN0LmJ1aWxkLmRpcmVjdG9yeX0vJHtwcm9q<br /><br />
ZWN0LmJ1aWxkLmZpbmFsTmFtZX0mbHQ7L3dlYmFwcERpcmVjdG9yeSZndDs8YnI+ICAgICAgICAm<br /><br />
bHQ7cHJvamVjdC5idWlsZC5zb3VyY2VFbmNvZGluZyZndDtVVEYtOCZsdDsvcHJvamVjdC5idWls<br /><br />
ZC5zb3VyY2VFbmNvZGluZyZndDs8YnI+PGJyPiAgICAgICAgJmx0OyEtLSBHV1QgcHJvcHMgLS0m<br /><br />
Z3Q7PGJyPiAgICAgICAgJmx0O2d3dC52ZXJzaW9uJmd0OzIuNC4wJmx0Oy9nd3QudmVyc2lvbiZn<br /><br />
dDs8YnI+ICAgICAgICAmbHQ7Z3d0LmV4dHJhSnZtQXJncyZndDstWG14MTAyNG0gLVhzczhtJmx0<br /><br />
Oy9nd3QuZXh0cmFKdm1BcmdzJmd0Ozxicj4gICAgICAgICZsdDtnd3QudGVzdC5za2lwJmd0O2Zh<br /><br />
bHNlJmx0Oy9nd3QudGVzdC5za2lwJmd0Ozxicj4gICAgJmx0Oy9wcm9wZXJ0aWVzJmd0Ozxicj48<br /><br />
YnI+ICAgICZsdDshLS0gQWN0dWFsIGJ1aWxkIGluc3RydWN0aW9ucyBhbmQgc2VxdWVuY2VzIC0t<br /><br />
Jmd0Ozxicj4gICAgJmx0O2J1aWxkJmd0Ozxicj48YnI+ICAgICAgICAmbHQ7IS0tIEdlbmVyYXRl<br /><br />
IGNvbXBpbGVkIHN0dWZmIGluIHRoZSBmb2xkZXIgdXNlZCBmb3IgZGV2ZWxvcGluZyBtb2RlIC0t<br /><br />
Jmd0Ozxicj4gICAgICAgICZsdDshLS0mbHQ7b3V0cHV0RGlyZWN0b3J5Jmd0OyR7cHJvamVjdC5i<br /><br />
dWlsZC5kaXJlY3Rvcnl9L3dhci9XRUItSU5GL2NsYXNzZXMmbHQ7L291dHB1dERpcmVjdG9yeSZn<br /><br />
dDsgLS0mZ3Q7PGJyPiAgICAgICAgJmx0O291dHB1dERpcmVjdG9yeSZndDske2Jhc2VkaXJ9L3dh<br /><br />
ci9XRUItSU5GL2NsYXNzZXMmbHQ7L291dHB1dERpcmVjdG9yeSZndDs8YnI+ICAgICAgICAmbHQ7<br /><br />
dGVzdE91dHB1dERpcmVjdG9yeSZndDske2Jhc2VkaXJ9L3RhcmdldC90ZXN0LWNsYXNzZXMmbHQ7<br /><br />
L3Rlc3RPdXRwdXREaXJlY3RvcnkmZ3Q7PGJyPjxicj4gICAgICAgICZsdDshLS0gQnVpbGQgdGhp<br /><br />
cyBjb2RlIC0tJmd0Ozxicj4gICAgICAgICZsdDtzb3VyY2VEaXJlY3RvcnkmZ3Q7c3JjJmx0Oy9z<br /><br />
b3VyY2VEaXJlY3RvcnkmZ3Q7PGJyPiAgICAgICAgJmx0O3Rlc3RTb3VyY2VEaXJlY3RvcnkmZ3Q7<br /><br />
dGVzdCZsdDsvdGVzdFNvdXJjZURpcmVjdG9yeSZndDs8YnI+PGJyPiAgICAgICAgJmx0OyEtLSBQ<br /><br />
bHVnaW5zIG5lZWRlZCBmb3IgYnVpbGRpbmcgLS0mZ3Q7PGJyPiAgICAgICAgJmx0O3BsdWdpbnMm<br /><br />
Z3Q7PGJyPiAgICAgICAgICAgICZsdDshLS0gQnVpbGQgYW5kIHBhY2thZ2UgbW9kdWxlIGFzIEdX<br /><br />
VCBqYXIgdy8gLmd3dCBpbnNpZGUgLS0mZ3Q7PGJyPiAgICAgICAgICAgICZsdDtwbHVnaW4mZ3Q7<br /><br />
PGJyPiAgICAgICAgICAgICAgICAmbHQ7Z3JvdXBJZCZndDtvcmcuY29kZWhhdXMubW9qbyZsdDsv<br /><br />
Z3JvdXBJZCZndDs8YnI+ICAgICAgICAgICAgICAgICZsdDthcnRpZmFjdElkJmd0O2d3dC1tYXZl<br /><br />
bi1wbHVnaW4mbHQ7L2FydGlmYWN0SWQmZ3Q7PGJyPiAgICAgICAgICAgICAgICAmbHQ7dmVyc2lv<br /><br />
biZndDsyLjQuMCZsdDsvdmVyc2lvbiZndDs8YnI+ICAgICAgICAgICAgICAgICZsdDtleGVjdXRp<br /><br />
b25zJmd0Ozxicj4gICAgICAgICAgICAgICAgICAgICZsdDtleGVjdXRpb24mZ3Q7PGJyPiAgICAg<br /><br />
ICAgICAgICAgICAgICAgICAgICZsdDtnb2FscyZndDs8YnI+ICAgICAgICAgICAgICAgICAgICAg<br /><br />
ICAgICAgICZsdDtnb2FsJmd0O3Jlc291cmNlcyZsdDsvZ29hbCZndDs8YnI+ICAgICAgICAgICAg<br /><br />
ICAgICAgICAgICAgJmx0Oy9nb2FscyZndDs8YnI+ICAgICAgICAgICAgICAgICAgICAmbHQ7L2V4<br /><br />
ZWN1dGlvbiZndDs8YnI+ICAgICAgICAgICAgICAgICZsdDsvZXhlY3V0aW9ucyZndDs8YnI+ICAg<br /><br />
ICAgICAgICAgICAgICZsdDtjb25maWd1cmF0aW9uJmd0Ozxicj4gICAgICAgICAgICAgICAgICAg<br /><br />
ICZsdDttb2R1bGUmZ3Q7Y29tLmdvb2dsZS5nd3QubWFwcy5BcGlzX0dvb2dsZV9NYXBzJmx0Oy9t<br /><br />
b2R1bGUmZ3Q7PGJyPiAgICAgICAgICAgICAgICAmbHQ7L2NvbmZpZ3VyYXRpb24mZ3Q7PGJyPiAg<br /><br />
ICAgICAgICAgICZsdDsvcGx1Z2luJmd0Ozxicj4gICAgICAgICAgICAmbHQ7IS0tIEJ1aWxkIHVz<br /><br />
aW5nIGphdmEgMS42LiBHV1QgcmVxdWlyZXMgYXQgbGVhc3QgSmF2YSAxLjUgLS0mZ3Q7PGJyPiAg<br /><br />
ICAgICAgICAgICZsdDtwbHVnaW4mZ3Q7PGJyPiAgICAgICAgICAgICAgICAmbHQ7Z3JvdXBJZCZn<br /><br />
dDtvcmcuYXBhY2hlLm1hdmVuLnBsdWdpbnMmbHQ7L2dyb3VwSWQmZ3Q7PGJyPiAgICAgICAgICAg<br /><br />
ICAgICAmbHQ7YXJ0aWZhY3RJZCZndDttYXZlbi1jb21waWxlci1wbHVnaW4mbHQ7L2FydGlmYWN0<br /><br />
SWQmZ3Q7PGJyPiAgICAgICAgICAgICAgICAmbHQ7dmVyc2lvbiZndDsyLjMuMiZsdDsvdmVyc2lv<br /><br />
biZndDs8YnI+PGJyPiAgICAgICAgICAgICAgICAmbHQ7Y29uZmlndXJhdGlvbiZndDs8YnI+ICAg<br /><br />
ICAgICAgICAgICAgICAgICAmbHQ7c291cmNlJmd0OyR7amF2YVZlcnNpb259Jmx0Oy9zb3VyY2Um<br /><br />
Z3Q7PGJyPiAgICAgICAgICAgICAgICAgICAgJmx0O3RhcmdldCZndDske2phdmFWZXJzaW9ufSZs<br /><br />
dDsvdGFyZ2V0Jmd0Ozxicj4gICAgICAgICAgICAgICAgJmx0Oy9jb25maWd1cmF0aW9uJmd0Ozxi<br /><br />
cj4gICAgICAgICAgICAmbHQ7L3BsdWdpbiZndDs8YnI+ICAgICAgICAgICAgJmx0OyEtLSBEZXBs<br /><br />
b3kgc291cmNlIGNvZGUgaW4gdGhlIHJlcG9zaXRvcnkgLS0mZ3Q7PGJyPiAgICAgICAgICAgICZs<br /><br />
dDtwbHVnaW4mZ3Q7PGJyPiAgICAgICAgICAgICAgICAmbHQ7Z3JvdXBJZCZndDtvcmcuYXBhY2hl<br /><br />
Lm1hdmVuLnBsdWdpbnMmbHQ7L2dyb3VwSWQmZ3Q7PGJyPiAgICAgICAgICAgICAgICAmbHQ7YXJ0<br /><br />
aWZhY3RJZCZndDttYXZlbi1zb3VyY2UtcGx1Z2luJmx0Oy9hcnRpZmFjdElkJmd0Ozxicj4gICAg<br /><br />
ICAgICAgICAgICAgJmx0O3ZlcnNpb24mZ3Q7Mi4xLjImbHQ7L3ZlcnNpb24mZ3Q7PGJyPjxicj4g<br /><br />
ICAgICAgICAgICAgICAgJmx0O2V4ZWN1dGlvbnMmZ3Q7PGJyPiAgICAgICAgICAgICAgICAgICAg<br /><br />
Jmx0O2V4ZWN1dGlvbiZndDs8YnI+ICAgICAgICAgICAgICAgICAgICAgICAgJmx0O2dvYWxzJmd0<br /><br />
Ozxicj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJmx0O2dvYWwmZ3Q7amFyJmx0Oy9nb2Fs<br /><br />
Jmd0Ozxicj4gICAgICAgICAgICAgICAgICAgICAgICAmbHQ7L2dvYWxzJmd0Ozxicj4gICAgICAg<br /><br />
ICAgICAgICAgICAgICZsdDsvZXhlY3V0aW9uJmd0Ozxicj4gICAgICAgICAgICAgICAgJmx0Oy9l<br /><br />
eGVjdXRpb25zJmd0Ozxicj4gICAgICAgICAgICAmbHQ7L3BsdWdpbiZndDs8YnI+ICAgICAgICAg<br /><br />
ICAgJmx0OyEtLSBEZXBsb3kgamF2YWRvYyBpbiB0aGUgcmVwb3NpdG9yeSAtLSZndDs8YnI+ICAg<br /><br />
ICAgICAgICAgJmx0O3BsdWdpbiZndDs8YnI+ICAgICAgICAgICAgICAgICZsdDtncm91cElkJmd0<br /><br />
O29yZy5hcGFjaGUubWF2ZW4ucGx1Z2lucyZsdDsvZ3JvdXBJZCZndDs8YnI+ICAgICAgICAgICAg<br /><br />
ICAgICZsdDthcnRpZmFjdElkJmd0O21hdmVuLWphdmFkb2MtcGx1Z2luJmx0Oy9hcnRpZmFjdElk<br /><br />
Jmd0Ozxicj4gICAgICAgICAgICAgICAgJmx0O3ZlcnNpb24mZ3Q7Mi44Jmx0Oy92ZXJzaW9uJmd0<br /><br />
Ozxicj48YnI+ICAgICAgICAgICAgICAgICZsdDtleGVjdXRpb25zJmd0Ozxicj4gICAgICAgICAg<br /><br />
ICAgICAgICAgICZsdDtleGVjdXRpb24mZ3Q7PGJyPiAgICAgICAgICAgICAgICAgICAgICAgICZs<br /><br />
dDtpZCZndDthdHRhY2gtamF2YWRvY3MmbHQ7L2lkJmd0Ozxicj4gICAgICAgICAgICAgICAgICAg<br /><br />
ICAgICAmbHQ7Z29hbHMmZ3Q7PGJyPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbHQ7Z29h<br /><br />
bCZndDtqYXImbHQ7L2dvYWwmZ3Q7PGJyPiAgICAgICAgICAgICAgICAgICAgICAgICZsdDsvZ29h<br /><br />
bHMmZ3Q7PGJyPiAgICAgICAgICAgICAgICAgICAgJmx0Oy9leGVjdXRpb24mZ3Q7PGJyPiAgICAg<br /><br />
ICAgICAgICAgICAmbHQ7L2V4ZWN1dGlvbnMmZ3Q7PGJyPiAgICAgICAgICAgICZsdDsvcGx1Z2lu<br /><br />
Jmd0Ozxicj4gICAgICAgICZsdDsvcGx1Z2lucyZndDs8YnI+PGJyPiAgICAmbHQ7L2J1aWxkJmd0<br /><br />
Ozxicj48YnI+ICAgICZsdDshLS0gRXh0ZXJuYWwgcHJvamVjdCBkZXBlbmRlbmNpZXMgLS0mZ3Q7<br /><br />
PGJyPiAgICAmbHQ7ZGVwZW5kZW5jaWVzJmd0Ozxicj48YnI+ICAgICAgICAmbHQ7IS0tIE90aGVy<br /><br />
IEdvb2dsZSAtLSZndDs8YnI+ICAgICAgICAmbHQ7ZGVwZW5kZW5jeSZndDs8YnI+ICAgICAgICAg<br /><br />
ICAgJmx0O2dyb3VwSWQmZ3Q7Y29tLmdvb2dsZS5nd3QuZ29vZ2xlLWFwaXMmbHQ7L2dyb3VwSWQm<br /><br />
Z3Q7PGJyPiAgICAgICAgICAgICZsdDthcnRpZmFjdElkJmd0O2d3dC1hamF4bG9hZGVyJmx0Oy9h<br /><br />
cnRpZmFjdElkJmd0Ozxicj4gICAgICAgICAgICAmbHQ7dmVyc2lvbiZndDsxLjEuMCZsdDsvdmVy<br /><br />
c2lvbiZndDs8YnI+ICAgICAgICAmbHQ7L2RlcGVuZGVuY3kmZ3Q7PGJyPiAgICAgICAgJmx0OyEt<br /><br />
LSBKdXN0IHRoZSBuZWNlc3NhcnkgR1dUIGJpdHMgLS0mZ3Q7PGJyPiAgICAgICAgJmx0O2RlcGVu<br /><br />
ZGVuY3kmZ3Q7PGJyPiAgICAgICAgICAgICZsdDtncm91cElkJmd0O2NvbS5nb29nbGUuZ3d0Jmx0<br /><br />
Oy9ncm91cElkJmd0Ozxicj4gICAgICAgICAgICAmbHQ7YXJ0aWZhY3RJZCZndDtnd3QtdXNlciZs<br /><br />
dDsvYXJ0aWZhY3RJZCZndDs8YnI+ICAgICAgICAgICAgJmx0O3ZlcnNpb24mZ3Q7JHtnd3QudmVy<br /><br />
c2lvbn0mbHQ7L3ZlcnNpb24mZ3Q7PGJyPiAgICAgICAgICAgICZsdDtzY29wZSZndDtwcm92aWRl<br /><br />
ZCZsdDsvc2NvcGUmZ3Q7ICZsdDshLS0gZG9uJ3QgY29weSB0byBqYXIgLS0mZ3Q7PGJyPiAgICAg<br /><br />
ICAgJmx0Oy9kZXBlbmRlbmN5Jmd0Ozxicj4gICAgICAgICZsdDtkZXBlbmRlbmN5Jmd0Ozxicj4g<br /><br />
ICAgICAgICAgICAmbHQ7Z3JvdXBJZCZndDtjb20uZ29vZ2xlLmd3dCZsdDsvZ3JvdXBJZCZndDs8<br /><br />
YnI+ICAgICAgICAgICAgJmx0O2FydGlmYWN0SWQmZ3Q7Z3d0LWRldiZsdDsvYXJ0aWZhY3RJZCZn<br /><br />
dDs8YnI+ICAgICAgICAgICAgJmx0O3ZlcnNpb24mZ3Q7JHtnd3QudmVyc2lvbn0mbHQ7L3ZlcnNp<br /><br />
b24mZ3Q7ICZsdDshLS0gZG9uJ3QgY29weSB0byBqYXIgLS0mZ3Q7PGJyPiAgICAgICAgJmx0Oy9k<br /><br />
ZXBlbmRlbmN5Jmd0Ozxicj4gICAgICAgICZsdDshLS0gVGVzdGluZyAtLSZndDs8YnI+ICAgICAg<br /><br />
ICAmbHQ7ZGVwZW5kZW5jeSZndDs8YnI+ICAgICAgICAgICAgJmx0O2dyb3VwSWQmZ3Q7anVuaXQm<br /><br />
bHQ7L2dyb3VwSWQmZ3Q7PGJyPiAgICAgICAgICAgICZsdDthcnRpZmFjdElkJmd0O2p1bml0Jmx0<br /><br />
Oy9hcnRpZmFjdElkJmd0Ozxicj4gICAgICAgICAgICAmbHQ7dmVyc2lvbiZndDs0LjcmbHQ7L3Zl<br /><br />
cnNpb24mZ3Q7PGJyPiAgICAgICAgICAgICZsdDtzY29wZSZndDt0ZXN0Jmx0Oy9zY29wZSZndDsg<br /><br />
Jmx0OyEtLSBkb24ndCBjb3B5IHRvIGphciAtLSZndDs8YnI+ICAgICAgICAmbHQ7L2RlcGVuZGVu<br /><br />
Y3kmZ3Q7PGJyPjxicj4gICAgJmx0Oy9kZXBlbmRlbmNpZXMmZ3Q7PGJyPjxicj4mbHQ7L3Byb2pl<br /><br />
Y3QmZ3Q7PGJyPmBgYA==">
    ​
  </div>
</div>

### **Make Project a GWT Project**

This will enable the GWT Eclipse plugin functionality for this project.

  1. **Right Click** project from **Project Explorer > Google > Google Web Toolkit Settings&#8230;** .
  2. Check (or uncheck and recheck) **Use Google Web Toolkit** checkbox. It should be using the second radio button **Use specific SDK** which is the maven GWT  jar.

### Build and Install Project

Now we&#8217;ll build the project and package it into a GWT Library.

  1. **Right Click** project from **Project Explorer > Run as > Run Configurations&#8230;** .
  2. **Right Click** on **Maven Build** and click **New**.
  3. Under **Name** give your this configuration a name like &#8220;_Build gwt-maps-api Library._&#8220;
  4. Under **Base Directory** click **Browse Worldspace&#8230;** and select the current project.
  5. Under **Goals** enter _clean compile package install_. This will clean out the project, compile it, package it into a jar and install it in your local Maven repo.
  6. Click **Apply** and click **Run**. Now you should see a bunch of output ending in _BUILD SUCCESS._

<div>
  <p>
    <em>Horay!</em>
  </p>
  
  <p>
    You&#8217;ve now built the API and can use it. To stay up today, update your project via Subversion and just rebuild it! That was easy.
  </p>
</div>

<div>
</div>

### Using the Library in your Project

<div>
</div>

<div>
  For your new map API consuming GWT project, either add the above jar file into your <strong>Build Path</strong> as an <strong>External JAR</strong> or add the following dependency if it is a Maven project (easier, Maven rocks!).
</div>

<div>
</div>

<div>
</div>

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=54&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
 &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>com.google.gwt.maps&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
 &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>gwt-maps-api-v3&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
 &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>1.0.0-SNAPSHOT&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>
&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">dependency&lt;/span>&gt;&lt;/span>
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:PGRpdj5gYGB4bWw8L2Rpdj48ZGl2PiZsdDtkZXBlbmRlbmN5Jmd0Ozxicj4gJmx0O2dyb3VwSWQm
Z3Q7Y29tLmdvb2dsZS5nd3QubWFwcyZsdDsvZ3JvdXBJZCZndDs8YnI+ICZsdDthcnRpZmFjdElk
Jmd0O2d3dC1tYXBzLWFwaS12MyZsdDsvYXJ0aWZhY3RJZCZndDs8YnI+ICZsdDt2ZXJzaW9uJmd0
OzEuMC4wLVNOQVBTSE9UJmx0Oy92ZXJzaW9uJmd0Ozxicj4mbHQ7L2RlcGVuZGVuY3kmZ3Q7PC9k
aXY+PGRpdj5gYGA8L2Rpdj4=">
    ​
  </div>
</div>

<div>
</div>

<div>
</div>

<div>
  Now just inheirt this in your module that uses it. In the <em>yourModule.gwt.xml</em> add:
</div>

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=54&action=edit&message=1">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">...
  &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Load the gwt maps api --&gt;&lt;/span>
  &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">inherits&lt;/span> &lt;span class="attribute" style="color: #008080;">name&lt;/span>=&lt;span class="value" style="color: #dd1144;">'com.google.gwt.maps.Apis_Google_Maps'&lt;/span>/&gt;&lt;/span>
...
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgeG1sPGJyPi4uLjxicj4gICZsdDshLS0gTG9hZCB0aGUgZ3d0IG1hcHMgYXBpIC0tJmd0Ozxi<br />
cj4gICZsdDtpbmhlcml0cyBuYW1lPSdjb20uZ29vZ2xlLmd3dC5tYXBzLkFwaXNfR29vZ2xlX01h<br />
cHMnLyZndDs8YnI+Li4uPGJyPmBgYA==">
    ​
  </div>
</div>

<div>
</div>

<div>
</div>