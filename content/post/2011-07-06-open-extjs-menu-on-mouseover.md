---
title: Open ExtJs Menu on Mouseover
author: Joe
layout: post
date: 2011-07-06
url: /2011/07/06/open-extjs-menu-on-mouseover/
categories:
  - ExtJs
tags:
  - ExtJs

---
Would you believe there is no way to open an ExtJs toolbar menu when you hover over the corresponding button? This functionality is all over the ExtJs <a title="Sencha Home" href="www.sencha.com" target="_blank">homepage</a>, but not in their framework. Boo! Nope, nothing without pulling the buttons out of the toolbar (see <a title="ExtJs Forum Topic" href="http://www.sencha.com/forum/showthread.php?69931-toolbar-menu-open-on-hover" target="_blank">here</a>), which is a no go for already built applications.

So, I present you with the **HoverButton**. It is just like the standard button, but hides after 250ms of mouseout from the button or the opened menu. Just use the _xtype_ of **hoverButton** where you used **button** before. That was easy!

To achieve this, listeners check for mouseover/out of the button and set a <a title="ExtJs Source/Doc" href="http://docs.sencha.com/air/source/DelayedTask.html#cls-Ext.util.DelayedTask" target="_blank">Ext.util.DelayedTask</a>, and if the user moves to the menulist, the close is delayed until they leave. Pretty simple. Enjoy.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=40&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-javascript" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="comment" style="color: #999988; font-style: italic;">/**
 * Add autoShow on mouseover option to buttons with menus
 * @copyright LustForge.com 2011
 * @author J.Lust
 * @version ExtJs 3.3.4
 */&lt;/span>
