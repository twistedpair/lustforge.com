---
title: GWT war file Size Reduction – a.k.a GWT Weightloss
author: Joe
layout: post
date: 2012-07-03
url: /2012/07/03/gwt-war-file-size-reduction-a-k-a-gwt-weightloss/
tags:
  - Google Web Toolkit (GWT)
  - Maven

---
GWT is great, but the size and number of files compiled can slowly creep upward. In a large project, this can mean your `war` file contains thousands of unneeded files. On environments like AppEngine, where the size of your war is limited, this introduces an upper bound on the application size.

Don&#8217;t worry, you can easily slim that war down.

### The Stowaways

  * `.gwt-tmp/` - used in the compile process, we don&#8217;t need them anymore
  * `_.junit_symbolMaps/` - used by junit, not needed in production
  * `WEB-INF/classes/com/yourPkg/` - compiled java classes, but client runs JS

<div>
  But, you don&#8217;t want to ax the entire `WEB-INF/` folder since it contains .rpc manifests. Hold on to these or RPC&#8217;s will be bollixed.
</div>

### Maven to the rescue

The following line used when packaging your war using the **maven-antrun-plugin** does the trick, or you can just do it by hand or your scripting framework of choice.

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-antrun-plugin</artifactId>
    <version>1.6</version>
    <executions>
        <execution>
            <id>package-configuration</id>
            <phase>generate-resources</phase>
            <configuration>
                <tasks>
                    <echo message="Copying GWT resources into WAR file" />
                    <copy todir="${project.build.directory}/${project.warOutputName}">
                        <fileset dir="../gwt/target/yourModuleName">
                            <exclude name="**/.gwt-tmp/**" />
                            <exclude name="**/*junit_symbolMaps/**" />
                             <!-- Just want JS files, not classes, rpc -->
                            <exclude name="**/WEB-INF/classes/com/yourPkg/**" />
                        </fileset>
                    </copy>
                </tasks>
            </configuration>
            <goals>
                <goal>run</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### Case Study

On my project, we took the number of GWT **files in the war from 2800 to 400**. If we made better use of [CSSResource][1], [ImageResource][2], and [DataResource][3], it would be more like 150 files in the war.

  * Saved 2400 files from war file
  * Saved 50% on war file size
  * Sped up compilation by 90 seconds

 [1]: https://developers.google.com/web-toolkit/doc/latest/DevGuideClientBundle#CssResource
 [2]: https://developers.google.com/web-toolkit/doc/latest/DevGuideClientBundle#ImageResource
 [3]: https://developers.google.com/web-toolkit/doc/latest/DevGuideClientBundle#DataResource
 