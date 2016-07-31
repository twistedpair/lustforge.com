---
title: "Modulo Operator Performance Impact"
author: Joseph Lust
layout: post
date: 2016-05-08
url: /2016/05/08/modulo-operator-performance-impact/
image: /img/mod_exe_chart.png
summary: "My textbooks used modulo, yet my boss told me not to. Where had I gone wrong?"
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

Here's the trick; __don't use floats__. Floats are a pain for numerous reason, but let's assume you're wise enough to use a primitive integer type (int or long) to feed you `mod()` code, such as your hashmap implementation. There are many neat [bit twiddling tricks][6] to quickly conjure `mod(int,int)`.

### Powers of Two

Computers are binary by nature, so using powers of two provide lots of tricks. These can compute `mod(int, somePowerOf2)` in only a _single machine instruction_! Here's how.


<!-- %[link to LustBox algos][1] -->

For example, if I want to do `61 % 8`, to know which of an `Array[Byte]` to grab a value from, we can think of it in binary as [logical conjunction][14] of the dividend with the  mask of all bits lower than the divisor. For powers of 2, that's just n-1. The bit operations are illustrated below, using 32 bit integers.

{{< figure src="/img/bit_diagram.svg" caption="Note: Applicable only to Natural Integers" >}}

We can code this simply as:

```scala 
def modPow2(n:Int, p2: Int) = n & (p2-1)

def isPow2(n:Int):Boolean = ((n-1) & n ) == 0

def modFast(n:Int, b: Int) = if (isPow2(b)) modPow2(n,b) else n % b

// The old way
def modOld(n:Int, b:Int) = n % b
```

## Performance Comparsion

Comparing the byte code of classic modulo, and our faster version, we see they are both **4 lines of byte code**. However, classic `%` calls the byte code operation [`irem`][15] which itself calls a native routine, so it's far more complicated and won't run in constant time.

```java
  public int modOld(int, int);
    Code:
       0: iload_1
       1: iload_2
       2: irem
       3: ireturn

  public int modPow2(int, int); // with 8-1 inlined
    Code:
       0: iload_1
       1: bipush        7
       3: iand
       4: ireturn
```

A simple benchmark (see the [gist][16]) shows what we expect, doing one millions passes of each.

- Power 8 trick is the fastest
- `irem` implementation is nearly as fast
- `fmod` implementation is 3x slower

{{< figure src="/img/mod_exe_chart.svg">}}

<!---
t = [1.589,1.954,7.987]
bar(t)
set(ax,'XTickLabel', {"n & b-1","n % b (int)","n % b (double)"})
title("Comparision of Modulo Execution Times")
ylabel('Mean Time (ns)')
xlabel("Modulo Methods")
t(2)/t(1)
-->

## Conclusions

- Modulo isn't a major performance hog
- Avoid Double modulo operations if possible (can you use int's?)
- The reference Java modulo implementation is fast
- For `mod(a,2^n)` operations, `modPow2` is ~23% faster than stock moduolo

If modulo is a critical path in your code, and your divisor is a power of 2 (with Natural dividends), use this trick. Otherwise, the stock JVM implementation should serve you well.


<!---

### floating
### Common Ints

TODO: remainderKnuth, remainderBurnikelZiegler, in BigDecimal
TODO: Check Knuth book for other Impl's (didn't see any)

first 3 Google hits, none mention the cost of the operation. Sadness.
-->

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
 [14]: https://en.wikipedia.org/wiki/Logical_conjunction
 [15]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.irem
 [16]: https://gist.github.com/twistedpair/58414ee3237544eaf54a787a59f656c6
  
 
 
