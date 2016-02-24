---
title: AWS EC2 Spot Market Volatility
author: Joe
layout: post
date: 2013-11-16
url: /2013/11/16/aws-ec2-spot-market-volatility/
tags:
  - Amazon EC2
  - AWS

---
The spot instance market does not often make sense. You first learn of it and think &#8220;Wow! Why did I waste that money on a reserved instance when I can get the same price on demand?!?!?!&#8221; Then you see pricing curves like this:

{{< figure src="/img/aws_price_curve.png">}}

$6/hr for an instance!? **5000% markup!** That is stultifying. This `m1.medium` is a perfectly fungible resource. You can:

  * Pay on-demand rate of **$0.12/hr**
  * Reserve it for 3 years and pay a combined rate (amortizing down payment) of **$0.042/hr**
  * Rent it at the median Spot Market rate of **$0.013/hr**

$6/hr is 30% more than that most expensive instance AWS sells (`hs1.8xlarge`, $4.60/hr), and this instance is puny by comparison.

So, what gives? Are there really people that are so gormless they shovel money to Amazon? Impossible. Perhaps one foolhardy API consumer put in too high a bid, but we&#8217;re talking a **$6 market clearing price**. That means the **entire market** is going for $6. You can&#8217;t get any instance for less. Also note that the price is always going to $6 in a step function, while in a real market, with sentient traders, we&#8217;d expect to just barely outbid our competitors as anything else is waste. You don&#8217;t see people winning an auction by 5000% do you? You pay $0.01+ and call it a victory.

The only explanation is that during these hours Amazon (or someone with money to burn) is shutting down the market. They don&#8217;t want the spot pool available, perhaps for maintenance reasons or some internal load shaping. Regardless, it renders much of the market useless and highly inefficient.

### Other Observations &#8211; Highly Non-Correlated Market Demand

Markets are often correlated. If the price for beer in a 1 liter container is up, we&#8217;d expect to see a similar rise in demand for beer in the 2 liter container. However, demand for compute is oddly inconsistent across regions, zones, and instance type.

  * Highly different demand between AZ's (i.e. `us-east-1d` is low, `us-east-1c` is high)
  * Highly different demand between instance types (`c3.large` low, `m1.medium` high)

If the price for work in one AZ is much higher than another, near by AZ, we&#8217;d expect to see work migrate there. Sure, some jobs might need very high intra-AZ networking speeds, but most can (and should) be spread across AZ&#8217;s. In the 3 months of data analyzed we see notable spot price disparities between neighboring zones.

Instance demand is also illogical. For example, why is the `c3.large` instance, which is far better than a `m1.large` instance, always available for $0.032/hr? Over the last three months, there is not a spike to be seen. This makes the **average clearing price for a `c3.large`** ($0.032/hr) **97% lower** **than an _m1.medium_** ($1.26). That&#8217;s odd, given this is a compute node, of which you&#8217;d expect to see large numbers being recruited and released for brief computation cluster bursts. For your shillings, you&#8217;d likely be better with a `c3.large` than a `m1.medium`, but the market data does not indicate consumers realize this as the price for `c3.large` instances is a flatline.

{{< figure src="/img/aws_price_curve_2.png">}}

### Conclusions

AWS originally marketed the spot market as allowing you to run work at _different times_ for more optimal pricing. But, you should also ask yourself:

  * Do you need an on-demand instance when a spot will do?
  * Do you really need your spot in the same AZ or region?
  * Can you run your AMI on a different instance type?
  * Will someone manipulating the market price, pushing it beyond reasonable viability?

Now if only EC2 would allow bidding across a range of instance types to run your jobs, folks could get more done with less.

P.S. These are just some observations from poking around the data a couple minutes. If you have more piercing insights, please elaborate below.