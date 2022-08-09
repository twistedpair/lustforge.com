---
title: Don’t call non-final methods from your constructor, please.
author: Joseph Lust
layout: post
date: 2014-02-08
url: /2014/02/08/dont-call-non-final-methods-from-your-constructor-please/
tags:
  - Java

---
I ran into problems with someone doing this recently, so I&#8217;ll have to embellish the web a little more. The world must learn.

Why don&#8217;t we call non-final methods from constructors? Because it&#8217;s bad. Why is it bad? Because OO has an order to the madness and this ain&#8217;t the order. Let&#8217;s do a quick experiment to find out why.

Here is our parent and child class.

```java
public class FooKlassParent{

    static {
        log("Parent: Init static block 1");
    }

    public SysWriter w1 = new SysWriter("Parent: non-static field init");

    private static final SysWriter w2 = new SysWriter(
            "Parent: static field init");

    public FooKlassParent() {
        super();
        log("Parent: Constructor called");
        doSomething();
    }

    static {
        log("Parent: Init static block 2");
    }

    public void doSomething() {
        log("Parent: do something");
    }

    protected static void log(final String msg) {
        log(msg);
    }
}
```

So many goodies! Static blocks, static fields, non-static fields, non-static methods. Yum. If you&#8217;re programming Java and don&#8217;t know the order these all fire in, please switch to PHP.

Now we&#8217;ll extend with a child who is essentially the same.

```java
public class FooKlass extends FooKlassParent {

    static {
        log("Child: Init static block 1");
    }

    public SysWriter w1 = new SysWriter("Child: non-static field init");

    private static final SysWriter w2 = new SysWriter(
            "Child: static field init");

    public FooKlass() {
        super();
        log("Child: Constructor called");
        doSomething();
    }

    static {
        log("Child: Init static block 2");
    }

    @Override
    public void doSomething() {
        // shame, you didn't call super.doSomething() first!
        log("Child: do something");
    }
}
```

Ok, now everyone pick up your pencils and write what will be the output of making a new FooKlass.

```bash
Parent: Init static block 1
Parent: static field init
Parent: Init static block 2
Child: Init static block 1
Child: static field init
Child: Init static block 2
Parent: non-static field init
Parent: Constructor called
Child: do something
Child: non-static field init
Child: Constructor called
Child: do something
```

Alright, so what did we learn? Things don&#8217;t &#8220;just happen&#8221; &#8211; Java operates by the JSR which is painfully specific here. The firing order is:

  1. Parent static blocks and fields in order of appearance
  2. Child static blocks and fields in order of appearance
  3. Parent non-static field initializers
  4. Parent constructor
  5. Child non-static field initializers
  6. Child constructor

Damn! That&#8217;s mind blowing! The child&#8217;s constructor calls **super()** but super() was really called before the child&#8217;s constructor. WYSI<span style="text-decoration: underline;">N</span>WYG. The byte code ain&#8217;t the code you wrote folks.

Now, to conclude, why are non-final method invocations from the constructor bad? The child class&#8217;s fields are not initialized yet. It&#8217;s state is not yet prepared. Even though we see the parent&#8217;s method, it&#8217;s been overwritten with the child&#8217;s byte code. **Unholy things can happen now because your assumptions are no longer valid**. And worse, it&#8217;s not just your assumptions, but someone might extend that lib/API class non-final public method. Mayhem will ensue, at 3AM, on Christmas Eve, when you&#8217;re on the support rotation and as you rub your eyes and stare into the debugger it just ain&#8217;t going to make sense to you.

Don&#8217;t do it.