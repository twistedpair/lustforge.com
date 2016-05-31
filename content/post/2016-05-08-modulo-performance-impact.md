---
title: "Modulo Operator Performance Impact"
author: Joe
layout: post
date: 2016-05-08
url: /2016/05/08/modulo-operator-performance-impact/
tags:
  - Math
  - Performance
  - Scala
---

I was surprised when someone told me not to use the [modulo operator][7] in high performance code. My textbooks used modulo (`%`) and various high performance implementations [say to use modulo][10]. Where had I gone wrong?

## The Bad
If you look at the JDK's `mod()` implementation, you'll see that it's indeed `O(n)` [for IEE754 floats][12], and `O(1)` [for doubles][13]. Note, the Java Spec only defines modulo [for floating point numbers][5].

There are tricks for modulo with integers, but Java (as always) has made it interesting with support for negative floats.

## High Performance Modulo

Here's the trick; __don't use floats__. Floats are a pain for numerous reason, but let's assume you're wise enough to use a primative integer type (int or long) to feed you `mod()` code, such as your hashmap implementation. There are many neat [bit twiddling tricks][6] to quickly conjure `mod(int,int)`.

### Powers of Two

Computers are binary by nature, so using powers of two provide lots of tricks. These can compute `mod(int, somePowerOf2)` in only a _single machine instruction_! Here's how.


<!-- %[link to LustBox algos][1] -->

For example, if I want to do `63 % 8`, to know which of an `Array[Byte]` to grab a value from, we can think of it in binary as:

{{< figure src="/img/bit_diagram.svg" title="Sie bits!" >}}


```scala 
def modPow2(n:Int, p2: Int) = n & (p2-1)

def isPow2(n:Int):Boolean = ((n-1) & n ) == 0

def modFast(n:Int, b: Int) = if (isPow2(b)) modPow2(n,b) else n % b
```

## Performance Comparsion

### Pow 2

### floating

### Common Ints

see: remainderKnuth, remainderBurnikelZiegler, in BigDecimal
Check Knuth book for other Impl's


TODO: Seed blog post at relevant locations: https://stackoverflow.com/questions/35785615/is-modulo-slow-in-java



first 3 Google hits, none mention the cost of the operation.

 [1]: http://www.cafeaulait.org/course/week2/15.html
 [2]: http://www.javaranch.com/drive/modulo.html
 [3]: http://www.dreamincode.net/forums/topic/273783-the-use-of-the-modulo-operator/
 [4]: http://dhruba.name/2011/07/12/performance-pattern-modulo-and-powers-of-two/
 [5]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-15.html#jls-15.17.3
 [6]: http://graphics.stanford.edu/~seander/bithacks.html#ModulusDivisionEasy
 [7]: https://en.wikipedia.org/wiki/Modulo_operation
 [10]: https://dzone.com/articles/hashmap-performance
 [11]: https://github.com/openjdk-mirror/jdk7u-jdk/blob/f4d80957e89a19a29bb9f9807d2a28351ed7f7df/src/share/native/java/util/zip/zlib-1.2.3/zadler32.c#L47
 [12]: https://github.com/openjdk-mirror/jdk7u-jdk/blob/f4d80957e89a19a29bb9f9807d2a28351ed7f7df/src/share/native/java/lang/fdlibm/src/e_fmod.c#L42
 [13]: https://github.com/openjdk-mirror/jdk7u-jdk/blob/f4d80957e89a19a29bb9f9807d2a28351ed7f7df/src/share/native/java/lang/fdlibm/src/s_modf.c#L46
  
 
 
