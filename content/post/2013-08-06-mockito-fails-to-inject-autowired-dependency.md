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
If you must test Spring beans and you&#8217;ve used `@autowired` in them, then **you&#8217;ll need to use Mockito**.

**EasyMock** is _easy_ for _easy things_, but breaks down in this more complex situation. No worries, just let Mockito inject those DI dependencies for you. Ugh oh&#8230; they are not injecting. But you&#8217;ve read their docs and _they should inject!_ Sadness.

Let&#8217;s set the stage. Enter our sample class stage left.

```java
public final SampleImpl {

    @autowired
    private Foo someFoo;

    private Bar someBar;

    public SampleImpl(final Bar someBar) {
        this.someBar=someBar;
    }

    public final void doSomething() {
        someFoo.doSomething();
        someBar.doSomthing();
    }
}
```

Here is a typical test for it, that will fail because `someFoo` is `NULL` as it was never injected.

```java
public class FooClassTest {

    @Mock
    private Foo mockFoo;

    @Mock
    private Bar mockBar;

    @InjectMocks
    private SampleImpl sampleImpl;

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFooImpl() {
        // setup
        when(mockFoo.doSomething()).thenReturn("foo works!");
        when(mockBar.doSomething()).thenReturn("bar works!");

        // test
        sampleImpl.doSomething();

        // verify
        verify(mockFoo).doSomething();
        verify(mockBar).doSomething();
    }
}
```

Now change this line of the test and you&#8217;re back in business.

```java
    @Before
    public void initMocks() {
        // must instantiate and then initiate since not using no arg constructor
        sampleImpl = new SampleImpl(mockBar);
        MockitoAnnotations.initMocks(this);
    }
```

As far as I can tell, if you&#8217;re not using a no-arg constructor, Mockito, which would normally instantiate the class to be injected with mocks, and then inject them, assumes you want constructor injection only and ignores the remaining `@autowired` dependencies.

Hope that helps someone. 😉