---
title: Ctrl+Alt+Arrow Broken (and fixed) in Eclipse
author: Joe
layout: post
date: 2012-10-24
url: /2012/10/24/ctrlaltarrow-broken-and-fixed-in-eclipse/
categories:
  - Eclipse
tags:
  - Eclipse

---
If you&#8217;re a _pragmatic programmer_, then you&#8217;ve learned all the shortcuts you can to make your coding day easier. I&#8217;ve been a fan of the numerous shortcuts in Eclipse such as Alt+Shift+S,R to create all class accessors/mutators. Still, my favorite has been **Ctrl+Alt+Up/Down Arrow** and **Ctrl+Up/Down Arrow** to instantly duplicate a line above or below the current line and to move it around. Who has time to select, copy, move, paste? Plus, you can now save your copy/paste buffer for more important things, like that LinkedIn password you keep changing each time they&#8217;re hacked.

But on my new X220 ThinkPad, shortcut just does not work in Eclipse. I was pulling my hair out. Of course I disabled graphics rotation hotkeys from the desktop context menu, but it kept failing to work in Eclipse. WTF? I even double checked the shortcut configurations in Eclipse to ensure it was not changed. No dice.

While pulling my hair out, and killing random processes, I found the SOB. Lenovo, in their great wisdom, has also used the _very same key bindings as their graphics driver_ to rotate the screen in the <span style="text-decoration: underline;"><strong><em>Lenovo Reading Optimizer</em></strong></span>. Pull your hair out all night, you&#8217;ll just be bald and angry in the morning.

## The Fix

  1. ## Disable hotkey rotation on the desktop context menu.
    
    <div>
      <span class="frame-outer  aligncenter size-full wp-image-95"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2012/10/temp001.png"><img class="aligncenter size-full wp-image-95" title="temp001" src="http://www.lustforge.com/wp-content/uploads/2012/10/temp001.png" alt="" width="415" height="145" srcset="https://lustforge.com/wp-content/uploads/2012/10/temp001-300x104.png 300w, https://lustforge.com/wp-content/uploads/2012/10/temp001.png 471w" sizes="(max-width: 471px) 100vw, 471px" /></a></span></span></span></span></span>
    </div>

  2. # **<span style="color: #ff0000;">Uninstall Lenovo Reading Optimizer. </span>**
    
    (from Add and Remove Programs) </li> </ol>