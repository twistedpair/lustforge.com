---
title: Update ExtJs TabPanel Tab Title
author: Joe
layout: post
date: 2011-05-01
url: /2011/05/01/update-extjs-tab-title/
categories:
  - ExtJs
tags:
  - ExtJs

---
Isn&#8217;t ExtJs the cat&#8217;s meow? I think so, but many cats have hairballs. For ExtJs, this includes missing the ability to update the title of a TabPanel tab title once it has been rendered. Sure, you can find the _item_ and _title_ properties for your tab post-render, but that won&#8217;t update your page. You need to crawl the DOM. I&#8217;ve created an update to do just this.

Just paste the below override in your code and you can then call the **setTabTitle( tabNo, newTitle )** method to update a given tab title. You&#8217;ll need to know the index of your tab in the tab panel.

For example:

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=28&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-javascript" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.ownerCt.setTabTitle(&lt;span class="number" style="color: #009999;">0&lt;/span>,&lt;span class="string" style="color: #dd1144;">'New Title!'&lt;/span>)
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgamF2YXNjcmlwdDxicj50aGlzLm93bmVyQ3Quc2V0VGFiVGl0bGUoMCwnTmV3IFRpdGxlIScp PGJyPmBgYA==">
    ​
  </div>
</div>

<pre>The override code:</pre>

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=28&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-javascript" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="comment" style="color: #999988; font-style: italic;">/**
 * Overrides the Ext.TabPanel to add .setTabTitle() function
 * @author Lust
 *
 */&lt;/span>
Ext.override(Ext.TabPanel, {
 &lt;span class="comment" style="color: #999988; font-style: italic;">/**
 * Set the title of a specific tab
 */&lt;/span>
 setTabTitle: &lt;span class="function">&lt;span class="keyword" style="color: #333333; font-weight: bold;">function&lt;/span>&lt;span class="params">( tabNo, newTitle )&lt;/span> {&lt;/span>
     &lt;span class="comment" style="color: #999988; font-style: italic;">// make sure we have a number and tab exists&lt;/span>
     &lt;span class="keyword" style="color: #333333; font-weight: bold;">if&lt;/span>( tabNo&gt;=&lt;span class="number" style="color: #009999;">0&lt;/span> && !Ext.isEmpty( &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.getTabEl(tabNo))) {
        &lt;span class="keyword" style="color: #333333; font-weight: bold;">var&lt;/span> tabEl = &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.getTabEl(tabNo); &lt;span class="comment" style="color: #999988; font-style: italic;">// walk down dom, update title span&lt;/span>
         Ext.getDom(tabEl).down(&lt;span class="string" style="color: #dd1144;">'.x-tab-strip-text'&lt;/span>).innerHTML = newTitle;
     }
   }
 });
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgamF2YXNjcmlwdDxicj4vKio8YnI+ICogT3ZlcnJpZGVzIHRoZSBFeHQuVGFiUGFuZWwgdG8g
YWRkIC5zZXRUYWJUaXRsZSgpIGZ1bmN0aW9uPGJyPiAqIEBhdXRob3IgTHVzdDxicj4gKjxicj4g
Ki88YnI+RXh0Lm92ZXJyaWRlKEV4dC5UYWJQYW5lbCwgezxicj4gLyoqPGJyPiAqIFNldCB0aGUg
dGl0bGUgb2YgYSBzcGVjaWZpYyB0YWI8YnI+ICovPGJyPiBzZXRUYWJUaXRsZTogZnVuY3Rpb24o
IHRhYk5vLCBuZXdUaXRsZSApIHs8YnI+IC8vIG1ha2Ugc3VyZSB3ZSBoYXZlIGEgbnVtYmVyIGFu
ZCB0YWIgZXhpc3RzPGJyPiBpZiggdGFiTm8mZ3Q7PTAgJmFtcDsmYW1wOyAhRXh0LmlzRW1wdHko
IHRoaXMuZ2V0VGFiRWwodGFiTm8pKSkgezxicj4gdmFyIHRhYkVsID0gdGhpcy5nZXRUYWJFbCh0
YWJObyk7IC8vIHdhbGsgZG93biBkb20sIHVwZGF0ZSB0aXRsZSBzcGFuPGJyPiBFeHQuZ2V0RG9t
KHRhYkVsKS5kb3duKCcueC10YWItc3RyaXAtdGV4dCcpLmlubmVySFRNTCA9IG5ld1RpdGxlOzxi
cj4gfTxicj4gfTxicj4gfSk7PGJyPiBgYGA=">
    ​
  </div>
</div>

<pre><strong>Note: Those using ExtJs 3.3.1+, see Anup's comment on some tweaks.</strong></pre>