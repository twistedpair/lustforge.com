---
title: Don’t call non-final methods from your constructor, please.
author: Joe
layout: post
date: 2014-02-08
url: /2014/02/08/dont-call-non-final-methods-from-your-constructor-please/
categories:
  - Java

---
I ran into problems with someone doing this recently, so I&#8217;ll have to embellish the web a little more. The world must learn.

Why don&#8217;t we call non-final methods from constructors? Because it&#8217;s bad. Why is it bad? Because OO has an order to the madness and this ain&#8217;t the order. Let&#8217;s do a quick experiment to find out why.

Here is our parent and child class.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=145&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-java" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> &lt;span class="class" style="color: rgb(68, 85, 136); font-weight: bold;">&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">class&lt;/span> &lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(68, 85, 136); font-weight: bold;">FooKlassParent&lt;/span>&lt;/span>{

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">static&lt;/span> {
        log(&lt;span class="string" style="color: rgb(221, 17, 68);">"Parent: Init static block 1"&lt;/span>);
    }

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> SysWriter w1 = &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">new&lt;/span> SysWriter(&lt;span class="string" style="color: rgb(221, 17, 68);">"Parent: non-static field init"&lt;/span>);

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">private&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">static&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">final&lt;/span> SysWriter w2 = &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">new&lt;/span> SysWriter(
            &lt;span class="string" style="color: rgb(221, 17, 68);">"Parent: static field init"&lt;/span>);

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> FooKlassParent() {
        &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">super&lt;/span>();
        log(&lt;span class="string" style="color: rgb(221, 17, 68);">"Parent: Constructor called"&lt;/span>);
        doSomething();
    }

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">static&lt;/span> {
        log(&lt;span class="string" style="color: rgb(221, 17, 68);">"Parent: Init static block 2"&lt;/span>);
    }

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">void&lt;/span> doSomething() {
        log(&lt;span class="string" style="color: rgb(221, 17, 68);">"Parent: do something"&lt;/span>);
    }

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">protected&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">static&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">void&lt;/span> log(&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">final&lt;/span> String msg) {
        System.out.println(msg);
    }
}
</code></pre>
</div>

So many goodies! Static blocks, static fields, non-static fields, non-static methods. Yum. If you&#8217;re programming Java and don&#8217;t know the order these all fire in, please switch to PHP.

Now we&#8217;ll extend with a child who is essentially the same.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=145&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-java" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="keyword" style="color: #333333; font-weight: bold;">public&lt;/span> &lt;span class="class" style="color: #445588; font-weight: bold;">&lt;span class="keyword" style="color: #333333; font-weight: bold;">class&lt;/span> &lt;span class="title" style="color: #445588; font-weight: bold;">FooKlass&lt;/span> &lt;span class="keyword" style="color: #333333; font-weight: bold;">extends&lt;/span> &lt;span class="title" style="color: #445588; font-weight: bold;">FooKlassParent&lt;/span> &lt;/span>{

    &lt;span class="keyword" style="color: #333333; font-weight: bold;">static&lt;/span> {
        log(&lt;span class="string" style="color: #dd1144;">"Child: Init static block 1"&lt;/span>);
    }

    &lt;span class="keyword" style="color: #333333; font-weight: bold;">public&lt;/span> SysWriter w1 = &lt;span class="keyword" style="color: #333333; font-weight: bold;">new&lt;/span> SysWriter(&lt;span class="string" style="color: #dd1144;">"Child: non-static field init"&lt;/span>);

    &lt;span class="keyword" style="color: #333333; font-weight: bold;">private&lt;/span> &lt;span class="keyword" style="color: #333333; font-weight: bold;">static&lt;/span> &lt;span class="keyword" style="color: #333333; font-weight: bold;">final&lt;/span> SysWriter w2 = &lt;span class="keyword" style="color: #333333; font-weight: bold;">new&lt;/span> SysWriter(
            &lt;span class="string" style="color: #dd1144;">"Child: static field init"&lt;/span>);

    &lt;span class="keyword" style="color: #333333; font-weight: bold;">public&lt;/span> FooKlass() {
        &lt;span class="keyword" style="color: #333333; font-weight: bold;">super&lt;/span>();
        log(&lt;span class="string" style="color: #dd1144;">"Child: Constructor called"&lt;/span>);
        doSomething();
    }

    &lt;span class="keyword" style="color: #333333; font-weight: bold;">static&lt;/span> {
        log(&lt;span class="string" style="color: #dd1144;">"Child: Init static block 2"&lt;/span>);
    }

    &lt;span class="annotation">@Override&lt;/span>
    &lt;span class="keyword" style="color: #333333; font-weight: bold;">public&lt;/span> &lt;span class="keyword" style="color: #333333; font-weight: bold;">void&lt;/span> doSomething() {
        &lt;span class="comment" style="color: #999988; font-style: italic;">// shame, you didn't call super.doSomething() first!&lt;/span>
        log(&lt;span class="string" style="color: #dd1144;">"Child: do something"&lt;/span>);
    }
}
</code></pre>
</div>

Ok, now everyone pick up your pencils and write what will be the output of making a new FooKlass.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=145&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">Parent: Init static block &lt;span class="number" style="color: #009999;">1&lt;/span>
Parent: static field init
Parent: Init static block &lt;span class="number" style="color: #009999;">2&lt;/span>
Child: Init static block &lt;span class="number" style="color: #009999;">1&lt;/span>
Child: static field init
Child: Init static block &lt;span class="number" style="color: #009999;">2&lt;/span>
Parent: non-static field init
Parent: Constructor called
Child: &lt;span class="keyword" style="color: #333333; font-weight: bold;">do&lt;/span> something
Child: non-static field init
Child: Constructor called
Child: &lt;span class="keyword" style="color: #333333; font-weight: bold;">do&lt;/span> something
</code></pre>
</div>

Alright, so what did we learn? Things don&#8217;t &#8220;just happen&#8221; &#8211; Java operates by the JSR which is painfully specific here. The firing order is:

  1. Parent static blocks and fields in order of appearance
  2. Child static blocks and fields in order of appearance
  3. Parent non-static field initializers
  4. Parent constructor
  5. Child non-static field initializers
  6. Child constructor

Damn! That&#8217;s mind blowing! The child&#8217;s constructor calls **super()** but super() was really called before the child&#8217;s constructor. WYSI<span style="text-decoration: underline;">N</span>WYG. The byte code ain&#8217;t the code you wrote folks.

Now, to conclude, why are non-final method invocations from the constructor bad? The child class&#8217;s fields are not initialized yet. It&#8217;s state is not yet prepared. Even though we see the parent&#8217;s method, it&#8217;s been overwritten with the child&#8217;s byte code. Unholy things can happen now because your assumptions are no longer correct. And worse, it&#8217;s not just your assumptions, but someone might extend that lib/API class non-final public method and mayhem will ensue, at 3AM, on Christmas Eve, when you&#8217;re on the support rotation and as you rub your eyes and stare into the debugger it just ain&#8217;t going to make sense to you.

Don&#8217;t do it.