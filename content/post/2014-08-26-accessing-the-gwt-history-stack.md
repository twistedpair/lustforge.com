---
title: Accessing the GWT History Stack
author: Joe
layout: post
date: 2014-08-26
url: /2014/08/26/accessing-the-gwt-history-stack/
tags:
  - Google Gin
  - Google Web Toolkit (GWT)

---
GWT (Google Web Toolkit) does not supply a direct way to know where users have been within your application. However, you can use a simple listener and stack to record and access history events.

The key is the GWT History object. You can listen to its change event to know the user has gone to another Place. The restriction is <a href="https://groups.google.com/forum/?fromgroups=#!topic/google-web-toolkit/ypofMT1wsXo" target="_blank">we don&#8217;t know when the user has gone <strong>back</strong></a>. This is an inherent state detection problem in the stateless HTTP web. Ideally, it should not matter to your application how a user arrived at the given Place.

We&#8217;ll start with an interface to define our new class&#8217; contracts. There is a 16 step limit since we don&#8217;t want to keep filling memory with history locations. I&#8217;ve added a method to get the last 16 and to get the last place as well.

```java
/**
 * Stack that tracks browser history interactions
 */
public interface HistoryStack { 

    /**
    * Get up to the last 16 history events. 0 index is the last visited.
    * @return
    */
    String[] getStack(); 

    /**
    * Return the last event, if any. Is not the current place, but current -1
    * @return NULL if no history
    */
    String getLast();
}
```


Now for the implementation. Oddly, since we cannot track back events, we can&#8217;t really use this as a stack, but rather are placing Places in a fixed size queue. Instead than switch to a queue, I&#8217;ve stuck with a stack, which is the classic structure for this use case. Folks might get confused if they saw a &#8220;HistoryQueue.&#8221;


```java
/**
 * Create a stack that updates as we navigate, tracking history
 */
@Singleton
public class HistoryStackImpl implements HistoryStack, ValueChangeHandler&lt;String&gt; { 

    private static final int MAX_LENGTH = 16;

    private final Stack&lt;String&gt; stack = new Stack&lt;String&gt;(); 

    // Instantiate via Gin  
    protected HistoryStackImpl() { 
        History.addValueChangeHandler(this);
    } 

    @Override 
    public void onValueChange(ValueChangeEvent&lt;String&gt; event) {
        
        // only store max elements
        if(stack.size() &gt; MAX_LENGTH) {
                stack.remove(0);
        }
        stack.push(event.getValue()); 
    }

    @Override
    public String[] getStack() {
        // reverse stack so first entry of array is last visited
        // return defensive copy
        final String[] arr = new String[stack.size()];
        int i=0;
        for(int n=stack.size()-1; n&gt;=0; n--) {
                arr[i] = stack.get(n);
                i++;
        }
        return arr;
    }

    @Override
    public String getLast() {
        // null no prior location
        if(stack.size()&lt;2) {
                return null;
        }
        return stack.get(stack.size()-2);
    } 
}
```


Finally we&#8217;ll tell Gin to ginject this into our application for use, starting it up when the app loads.

```java
public class MyClientModule extends AbstractPresenterModule {

    @Override
    protected void configure() {

        bind(HistoryStack.class)
            .to(HistoryStackImpl.class)
            .asEagerSingleton(); // history from startup //... 
```

Now that was easy. Just inject your history stack into any presenter than needs to make history bases decisions. In my case, I had a user setting editor. I wanted the &#8220;Done&#8221; button to go back to the Place the user was last on so they could continue their work there, or if they started the app on the Settings page, to take them to the home page. This hack fit the bill perfectly. I hope it does the same for you.

P.S. I must give credit to **dindeman** for the <a href="https://groups.google.com/forum/?fromgroups=#!searchin/gwt-platform/history$20stack/gwt-platform/RT8BT_aLA2k/G0dtCEnW2SYJ" target="_blank">initial revision</a>.
