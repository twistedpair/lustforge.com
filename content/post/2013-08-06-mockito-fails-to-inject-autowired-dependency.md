---
title: Mockito Fails to Inject Autowired Dependency
author: Joe
layout: post
date: 2013-08-06
url: /2013/08/06/mockito-fails-to-inject-autowired-dependency/
categories:
  - Java
  - Spring

---
If you must test Spring beans and you&#8217;ve used @autowired in them, then you&#8217;ll need to use Mockito.

EasyMock is _easy_ for _easy_ things, but breaks down in this more complex situation. No worries, just let Mockito inject those DI&#8217;d dependencies for you. Ugh oh&#8230; they are not injecting. But you&#8217;ve read their docs and _they should inject!_ Sadness.

Let&#8217;s set the stage, enter our sample class stage left.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=136&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-java" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">final&lt;/span> SampleImpl {

    &lt;span class="annotation">@autowired&lt;/span>
    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">private&lt;/span> Foo someFoo;

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">private&lt;/span> Bar someBar;

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> SampleImpl(&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">final&lt;/span> Bar someBar) {
        this.someBar=someBar;
    }

    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">final&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">void&lt;/span> doSomething() {
        someFoo.doSomething();
        someBar.doSomthing();
    }
}
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgamF2YTxicj5wdWJsaWMgZmluYWwgU2FtcGxlSW1wbCB7PGJyPjxicj4JQGF1dG93aXJlZDxi
cj4JcHJpdmF0ZSBGb28gc29tZUZvbzs8YnI+PGJyPglwcml2YXRlIEJhciBzb21lQmFyOzxicj48
YnI+CXB1YmxpYyBTYW1wbGVJbXBsKGZpbmFsIEJhciBzb21lQmFyKSB7PGJyPgkJdGhpcy5zb21l
QmFyPXNvbWVCYXI7PGJyPgl9PGJyPjxicj4JcHVibGljIGZpbmFsIHZvaWQgZG9Tb21ldGhpbmco
KSB7PGJyPgkJc29tZUZvby5kb1NvbWV0aGluZygpOzxicj4JCXNvbWVCYXIuZG9Tb210aGluZygp
Ozxicj4JfTxicj59PGJyPmBgYA==">
    ​
  </div>
</div>

Here is a typical test for it, that will fail because _someFoo _is NULL as it was never injected.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=136&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-java" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> &lt;span class="class" style="color: rgb(68, 85, 136); font-weight: bold;">&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">class&lt;/span> &lt;span class="title" style="color: rgb(153, 0, 0); font-weight: bold;color: rgb(68, 85, 136); font-weight: bold;">FooClassTest&lt;/span> &lt;/span>{

    &lt;span class="annotation">@Mock&lt;/span>
    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">private&lt;/span> Foo mockFoo;

    &lt;span class="annotation">@Mock&lt;/span>
    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">private&lt;/span> Bar mockBar;

    &lt;span class="annotation">@InjectMocks&lt;/span>
    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">private&lt;/span> SampleImpl sampleImpl;

    &lt;span class="annotation">@Before&lt;/span>
    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">void&lt;/span> initMocks() {
        MockitoAnnotations.initMocks(&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">this&lt;/span>);
    }

    &lt;span class="annotation">@Test&lt;/span>
    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">public&lt;/span> &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">void&lt;/span> testFooImpl() {
        &lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// setup&lt;/span>
        when(mockFoo.doSomething()).thenReturn(&lt;span class="string" style="color: rgb(221, 17, 68);">"foo works!"&lt;/span>);
        when(mockBar.doSomething()).thenReturn(&lt;span class="string" style="color: rgb(221, 17, 68);">"bar works!"&lt;/span>);

        &lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// test&lt;/span>
        sampleImpl.doSomething();

        &lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// verify&lt;/span>
        verify(mockFoo).doSomething();
        verify(mockBar).doSomething();
    }
}
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgamF2YTxicj5wdWJsaWMgY2xhc3MgRm9vQ2xhc3NUZXN0IHs8YnI+PGJyPglATW9jazxicj4J
cHJpdmF0ZSBGb28gbW9ja0Zvbzs8YnI+PGJyPglATW9jazxicj4JcHJpdmF0ZSBCYXIgbW9ja0Jh
cjs8YnI+PGJyPglASW5qZWN0TW9ja3M8YnI+CXByaXZhdGUgU2FtcGxlSW1wbCBzYW1wbGVJbXBs
Ozxicj48YnI+CUBCZWZvcmU8YnI+CXB1YmxpYyB2b2lkIGluaXRNb2NrcygpIHs8YnI+CQlNb2Nr
aXRvQW5ub3RhdGlvbnMuaW5pdE1vY2tzKHRoaXMpOzxicj4JfTxicj48YnI+CUBUZXN0PGJyPglw
dWJsaWMgdm9pZCB0ZXN0Rm9vSW1wbCgpIHs8YnI+CQkvLyBzZXR1cDxicj4JCXdoZW4obW9ja0Zv
by5kb1NvbWV0aGluZygpKS50aGVuUmV0dXJuKCJmb28gd29ya3MhIik7PGJyPgkJd2hlbihtb2Nr
QmFyLmRvU29tZXRoaW5nKCkpLnRoZW5SZXR1cm4oImJhciB3b3JrcyEiKTs8YnI+PGJyPgkJLy8g
dGVzdDxicj4JCXNhbXBsZUltcGwuZG9Tb21ldGhpbmcoKTs8YnI+PGJyPgkJLy8gdmVyaWZ5PGJy
PgkJdmVyaWZ5KG1vY2tGb28pLmRvU29tZXRoaW5nKCk7PGJyPgkJdmVyaWZ5KG1vY2tCYXIpLmRv
U29tZXRoaW5nKCk7PGJyPgl9PGJyPn08YnI+YGBg">
    ​
  </div>
</div>

Now change this line of the test and you&#8217;re back in business.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=136&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-java" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">    &lt;span class="annotation">@Before&lt;/span>
    &lt;span class="keyword" style="color: #333333; font-weight: bold;">public&lt;/span> &lt;span class="keyword" style="color: #333333; font-weight: bold;">void&lt;/span> initMocks() {
        &lt;span class="comment" style="color: #999988; font-style: italic;">// must instantiate and then initiate since not using no arg constructor&lt;/span>
        sampleImpl = &lt;span class="keyword" style="color: #333333; font-weight: bold;">new&lt;/span> SampleImpl(mockBar);
        MockitoAnnotations.initMocks(&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>);
    }
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgamF2YTxicj4JQEJlZm9yZTxicj4JcHVibGljIHZvaWQgaW5pdE1vY2tzKCkgezxicj4JCS8v
IG11c3QgaW5zdGFudGlhdGUgYW5kIHRoZW4gaW5pdGlhdGUgc2luY2Ugbm90IHVzaW5nIG5vIGFy
ZyBjb25zdHJ1Y3Rvcjxicj4JCXNhbXBsZUltcGwgPSBuZXcgU2FtcGxlSW1wbChtb2NrQmFyKTs8
YnI+CQlNb2NraXRvQW5ub3RhdGlvbnMuaW5pdE1vY2tzKHRoaXMpOzxicj4JfTxicj5gYGA=">
    ​
  </div>
</div>

As far as I can tell, if you&#8217;re not using a no-arg constructor, Mockito, which would normally instantiate the class to be injected with mocks, and then inject them, assumes you want constructor injection only and ignores the remaining @autowired dependencies. Hope it helps someone. 😉