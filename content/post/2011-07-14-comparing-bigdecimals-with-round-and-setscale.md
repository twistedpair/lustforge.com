---
title: Comparing BigDecimals with Round and SetScale
author: Joe
layout: post
date: 2011-07-14
url: /2011/07/14/comparing-bigdecimals-with-round-and-setscale/
categories:
  - Java
tags:
  - Java

---
In Java finance programming, you need the precision of [BigDecimals][1]. However, due to the great precision of this value, comparisons are very error prone. For example 0.000000000000000000000000000000001 != 0.0 . Now, for most cases, we want to round when the calculations are complete to the desired precision.

**DON&#8217;T USE <a title="JavaDoc" href="http://download.oracle.com/javase/6/docs/api/java/math/BigDecimal.html#round(java.math.MathContext)" target="_blank">round()</a>** as it sets the number of significant digits, not the number of decimals. It will lead to odd behavior if you do, as shown below. Note that

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=42&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-java" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// unexpected round() method behavior - don't use it&lt;/span>
MathContext myContext = &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">new&lt;/span> MathContext( &lt;span class="number" style="color: rgb(0, 153, 153);">2&lt;/span>, RoundingMode.HALF_UP);
System.out.println( &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">new&lt;/span> BigDecimal( &lt;span class="string" style="color: rgb(221, 17, 68);">"4.55"&lt;/span> ).round( myContext ).toString() ); &lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// 4.6&lt;/span>
System.out.println( &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">new&lt;/span> BigDecimal( &lt;span class="string" style="color: rgb(221, 17, 68);">"4.5"&lt;/span> ).round( myContext ).toString() ); &lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// 4.5&lt;/span>
System.out.println( &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">new&lt;/span> BigDecimal( &lt;span class="string" style="color: rgb(221, 17, 68);">"45.983"&lt;/span> ).round( myContext ).toString() ); &lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// 45&lt;/span>
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgamF2YTxicj4vLyB1bmV4cGVjdGVkIHJvdW5kKCkgbWV0aG9kIGJlaGF2aW9yIC0gZG9uJ3Qg
dXNlIGl0PGJyPk1hdGhDb250ZXh0IG15Q29udGV4dCA9IG5ldyBNYXRoQ29udGV4dCggMiwgUm91
bmRpbmdNb2RlLkhBTEZfVVApOzxicj5TeXN0ZW0ub3V0LnByaW50bG4oIG5ldyBCaWdEZWNpbWFs
KCAiNC41NSIgKS5yb3VuZCggbXlDb250ZXh0ICkudG9TdHJpbmcoKSApOyAvLyA0LjY8YnI+U3lz
dGVtLm91dC5wcmludGxuKCBuZXcgQmlnRGVjaW1hbCggIjQuNSIgKS5yb3VuZCggbXlDb250ZXh0
ICkudG9TdHJpbmcoKSApOyAvLyA0LjU8YnI+U3lzdGVtLm91dC5wcmludGxuKCBuZXcgQmlnRGVj
aW1hbCggIjQ1Ljk4MyIgKS5yb3VuZCggbXlDb250ZXh0ICkudG9TdHJpbmcoKSApOyAvLyA0NTxi
cj5gYGA=">
    ​
  </div>
</div>

Instead, use **<a title="JavaDoc" href="http://download.oracle.com/javase/6/docs/api/java/math/BigDecimal.html#setScale(int, int)" target="_blank">setScale()</a>**, which sets just the number of decimal places as shown below. Imagine your own values for <span class="Apple-style-span" style="font-family: Consolas, Monaco, monospace; font-size: 12px; line-height: 18px; white-space: pre;">someBD(1-4).</span>

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=42&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-java" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">&lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// constant&lt;/span>
&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">int&lt;/span> myNumDecimals = &lt;span class="number" style="color: rgb(0, 153, 153);">2&lt;/span>;

&lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// do some math&lt;/span>
BigDecimal myValA = someBD1.multiply(someBD2)
BigDecimal myValB = someBD3.divide( someBD4);

&lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// round to desired number decimal places&lt;/span>
myValA.setScale( myNumDecimals, RoundingMode.HALF_UP);
myValB.setScale( myNumDecimals, RoundingMode.HALF_UP);

&lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// compare - has three int returns: [-1,0,1] -&gt; [&lt;,==,&gt;]&lt;/span>
&lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">if&lt;/span>( myValA.compareTo(myValB) == &lt;span class="number" style="color: rgb(0, 153, 153);">0&lt;/span> ) {
 System.out.println(&lt;span class="string" style="color: rgb(221, 17, 68);">"They match!"&lt;/span>);
}
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgamF2YTxicj4vLyBjb25zdGFudDxicj5pbnQgbXlOdW1EZWNpbWFscyA9IDI7PGJyPjxicj4v
LyBkbyBzb21lIG1hdGg8YnI+QmlnRGVjaW1hbCBteVZhbEEgPSBzb21lQkQxLm11bHRpcGx5KHNv
bWVCRDIpPGJyPkJpZ0RlY2ltYWwgbXlWYWxCID0gc29tZUJEMy5kaXZpZGUoIHNvbWVCRDQpOzxi
cj48YnI+Ly8gcm91bmQgdG8gZGVzaXJlZCBudW1iZXIgZGVjaW1hbCBwbGFjZXM8YnI+bXlWYWxB
LnNldFNjYWxlKCBteU51bURlY2ltYWxzLCBSb3VuZGluZ01vZGUuSEFMRl9VUCk7PGJyPm15VmFs
Qi5zZXRTY2FsZSggbXlOdW1EZWNpbWFscywgUm91bmRpbmdNb2RlLkhBTEZfVVApOzxicj48YnI+
Ly8gY29tcGFyZSAtIGhhcyB0aHJlZSBpbnQgcmV0dXJuczogWy0xLDAsMV0gLSZndDsgWyZsdDss
PT0sJmd0O108YnI+aWYoIG15VmFsQS5jb21wYXJlVG8obXlWYWxCKSA9PSAwICkgezxicj4gU3lz
dGVtLm91dC5wcmludGxuKCJUaGV5IG1hdGNoISIpOzxicj59IDxicj5gYGA=">
    ​
  </div>
</div>

Or, more succinctly

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=42&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-java" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="comment" style="color: #999988; font-style: italic;">// constant&lt;/span>
&lt;span class="keyword" style="color: #333333; font-weight: bold;">int&lt;/span> myNumDecimals = &lt;span class="number" style="color: #009999;">2&lt;/span>;

&lt;span class="comment" style="color: #999988; font-style: italic;">// do some math, round to desired number decimal places&lt;/span>
BigDecimal myValA = someBD1.multiply(someBD2).setScale( myNumDecimals, RoundingMode.HALF_UP);
BigDecimal myValB = someBD3.divide( someBD4).setScale( myNumDecimals, RoundingMode.HALF_UP);

&lt;span class="comment" style="color: #999988; font-style: italic;">// compare - has three int returns: [-1,0,1] -&gt; [&lt;,==,&gt;]&lt;/span>
&lt;span class="keyword" style="color: #333333; font-weight: bold;">if&lt;/span>( myValA.compareTo(myValB) == &lt;span class="number" style="color: #009999;">0&lt;/span> ) {
 System.out.println(&lt;span class="string" style="color: #dd1144;">"They match!"&lt;/span>);
}
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgamF2YTxicj4vLyBjb25zdGFudDxicj5pbnQgbXlOdW1EZWNpbWFscyA9IDI7PGJyPjxicj4v
LyBkbyBzb21lIG1hdGgsIHJvdW5kIHRvIGRlc2lyZWQgbnVtYmVyIGRlY2ltYWwgcGxhY2VzPGJy
PkJpZ0RlY2ltYWwgbXlWYWxBID0gc29tZUJEMS5tdWx0aXBseShzb21lQkQyKS5zZXRTY2FsZSgg
bXlOdW1EZWNpbWFscywgUm91bmRpbmdNb2RlLkhBTEZfVVApOzxicj5CaWdEZWNpbWFsIG15VmFs
QiA9IHNvbWVCRDMuZGl2aWRlKCBzb21lQkQ0KS5zZXRTY2FsZSggbXlOdW1EZWNpbWFscywgUm91
bmRpbmdNb2RlLkhBTEZfVVApOzxicj48YnI+Ly8gY29tcGFyZSAtIGhhcyB0aHJlZSBpbnQgcmV0
dXJuczogWy0xLDAsMV0gLSZndDsgWyZsdDssPT0sJmd0O108YnI+aWYoIG15VmFsQS5jb21wYXJl
VG8obXlWYWxCKSA9PSAwICkgezxicj4gU3lzdGVtLm91dC5wcmludGxuKCJUaGV5IG1hdGNoISIp
Ozxicj59PGJyPmBgYA==">
    ​
  </div>
</div>

 [1]: http://download.oracle.com/javase/6/docs/api/java/math/BigDecimal.html "JavaDoc"