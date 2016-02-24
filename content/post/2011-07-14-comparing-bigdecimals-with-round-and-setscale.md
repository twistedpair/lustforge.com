---
title: Comparing BigDecimals with Round and SetScale
author: Joe
layout: post
date: 2011-07-14
url: /2011/07/14/comparing-bigdecimals-with-round-and-setscale/
tags:
  - Java

---
In Java financial programming, you need the precision [BigDecimals][1] afford. However, due to the great precision of this value, comparisons are very error prone. For example:

```java
0.000000000000000000000000000000001 != 0.0
```

For most cases, we want to round when the calculations are complete to the desired precision, rather than during intermediate steps.

**DON'T USE [round()][2]** as it sets the number of significant digits, not the number of decimals. It will lead to odd behavior if you do, as shown below. Note that

```java
// unexpected round() method behavior - don't use it
MathContext myContext = new MathContext( 2, RoundingMode.HALF_UP);
System.out.println( new BigDecimal( "4.55" ).round( myContext ).toString() ); // 4.6
System.out.println( new BigDecimal( "4.5" ).round( myContext ).toString() ); // 4.5
System.out.println( new BigDecimal( "45.983" ).round( myContext ).toString() ); // 45
```

Instead, use **[setScale()][3]**, which sets just the number of decimal places as shown below. Imagine your own values for <span class="Apple-style-span" style="font-family: Consolas, Monaco, monospace; font-size: 12px; line-height: 18px; white-space: pre;">someBD(1-4).</span>

```java
// constant
int myNumDecimals = 2;

// do some math
BigDecimal myValA = someBD1.multiply(someBD2)
BigDecimal myValB = someBD3.divide( someBD4);

// round to desired number decimal places
myValA.setScale( myNumDecimals, RoundingMode.HALF_UP);
myValB.setScale( myNumDecimals, RoundingMode.HALF_UP);

// compare - has three int returns: [-1,0,1] -> [<,==,>]
if( myValA.compareTo(myValB) == 0 ) {
 System.out.println("They match!");
}
```

Or, more succinctly

```java
// constant
int myNumDecimals = 2;

// do some math, round to desired number decimal places
BigDecimal myValA = someBD1.multiply(someBD2).setScale( myNumDecimals, RoundingMode.HALF_UP);
BigDecimal myValB = someBD3.divide( someBD4).setScale( myNumDecimals, RoundingMode.HALF_UP);

// compare - has three int returns: [-1,0,1] -> [<,==,>]
if( myValA.compareTo(myValB) == 0 ) {
 System.out.println("They match!");
}
```

 [1]: http://download.oracle.com/javase/6/docs/api/java/math/BigDecimal.html "JavaDoc"
 [2]: http://download.oracle.com/javase/6/docs/api/java/math/BigDecimal.html#round(java.math.MathContext)
 [3]: http://download.oracle.com/javase/6/docs/api/java/math/BigDecimal.html#setScale(int,%20int)

