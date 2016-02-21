---
title: 'Password Hasher : Every Hash Under the Sun'
author: Joe
layout: post
date: 2011-10-08
url: /2011/10/08/password-hasher-every-hash-under-the-sun/
categories:
  - Hashcodes
  - PHP
tags:
  - Hashcodes
  - PHP
---

<style>
label.hashLabel {
            width: 130px;
            display: inline-block;
}
</style>

<script>
   function getHashes() {
        jQuery('#hashResults').html("Loading...");
        jQuery('#hashResults').load( 'https://lustforge.com/Backends/ultraHash_backend.php?str='+encodeURI(jQuery('#hashStr').val()));
   }
   function clearHashes() {
        jQuery('#hashStr').val('');
        jQuery('#hashResults').html('');
   }
</script>

{{< figure src="/img/cornedBeefHash.jpg" title="Big helping of hash" >}}

I got tired of having to find a place to run all my hashes frequently for random projects, so I through this together in a few lines. I hope it helps folks. 

The following hashes are provided: `md2`, `md4`, `md5`, `sha1`, `sha224`, `sha256`, `sha384`, `sha512`, `ripemd128`, `ripemd160`, `ripemd256`, `ripemd320`, `whirlpool`, `tiger128,3`, `tiger160,3`, `tiger192,3`, `tiger128,4`, `tiger160,4`, `tiger192,4`, `snefru`, `snefru256`, `gost`, `adler32`, `crc32`, `crc32b`, `salsa10`, `salsa20`, `haval128,3`, `haval160,3`, `haval192,3`, `haval224,3`, `haval256,3`, `haval128,4`, `haval160,4, haval192,4, haval224,4, haval256,4, haval128,5, haval160,5, haval192,5, haval224,5, haval256,5`.

<div class='hashPrompt'>
  Hash this: <input id='hashStr' type="text" style="width:100%;" name="str" value="" /><br /> <button onclick="getHashes();">Hash it</button><button id='clear' onclick="clearHashes();">Clear</button>
</div>

<table id="hashResults">
</table>

### The Script

For reference, this is the ugly piece of PHP that makes the magic happen.

```php
$str = urldecode( $_REQUEST['str'] );

foreach( hash_algos() as $n=>$hash ) {
    $hashName = strtoupper($hash);
    $theHash = ($str) ? hash($hash,$str) : "";
    $oddEven = ($n%2) ? 'odd':'even';
    echo "<tr class='$oddEven'><td><label 
class='hashLabel'>$hashName:</label><input type='text' 
style='width:500px;' value='$theHash' /></td></tr>";
}
```
