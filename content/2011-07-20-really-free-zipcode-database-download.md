---
title: (Really) Free Zipcode Database Download
author: Joseph Lust
layout: post
date: 2011-07-20
url: /2011/07/20/really-free-zipcode-database-download/
tags:
  - Geolocation
---
It just drives me nuts that the web is full of zipcode database downloads that are not free! It is not like the resellers did anything special to compile this information. The USPS publishes it for a fee, and then they charge you a fee for [publicly available information](https://www.usps.com/business/web-tools-apis/address-information-api.htm#_Toc410982986).

That's just not acceptable. So, I&#8217;ve written some [scripts](https://github.com/twistedpair/Open-Zipcode-Database) to gather all known zip codes (from `00000` &#8211; `99999`) and placed them below in several common formats. Enjoy, and let information like this be free!

There are **41,815 geocoded zipcodes** in all. Note presently the US has 41,950, but that includes APO zips, which are not included here.

### Downloads

 - [Excel Formatted Zips](/downloads/zipcodes_2011.xlsx) [1.98MB]
 - [CSV Formatted Downloads](/downloads/zipcodes_2011_csv.zip) [757KB]
 - [MySql Database Format](/downloads/zipcodes_2011_sql.zip) [769KB]

Each zipcode is provided with it&#8217;s state, city, latitude, and longitude.

### GitHub

Or run the scripts yourself from [Github](https://github.com/twistedpair/Open-Zipcode-Database).