Ext.HoverButton = Ext.extend( Ext.Button, {

    &lt;span class="comment" style="color: #999988; font-style: italic;">// hide task properties and helpers&lt;/span>
    hideTask : &lt;span class="literal">null&lt;/span>,
    hideTaskMs : &lt;span class="number" style="color: #009999;">250&lt;/span>, &lt;span class="comment" style="color: #999988; font-style: italic;">// timeout in ms&lt;/span>
    hideTaskFn : &lt;span class="function">&lt;span class="keyword" style="color: #333333; font-weight: bold;">function&lt;/span>&lt;span class="params">()&lt;/span> {&lt;/span>
        &lt;span class="keyword" style="color: #333333; font-weight: bold;">if&lt;/span>( &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideTask !== &lt;span class="literal">null&lt;/span> ) {
            &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideTask.cancel();
        }
        &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideTask = &lt;span class="keyword" style="color: #333333; font-weight: bold;">new&lt;/span> Ext.util.DelayedTask(&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideMenu,&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>);
        &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideTask.delay( &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideTaskMs );
    },

    &lt;span class="comment" style="color: #999988; font-style: italic;">// extend init props&lt;/span>
    initComponent : &lt;span class="function">&lt;span class="keyword" style="color: #333333; font-weight: bold;">function&lt;/span> &lt;span class="params">(  )&lt;/span> {&lt;/span>

        &lt;span class="comment" style="color: #999988; font-style: italic;">// add hide/show, if this is a button with menu&lt;/span>
        &lt;span class="keyword" style="color: #333333; font-weight: bold;">var&lt;/span> config = {}, menuConfig = {};
        &lt;span class="keyword" style="color: #333333; font-weight: bold;">if&lt;/span>( Ext.isDefined(&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.initialConfig.menu) ) {
            config = {
                listeners : {
                    menutriggerover : {
                        fn: &lt;span class="function">&lt;span class="keyword" style="color: #333333; font-weight: bold;">function&lt;/span>&lt;span class="params">(b)&lt;/span> {&lt;/span>
                            &lt;span class="comment" style="color: #999988; font-style: italic;">//console.log('menutriggerOver');&lt;/span>
                            b.showMenu();
                        },
                        scope:&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>
                    },
                    menutriggerout : {
                        fn: &lt;span class="function">&lt;span class="keyword" style="color: #333333; font-weight: bold;">function&lt;/span>&lt;span class="params">(b)&lt;/span> {&lt;/span>
                            &lt;span class="comment" style="color: #999988; font-style: italic;">//console.log('menutriggerOut');&lt;/span>
                            &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideTaskFn();
                        },
                        scope:&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>
                    }
                }
            };
            &lt;span class="comment" style="color: #999988; font-style: italic;">// add listeners to see if user is over extended menu list&lt;/span>
            menuConfig = {
                listeners : {
                    &lt;span class="comment" style="color: #999988; font-style: italic;">// if mousing over menu list, disable timeout&lt;/span>
                    mouseover : {
                        fn: &lt;span class="function">&lt;span class="keyword" style="color: #333333; font-weight: bold;">function&lt;/span>&lt;span class="params">(b)&lt;/span> {&lt;/span>
                            &lt;span class="comment" style="color: #999988; font-style: italic;">// cancel hide if they went away and came back&lt;/span>
                            &lt;span class="keyword" style="color: #333333; font-weight: bold;">if&lt;/span>( &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideTask !== &lt;span class="literal">null&lt;/span> ) {
                                &lt;span class="comment" style="color: #999988; font-style: italic;">//console.log('menu mouseOver');&lt;/span>
                                &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideTask.cancel();
                                &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideTask = &lt;span class="literal">null&lt;/span>;
                            }
                        },
                        scope:&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>
                    },
                    &lt;span class="comment" style="color: #999988; font-style: italic;">// on mousing out of menu list, resume timeout&lt;/span>
                    mouseout: {
                        fn: &lt;span class="function">&lt;span class="keyword" style="color: #333333; font-weight: bold;">function&lt;/span>&lt;span class="params">(b)&lt;/span> {&lt;/span>
                            &lt;span class="comment" style="color: #999988; font-style: italic;">//console.log('menu mouseOut');&lt;/span>
                            &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.hideTaskFn();
                        },
                        scope:&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>
                    }
                }
            };

            Ext.apply( &lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.menu, menuConfig );
        }

        &lt;span class="comment" style="color: #999988; font-style: italic;">// apply config&lt;/span>
        Ext.apply(&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>, Ext.apply(&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>.initialConfig, config));
        &lt;span class="comment" style="color: #999988; font-style: italic;">// call parent&lt;/span>
        Ext.HoverButton.superclass.initComponent.apply(&lt;span class="keyword" style="color: #333333; font-weight: bold;">this&lt;/span>,arguments);
    }
});
Ext.reg(&lt;span class="string" style="color: #dd1144;">'hoverButton'&lt;/span>, Ext.HoverButton );
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgamF2YXNjcmlwdDxicj4vKio8YnI+ICogQWRkIGF1dG9TaG93IG9uIG1vdXNlb3ZlciBvcHRp
b24gdG8gYnV0dG9ucyB3aXRoIG1lbnVzPGJyPiAqIEBjb3B5cmlnaHQgTHVzdEZvcmdlLmNvbSAy
MDExPGJyPiAqIEBhdXRob3IgSi5MdXN0PGJyPiAqIEB2ZXJzaW9uIEV4dEpzIDMuMy40PGJyPiAq
Lzxicj5FeHQuSG92ZXJCdXR0b24gPSBFeHQuZXh0ZW5kKCBFeHQuQnV0dG9uLCB7PGJyPjxicj4J
Ly8gaGlkZSB0YXNrIHByb3BlcnRpZXMgYW5kIGhlbHBlcnM8YnI+CWhpZGVUYXNrIDogbnVsbCw8
YnI+CWhpZGVUYXNrTXMgOiAyNTAsIC8vIHRpbWVvdXQgaW4gbXM8YnI+CWhpZGVUYXNrRm4gOiBm
dW5jdGlvbigpIHs8YnI+CQlpZiggdGhpcy5oaWRlVGFzayAhPT0gbnVsbCApIHs8YnI+CQkJdGhp
cy5oaWRlVGFzay5jYW5jZWwoKTs8YnI+CQl9PGJyPgkJdGhpcy5oaWRlVGFzayA9IG5ldyBFeHQu
dXRpbC5EZWxheWVkVGFzayh0aGlzLmhpZGVNZW51LHRoaXMpOzxicj4JCXRoaXMuaGlkZVRhc2su
ZGVsYXkoIHRoaXMuaGlkZVRhc2tNcyApOzxicj4JfSw8YnI+PGJyPgkvLyBleHRlbmQgaW5pdCBw
cm9wczxicj4JaW5pdENvbXBvbmVudCA6IGZ1bmN0aW9uICggICkgezxicj48YnI+CQkvLyBhZGQg
aGlkZS9zaG93LCBpZiB0aGlzIGlzIGEgYnV0dG9uIHdpdGggbWVudTxicj4JCXZhciBjb25maWcg
PSB7fSwgbWVudUNvbmZpZyA9IHt9Ozxicj4JCWlmKCBFeHQuaXNEZWZpbmVkKHRoaXMuaW5pdGlh
bENvbmZpZy5tZW51KSApIHs8YnI+CQkJY29uZmlnID0gezxicj4JCQkJbGlzdGVuZXJzIDogezxi
cj4JCQkJCW1lbnV0cmlnZ2Vyb3ZlciA6IHs8YnI+CQkJCQkJZm46IGZ1bmN0aW9uKGIpIHs8YnI+
CQkJCQkJCS8vY29uc29sZS5sb2coJ21lbnV0cmlnZ2VyT3ZlcicpOzxicj4JCQkJCQkJYi5zaG93
TWVudSgpOzxicj4JCQkJCQl9LDxicj4JCQkJCQlzY29wZTp0aGlzPGJyPgkJCQkJfSw8YnI+CQkJ
CQltZW51dHJpZ2dlcm91dCA6IHs8YnI+CQkJCQkJZm46IGZ1bmN0aW9uKGIpIHs8YnI+CQkJCQkJ
CS8vY29uc29sZS5sb2coJ21lbnV0cmlnZ2VyT3V0Jyk7PGJyPgkJCQkJCQl0aGlzLmhpZGVUYXNr
Rm4oKTs8YnI+CQkJCQkJfSw8YnI+CQkJCQkJc2NvcGU6dGhpczxicj4JCQkJCX08YnI+CQkJCX08
YnI+CQkJfTs8YnI+CQkJLy8gYWRkIGxpc3RlbmVycyB0byBzZWUgaWYgdXNlciBpcyBvdmVyIGV4
dGVuZGVkIG1lbnUgbGlzdDxicj4JCQltZW51Q29uZmlnID0gezxicj4JCQkJbGlzdGVuZXJzIDog
ezxicj4JCQkJCS8vIGlmIG1vdXNpbmcgb3ZlciBtZW51IGxpc3QsIGRpc2FibGUgdGltZW91dDxi
cj4JCQkJCW1vdXNlb3ZlciA6IHs8YnI+CQkJCQkJZm46IGZ1bmN0aW9uKGIpIHs8YnI+CQkJCQkJ
CS8vIGNhbmNlbCBoaWRlIGlmIHRoZXkgd2VudCBhd2F5IGFuZCBjYW1lIGJhY2s8YnI+CQkJCQkJ
CWlmKCB0aGlzLmhpZGVUYXNrICE9PSBudWxsICkgezxicj4JCQkJCQkJCS8vY29uc29sZS5sb2co
J21lbnUgbW91c2VPdmVyJyk7PGJyPgkJCQkJCQkJdGhpcy5oaWRlVGFzay5jYW5jZWwoKTs8YnI+
CQkJCQkJCQl0aGlzLmhpZGVUYXNrID0gbnVsbDs8YnI+CQkJCQkJCX08YnI+CQkJCQkJfSw8YnI+
CQkJCQkJc2NvcGU6dGhpczxicj4JCQkJCX0sPGJyPgkJCQkJLy8gb24gbW91c2luZyBvdXQgb2Yg
bWVudSBsaXN0LCByZXN1bWUgdGltZW91dDxicj4JCQkJCW1vdXNlb3V0OiB7PGJyPgkJCQkJCWZu
OiBmdW5jdGlvbihiKSB7PGJyPgkJCQkJCQkvL2NvbnNvbGUubG9nKCdtZW51IG1vdXNlT3V0Jyk7
PGJyPgkJCQkJCQl0aGlzLmhpZGVUYXNrRm4oKTs8YnI+CQkJCQkJfSw8YnI+CQkJCQkJc2NvcGU6
dGhpczxicj4JCQkJCX08YnI+CQkJCX08YnI+CQkJfTs8YnI+PGJyPgkJCUV4dC5hcHBseSggdGhp
cy5tZW51LCBtZW51Q29uZmlnICk7PGJyPgkJfTxicj48YnI+CQkvLyBhcHBseSBjb25maWc8YnI+
CQlFeHQuYXBwbHkodGhpcywgRXh0LmFwcGx5KHRoaXMuaW5pdGlhbENvbmZpZywgY29uZmlnKSk7
PGJyPgkJLy8gY2FsbCBwYXJlbnQ8YnI+CQlFeHQuSG92ZXJCdXR0b24uc3VwZXJjbGFzcy5pbml0
Q29tcG9uZW50LmFwcGx5KHRoaXMsYXJndW1lbnRzKTs8YnI+CX08YnI+fSk7PGJyPkV4dC5yZWco
J2hvdmVyQnV0dG9uJywgRXh0LkhvdmVyQnV0dG9uICk7PGJyPmBgYA==">
    ​
  </div>
</div>