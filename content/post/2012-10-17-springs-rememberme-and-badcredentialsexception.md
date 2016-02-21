---
title: Spring’s RememberMe and BadCredentialsException
author: Joe
layout: post
date: 2012-10-17
url: /2012/10/17/springs-rememberme-and-badcredentialsexception/
categories:
  - Java
  - Spring

---
Spring is pretty swell, but the documentation is never what you need. It would be like reading an anatomy book about every organ in the body, but never being shown a picture of all of them together, and then trying to conduct a surgery.

I was assembling Spring Security for a rewrite of [RunPartner.com](http://www.runpartner.com) and read the <a title="Read more" href="http://static.springsource.org/spring-security/site/docs/3.0.x/reference/remember-me.html" target="_blank">RememberMe chapter of Spring Security</a>.

```xml
<http>
    ...
    <remember-me key="myAppKey"/>
</http>
```

Since I needed a database backed implementation, I liked the next example.

```xml
<bean id="rememberMeFilter" class=
 "org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationFilter">
  <property name="rememberMeServices" ref="rememberMeServices"/>
  <property name="authenticationManager" ref="theAuthenticationManager" />
</bean>

<bean id="rememberMeServices" class=
 "org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices">
  <property name="userDetailsService" ref="myUserDetailsService"/>
  <property name="key" value="springRocks"/>
</bean>

<bean id="rememberMeAuthenticationProvider" class=
 "org.springframework.security.authentication.rememberme.RememberMeAuthenticationProvider">
  <property name="key" value="springRocks"/>
</bean>
```

But there is a lot of cruft there you don&#8217;t need, and I wanted a different cookie TTL and cookie name. So I used the below, which _seemed_ to work.

```xml
<http>
    ...
    <remember-me services-ref="rememberMeServices"/>
</http>
<!-- Handles auto login from remember me token -->
<beans:bean id="rememberMeServices"
    class="org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices">
    <beans:property name="userDetailsService" ref="userService" />
    <beans:property name="key" value="secretKey" />
    <beans:property name="cookieName" value="customRememberName" />
    <beans:property name="tokenValiditySeconds" value="604800" />
</beans:bean>
```

Yet an enigma ensued. No stack traces would enlighten me, but when I tried deleting the `JSESSIONID` to trigger auto login, I kept being returned to the login page. After setting many breakpoints, and walking through the spring code, I discovered that _there were two keys being set_ and the curious **BadCredentialsException** exception being thrown and caught, silently. Shhh. A quick Google search and <a href="http://forum.springsource.org/showthread.php?76606-might-Remember-Me-bug-for-rememver-user-and-concurrent-session/page2" target="_blank">forum post</a> were not helpful.

This is the trouble with **automagical** areas of Spring. If they don&#8217;t work out of the box, you&#8217;d better be shovel ready to analyze some sources. The offending comparison takes place in the following method of _org.springframework.security.authentication.RememberMeAuthenticationProvider_:

```java
public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    if (!supports(authentication.getClass())) {
        return null;
    }

    if (this.key.hashCode() != ((RememberMeAuthenticationToken) authentication).getKeyHash()) {
        throw new BadCredentialsException(messages.getMessage("RememberMeAuthenticationProvider.incorrectKey",
                "The presented RememberMeAuthenticationToken does not contain the expected key"));
    }

    return authentication;
}
```

# The Fix

The Spring RememberMe docs don&#8217;t tell you, but you must set the key in both the TokenBasedRememberMeServices bean and in the tag.

Make sure you define the same key in both places. Update the first tag to be as below to work with my code segment:

```xml
<http>
    ...
    <remember-me services-ref="rememberMeServices" key="secretKey"/>
</http>
```

That was easy, but not as easy as a complete, realistic, production RememberMe example on the Spring docs would have been. 😊