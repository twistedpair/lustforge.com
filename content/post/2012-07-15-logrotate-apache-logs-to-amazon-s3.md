---
title: LogRotate Apache Logs to Amazon S3
author: Joe
layout: post
date: 2012-07-15
url: /2012/07/15/logrotate-apache-logs-to-amazon-s3/
categories:
  - Amazon EC2
  - Amazon S3
  - AWS
tags:
  - Amazon EC2
  - Amazon S3
  - AWS

---
<div id="attachment_174" style="width: 310px" class="wp-caption alignright">
  <span class="frame-outer  wp-image-174 size-full"><span><span><span><span><a href="http://lustforge.com/wp-content/uploads/2012/07/logRotate2.png"><img class="wp-image-174 size-full" src="http://lustforge.com/wp-content/uploads/2012/07/logRotate2.png" alt="Legacy Log Rotation before use of gzip and scp" width="300" height="202" /></a>
  
  <p class="wp-caption-text">
    Legacy Log Rotation before use of gzip and scp
  </p></span></span></span></span></span>
</div>I recently moved my site (

<a title="RunPartner!" href="http://www.RunPartner.com" target="_blank">www.RunPartner.com</a>) to Amazon Web Services (AWS) from DreamHost because for just a few more peanuts a month I got a ton of enterprise grade services, and the server does not crash randomly any more. <img src="https://lustforge.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

I&#8217;m loving AWS, but one thing I wanted to do was consolidate all logs to S3. Let&#8217;s say your site gets SlashDotted or Pinned. One of the first failure modes is that your logs swell up, and you&#8217;re out of disk space. Since my EC2 instance has just 8GB, this is possible. But why not use that infinite storage pool in the sky, S3? Perfect.

## LogRotate

A long time fixture of the log rotation scene is <a title="Man page" href="http://linux.die.net/man/8/logrotate" target="_blank">LogRotate</a>, not to be confused with Apache&#8217;s <a href="http://httpd.apache.org/docs/2.0/programs/rotatelogs.html" target="_blank">RotateLogs</a>. The following script works well for me (two years and counting).

The script assumes you&#8217;ve installed the amazing command line package, <a href="http://s3tools.org/s3cmd" target="_blank">s3cmd</a>.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=72&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="comment" style="color: #999988; font-style: italic;"># rotate the logs!&lt;/span>
&lt;span class="comment" style="color: #999988; font-style: italic;"># common settings&lt;/span>
compress
compresscmd /bin/gzip
compressoptions -&lt;span class="number" style="color: #009999;">9&lt;/span>
compressext .gz

dateext
dateformat -%Y-%m-%d-%s

rotate &lt;span class="number" style="color: #009999;">3&lt;/span>
nomail
missingok
daily
size &lt;span class="number" style="color: #009999;">5&lt;/span>k
create &lt;span class="number" style="color: #009999;">640&lt;/span> username username

