---
title: LogRotate Apache Logs to Amazon S3
author: Joe
layout: post
date: 2012-07-15
url: /2012/07/15/logrotate-apache-logs-to-amazon-s3/
tags:
  - Amazon EC2
  - Amazon S3
  - AWS

---

{{< figure src="/img/logrotate.png" title="Legacy Log Rotation before gzip & scp" >}}

I recently moved my site [RunPartner](www.runpartner.com) to Amazon Web Services (AWS) from DreamHost because for just a few more peanuts a month I got a ton of enterprise grade services, and the server does not crash randomly any more. 😊

I&#8217;m loving AWS, but one thing I wanted to do was consolidate all logs to S3. Let&#8217;s say your site gets SlashDotted or Pinned. One of the first failure modes is that your logs swell up, and you&#8217;re out of disk space. Since my EC2 instance has just 8GB, this is possible. But why not use that infinite storage pool in the sky, S3? Perfect.

## LogRotate

A long time fixture of the log rotation scene is <a title="Man page" href="http://linux.die.net/man/8/logrotate" target="_blank">LogRotate</a>, not to be confused with Apache&#8217;s <a href="http://httpd.apache.org/docs/2.0/programs/rotatelogs.html" target="_blank">RotateLogs</a>. The following script works well for me (two years and counting).

The script assumes you&#8217;ve installed the amazing command line package, [s3cmd](http://s3tools.org/s3cmd).

```bash
# rotate the logs!
# common settings
compress
compresscmd /bin/gzip
compressoptions -9
compressext .gz

dateext
dateformat -%Y-%m-%d-%s

rotate 3
nomail
missingok
daily
size 5k
create 640 username username

/var/logs/www.runpartner.com/*.log {
sharedscripts
postrotate
sudo /usr/sbin/apache2ctl graceful

/usr/bin/s3cmd sync /var/logs/www.runpartner.com/*.gz s3://bucket-logs/www.runpartner.com/
endscript
}
```

## How It Works

It took me a few hours to get everything tweaked just right, so I&#8217;ll break down the commands for your edification and so that you can customize the script for yourself.

```bash
compress
compresscmd /bin/gzip
compressoptions -9
compressext .gz
```

  * `compress` - enables compression
  * `compresscmd` - determines the path to the utility used to compress
  * `compressoptions` - command line switches passed to the compression utility
  * `compressext` - this suffix will be used to determine if files have been compressed

```bash
dateext
dateformat -%Y-%m-%d-%s
```

  * `dateext` - enables adding dates to the log file names
  * `dateformat` - `%Y-%m-%d-%s` provides the format for the log file name dates

```bash
rotate 3
nomail
missingok
daily
size 5k
create 640 username username
```

  * `rotate 3` - how many logs to keep locally before deleting. The more, the more space used
  * `nomail` - don&#8217;t try to mail the logs to any body
  * `missingok` - tells script not to freak out that there are no files on first run
  * `daily` - rollover logs on a daily basis (**still must call from Cron though**)
  * `size 5K` - set minimum size of log rollover. If file is smaller than this, it will not be rolled.
  * `create 640 username username` - add any permissions the files should be given on creation. I needed these, or the compression utility did not have the right to compress them.

```bash
/var/logs/www.runpartner.com/*.log {
sharedscripts
postrotate
sudo /usr/sbin/apache2ctl graceful

/usr/bin/s3cmd sync /var/logs/www.runpartner.com/*.gz s3://bucket-logs/www.runpartner.com/
endscript
}
```

  * `/var/logs/www.runpartner.com/*.log` - file selector, can contain wildcards, or can be explicit
  * `sharedscripts` - only run the code between _postrotate_ & _endscript_ **once**, even if multiple files rotated
  * `postrotate...endscript` -code to send logs to S3 
      * `sudo /usr/sbin/apache2ctl graceful` gracefully resets the logs on the apache server, otherwise logging stops because LogRotate removed the log file! Some people just kill the pid, but this is much cleaner.
      * `/usr/bin/s3cmd sync /var/logs/www.runpartner.com/*.gz s3://bucket-logs/www.runpartner.com/` use s3cmd to sync your logs (not many of them, so goes fast) to your log bucket on S3.

## Cron it

Now just don&#8217;t forget the last step!!! You need to add your LogRotate command to cron, so it can run each day. If you have a lot of traffic, you might want to run it on the hour, with your _size_ attribute set so that large logs get moved to S3 quickly, freeing up space on your instance.

```bash
# Backup activities
0 0 * * * /usr/sbin/logrotate --state /home/username/scripts/log_rotate.state /home/username/scripts/log_rotate.config
```

Notice the below I run the rollover at midnight. This way all entries in the log for a given date are really for that date. Also, **don&#8217;t forget the state file**. This is how LogRotate knows what it did last time, so it can decide what to do this time. Finally, notice that cron needs the full path to everything, including the executables and the config/state files.
