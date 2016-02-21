---
draft: true
title: 10 Ways to Create Java Memory Leaks
author: Joe
layout: post
date: 2014-11-07
url: /2014/11/07/10-ways-create-java-memory-leaks/
categories:
  - Json
  - Scala
---

[Add: object is in Hashmap, but you change the inner values of object, then try to update it in hashmap using that as key, FAIL]

&nbsp;

It's a great interview question: <em><strong>How do you create a memory leak in Java? </strong></em>You can give the novice answer: <strong><em>You forget to clean up a reference and an object is never GC'd. </em></strong>Your interviewer will smile and nod, either because they don't understand Java that well, or because they don't think you do. Let's fix that. Below are ways to create memory leaks that I've collected over the years. Feel free to share more in the comments.
<h2>Memory Leaks</h2>
Java supposedly protects developers from the Wild West memory management of C/C++. We can't wantonly read and write pointer locations and thus get to develop in a utopia where all objects are live until they're no longer need, at which point they magically disappear. If only it were so!

How do we know an object is ready for collection? Because it's no longer connected to the liveness graph or "unreachable". Or, to put it another way, there are no <strong>Strong</strong> References to said Object that point back to the VM's Root node. Remember, we've also got <strong>Soft </strong>References, <strong>Weak</strong> References, and, as if it were not enough, <strong>Phantom</strong> References. The only way to know who is connected to whom is to walk object graph outward from the Root node in a Mark Sweep and <em>mark</em> all visited objects as live, leaving the unmarked objects remaining ripe for collection.

But you already knew this, right? Cool. Let's pull the rug out from under you.
<h2>Know Your Roots</h2>
There are actually many Root nodes, show in the following diagram. These <a title="Eclipse reference on roots" href="http://help.eclipse.org/indigo/index.jsp?topic=%2Forg.eclipse.mat.ui.help%2Fconcepts%2Fgcroots.html" target="_blank">roots</a> are <em>always considered alive</em>. Therefore, any object with a strong reference to one <em>will live forever</em> and never be GC'd. As always, this can vary with your <i>JVM implementation,</i><i> </i>so check your documentation.

[Add Diagram - nodes]

Static fields, JNI global, JNI local, VM Root, Monitors, ClassLoader, Thread.
<h2>Ways to Create Memory Leaks</h2>

{{< figure src="/img/objectRetention.png" title="Object Retention may cause discomfort" >}}

<h3>1. Unintentional Object Retention</h3>
If your implementation of a Stack, Linked List, Tree etc stores references, but neglects to clean them up, say when a user calls <em>pop()</em> or <em>clear()</em>, you've committed what Joshua Bloch calls an <em>Unintentional Object Retention</em>. Shame on and a pox upon your house to boot. However, this is the trivial case, so we'll only mention it for completeness. What we're really interested in are the more insidious leaks made by proficient developers.

a.k.a. <em>packratting </em>memory leak
<h3>2. JNI Leaks</h3>
We lied. Sorry. The JVM does not just track liveness from the VM Root Node. When you use <a href="http://en.wikipedia.org/wiki/Java_Native_Interface" target="_blank">JNI</a>, we make references to code external to the JVM, usually in C++. This complicates the lifecycle because we're referring to an object beyond the JVM's scope, so the JVM just assumes everything working with it is <em>always alive!</em>

When you pass a parameter to a JNI method, even if JNI does not use that parameter, said object cannot be GC'd until the JNI method returns. Since JNI references are <em>roots</em>, your parameter object and anything reachable by it (or other JNI Local references) will not be GC'd.

Even worse, if you declare JNI Global [FINISH]
<h3>3. Unclosed Resources</h3>
blah (best category for this?)
<h3>4. Servlet Container Leaks</h3>
Tomcat has come a long way in detecting and fixing many container based leaks. Still, you should be aware of the multitude of Tomcat leaks possible which will manifest when you keep redeploying a webapp. Sadly, these are so common and poorly understood that many enterprises routinely restart the entire JVM with each deploy, or <em>daily (!), </em>because they don't know what's causing the leak.

[Same as ClassLoader?]
<h3>4. Mutable Static Fields</h3>
Repeat after me, "I won't share state between threads in static fields." Again, twice more please. Besides being a <a href="https://www.securecoding.cert.org/confluence/display/java/OBJ10-J.+Do+not+use+public+static+nonfinal+variables" target="_blank">well known anti-pattern for various reasons</a>, static fields are another node in the liveness graph. Such static referenced Objects <em>will never be cleaned up</em>. So, next time you're temped, think harder and find a cleaner solution for passing state, and if you can't, make sure you clean it up when you're done passing state.

It would be best to use <em>constants</em>, i.e. final statics. In this case we'll only ever have a single Object instance and it will only exist as long as that class is loaded. When the ClassLoader is GC'd, it's Classes will be GC's and the constants in those Classes GC'd. Careful though if you jump in the deep end of OSGi, you'll quickly have <em>many</em> classloaders and have arrived in the fifth circle of Hell.
<h3>4. JDK Substring Leak</h3>
This is an oldie since Oracle quietly <a title="Rewritten String source code" href="http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/7u40-b43/java/lang/String.java#String.%3Cinit%3E%28byte%5B%5D%2Cint%2Cint%29" target="_blank">rewrote java.lang.String in Java 7</a>. If you're using <a title="String source, with bug!" href="http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/6-b14/java/lang/String.java#String.%3Cinit%3E%28int%2Cint%2Cchar%5B%5D%29" target="_blank">Java 6</a>, be aware. Let's see what happens when you make a substring.

