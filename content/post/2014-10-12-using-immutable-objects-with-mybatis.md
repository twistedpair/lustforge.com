---
title: Using Immutable Objects with MyBatis
author: Joe
layout: post
date: 2014-10-12
url: /2014/10/12/using-immutable-objects-with-mybatis/
categories:
  - iBatis
  - MyBatis

---
### Immutable is Beautiful

I&#8217;m a fan of immutable objects. We all know the benefits; simple, no mutators, thread safe, cache word optimizable. However, I see far too many MyBatis (and iBatis) developers adding no arg constructors to their POJO&#8217;s simply so that MyBatis can reflect and set all of the values into the field setters. I&#8217;ll ask &#8220;_why does this POJO need to be mutated_&#8221; and they quip that it doesn&#8217;t, but these setters and protected no-arg constructors are needed by MyBatis. This violates my principle that you make your library work with your code, not the other way around.

Given the lack of good documentation on immutable objects in MyBatis, I hope the following helps folks.

### Example Implementation

We need a **ResultMap** that will tell MyBatis how to map this to a constructor. This is because Java reflection only exposes the constructor parameter types and order, not the names of the parameters (so claim <a title="Claims!" href="http://mybatis.github.io/mybatis-3/sqlmap-xml.html#constructor" target="_blank">the MyBatis docs</a>, though Spring somehow manages to <a title="Proof!" href="http://docs.spring.io/spring-framework/docs/current/spring-framework-reference/html/beans.html#beans-factory-ctor-arguments-resolution" target="_blank">do this with bean constructors</a>&#8230;).

The mapper maps the column names returned in the query to the types on the constructor. It also lays out the order of the arguments. Make sure the constructor argument order exactly matches that of your POJO.

**Note:** underscores before types map to the primitive value. **_long** maps to the primitive long type. **long** maps to the wrapper type <a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Long.html" target="_blank">java.lang.Long</a>.

```xml
<resultMap  id="fooViewMap" type="com.lustforge.FooView">
	<constructor>
		<arg column="id" javaType="_long"/>
		<arg column="is_dirty"	javaType="_boolean"/>
	</constructor>
</resultMap>
```

Now make sure your query block points to the mapper via its **resultMap** attribute. Again confirm that the column names returned **exactly match those in the map**. **Note:** the order does not need to match for the query.

```xml
<select id="getFooViews" resultMap="fooViewMap">
  <![CDATA[
	    SELECT 
   		foo.id
   		foo.is_dirty

		FROM foo
		-- your query here
	 ]]>
</select>
```

Finally make sure your POJO constructor matches. It&#8217;s also a good idea to leave a note to future developers to update MyBatis if they alter the constructor argument types or order.

```java
public final class FooView {

	private final long id;
	private final boolean isDirty;

	// Prescient comment
	// NOTE: MyBatis depends on parameter order and type for object creation
	// If you change the constructor, update the MyBatis mapper
	public FooView(long id, boolean isDirty) {
	    super();
	    this.id = id;
	    this.isDirty = isDirty;
	}

	public long getId() {
	    return id;
	}

	public boolean isDirty() {
	    return isDirty;
	}
	
	// ... don't forget equals/hashcode and toString as well
}
```

That was easy and now you&#8217;re using best practices. Pat yourself on the back and get busy with your new immutable POJO.
