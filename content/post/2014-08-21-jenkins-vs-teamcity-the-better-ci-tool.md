---
title: Jenkins vs. Teamcity – The Better CI Tool
author: Joe
layout: post
date: 2014-08-21
url: /2014/08/21/jenkins-vs-teamcity-the-better-ci-tool/
categories:
  - Continuous Integration

---
Let&#8217;s dispel the myth about Jenkins being the gold standard continuous integration tool. I&#8217;m sorry, TeamCity is much better. <span class="frame-outer  alignright"><span><span><span><span><img class="alignright" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpbph4bk3HtIR4pCZp40RTKDzzLKzc5HN9PtvkWd0MdtVnC3Nc" alt="" width="152" height="152" />
  
#### Dispelling the Jenkins CI Myth

I started using Jenkins when it was called Hudson, before the [Oracle naming spat][2]. Recently, I downloaded and installed it again and was shocked to see that little appears to have changed in so many years. What&#8217;s in a UI? Not much if you&#8217;re technical, but geeze, Jenkins still has the aura of an app knocked together during an all night hackathon in 1997 .

Let&#8217;s knock the legs from under this myth.

#### 1. Jenkins is Open Source

Many Jenkins fans are [FOSS][3] fans. If there is an _open source solution_, perhaps buggy or poorly maintained, they feel compelled to use it. Much like one can imagine [RMS][4] foregoing a life saving treatment if the medical apparatus didn&#8217;t run open source code he&#8217;d compiled himself.

Be careful though as there are few absolute FOSS purists in practice. Inevitably, people use the best tool for the job at hand. Why does a company write code with 23 FOSS tools/languages on closed source Windows desktops? Probably _because it works for them_ and that special accounting application or antiquated, but stable, engineering software that&#8217;s core to the business. Just because other options are Open Source doesn&#8217;t make the whole tool chain better in practice. 

#### 2. Jenkins is FREE!, TeamCity is Expensive

The Jenkins fan will note that Jenkins is free, but TeamCity costs money. Hiss! Boo!

They&#8217;ll not mention you can use the TeamCity CI server and three (3) build agents for FREE. And that you&#8217;re only out $100/agent thereafter and $1000 for the CI server. Anyone bought Visual Studio lately? Anyone use the many $5K/seat tools out there? Anyone&#8230;use Windows (Debian lover myself) ? They all cost a ton more than Jenkins. Why do you use those rather than the FOSS solution? Perhaps it&#8217;s for the quality of the tool or the paid support behind it. Remember, many of us work for profit.

#### 3. We&#8217;re an OSS Project, We Can&#8217;t Afford Paid Anything

I&#8217;m a huge fan of open source projects. I contribute to several. And I frequently spar over what CI tool to use. _CloudBees_, _BuildHive_, _Travis_ or your own Jenkins Instance? Fatuously such groups write off TeamCity since it would cost cheddar they don&#8217;t have. But that would completely ignore the fact that JetBrains gives away everything for [FREE to open source projects][5].

#### 4. But There&#8217;s a Plugin For That!

My first production encounter with Jenkins was a comedy of errors. I had inherited a mature Jenkins installation where all quotidian tasks were either manual or cumbersome. For example, hand written jobs to do nothing but free up space from other jobs. Hacks and hacks and duct tape scripts to make the build chains we used. And throw in a bi-weekly inopportune crash for good measure.

I was shocked. Everything folks had wasted their time on via various scripts and manual efforts was a __standard, default, out of the box__ feature in TeamCity. But stand back if you ask a Jenkins fan about this. They will counter &#8220;but there&#8217;s a plugin for that!&#8221; Perhaps there is. A non-code reviewed plugin that does part of what you want and was last updated 19 months ago and a few major releases hence. Or, there will be three plugins to do almost the same task, and most of it might work, but check the GitHub page and recompile if you want that functionality.

This is sad given that the configurations TC has out of the box could have skipped $10K in developer efforts over the last two years. But, alas, TC isn&#8217;t FREE.

### Other Bones to Pick

Some other things that Jenkins could improve:

  * NO SECURITY by default? Why? TC secures out of the box. Common man.
  * No Password masking by default, you'll need the [masking plugin](https://wiki.jenkins-ci.org/display/JENKINS/Mask+Passwords+Plugin)
  * No [PreTested Commit](https://confluence.jetbrains.com/display/TCD9/Pre-Tested+%28Delayed%29+Commit) &#8211; a TC standard that&#8217;s integrated with Intellij/Eclipse &#8211; [Jenkins progress](https://wiki.jenkins-ci.org/display/JENKINS/Designing+pre-tested+commit)
  * Defaults to port `8080` &#8230; way too common a port for DEV&#8217;s. Will conflict with all Java devs
  * Startup logs are to `.err.log`? Why?
  * Lack of timestamps in 2 of 3 logs. You didn't want to know when that error happened.
  * Plugin install still triggers server restart, even if no plugins were updated/installed
  * Coarseness of &#8220;Auto-Refresh&#8221; &#8211; keeps reloading documentation pages! Is it 1998? XHR much?

#### Conclusions and Disclaimers

Give TeamCity a try. I&#8217;ve been loving it for <s>4</s> 6 years now and use it on every project. Do I work for JetBrains? Nope. Then why write this? Because everyone I talk to claims Jenkins is God&#8217;s gift to integration. It makes me think I&#8217;m must be taking crazy pills, so I&#8217;ve written this so someone out there can make a more informed CI tooling decision.

&nbsp;

#### Don&#8217;t Take My Word For It

For all your know I&#8217;m a shill that screams at fire hydrants in the night. Read the top hits for &#8220;TeamCity vs Jenkins&#8221; and you&#8217;ll discover the same thesis.

  * [TeamCity vs Jenkins: Which is the Better Continuous Integration (CI) Server for .NET Software Development?][6]
  * [Moving to TeamCity from Jenkins][7]
  * [Comparing Jenkins vs TeamCity &#8211; Part 2][8]
  * [How-To: Continuous Integration with TeamCity and Behat][9]
  * [TeamCity is pretty cool, you should totally check it out][9]

&nbsp;

&nbsp;

 [1]: https://lustforge.com/wp-content/uploads/2014/08/tcJenkins.png
 [2]: http://en.wikipedia.org/wiki/Hudson_(software)#Hudson.E2.80.93Jenkins_split
 [3]: http://en.wikipedia.org/wiki/Free_and_open-source_software
 [4]: http://en.wikipedia.org/wiki/Richard_Stallman
 [5]: http://www.jetbrains.com/teamcity/buy/choose_edition.jsp?license=OPEN_SOURCE
 [6]: http://www.excella.com/blog/teamcity-vs-jenkins-better-continuous-integration-server/
 [7]: https://chrisdown.name/2013/07/11/moving-to-teamcity-from-jenkins.html
 [8]: http://luolong.blogspot.com/2011/02/comparing-jenkins-vs-teamcity-part-2.html
 [9]: http://pivotallabs.com/teamcity-is-pretty-cool-you-should-totally-check-it-out/
