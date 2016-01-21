---
title: 'Custom CloudWatch Metric Tutorial: FreeMemory and Cron'
author: Joe
layout: post
date: 2012-07-22
url: /2012/07/22/custom-cloudwatch-metric-tutorial-freememory-and-cron/
categories:
  - Amazon CloudWatch
  - AWS

---
<pre><span style="color: #ff0000;">Disclaimer: Custom metrics are $0.50 USD a month. Use judiciously.</span></pre>

I want to be able to set alarms when nodes are getting memory starved and to analyze memory trends. Doing this for disk space, heap space, etc is a simple modification of the below tutorial.

Since the AWS docs have no complete example on how to do this, I wanted to provide one. I set this up using nothing but bash and cron (<a href="http://blogs.clogeny.com/custom-metrics-in-amazon-cloudwatch/" target="_blank">other examples</a> use Python). My goal was a very simple example.

### 1. Create a new Metric

We&#8217;ll skip this since by virtue of putting data into your new metric, CloudWatch will create it for you.

### 2. Get the free memory

Folks will tell you of _vmstat_, _free_, and other utilities, but if you read their _man_ files, you&#8217;ll see the value comes from _/proc/meminfo_, so go to the source. Let&#8217;s grep it out of there:

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=78&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">FREE_MEM_KB=$(egrep -o &lt;span class="string" style="color: #dd1144;">"MemFree:\s*([0-9]*)"&lt;/span> /proc/meminfo | egrep -o &lt;span class="string" style="color: #dd1144;">"[0-9]*"&lt;/span>)
&lt;span class="built_in" style="color: #0086b3;">echo&lt;/span> &lt;span class="variable" style="color: #008080;">$FREE_MEM_KB&lt;/span>
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj5GUkVFX01FTV9LQj0kKGVncmVwIC1vICJNZW1GcmVlOlxzKihbMC05XSopIiAv<br />
cHJvYy9tZW1pbmZvIHwgZWdyZXAgLW8gIlswLTldKiIpPGJyPmVjaG8gJEZSRUVfTUVNX0tCPGJy<br />
PmBgYA==">
    ​
  </div>
</div>

The gist is that we cannot access capture groups directly in _egrep_, but we can hit it twice with a pipe for the same effect. The -o is used to only return the matching fragment.

### 3. Pick a Good Name

I found the terms used in the CloudWatch docs a little confusing at first, so here it how to find them. Check on any of your metrics in the AWS CloudWatch Console as shown below:

**Namespace**

There are existing namespaces like _AWS/EC2_ and _AWS/RDS_. Don&#8217;t set metrics here, these are for AWS only. Make up a new namespace for your metric like &#8220;MySite.&#8221;

**MetricName**

A short descriptive name, preferentially CamelCase. Remember, you cannot delete or change it! Think hard. Note the metric will be expelled after two weeks of disuse.

**Dimensions**

Let&#8217;s say you&#8217;ve got a _FreeMemory_ metric in your MySite namespace. What if you want to add this to another instance? You need yet another degree of freedom, _Dimensions_. In this example the _InstandId_is the dimension being used, but you can set others if you like.

<div id="attachment_81" style="width: 347px" class="wp-caption aligncenter">
  <span class="frame-outer  size-full wp-image-81"><span><span><span><span><a href="https://www.lustforge.com/wp-content/uploads/2012/07/example_metric_parameters.png"><img class="size-full wp-image-81 " title="example_metric_parameters" src="https://www.lustforge.com/wp-content/uploads/2012/07/example_metric_parameters.png" alt="" width="337" height="255" srcset="https://lustforge.com/wp-content/uploads/2012/07/example_metric_parameters-300x227.png 300w, https://lustforge.com/wp-content/uploads/2012/07/example_metric_parameters.png 337w" sizes="(max-width: 337px) 100vw, 337px" /></a>
  
  <p class="wp-caption-text">
    Typical parameters found on a CloudWatch alarm
  </p></span></span></span></span></span>
</div>

### 4. Send it to CloudWatch

