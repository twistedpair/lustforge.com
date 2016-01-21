---
title: Don’t use Git to Deploy Code
author: Joe
layout: post
date: 2015-02-28
url: /2015/02/28/dont-use-git-to-deploy-code/
categories:
  - Amazon S3
  - Continuous Integration
  - DevOps

---
<div id="attachment_213" style="width: 318px" class="wp-caption alignright">
  <span class="frame-outer  wp-image-213 size-full"><span><span><span><span><a href="https://lustforge.com/wp-content/uploads/2015/02/github_down.png"><img class="wp-image-213 size-full" src="https://lustforge.com/wp-content/uploads/2015/02/github_down.png" alt="github_down" width="308" height="269" srcset="https://lustforge.com/wp-content/uploads/2015/02/github_down-300x262.png 300w, https://lustforge.com/wp-content/uploads/2015/02/github_down.png 308w" sizes="(max-width: 308px) 100vw, 308px" /></a>
  
  <p class="wp-caption-text">
    Not again GitHub! Save us Muscular Failure Unicorn!
  </p></span></span></span></span></span>
</div>

Just don&#8217;t. If you can&#8217;t reason why, please stop developing code critical to your business.[<div id="attachment_213" style="width: 318px" class="wp-caption alignright">
  <span class="frame-outer  wp-image-213 size-full"><span><span><span><span><a href="https://lustforge.com/wp-content/uploads/2015/02/github_down.png"><img class="wp-image-213 size-full" src="https://lustforge.com/wp-content/uploads/2015/02/github_down.png" alt="github_down" width="308" height="269" srcset="https://lustforge.com/wp-content/uploads/2015/02/github_down-300x262.png 300w, https://lustforge.com/wp-content/uploads/2015/02/github_down.png 308w" sizes="(max-width: 308px) 100vw, 308px" /></a>
  
  <p class="wp-caption-text">
    Not again GitHub! Save us Muscular Failure Unicorn!
  </p></span></span></span></span></span>
</div>

Just don&#8217;t. If you can&#8217;t reason why, please stop developing code critical to your business.][1] 

### When it works, it works

Git is great. _Push_ here, _pull_ there. It works so well that you might be fatuously convinced it&#8217;s the perfect too to deploy code to production. Even worse, it might appear to work well at this task, further reinforcing your choice  However, the Achilles Heel of any DVCS is your origin provider. Let&#8217;s say that <a href="https://twitter.com/bitbucket/status/460418803805855745" target="_blank">BitBucket</a> has <a href="https://twitter.com/search?q=%40BitBucket%20down&src=typd" target="_blank">borked</a> their database for the 4th time this month or GitHub is suffering yet another DDNS attack. Then we see <a href="http://jorgennilsson.com/article/there-is-always-a-drawback-bitbucket-major-outage" target="_blank">posts</a> <a href="https://bitbucket.org/alixandru/bitbucket-sync/issue/19/post-hook-deployment-stopped-working" target="_blank">opining</a> about failed Git based app deployments.

### When shit goes wrong, things get complicated

Now shit&#8217;s gone wrong. No worries, there must be a more complicated way to solve what appeared to be a simple workflow. We&#8217;ve got all these Unix cli tools and can bodger something together. I think I can just scp the files over. Wait, better rsync them, I&#8217;m not sure exactly which ones changed. Arr&#8230; so many flags, do I want to compare file checksums or timestamps? Maybe I&#8217;ll tarball up everything and push it over to the servers. What was the command string again to untar and ungzip? Crap, I included my file permissions and they don&#8217;t work on the server. Huh, how was I supposed to know the code stored running PID&#8217;s in various files sprinkled throughout the source? WTF, someone tweaked some of those settings files server side and I just overwrote them. Fuck&#8230; I made backup of that server directory before I started, right? Alright, Hail Mary time, I&#8217;ll just export my remote repo and import it as a different origin on the server. How the hell do I do that?

### Shit goes wrong at the wrong time

<div id="attachment_211" style="width: 225px" class="wp-caption alignright">
  <span class="frame-outer  wp-image-211"><span><span><span><span><a href="https://lustforge.com/wp-content/uploads/2015/02/bitbucket_down.png"><img class="wp-image-211" src="https://lustforge.com/wp-content/uploads/2015/02/bitbucket_down.png" alt="BitBucket's Server Down Page" width="215" height="140" /></a>
  
  <p class="wp-caption-text">
    No knowledge of HTTP codes necessary at BitBucket.
  </p></span></span></span></span></span>
</div>

The above might be a fun exercise on the QA server when it&#8217;s 3pm and everyone&#8217;s in the office on a slow Tuesday, but that&#8217;s not how these things unfold. Nope. What will really happen is there is a hotfix that needs to go out and got assigned to the intern, because he needs the experience, you know. And because he&#8217;s the only guy on call during Thanksgiving since everyone else is away on vacation. But now he&#8217;s riding the wheels off this Rube Goldberg machine, getting both hands stuck in the tar pit and only working himself deeper as he borks the entire production setup and your site is down for the count at 2am on Black Friday.

