---
title: Windows Downloads without Windows Genuine Advantage
author: Joe
layout: post
date: 2011-07-02
url: /2011/07/02/windows-downloads-without-windows-genuine-advantage/
categories:
  - Hidden in plain Site
  - 'Tips &amp; Tricks'
tags:
  - 'Tips &amp; Tricks'

---
I found myself needing to <a title="Check it out" href="http://www.microsoft.com/windows/virtual-pc/download.aspx?runGenuineCheck=true&system=7&lang=1&buttonClicked=winVirtualPC" target="_blank">download Virtual PC</a> from Microsoft recently to test anapplication. I have a bonafide copy of windows, but my enterprise anti-virus won&#8217;t let me run WGA. No problem, we&#8217;ll just snoop around the MS site.

The following modal keeps prompting an ineffective download of WGA.

<div id="attachment_38" style="width: 310px" class="wp-caption aligncenter">
  <span class="frame-outer  size-medium wp-image-38"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2011/07/wga_ex2.png"><img class="size-medium wp-image-38" title="Officious WGA Prompt" src="http://www.lustforge.com/wp-content/uploads/2011/07/wga_ex2-300x181.png" alt="Officious WGA Prompt" width="300" height="181" srcset="https://lustforge.com/wp-content/uploads/2011/07/wga_ex2-300x181.png 300w, https://lustforge.com/wp-content/uploads/2011/07/wga_ex2.png 648w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  
  <p class="wp-caption-text">
    Officious WGA Prompt
  </p></span></span></span></span></span>
</div>

However, let&#8217;s fire up Chrome and look at the html in the page.

<div id="attachment_37" style="width: 310px" class="wp-caption aligncenter">
  <span class="frame-outer  small size-medium wp-image-37"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2011/07/wga_ex1.png"><img class="size-medium wp-image-37" title="The hidden div" src="http://www.lustforge.com/wp-content/uploads/2011/07/wga_ex1-300x92.png" alt="The hidden div" width="300" height="92" /></a>
  
  <p class="wp-caption-text">
    The hidden WGA Success Div
  </p></span></span></span></span></span>
</div>

Hmm, check out the div **GenuineCheck\_Validated\_Successful**. I bet there is a link in it. So let&#8217;s check inside.  Bingo!

<pre class="brush: xml; title: ; notranslate" title="">onclick="OnGenuineCheck_ContinueDownloadVPC_Button_Clicked(); return false;"</pre>

And here we are, just run this javascript at the console for the page and the download will start right up, without WGA!

<div id="attachment_39" style="width: 310px" class="wp-caption aligncenter">
  <span class="frame-outer  size-medium wp-image-39"><span><span><span><span><a href="http://www.lustforge.com/wp-content/uploads/2011/07/wga_ex3.png"><img class="size-medium wp-image-39" title="Chrome Console Workaround" src="http://www.lustforge.com/wp-content/uploads/2011/07/wga_ex3-300x199.png" alt="Chrome Console Workaround" width="300" height="199" /></a>
  
  <p class="wp-caption-text">
    Chrome Console Workaround
  </p></span></span></span></span></span>
</div>

<pre class="brush: jscript; title: ; notranslate" title="">OnGenuineCheck_ContinueDownloadVPC_Button_Clicked()</pre>

Wow, that was easy. Now, if MS had really cared to keep us out, they could have worked hard, but then we&#8217;d have to work harder too to get around it. Thanks MS!