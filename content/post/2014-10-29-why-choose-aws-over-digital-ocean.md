---
title: Why I Chose AWS Over Digital Ocean
author: Joe
layout: post
date: 2014-10-29
url: /2014/10/29/why-choose-aws-over-digital-ocean/
categories:
  - AWS
  - Cloud
  - Digitial Ocean
  - EC2
tags:
  - AWS
  - Cloud
  - Digitial Ocean
  - EC2
---

There' sno shortage of [shills][0] for Digital Ocean VM hosting on [HackerNews][1] lately. They [extol][2] the wonder of DO and disparage AWS. I view these accumulations of calumnies with curiosity, searching for the cogent retorts from AWS mavens. Finally, I broke down and threw [$5][3] at a DO plan to see what I was missing. Turns out I'm not missing a thing.

## The Good
- Modern CSS feel with candy buttons and very simple, limited UI
- Grandma could launch a VM

## Expense

How do the shills keep yowling that DO is cheaper than EC2? The 8GB ram DO "droplet" is presently `¢11.9/hr`. On EC2 you can get a spot instance with that ram for `¢0.3/hr`. That's right, for 1/3 of a penny per hour, I can get something bigger than the most powerful droplet on DO. **Clearly DO is not "cheaper."**

Also, DO does not have a spot market. Cloud computing is about ephemeral resources. Spin them up when you need them (i.e. when you get to the office) and discard them when you're done (i.e. catching the train home). I can get a comperable AWS VM (m3.medium) for `¢0.3/hr`. You'll not get these savings with DO.

Oh, and you know how you can turn off your EC2 instance and stop being billed? DO bills you for as long as your droplet exists. You've got to either destroy it, or pay for it, running or not. Ouch.

## SSD's

Three cheers for SSD's! Oh, wait... I get those with my EC2 VM's as well, for cheaper. If you didn't know there were there, you'd best [RTFM][4].

## More Bandwidth

DO gives you 5TB of "bandwidth" with that 8GB of ram droplet. How can AWS charge me for bandwidth **out** by the GB? Here's a hint, you get what you pay for. AWS has some nice peerings. 

For example, I tried downloading a 150MB file from a server in Atlanta using `wget`:

- AWS `m3.medium` instance - 2.6s (54.7MB/s)
- DO $20/mo droplet - 16s (8.8MB/s)

Wow, the **DO instance had a 615% slower download time**, despite having double the provisioned resources as the AWS instance. Perhaps the dataset was hosted in AWS us-1east? Nope. Tracepath shows the server is in Atlanta, and the route runs through NYC, the location of the DO datacenter! So, you get what you pay for here with DO... but, hold on, **AWS inbound bandwidth is** [FREE][5], so you're really paying more for less with DO.

## AWS Charges For Everything

Can you believe that greedy MoneyBags Bezeos charges for every API call on AWS? Turns out you get what you pay for, plus lots of free ancilary services, and they don't g et [hacked][6] to boot.

## Limits

I tried to launch a second droplet... oh no you don't. "You've exceeded your droplet limit," said the console. What? I can only have ONE droplet? I paid you. I've got $15 in this account. Can't I launch `¢3/hr` worth of VM's. Nope. You'll need to request permission from DO for that. Clearly not a host for serious devs that need dozens of instances, or real companies that will need thousands.

## Conclusions

A good place for script kiddies, but not a place for real applications.

 [0]: https://news.ycombinator.com/item?id=7720134
 [1]: https://news.ycombinator.com/item?id=8926631
 [2]: https://news.ycombinator.com/item?id=9522486
 [3]: https://www.digitalocean.com/pricing/
 [4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ssd-instance-store.html
 [5]: https://aws.amazon.com/ec2/pricing/#Data_Transfer
 [6]: https://news.ycombinator.com/item?id=6447152
 
 
 