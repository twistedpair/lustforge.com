---
title: ExtJs Field getForm() Override
author: Joe
layout: post
date: 2011-06-19
url: /2011/06/19/extjs-field-getform-override/
categories:
  - ExtJs
tags:
  - ExtJs

---
When using the DOM directly, if you have the element reference to an <INPUT> object, you can reference its parent via **el.form**. However, in ExtJs, **there is no such accessor for the form of field**. The following ExtJs override adds the **getForm()** method to a field which will search upward through the ExtDOM until it finds a parent form, or hits a recursion depth of 10.

Example usage:

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: rgb(34, 34, 34); border: none; line-height: 1.2; background-color: rgb(255, 255, 255);" data-md-url="https://lustforge.com/wp-admin/post.php?post=32&action=edit">
  <pre style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;font-size: 1em; line-height: 1.2em; overflow: auto;margin: 1em 0px;"><code class="language-javascript" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace;margin: 0px 0.15em; padding: 0px 0.3em; white-space: nowrap; border: 1px solid rgb(234, 234, 234); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: inline; background-color: rgb(248, 248, 248);white-space: pre; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(204, 204, 204); padding: 0.5em 0.7em;display: block; padding: 0.5em; color: rgb(51, 51, 51); background: rgb(248, 248, 255);">    &lt;span class="comment" style="color: rgb(153, 153, 136); font-style: italic;">// Example useage&lt;/span>
    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">var&lt;/span> myField = Ext.getCmp(&lt;span class="string" style="color: rgb(221, 17, 68);">'myField'&lt;/span>);
    &lt;span class="keyword" style="color: rgb(51, 51, 51); font-weight: bold;">var&lt;/span> form = myField.getForm();
</code></pre>
  
  <div style="height:0;font-size:0em;padding:0;margin:0;" title="MDH:YGBgamF2YXNjcmlwdDxicj4JLy8gRXhhbXBsZSB1c2VhZ2U8YnI+CXZhciBteUZpZWxkID0gRXh0
LmdldENtcCgnbXlGaWVsZCcpOzxicj4JdmFyIGZvcm0gPSBteUZpZWxkLmdldEZvcm0oKTs8YnI+
YGBg">
    ​
  </div>
</div>

Override code: Include this before your form.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=32&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-javascript" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">    &lt;span class="comment" style="color: #999988; font-style: italic;">/*
     * DOM gives &lt;INPUT&gt; a 'form' property pointing to the parent
     * however ExtJS does not do this for fields. Override to add it.
     * USE: this.getForm() to get form of a field
     * NOTE: maximum search depth of 10 to prevent run away bubble up search
     */&lt;/span>
    Ext.override(Ext.form.Field, {
        form : &lt;span class="literal">null&lt;/span>, &lt;span class="comment" style="color: #999988; font-style: italic;">// cache so we don't perform many lookups&lt;/span>
        getForm: &lt;span class="function">&lt;span class="keyword" style="color: #333333; font-weight: bold;">function&lt;/span>&lt;span class="params">()&lt;/span> {&lt;/span>
            &lt;span class="keyword" style="color: #333333; font-weight: bold;">if&lt;/span>( &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.form===&lt;span class="literal">null&lt;/span>) {
                &lt;span class="keyword" style="color: #333333; font-weight: bold;">var&lt;/span> scope = &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>, maxDepth=&lt;span class="number" style="color: #009999;">10&lt;/span>, n=&lt;span class="number" style="color: #009999;">0&lt;/span>;
                &lt;span class="keyword" style="color: #333333; font-weight: bold;">for&lt;/span>( ; n&lt;maxDepth && Ext.isDefined(scope.ownerCt); n++) {
                    scope=scope.ownerCt; &lt;span class="comment" style="color: #999988; font-style: italic;">// drill higher&lt;/span>
                    &lt;span class="comment" style="color: #999988; font-style: italic;">//console.log( n+":"+scope.ownerCt.id); // debug output&lt;/span>
                    &lt;span class="keyword" style="color: #333333; font-weight: bold;">if&lt;/span>( Ext.isDefined(scope.getForm) ) {
                        &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.form = scope.getForm();
                        &lt;span class="keyword" style="color: #333333; font-weight: bold;">break&lt;/span>;
                    }
                }
            }
            &lt;span class="keyword" style="color: #333333; font-weight: bold;">return&lt;/span> &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.form;
        }
    });
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgamF2YXNjcmlwdDxicj4JLyo8YnI+CSAqIERPTSBnaXZlcyAmbHQ7SU5QVVQmZ3Q7IGEgJ2Zv
cm0nIHByb3BlcnR5IHBvaW50aW5nIHRvIHRoZSBwYXJlbnQ8YnI+CSAqIGhvd2V2ZXIgRXh0SlMg
ZG9lcyBub3QgZG8gdGhpcyBmb3IgZmllbGRzLiBPdmVycmlkZSB0byBhZGQgaXQuPGJyPgkgKiBV
U0U6IHRoaXMuZ2V0Rm9ybSgpIHRvIGdldCBmb3JtIG9mIGEgZmllbGQ8YnI+CSAqIE5PVEU6IG1h
eGltdW0gc2VhcmNoIGRlcHRoIG9mIDEwIHRvIHByZXZlbnQgcnVuIGF3YXkgYnViYmxlIHVwIHNl
YXJjaDxicj4JICovPGJyPglFeHQub3ZlcnJpZGUoRXh0LmZvcm0uRmllbGQsIHs8YnI+CQlmb3Jt
IDogbnVsbCwgLy8gY2FjaGUgc28gd2UgZG9uJ3QgcGVyZm9ybSBtYW55IGxvb2t1cHM8YnI+CQln
ZXRGb3JtOiBmdW5jdGlvbigpIHs8YnI+CQkJaWYoIHRoaXMuZm9ybT09PW51bGwpIHs8YnI+CQkJ
CXZhciBzY29wZSA9IHRoaXMsIG1heERlcHRoPTEwLCBuPTA7PGJyPgkJCQlmb3IoIDsgbiZsdDtt
YXhEZXB0aCAmYW1wOyZhbXA7IEV4dC5pc0RlZmluZWQoc2NvcGUub3duZXJDdCk7IG4rKykgezxi
cj4JCQkJCXNjb3BlPXNjb3BlLm93bmVyQ3Q7IC8vIGRyaWxsIGhpZ2hlcjxicj4JCQkJCS8vY29u
c29sZS5sb2coIG4rIjoiK3Njb3BlLm93bmVyQ3QuaWQpOyAvLyBkZWJ1ZyBvdXRwdXQ8YnI+CQkJ
CQlpZiggRXh0LmlzRGVmaW5lZChzY29wZS5nZXRGb3JtKSApIHs8YnI+CQkJCQkJdGhpcy5mb3Jt
ID0gc2NvcGUuZ2V0Rm9ybSgpOzxicj4JCQkJCQlicmVhazs8YnI+CQkJCQl9PGJyPgkJCQl9PGJy
PgkJCX08YnI+CQkJcmV0dXJuIHRoaXMuZm9ybTs8YnI+CQl9PGJyPgl9KTs8YnI+YGBg">
    ​
  </div>
</div>