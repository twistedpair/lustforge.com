---
title: Ctrl+Alt+Arrow Broken (and fixed) in Eclipse
author: Joseph Lust
layout: post
date: 2012-10-24
url: /2012/10/24/ctrlaltarrow-broken-and-fixed-in-eclipse/
tags:
  - Eclipse

---
If you&#8217;re a _pragmatic programmer_, then you&#8217;ve learned all the shortcuts you can to make your coding day easier. I&#8217;ve been a fan of the numerous shortcuts in Eclipse such as **Alt+Shift+S,R** to create all class accessors/mutators. Still, my favorite has been **Ctrl+Alt+⇑/⇓** and **Ctrl+⇑/⇓** to instantly duplicate a line above or below the current line and to move it around. Who has time to select, copy, move, paste? Plus, you can now save your copy/paste buffer for more important things, like that LinkedIn password you keep changing [each time they&#8217;re hacked](http://www.pcworld.com/article/257045/6_5m_linkedin_passwords_posted_online_after_apparent_hack.html).

But on my new X220 ThinkPad, the shortcut just does not work in Eclipse. I was pulling my hair out. Of course I disabled graphics rotation hotkeys from the desktop context menu, but it kept failing to work in Eclipse. WTF? I even double checked the shortcut configurations in Eclipse to ensure it was not changed. No dice.

While pulling my hair out, and killing random processes, I found the SOB. Lenovo, in their great wisdom, has also used the _very same key bindings as their graphics driver_ to rotate the screen in the **Lenovo Reading Optimizer**. Pull your hair out all night, you&#8217;ll just be bald and angry in the morning.

## The Fix

1. Disable hotkey rotation on the desktop context menu

    {{< figure src="/img/eclipse_copy_shortcut_fix.png" >}}

2. Uninstall Lenovo Reading Optimizer
    
    (from Add and Remove Programs) </li> </ol>
