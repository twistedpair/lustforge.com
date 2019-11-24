---
title: 'PreRelease: Open ICAO 24 Database'
author: Joseph Lust
layout: post
date: 2014-10-04
url: /2014/10/04/prerelease-open-icao-24-database/
tags:
  - ADS-B
  - Aviation

---
I&#8217;ve long been a fan of aviation. When sites like FlightAware came out, I was a huge fan to learn about the contrails around me.  I was even more excited when the revolution in RTLSDR enabled everyone to track ADS-B enabled aircraft for $10.

Sometimes outside on a run or drive, I&#8217;d see a high altitude contrail do a 180 and wonder, what just happened? In 1998, short of calling the FAA, you&#8217;d never know. Jump to 2014 and you can look up the track on <a href="http://flightaware.com" target="_blank">FlightAware</a> or <a href="http://flightradar24.com" target="_blank">FlightRadar24</a> (et al) and then pull the ATC tape via <a href="http://www.liveatc.net" target="_blank">LiveATC</a>. Information is becoming freer and freer! That&#8217;s the <a href="http://en.wikipedia.org/wiki/Information_Age" target="_blank">information revolution</a> of the Internet at work.

Imagine my chagrin when running <a href="https://github.com/MalcolmRobb/dump1090" target="_blank">dump1090</a>, realizing there is no freely available database of ICAO24 hex codes to aircraft registrations! Crawl the forums and you&#8217;ll find discussions about reverse engineering pay products to extract ICAO 24 codes. Some forum members have even manually amassed spreadsheets of hundreds of thousands of codes and insist on keeping them close to their vest. Others, like <a href="airframes.org" target="_blank">AirFrames.org</a> have databases, but rate limit lookups and forbid high transaction rates of lookups and automated usage. Why?

### Information Wants to Be Free

The Open Source Software revolution is predicated on the work of a few contributors enhancing the lives and experiences of the whole. People contribute their time to make code that will benefit the public many fold more than what the contributors put in. Software engineers love to do this since it provides the code that drives the internet (i.e. Linux, Apache, BSD, Nginx, Android, etc&#8230;) and massively increases the productivity of a single developer because she can freely leverage the high quality works and tools others have made.

So then, why does the ADS-B and aviation hobbyist community not band together to solve this common problem? Why do they resort to reverse engineer paid products and make private exchanges of hex codes through back channels? Partly because there is money to be made and partly because people feel the need to protect the information they&#8217;ve collected. However, the reality is that ICAO24 hex codes and airframe registration numbers are public information. This public information can be found in public registries and is being broadcast continuously into the ether 24/7 in the form of ADS-B and ACARS messages. By definition of US copyright law, assemblies of public facts cannot be copyrighted, so the should rightly be set free.

### Open ICAO 24

The Open ICAO 24 database shall be an assembly of all the 24 bit hex codes, tail numbers, and aircraft types that I can assemble with my east coast ADS-B/ACARS network that is presently in the buildout phase. Given the small number of codes and tails in the world, operation of such a database and API will be a rounding error down to zero and shall remain freely available. The entire database will also be freely downloadable to _anyone_ and the XML/JSON API will allow instant lookups and any needed frames.

Stay tuned, the beta will be launched shortly and I&#8217;ll work to automate it&#8217;s population. However, my present physical plant can only process a few thousand registrations per day, so I invite the community can embrace such openness and contribute as well, so the entire ADS-B enthusiast community can benefit from the worldwide network and the efforts of the community members.