Make sure you&#8217;ve installed the <a href="http://aws.amazon.com/developertools/2534" target="_blank">CloudFront Commandline Tools</a>. The README.txt explains it all quite well.

Now just fire away:

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=78&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">FREEMEMKB=$(egrep -o &lt;span class="string" style="color: #dd1144;">"MemFree:\s*([0-9]*)"&lt;/span> /proc/meminfo | egrep -o &lt;span class="string" style="color: #dd1144;">"[0-9]*"&lt;/span>)
&lt;span class="built_in" style="color: #0086b3;">echo&lt;/span> `mon-put-data --namespace=&lt;span class="string" style="color: #dd1144;">"MySite"&lt;/span> --metric-name=FreeMemory --dimensions=&lt;span class="string" style="color: #dd1144;">"InstanceId=i-d889e31d"&lt;/span> --unit=Kilobytes --value=&lt;span class="variable" style="color: #008080;">$FREEMEMKB&lt;/span>`
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj5GUkVFTUVNS0I9JChlZ3JlcCAtbyAiTWVtRnJlZTpccyooWzAtOV0qKSIgL3By<br />
b2MvbWVtaW5mbyB8IGVncmVwIC1vICJbMC05XSoiKTxicj5lY2hvIGBtb24tcHV0LWRhdGEgLS1u<br />
YW1lc3BhY2U9Ik15U2l0ZSIgLS1tZXRyaWMtbmFtZT1GcmVlTWVtb3J5IC0tZGltZW5zaW9ucz0i<br />
SW5zdGFuY2VJZD1pLWQ4ODllMzFkIiAtLXVuaXQ9S2lsb2J5dGVzIC0tdmFsdWU9JEZSRUVNRU1L<br />
QmA8YnI+YGBg">
    ​
  </div>
</div>

As you can see, we just specify the three degrees of freedom, the units, and the value. Done! And look, we just ran it twice and we&#8217;ve already got a chart. Amazon says it can take 15min to see your new metric and 2min to see a new data value. I found these to all happen within a minute, but depends on the ambient CloudWatch load.

<div id="attachment_83" style="width: 310px" class="wp-caption aligncenter">
  <span class="frame-outer  small size-medium wp-image-83"><span><span><span><span><a href="https://www.lustforge.com/wp-content/uploads/2012/07/sample_metric_chart.png"><img class="size-medium wp-image-83" title="sample_metric_chart" src="https://www.lustforge.com/wp-content/uploads/2012/07/sample_metric_chart-300x133.png" alt="" width="300" height="133" /></a>
  
  <p class="wp-caption-text">
    There&#8217;s the new metric and data points!
  </p></span></span></span></span></span>
</div>

### Script It

If found the my variables were not always available to my cron user, so I put them in the bash file (below).

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=78&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="comment" style="color: #999988; font-style: italic;">#setup variables&lt;/span>
&lt;span class="keyword" style="color: #333333; font-weight: bold;">export&lt;/span> AWS_CLOUDWATCH_HOME=/home/myuser/cloudwatch/CloudWatch-&lt;span class="number" style="color: #009999;">1.0&lt;/span>.&lt;span class="number" style="color: #009999;">12.1&lt;/span>
&lt;span class="keyword" style="color: #333333; font-weight: bold;">export&lt;/span> JAVA_HOME=/usr/lib/jvm/jre1.&lt;span class="number" style="color: #009999;">6.0&lt;/span>_33
&lt;span class="keyword" style="color: #333333; font-weight: bold;">export&lt;/span> AWS_CREDENTIAL_FILE=&lt;span class="variable" style="color: #008080;">$AWS_CLOUDWATCH_HOME&lt;/span>/credential-file-path.template

