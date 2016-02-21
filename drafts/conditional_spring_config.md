Conditional Spring Configuration : Workarounds and hacks



In four years of wrangling with Spring, this remains the framework's most annoying design limitation.

The Need: Conditionally load a Spring context at runtime

How you hack this depends on how your configure Spring.

applicationContext.xml filename hacking
@Configuration class
IoC autowiring (i.e. @Component/@Service/@Repository)
Profiles
Conditional XML block hacks
1. Context Filename String Concatenation Hack

The simplest and least inspired hack is to pull in an environmental property from your PropertyProvider and point to one of two context files.

Let's say you have a property file with app.envName=dev, and you have it set to app.envName=prod for your production nodes. You'll have applicationContext-dev.xml and applicationContext-prod.xml configuration files in your resource directory. Now you simply let Spring make the switch for your via filename string concatentation.

[xml]&lt;import resource=&quot;classpath:/com/lustforge/fooapp/applicationContext-${app.envName}.xml&quot; /&gt;[/xml]
You'll need at least 2 context files, but more can work as well. In the case that you want an on or off functionality, the second context file can be an empty configuration.

Pros/Cons