### Special snowflake servers

Git checkouts to update code encourages Special Snowflake servers. Each server is a unique artisan crafted piece of Unix art. Like literal snowflakes, no two are the same. No one really understands how it all works and the little documentation that exists was last updated in the Bush administration.  Running \`git status\` shows lots of little file changes to get things just right on each machine, some versioned, some not, so no one has had the balls to \`get reset &#8211;hard\` for years now.

<div id="attachment_214" style="width: 165px" class="wp-caption alignright">
  <span class="frame-outer  wp-image-214 size-full"><span><span><span><span><a href="https://lustforge.com/wp-content/uploads/2015/02/fail_bitbucket.png"><img class="wp-image-214 size-full" src="https://lustforge.com/wp-content/uploads/2015/02/fail_bitbucket.png" alt="fail_bitbucket" width="155" height="155" srcset="https://lustforge.com/wp-content/uploads/2015/02/fail_bitbucket-150x150.png 150w, https://lustforge.com/wp-content/uploads/2015/02/fail_bitbucket.png 155w" sizes="(max-width: 155px) 100vw, 155px" /></a>
  
  <p class="wp-caption-text">
    Satanic BitBucket Logo of Doom
  </p></span></span></span></span></span>
</div>

### The better, deterministic way

Deploy your code as a self contained distributable. In Java we&#8217;ve got <a href="http://en.wikipedia.org/wiki/WAR_%28file_format%29" target="_blank">War</a> and <a href="http://en.wikipedia.org/wiki/EAR_%28file_format%29" target="_blank">Ear</a> files. In Play Framework we&#8217;ve got binary distributables you unzip and run. ASP.Net can be <a href="https://msdn.microsoft.com/en-us/library/dd465323%28v=vs.110%29.aspx" target="_blank">packaged</a>, just like <a href="https://www.ruby-toolbox.com/categories/packaging_to_executables" target="_blank">Ruby</a> and many others. They&#8217;re like <a href="http://en.wikipedia.org/wiki/Meal,_Ready-to-Eat" target="_blank">MRE</a>&#8216;s, but you just zip them, no need to add water. You don&#8217;t care what version of Scala is running on the server host, whether the proper DLL is loaded, or if you&#8217;re on the proper Ruby release. It Just Works™. When shit&#8217;s broken and your customers are screaming on Twitter, you want your code to Just Work.

### Distributing the distributables

&#8220;The distributable is huge!&#8221; you warn. Sure, 78MB won&#8217;t fit on a floppy, but we&#8217;ve got 10G server interconnects, I think we&#8217;ll be OK. &#8220;But where will we server those from,&#8221; you say, still unconvinced. How about <a href="http://aws.amazon.com/s3/" target="_blank">AWS S3</a>, with 11 nines durability (99.999999999). Or, you can setup your own <a href="http://docs.openstack.org/developer/swift/" target="_blank">Open Stack Swift</a> object store if you&#8217;d prefer.

The process is simple:

  1. Built and unit/integration test a commit on CI
  2. Push passing build distributable to S3
  3. Your deploy script on server stops app, downloads from S3, starts app

If S3 is down (better take some real MRE&#8217;s into the basement, the end is near), you either:

  1. Download the distributable artifact from CI and scp it to the server
  2. If CI and S3 are down, build locally and scp it to the server

The point is to have a canonical way to turn an explicit state of source (i.e. checkout hash) into an binary that will consistently run as desired where you deploy it. No chasing thousands of source files. No trying to compile all the source on your workstation, and on your CI, and on your front end servers. Fight entropy. Choose determinism.

### Other Reasons

#### File contention

Do you work in one of those _scripting_ languages? Say PHP, Ruby, or Python. Ever had your SCM fail to update files because of open file pointers to running or zombie threads? Prepare yourself for some possible non-deterministic behavior when you deploy these apps via Git. It&#8217;ll be best to add some _pgrep_ steps to run around and kill off possibly offensive threads, but then you&#8217;ve got to be asking yourself, &#8220;what life choices did I make that have lead me to run around killing myriad threads on each deploy?&#8221;

#### SCM&#8217;s worse than git

Git works pretty well, but what if you&#8217;re deploying with another SCM like **SVN**. God help you, friend. The change databases that back your local SVN checkout can get corrupted in wondrous ways. The net result can be that SVN says you&#8217;re on revision X, and \`svn status\` shows no files are changed locally. When you call \`svn update\` or checkout the target revision, you&#8217;re told you&#8217;re already up to date&#8230; but **you&#8217;re not**.** **This is true FML territory. If your SCM cannot reliably track changes, it should be cast to special circle in hell. Sadly, I&#8217;ve personally seen this happen three times in a single year. God help you, friend.

 [1]: https://lustforge.com/wp-content/uploads/2015/02/bitbucket_down.png