---
title: Amtrak's Secret Train Tracking JSON API
author: Joe
layout: post
date: 2014-07-12
url: /2014/07/12/amtraks-secret-train-tracking-json-api/
tags:
  - API
  - JSON
---

It's not often that a government operated agency does something cool or modern, but I noticed today that Amtrak was breaking the mold.

Riding to the NE Regional to NYC, I noticed that the Amtrak tracking page kept updating, even when internet connectivity failed on the WIFI. Odd... does that mean that the servers are _on the train_?

```bash
joe@tp:~$ tracepath www.amtrakconnect.com
 1?: [LOCALHOST]                    pmtu 1500
 1: 10.80.104.1                     8.641ms
 1: 10.80.104.1                     16.690ms
 2: 10.80.104.1                     6.179ms pmtu 1350
 2: www.amtrakconnect.com          5.424ms reached
    Resume: pmtu 1350 hops 2 back 2
```

Interesting. The call is coming from inside the train! Let's look at the webpage and see if we can find the API. 

{{< figure src="/img/amtrak_connect.png" >}}

Found it. Now let's cut out the middle man and track our progress to Penn Station via Bash.

```bash
joe@tp:~$ curl -s http://www.amtrakconnect.com/gps_provider_prod.php | jq '.'
{
    "err":false,
    "lat": "43.657510",
    "lon": "-70.282448",
}

joe@tp:~$ curl -s http://www.amtrakconnect.com/gps_provider_prod.php | jq '.'
{
    "err":false,
    "lat": "43.677390",
    "lon": "-70.286580",
}
```

Looks like we're moving! But crap... I hope the entire navigation system isn't written in PHP. 