[java]
// 'value', the property with the char[] that backs the String is copied into the new String!
public String substring(int beginIndex, int endIndex) {
	// ... some error checking
	return ((beginIndex == 0) &amp;amp;amp;&amp;amp;amp; (endIndex == count)) ? this :
		new String(offset + beginIndex, endIndex - beginIndex, value);
}

// Which calls this. WHAT! We just moved the offset and kept the full char[]!!!!
String(int offset, int count, char value[]) {
	this.value = value;
	this.offset = offset;
	this.count = count;
}
[/java]

That substring contains <strong>the entire char[]</strong> <strong>from the parent! </strong>So, if you stored a 10 character substring from a 2MB import, you really stored 2MB, not 20B. I only noticed this when reading through the JDK source, but it's quite clear why String was rewritten not to use offsets. Note, this is also a security flaw because you might pass a redacted string to another program, despite the entire string actually being passed.

a.k.a. <em>substring memory leak</em>
<h3>5. Listeners and Callbacks (store only weak references)</h3>
blah
<h3>6. Thread Local Variables</h3>
ThreadLocal variables are bound to the running thread. Remember, threads are Root objects, so ThreadLocals are reachable from their Thread, and thus <em>they</em> <em>cannot be GC'd</em>. Ideally you call ThreadLocal#remove() and your object is cleaned up, but a ThreadLocal variable <em>can only be released from the thread to which it's bound </em>(sans hideous reflection hacks). Given no easy way to access these ThreadLocals beyond the thread/class combination that set them, they often become memory leaks, such as on webapp restart.

You should always clear your TheadLocal's. In the common case of ThreadLocal's used to bind state to web request threads, use <a title="TheadLocal request destroyer pattern" href="http://www.javacodegeeks.com/2012/05/threading-stories-threadlocal-in-web.html" target="_blank">the ServletRequestListener#requestDestroyed() pattern</a> to clear the ThreadLocal's once the request is complete.
<h3>7. API Leaks</h3>
An API should have the smallest practical surface area and pass the absolute minimum of information to external consumers.  Ideally the objects it passes are immutable and only accessed by interfaces. Real world API's are often of decidedly low rigor in this department.

Consider a FooWidgetImpl you've created. FooWidgetImpl has a reference to FooFactory. When you pass it out of your API, you've leaked the detail of FooFactory. Now a consumer can retain an external reference to FooFactory in their code via FooWidgetImpl and FooFactory cannot be GC'd. Anything that FooFactory references <em>also</em> cannot be GC'd. Even if FooFactory is no very large, it is now a small memory leak, slowly consuming memory and dilating GC duration over time, leaving your wondering why you've got to restart the app server every 6 weeks.
<h3>8. Caches that Don't Use WeakReferenceMap</h3>
blah
<h3>9. ClassLoader Leaks</h3>
Distinguish and differentiate from Servlet Container leaks. References to system classes.
<h3>10. False Finalizer Assumption</h3>
The JVM spec is painfully vague at times. Remember that <a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Object.html#finalize()" target="_blank"><em>there is no </em><i>guarantee</i></a> that  Object#finalize() will be invoked on an object. If you plan on closing those open connections and cleaning up those nasty mutable static properties and purging that huge cache map on finalize, you might be proven sorely wrong. Plus, you've made a<em> lot</em> of assumptions, which have made your code brittle and prone to failure.

Be explicit with your allocations. <a title="Closeable example" href="http://www.javacodegeeks.com/2011/07/java-7-try-with-resources-explained.html" target="_blank">Use</a> the <a title="Closeable Javadoc" href="http://docs.oracle.com/javase/7/docs/api/java/io/Closeable.html" target="_blank">Closeable interface</a>, don't do nasty static things, limit your cache sizes and use TTL based evictions.
<h2>Conclusions</h2>
Hopefully you'll now be much wiser about how leaks can be unknownly created. And, at your next interview, when asked about memory leak creation, you can adjust your seat to a comfortable position and say "Jim, I'm so very glad you asked."

&nbsp;
<h3>Cites:</h3>
http://javabook.compuware.com/content/memory/problem-patterns/memory-leaks.aspx

http://people.apache.org/~markt/presentations/2010-08-05-Memory-Leaks-JavaOne-60mins.pdf

http://javabook.compuware.com/content/memory/problem-patterns/class-loader-issues.aspx

http://javabook.compuware.com/content/memory/problem-patterns/memory-leaks.aspx

http://www.yourkit.com/docs/12/help/gc_roots.jsp

&nbsp;

Official JVM roots

http://help.eclipse.org/indigo/index.jsp?topic=%2Forg.eclipse.mat.ui.help%2Fconcepts%2Fgcroots.html