&lt;span class="comment" style="color: #999988; font-style: italic;"># get free memory and send to AWS CloudWatch&lt;/span>
FREEMEMKB=$(egrep -Eio &lt;span class="string" style="color: #dd1144;">"MemFree:\s*([0-9]*)"&lt;/span> /proc/meminfo | egrep -Eio &lt;span class="string" style="color: #dd1144;">"[0-9]*"&lt;/span>)
&lt;span class="built_in" style="color: #0086b3;">echo&lt;/span> `/home/myuser/cloudwatch/CloudWatch-&lt;span class="number" style="color: #009999;">1.0&lt;/span>.&lt;span class="number" style="color: #009999;">12.1&lt;/span>/mon-put-data --namespace=&lt;span class="string" style="color: #dd1144;">"MySite"&lt;/span> --metric-name=FreeMemory --dimensions=&lt;span class="string" style="color: #dd1144;">"InstanceId=i-d889e31d"&lt;/span> --unit=Kilobytes --value=&lt;span class="variable" style="color: #008080;">$FREEMEMKB&lt;/span>`
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj4jc2V0dXAgdmFyaWFibGVzPGJyPmV4cG9ydCBBV1NfQ0xPVURXQVRDSF9IT01F<br />
PS9ob21lL215dXNlci9jbG91ZHdhdGNoL0Nsb3VkV2F0Y2gtMS4wLjEyLjE8YnI+ZXhwb3J0IEpB<br />
VkFfSE9NRT0vdXNyL2xpYi9qdm0vanJlMS42LjBfMzM8YnI+ZXhwb3J0IEFXU19DUkVERU5USUFM<br />
X0ZJTEU9JEFXU19DTE9VRFdBVENIX0hPTUUvY3JlZGVudGlhbC1maWxlLXBhdGgudGVtcGxhdGU8<br />
YnI+PGJyPiMgZ2V0IGZyZWUgbWVtb3J5IGFuZCBzZW5kIHRvIEFXUyBDbG91ZFdhdGNoPGJyPkZS<br />
RUVNRU1LQj0kKGVncmVwIC1FaW8gIk1lbUZyZWU6XHMqKFswLTldKikiIC9wcm9jL21lbWluZm8g<br />
fCBlZ3JlcCAtRWlvICJbMC05XSoiKTxicj5lY2hvIGAvaG9tZS9teXVzZXIvY2xvdWR3YXRjaC9D<br />
bG91ZFdhdGNoLTEuMC4xMi4xL21vbi1wdXQtZGF0YSAtLW5hbWVzcGFjZT0iTXlTaXRlIiAtLW1l<br />
dHJpYy1uYW1lPUZyZWVNZW1vcnkgLS1kaW1lbnNpb25zPSJJbnN0YW5jZUlkPWktZDg4OWUzMWQi<br />
IC0tdW5pdD1LaWxvYnl0ZXMgLS12YWx1ZT0kRlJFRU1FTUtCYDxicj5gYGA=">
    ​
  </div>
</div>

And just added the line to the cron file. Note the full paths given since cron does not know these.

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=78&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-bash" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="comment" style="color: #999988; font-style: italic;"># Update AWS custom metric monitors every minute&lt;/span>
*/&lt;span class="number" style="color: #009999;">1&lt;/span>     *       *       *       *       /home/myuser/scripts/cloudfront_update_metrics.sh
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgYmFzaDxicj4jIFVwZGF0ZSBBV1MgY3VzdG9tIG1ldHJpYyBtb25pdG9ycyBldmVyeSBtaW51<br />
dGU8YnI+Ki8xICAgICAqICAgICAgICogICAgICAgKiAgICAgICAqICAgICAgIC9ob21lL215dXNl<br />
ci9zY3JpcHRzL2Nsb3VkZnJvbnRfdXBkYXRlX21ldHJpY3Muc2g8YnI+YGBg">
    ​
  </div>
</div>

Now enjoy the pretty charts! And set your alarms as needed at a given low memory threshold.

<div id="attachment_82" style="width: 528px" class="wp-caption aligncenter">
  <span class="frame-outer  size-full wp-image-82"><span><span><span><span><a href="https://www.lustforge.com/wp-content/uploads/2012/07/metic_chart_full.png"><img class="size-full wp-image-82" title="metic_chart_full" src="https://www.lustforge.com/wp-content/uploads/2012/07/metic_chart_full.png" alt="" width="415" height="181" /></a>
  
  <p class="wp-caption-text">
    Detailed Memory Usage Chart
  </p></span></span></span></span></span>
</div>