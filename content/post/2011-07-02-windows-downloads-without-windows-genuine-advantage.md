---
title: Windows Downloads without Windows Genuine Advantage
author: Joe
layout: post
date: 2011-07-02
url: /2011/07/02/windows-downloads-without-windows-genuine-advantage/
tags:
  - Hidden in plain Site
  - 'Tips and Tricks'
---
I found myself needing to [download Virtual PC][1] from Microsoft recently to test an application. I have a bonafide copy of windows, but my enterprise anti-virus won&#8217;t let me run WGA. No problem, we&#8217;ll just snoop around the MS site.

The following modal keeps prompting an ineffective download of WGA.

{{< figure src="/img/wga_example.png" >}}

However, let&#8217;s fire up Chrome and look at the html in the page.

{{< figure src="/img/wga_example_2.png" >}}

Hmm, check out the div **GenuineCheck\_Validated\_Successful**. I bet there is a link in it. So let&#8217;s check inside.  Bingo!

```javascript
onclick="OnGenuineCheck_ContinueDownloadVPC_Button_Clicked(); return false;"
```

And here we are, just run this javascript at the console for the page and the download will start right up, without WGA!

{{< figure src="/img/wga_example_3.png" >}}

```javascript
OnGenuineCheck_ContinueDownloadVPC_Button_Clicked()
```

Wow, that was easy. Now, if MS had really cared to keep us out, they could have worked harder, but then we&#8217;d have to work harder too to get around it. Thanks MS!

 [1]: https://www.microsoft.com/en-us/download/details.aspx?id=3702
