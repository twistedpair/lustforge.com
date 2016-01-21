---
title: GWT war file Size Reduction – a.k.a GWT Weightloss
author: Joe
layout: post
date: 2012-07-03
url: /2012/07/03/gwt-war-file-size-reduction-a-k-a-gwt-weightloss/
categories:
  - Google Web Toolkit (GWT)
  - Maven

---
GWT is great, but the size and number of files compiled can slowly creep upward. In a large project, this can mean your war file contains thousands of unneeded files. On environments like AppEngine, where the size of your war is limited, this introduces an upper bound on the application size.

Don&#8217;t worry, you can easily slim that war down.

### The Stowaways

  * _**.gwt-tmp/**_ &#8211; used in the compile process, we don&#8217;t need them anymore
  * **_.junit_symbolMaps/_** &#8211; used by juint, not needed in production
  * **WEB-INF/classes/com/yourPkg/** &#8211; compiled java classes, but client runs JS

<div>
  But, you don&#8217;t want to ax the entire WEB-INF/ folder since it contains .rpc manifests. Hold on to these or RPC&#8217;s will be bollixed.
</div>

### Maven to the rescue

The following line used when packaging your war using the **maven-antrun-plugin** does the trick, or you can just do it by hand or your scripting framework of choice.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=74&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-xml" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">plugin&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>org.apache.maven.plugins&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">groupId&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>maven-antrun-plugin&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">artifactId&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>1.6&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">version&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">executions&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">execution&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">id&lt;/span>&gt;&lt;/span>package-configuration&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">id&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">phase&lt;/span>&gt;&lt;/span>generate-resources&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">phase&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">configuration&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">tasks&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">echo&lt;/span> &lt;span class="attribute" style="color: #008080;">message&lt;/span>=&lt;span class="value" style="color: #dd1144;">"Copying GWT resources into WAR file"&lt;/span> /&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">copy&lt;/span> &lt;span class="attribute" style="color: #008080;">todir&lt;/span>=&lt;span class="value" style="color: #dd1144;">"${project.build.directory}/${project.warOutputName}"&lt;/span>&gt;&lt;/span>
                        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">fileset&lt;/span> &lt;span class="attribute" style="color: #008080;">dir&lt;/span>=&lt;span class="value" style="color: #dd1144;">"../gwt/target/yourModuleName"&lt;/span>&gt;&lt;/span>
                            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">exclude&lt;/span> &lt;span class="attribute" style="color: #008080;">name&lt;/span>=&lt;span class="value" style="color: #dd1144;">"**/.gwt-tmp/**"&lt;/span> /&gt;&lt;/span>
                            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">exclude&lt;/span> &lt;span class="attribute" style="color: #008080;">name&lt;/span>=&lt;span class="value" style="color: #dd1144;">"**/*junit_symbolMaps/**"&lt;/span> /&gt;&lt;/span>
                             &lt;span class="comment" style="color: #999988; font-style: italic;">&lt;!-- Just want JS files, not classes, rpc --&gt;&lt;/span>
                            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">exclude&lt;/span> &lt;span class="attribute" style="color: #008080;">name&lt;/span>=&lt;span class="value" style="color: #dd1144;">"**/WEB-INF/classes/com/yourPkg/**"&lt;/span> /&gt;&lt;/span>
                        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">fileset&lt;/span>&gt;&lt;/span>
                    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">copy&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">tasks&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">configuration&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">goals&lt;/span>&gt;&lt;/span>
                &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;&lt;span class="title" style="color: #000080; font-weight: normal;">goal&lt;/span>&gt;&lt;/span>run&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">goal&lt;/span>&gt;&lt;/span>
            &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">goals&lt;/span>&gt;&lt;/span>
        &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">execution&lt;/span>&gt;&lt;/span>
    &lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">executions&lt;/span>&gt;&lt;/span>
&lt;span class="tag" style="color: #000080; font-weight: normal;">&lt;/&lt;span class="title" style="color: #000080; font-weight: normal;">plugin&lt;/span>&gt;&lt;/span>
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgeG1sPGJyPiZsdDtwbHVnaW4mZ3Q7PGJyPgkmbHQ7Z3JvdXBJZCZndDtvcmcuYXBhY2hlLm1h
dmVuLnBsdWdpbnMmbHQ7L2dyb3VwSWQmZ3Q7PGJyPgkmbHQ7YXJ0aWZhY3RJZCZndDttYXZlbi1h
bnRydW4tcGx1Z2luJmx0Oy9hcnRpZmFjdElkJmd0Ozxicj4JJmx0O3ZlcnNpb24mZ3Q7MS42Jmx0
Oy92ZXJzaW9uJmd0Ozxicj4JJmx0O2V4ZWN1dGlvbnMmZ3Q7PGJyPgkJJmx0O2V4ZWN1dGlvbiZn
dDs8YnI+CQkJJmx0O2lkJmd0O3BhY2thZ2UtY29uZmlndXJhdGlvbiZsdDsvaWQmZ3Q7PGJyPgkJ
CSZsdDtwaGFzZSZndDtnZW5lcmF0ZS1yZXNvdXJjZXMmbHQ7L3BoYXNlJmd0Ozxicj4JCQkmbHQ7
Y29uZmlndXJhdGlvbiZndDs8YnI+CQkJCSZsdDt0YXNrcyZndDs8YnI+CQkJCQkmbHQ7ZWNobyBt
ZXNzYWdlPSJDb3B5aW5nIEdXVCByZXNvdXJjZXMgaW50byBXQVIgZmlsZSIgLyZndDs8YnI+CQkJ
CQkmbHQ7Y29weSB0b2Rpcj0iJHtwcm9qZWN0LmJ1aWxkLmRpcmVjdG9yeX0vJHtwcm9qZWN0Lndh
ck91dHB1dE5hbWV9IiZndDs8YnI+CQkJCQkJJmx0O2ZpbGVzZXQgZGlyPSIuLi9nd3QvdGFyZ2V0
L3lvdXJNb2R1bGVOYW1lIiZndDs8YnI+CQkJCQkJCSZsdDtleGNsdWRlIG5hbWU9IioqLy5nd3Qt
dG1wLyoqIiAvJmd0Ozxicj4JCQkJCQkJJmx0O2V4Y2x1ZGUgbmFtZT0iKiovKmp1bml0X3N5bWJv
bE1hcHMvKioiIC8mZ3Q7PGJyPgkJCQkJCQkgJmx0OyEtLSBKdXN0IHdhbnQgSlMgZmlsZXMsIG5v
dCBjbGFzc2VzLCBycGMgLS0mZ3Q7PGJyPgkJCQkJCQkmbHQ7ZXhjbHVkZSBuYW1lPSIqKi9XRUIt
SU5GL2NsYXNzZXMvY29tL3lvdXJQa2cvKioiIC8mZ3Q7PGJyPgkJCQkJCSZsdDsvZmlsZXNldCZn
dDs8YnI+CQkJCQkmbHQ7L2NvcHkmZ3Q7PGJyPgkJCQkmbHQ7L3Rhc2tzJmd0Ozxicj4JCQkmbHQ7
L2NvbmZpZ3VyYXRpb24mZ3Q7PGJyPgkJCSZsdDtnb2FscyZndDs8YnI+CQkJCSZsdDtnb2FsJmd0
O3J1biZsdDsvZ29hbCZndDs8YnI+CQkJJmx0Oy9nb2FscyZndDs8YnI+CQkmbHQ7L2V4ZWN1dGlv
biZndDs8YnI+CSZsdDsvZXhlY3V0aW9ucyZndDs8YnI+Jmx0Oy9wbHVnaW4mZ3Q7PGJyPmBgYA==">
    ​
  </div>
</div>

### Case Study

On my project, we took the number of GWT files in the war from 2800 to 400. If we made better use of [CSSResource][1], [ImageResource][2], and [DataResource][3], it would be more like 150 files in the war.

  * Saved 2400 files from war file
  * Saved 50% on war file size
  * Sped up compilation by 90 seconds

 [1]: https://developers.google.com/web-toolkit/doc/latest/DevGuideClientBundle#CssResource
 [2]: https://developers.google.com/web-toolkit/doc/latest/DevGuideClientBundle#ImageResource
 [3]: https://developers.google.com/web-toolkit/doc/latest/DevGuideClientBundle#DataResource