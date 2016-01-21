---
title: 'Password Hasher : Every Hash Under the Sun'
author: Joe
layout: post
date: 2011-10-08
url: /2011/10/08/password-hasher-every-hash-under-the-sun/
categories:
  - Hashcodes
tags:
  - Hashcodes

---

  


<div style="width: 220px" class="wp-caption alignright">
  <span class="frame-outer  "><span><span><span><span><a href="http://desarapen.blogspot.com/2008/07/frugal-fridays-corned-beef-hash.html"><img class="  " title="Hash" src="https://lustforge.com/wp-content/uploads/2011/10/CornedBeefHash3.jpg" alt="Ummm..." width="210" height="140" /></a>
  
  <p class="wp-caption-text">
    Hash
  </p></span></span></span></span></span>
</div>

I got tired of having to find a place to run all my hashes frequently for random projects, so I through this together in a few lines. I hope it helps folks. 

The following hashes are provided: md2, md4, md5, sha1, sha224, sha256, sha384, sha512, ripemd128, ripemd160, ripemd256, ripemd320, whirlpool, tiger128,3, tiger160,3, tiger192,3, tiger128,4, tiger160,4, tiger192,4, snefru, snefru256, gost, adler32, crc32, crc32b, salsa10, salsa20, haval128,3, haval160,3, haval192,3, haval224,3, haval256,3, haval128,4, haval160,4, haval192,4, haval224,4, haval256,4, haval128,5, haval160,5, haval192,5, haval224,5, haval256,5.

<div class='hashPrompt'>
  Hash this: <input id='hashStr' type="text" style="width:100%;" name="str" value="" /><br /> <button onclick="getHashes();">Hash it</button><button id='clear' onclick="clearHashes();">Clear</button>
</div>

<table id="hashResults">
</table>