/var/logs/www.runpartner.com/*.log {
sharedscripts
postrotate
&lt;span class="built_in" style="color: #0086b3;">sudo&lt;/span> /usr/sbin/apache2ctl graceful

/usr/bin/s3cmd sync /var/logs/www.runpartner.com/*.gz s3://bucket-logs/www.runpartner.com/
endscript
}
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj4jIHJvdGF0ZSB0aGUgbG9ncyE8YnI+IyBjb21tb24gc2V0dGluZ3M8YnI+Y29t<br /><br />
cHJlc3M8YnI+Y29tcHJlc3NjbWQgL2Jpbi9nemlwPGJyPmNvbXByZXNzb3B0aW9ucyAtOTxicj5j<br /><br />
b21wcmVzc2V4dCAuZ3o8YnI+PGJyPmRhdGVleHQ8YnI+ZGF0ZWZvcm1hdCAtJVktJW0tJWQtJXM8<br /><br />
YnI+PGJyPnJvdGF0ZSAzPGJyPm5vbWFpbDxicj5taXNzaW5nb2s8YnI+ZGFpbHk8YnI+c2l6ZSA1<br /><br />
azxicj5jcmVhdGUgNjQwIHVzZXJuYW1lIHVzZXJuYW1lPGJyPjxicj4vdmFyL2xvZ3Mvd3d3LnJ1<br /><br />
bnBhcnRuZXIuY29tLyoubG9nIHs8YnI+c2hhcmVkc2NyaXB0czxicj5wb3N0cm90YXRlPGJyPnN1<br /><br />
ZG8gL3Vzci9zYmluL2FwYWNoZTJjdGwgZ3JhY2VmdWw8YnI+PGJyPi91c3IvYmluL3MzY21kIHN5<br /><br />
bmMgL3Zhci9sb2dzL3d3dy5ydW5wYXJ0bmVyLmNvbS8qLmd6IHMzOi8vYnVja2V0LWxvZ3Mvd3d3<br /><br />
LnJ1bnBhcnRuZXIuY29tLzxicj5lbmRzY3JpcHQ8YnI+fTxicj5gYGA=">
    ​
  </div>
</div>

## How It Works

It took me a few hours to get everything tweaked just right, so I&#8217;ll break down the commands for your edification and so that you can customize the script for yourself.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=72&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">compress
compresscmd /bin/gzip
compressoptions -&lt;span class="number" style="color: #009999;">9&lt;/span>
compressext .gz
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj5jb21wcmVzczxicj5jb21wcmVzc2NtZCAvYmluL2d6aXA8YnI+Y29tcHJlc3Nv<br /><br />
cHRpb25zIC05PGJyPmNvbXByZXNzZXh0IC5nejxicj5gYGA=">
    ​
  </div>
</div>

  * _compress &#8211; _enables compression
  * _compresscmd _ &#8211; determines the path to the utility used to compress
  * _compressoptions _&#8211; command line switches passed to the compression utility
  * _compressext .gz _&#8211; this suffix will be used to determine if files have been compressed

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=72&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">dateext
dateformat -%Y-%m-%d-%s
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj5kYXRlZXh0PGJyPmRhdGVmb3JtYXQgLSVZLSVtLSVkLSVzPGJyPmBgYA==">
    ​
  </div>
</div>

  * _dateext_ &#8211; enables adding dates to the log file names
  * _dateformat -%Y-%m-%d-%s _&#8211; provides the format for the log file name dates

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=72&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">rotate &lt;span class="number" style="color: #009999;">3&lt;/span>
nomail
missingok
daily
size &lt;span class="number" style="color: #009999;">5&lt;/span>k
create &lt;span class="number" style="color: #009999;">640&lt;/span> username username
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj5yb3RhdGUgMzxicj5ub21haWw8YnI+bWlzc2luZ29rPGJyPmRhaWx5PGJyPnNp<br /><br />
emUgNWs8YnI+Y3JlYXRlIDY0MCB1c2VybmFtZSB1c2VybmFtZTxicj5gYGA=">
    ​
  </div>
</div>

  * _rotate 3 _&#8211; how many logs to keep locally before deleting. The more, the more space used
  * _nomail_ &#8211; don&#8217;t try to mail the logs to any body
  * _missingok _&#8211; tells script not to freak out that there are no files on first run
  * _daily &#8211; _rollover logs on a daily basis (**still must call from Cron though**)
  * _size 5K_ &#8211; set minimum size of log rollover. If file is smaller than this, it will not be rolled.
  * _create 640 username username_ &#8211; add any permissions the files should be given on creation. I needed these, or the compression utility did not have the right to compress them.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=72&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">/var/logs/www.runpartner.com/*.log {
sharedscripts
postrotate
&lt;span class="built_in" style="color: #0086b3;">sudo&lt;/span> /usr/sbin/apache2ctl graceful

/usr/bin/s3cmd sync /var/logs/www.runpartner.com/*.gz s3://bucket-logs/www.runpartner.com/
endscript
}
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj4vdmFyL2xvZ3Mvd3d3LnJ1bnBhcnRuZXIuY29tLyoubG9nIHs8YnI+c2hhcmVk<br /><br />
c2NyaXB0czxicj5wb3N0cm90YXRlPGJyPnN1ZG8gL3Vzci9zYmluL2FwYWNoZTJjdGwgZ3JhY2Vm<br /><br />
dWw8YnI+PGJyPi91c3IvYmluL3MzY21kIHN5bmMgL3Zhci9sb2dzL3d3dy5ydW5wYXJ0bmVyLmNv<br /><br />
bS8qLmd6IHMzOi8vYnVja2V0LWxvZ3Mvd3d3LnJ1bnBhcnRuZXIuY29tLzxicj5lbmRzY3JpcHQ8<br /><br />
YnI+fTxicj5gYGA=">
    ​
  </div>
</div>

  * _/var/logs/www.runpartner.com/*.log_ &#8211; file selector, can contain wildcards, or can be explicit
  * _sharedscripts_ &#8211; only run the code between _postrotate _& _endscript_ **once**, even if multiple files rotated
  * _postrotate &#8230;__endscript &#8211;_ code to send logs to S3 
      * _sudo /usr/sbin/apache2ctl graceful_ &#8211; gracefully resets the logs on the apache server, otherwise logging stops because LogRotate removed the log file! Some people just kill the pid, but this is much cleaner.
      * _/usr/bin/s3cmd sync /var/logs/www.runpartner.com/*.gz s3://bucket-logs/www.runpartner.com/ _&#8211; use s3cmd to sync your logs (not many of them, so goes fast) to your log bucket on S3.

## Cron it

Now just don&#8217;t forget the last step!!! You need to add your LogRotate command to cron, so it can run each day. If you have a lot of traffic, you might want to run it on the hour, with your _size_ attribute set so that large logs get moved to S3 quickly, freeing up space on your instance.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=72&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="comment" style="color: #999988; font-style: italic;"># Backup activities&lt;/span>
&lt;span class="number" style="color: #009999;">0&lt;/span> &lt;span class="number" style="color: #009999;">0&lt;/span> * * * /usr/sbin/logrotate --state /home/username/scripts/log_rotate.state /home/username/scripts/log_rotate.config
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj4jIEJhY2t1cCBhY3Rpdml0aWVzPGJyPjAgMCAqICogKiAvdXNyL3NiaW4vbG9n<br /><br />
cm90YXRlIC0tc3RhdGUgL2hvbWUvdXNlcm5hbWUvc2NyaXB0cy9sb2dfcm90YXRlLnN0YXRlIC9o<br /><br />
b21lL3VzZXJuYW1lL3NjcmlwdHMvbG9nX3JvdGF0ZS5jb25maWc8YnI+YGBg">
    ​
  </div>
</div>

Notice the below I run the rollover at midnight. This way all entries in the log for a given date are really for that date. Also, **don&#8217;t forget the state file**. This is how LogRotate knows what it did last time, so it can decide what to do this time. Finally, notice that cron needs the full path to everything, including the executables and the config/state files.