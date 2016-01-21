---
title: 'Convert MySQL Dump to Routines Files [PHP script]'
author: Joe
layout: post
date: 2010-11-06
url: /2010/11/06/convert-mysql-dump-to-routines-php-script/
categories:
  - MySQL
  - PHP
tags:
  - MySQL
  - PHP

---
Perhaps you are like me and&#8230; well&#8230; never bothered to backup your many MySQL routines to the SVN until you had a database scare?

If you did, you&#8217;d wish you could just take that database export script from PHPMyAdmin and parse / convert it to a bunch of tidy little Procedure, Function, and Trigger files. Why, that would be nice!

The following PHP script (PHP 5+) will do the following great things:

  * Break each Procedure, Function, or Trigger **into its own .sql file** as [type\_name]/[routine\_name].sql
  * Strip off those pesky **_DEFINER_** statements that cause nothing but trouble
  * Add **_DROP \`X\` IF EXISTS_** before any _CREATE_ statements, if not there already. This makes later editing easier

NOTE: script will create procedures/, functions/, and triggers/ directories where you specify.

SEE: Config options at the top of the file.

**sql\_dump\_2\_create\_scripts.php**

<div class="markdown-here-wrapper" style="font-size: 1em; font-family: Helvetica, arial, freesans, clean, sans-serif; color: #222222; border: none; line-height: 1.2; background-color: #ffffff;" data-md-url="https://lustforge.com/wp-admin/post.php?post=23&action=edit">
  <pre style="font-size: 1em; font-family: Consolas, Inconsolata, Courier, monospace; line-height: 1.2em; overflow: auto; margin: 1em 0px;"><code class="language-php" style="font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; margin: 0px 0.15em; padding: 0.5em; white-space: pre; border: 1px solid #cccccc; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; display: block; background-color: #f8f8f8; color: #333333; background: #f8f8ff;">&lt;span class="preprocessor" style="color: #999999; font-weight: bold;">&lt;?php&lt;/span>

&lt;span class="comment" style="color: #999988; font-style: italic;">/**
 *&lt;span class="phpdoc" style="color: #dd1144;"> @author&lt;/span> Lust
 *&lt;span class="phpdoc" style="color: #dd1144;"> @copyright&lt;/span> 2010, LustForge.com
 * Take a MySQL dump file and
 * (1) If not already in file, adds -&gt; DROP (PROCEDURE|TRIGGER|FUNCTION) IF EXISTS `(NAME)`
 * (2) Remove DEFINER statements
 * (3) Save by name and place in directory named (PROCEDURE|TRIGGER|FUNCTION)
 */&lt;/span>

&lt;span class="comment" style="color: #999988; font-style: italic;">// SETUP&lt;/span>
&lt;span class="comment" style="color: #999988; font-style: italic;">// file name (input)&lt;/span>
&lt;span class="variable" style="color: #008080;">$sql_dump_filename&lt;/span> = &lt;span class="string" style="color: #dd1144;">"c:\\sql\\sql_dump.sql"&lt;/span>;
&lt;span class="comment" style="color: #999988; font-style: italic;">// output directory&lt;/span>
&lt;span class="variable" style="color: #008080;">$sql_script_output_dir&lt;/span> = &lt;span class="string" style="color: #dd1144;">"c:\\sql"&lt;/span>; &lt;span class="comment" style="color: #999988; font-style: italic;">// NOTE "\\" is escape for "\"&lt;/span>

&lt;span class="comment" style="color: #999988; font-style: italic;">// Read in file&lt;/span>
&lt;span class="keyword" style="color: #333333; font-weight: bold;">echo&lt;/span> &lt;span class="string" style="color: #dd1144;">"Reading input file..."&lt;/span>;
&lt;span class="variable" style="color: #008080;">$sql_dump&lt;/span> = file_get_contents(&lt;span class="variable" style="color: #008080;">$sql_dump_filename&lt;/span>);
&lt;span class="keyword" style="color: #333333; font-weight: bold;">if&lt;/span>(!&lt;span class="variable" style="color: #008080;">$sql_dump&lt;/span> || strlen(&lt;span class="variable" style="color: #008080;">$sql_dump&lt;/span>)==&lt;span class="number" style="color: #009999;">0&lt;/span>)  {
 &lt;span class="keyword" style="color: #333333; font-weight: bold;">die&lt;/span>(&lt;span class="string" style="color: #dd1144;">"Cannot open file: $sql_dump_filename\n"&lt;/span>);
}
&lt;span class="keyword" style="color: #333333; font-weight: bold;">echo&lt;/span> &lt;span class="string" style="color: #dd1144;">"done\n"&lt;/span>;

&lt;span class="comment" style="color: #999988; font-style: italic;">// Create needed directories if they don't exist&lt;/span>
&lt;span class="keyword" style="color: #333333; font-weight: bold;">echo&lt;/span> &lt;span class="string" style="color: #dd1144;">"Making output directories..."&lt;/span>;
&lt;span class="variable" style="color: #008080;">$dir_names&lt;/span> = &lt;span class="keyword" style="color: #333333; font-weight: bold;">array&lt;/span>(&lt;span class="string" style="color: #dd1144;">'procedures'&lt;/span>,&lt;span class="string" style="color: #dd1144;">'triggers'&lt;/span>,&lt;span class="string" style="color: #dd1144;">'functions'&lt;/span>);
&lt;span class="keyword" style="color: #333333; font-weight: bold;">foreach&lt;/span>( &lt;span class="variable" style="color: #008080;">$dir_names&lt;/span> &lt;span class="keyword" style="color: #333333; font-weight: bold;">AS&lt;/span> &lt;span class="variable" style="color: #008080;">$name&lt;/span>) {
 &lt;span class="variable" style="color: #008080;">$name&lt;/span> = &lt;span class="variable" style="color: #008080;">$sql_script_output_dir&lt;/span>.DIRECTORY_SEPARATOR.&lt;span class="variable" style="color: #008080;">$name&lt;/span>;
 &lt;span class="keyword" style="color: #333333; font-weight: bold;">if&lt;/span>(!is_dir(&lt;span class="variable" style="color: #008080;">$name&lt;/span>))   {
 mkdir(&lt;span class="variable" style="color: #008080;">$name&lt;/span>);
 }
}
&lt;span class="keyword" style="color: #333333; font-weight: bold;">echo&lt;/span> &lt;span class="string" style="color: #dd1144;">"done\n"&lt;/span>;

&lt;span class="comment" style="color: #999988; font-style: italic;">// replace various junk&lt;/span>
&lt;span class="keyword" style="color: #333333; font-weight: bold;">echo&lt;/span> &lt;span class="string" style="color: #dd1144;">"Replacing junk..."&lt;/span>;
&lt;span class="variable" style="color: #008080;">$find&lt;/span> = &lt;span class="keyword" style="color: #333333; font-weight: bold;">array&lt;/span>(&lt;span class="string" style="color: #dd1144;">'/\$\$/'&lt;/span>,
&lt;span class="string" style="color: #dd1144;">'/DEFINER=.*?\s(PROCEDURE|TRIGGER|FUNCTION)/sim'&lt;/span>,
&lt;span class="string" style="color: #dd1144;">'/(\s+|-+)\s\s(CREATE (PROCEDURE|FUNCTION|TRIGGER) (`[^`]*`))/sim'&lt;/span>);
&lt;span class="variable" style="color: #008080;">$replace&lt;/span> = &lt;span class="keyword" style="color: #333333; font-weight: bold;">array&lt;/span>(&lt;span class="string" style="color: #dd1144;">'//'&lt;/span>,
&lt;span class="string" style="color: #dd1144;">'\1'&lt;/span>,
&lt;span class="string" style="color: #dd1144;">"\r\rDROP \\3 IF EXISTS \\4//\r\\2"&lt;/span>);
&lt;span class="variable" style="color: #008080;">$sql_dump&lt;/span> = preg_replace(&lt;span class="variable" style="color: #008080;">$find&lt;/span>,&lt;span class="variable" style="color: #008080;">$replace&lt;/span>,&lt;span class="variable" style="color: #008080;">$sql_dump&lt;/span>);
&lt;span class="keyword" style="color: #333333; font-weight: bold;">echo&lt;/span> &lt;span class="string" style="color: #dd1144;">"done\n"&lt;/span>;

&lt;span class="comment" style="color: #999988; font-style: italic;">// break out individual routines and save to files/dirs&lt;/span>
&lt;span class="variable" style="color: #008080;">$matches&lt;/span> = &lt;span class="keyword" style="color: #333333; font-weight: bold;">array&lt;/span>();
preg_match_all(&lt;span class="string" style="color: #dd1144;">'%(?P&lt;sql&gt;DROP\s(?P&lt;type&gt;[a-z]*) IF EXISTS `(?P&lt;name&gt;[^`]*)`//.*?END//)%sim'&lt;/span>,&lt;span class="variable" style="color: #008080;">$sql_dump&lt;/span>,&lt;span class="variable" style="color: #008080;">$matches&lt;/span>);
&lt;span class="keyword" style="color: #333333; font-weight: bold;">echo&lt;/span> &lt;span class="string" style="color: #dd1144;">"Saving scripts out..."&lt;/span>;
&lt;span class="variable" style="color: #008080;">$n&lt;/span>=&lt;span class="number" style="color: #009999;">0&lt;/span>;
&lt;span class="keyword" style="color: #333333; font-weight: bold;">foreach&lt;/span>(&lt;span class="variable" style="color: #008080;">$matches&lt;/span>[&lt;span class="string" style="color: #dd1144;">'name'&lt;/span>] &lt;span class="keyword" style="color: #333333; font-weight: bold;">AS&lt;/span> &lt;span class="variable" style="color: #008080;">$n&lt;/span>=&gt;&lt;span class="variable" style="color: #008080;">$name&lt;/span>)  {
 &lt;span class="variable" style="color: #008080;">$filename_out&lt;/span> = strtolower(&lt;span class="variable" style="color: #008080;">$matches&lt;/span>[&lt;span class="string" style="color: #dd1144;">'type'&lt;/span>][&lt;span class="variable" style="color: #008080;">$n&lt;/span>].&lt;span class="string" style="color: #dd1144;">'s'&lt;/span>.DIRECTORY_SEPARATOR.&lt;span class="variable" style="color: #008080;">$name&lt;/span>.&lt;span class="string" style="color: #dd1144;">'.sql'&lt;/span>);
 &lt;span class="keyword" style="color: #333333; font-weight: bold;">echo&lt;/span> &lt;span class="string" style="color: #dd1144;">"$filename_out\n"&lt;/span>;
 file_put_contents( &lt;span class="variable" style="color: #008080;">$sql_script_output_dir&lt;/span>.DIRECTORY_SEPARATOR.&lt;span class="variable" style="color: #008080;">$filename_out&lt;/span>,&lt;span class="variable" style="color: #008080;">$matches&lt;/span>[&lt;span class="string" style="color: #dd1144;">'sql'&lt;/span>][&lt;span class="variable" style="color: #008080;">$n&lt;/span>]);
}
&lt;span class="keyword" style="color: #333333; font-weight: bold;">echo&lt;/span> &lt;span class="string" style="color: #dd1144;">"$n saved...done\n"&lt;/span>;

&lt;span class="preprocessor" style="color: #999999; font-weight: bold;">?&gt;&lt;/span>
</code></pre>
  
  <div style="height: 0; font-size: 0em; padding: 0; margin: 0;" title="MDH:YGBgcGhwPGJyPiZsdDs/cGhwPGJyPjxicj4vKio8YnI+ICogQGF1dGhvciBMdXN0PGJyPiAqIEBj
b3B5cmlnaHQgMjAxMCwgTHVzdEZvcmdlLmNvbTxicj4gKiBUYWtlIGEgTXlTUUwgZHVtcCBmaWxl
IGFuZDxicj4gKiAoMSkgSWYgbm90IGFscmVhZHkgaW4gZmlsZSwgYWRkcyAtJmd0OyBEUk9QIChQ
Uk9DRURVUkV8VFJJR0dFUnxGVU5DVElPTikgSUYgRVhJU1RTIGAoTkFNRSlgPGJyPiAqICgyKSBS
ZW1vdmUgREVGSU5FUiBzdGF0ZW1lbnRzPGJyPiAqICgzKSBTYXZlIGJ5IG5hbWUgYW5kIHBsYWNl
IGluIGRpcmVjdG9yeSBuYW1lZCAoUFJPQ0VEVVJFfFRSSUdHRVJ8RlVOQ1RJT04pPGJyPiAqLzxi
cj48YnI+Ly8gU0VUVVA8YnI+Ly8gZmlsZSBuYW1lIChpbnB1dCk8YnI+JHNxbF9kdW1wX2ZpbGVu
YW1lID0gImM6XFxzcWxcXHNxbF9kdW1wLnNxbCI7PGJyPi8vIG91dHB1dCBkaXJlY3Rvcnk8YnI+
JHNxbF9zY3JpcHRfb3V0cHV0X2RpciA9ICJjOlxcc3FsIjsgLy8gTk9URSAiXFwiIGlzIGVzY2Fw
ZSBmb3IgIlwiPGJyPjxicj4vLyBSZWFkIGluIGZpbGU8YnI+ZWNobyAiUmVhZGluZyBpbnB1dCBm
aWxlLi4uIjs8YnI+JHNxbF9kdW1wID0gZmlsZV9nZXRfY29udGVudHMoJHNxbF9kdW1wX2ZpbGVu
YW1lKTs8YnI+aWYoISRzcWxfZHVtcCB8fCBzdHJsZW4oJHNxbF9kdW1wKT09MCnCoCB7PGJyPiBk
aWUoIkNhbm5vdCBvcGVuIGZpbGU6ICRzcWxfZHVtcF9maWxlbmFtZVxuIik7PGJyPn08YnI+ZWNo
byAiZG9uZVxuIjs8YnI+PGJyPi8vIENyZWF0ZSBuZWVkZWQgZGlyZWN0b3JpZXMgaWYgdGhleSBk
b24ndCBleGlzdDxicj5lY2hvICJNYWtpbmcgb3V0cHV0IGRpcmVjdG9yaWVzLi4uIjs8YnI+JGRp
cl9uYW1lcyA9IGFycmF5KCdwcm9jZWR1cmVzJywndHJpZ2dlcnMnLCdmdW5jdGlvbnMnKTs8YnI+
Zm9yZWFjaCggJGRpcl9uYW1lcyBBUyAkbmFtZSkgezxicj4gJG5hbWUgPSAkc3FsX3NjcmlwdF9v
dXRwdXRfZGlyLkRJUkVDVE9SWV9TRVBBUkFUT1IuJG5hbWU7PGJyPiBpZighaXNfZGlyKCRuYW1l
KSnCoMKgIHs8YnI+IG1rZGlyKCRuYW1lKTs8YnI+IH08YnI+fTxicj5lY2hvICJkb25lXG4iOzxi
cj48YnI+Ly8gcmVwbGFjZSB2YXJpb3VzIGp1bms8YnI+ZWNobyAiUmVwbGFjaW5nIGp1bmsuLi4i
Ozxicj4kZmluZCA9IGFycmF5KCcvXCRcJC8nLDxicj4nL0RFRklORVI9Lio/XHMoUFJPQ0VEVVJF
fFRSSUdHRVJ8RlVOQ1RJT04pL3NpbScsPGJyPicvKFxzK3wtKylcc1xzKENSRUFURSAoUFJPQ0VE
VVJFfEZVTkNUSU9OfFRSSUdHRVIpIChgW15gXSpgKSkvc2ltJyk7PGJyPiRyZXBsYWNlID0gYXJy
YXkoJy8vJyw8YnI+J1wxJyw8YnI+IlxyXHJEUk9QIFxcMyBJRiBFWElTVFMgXFw0Ly9cclxcMiIp
Ozxicj4kc3FsX2R1bXAgPSBwcmVnX3JlcGxhY2UoJGZpbmQsJHJlcGxhY2UsJHNxbF9kdW1wKTs8
YnI+ZWNobyAiZG9uZVxuIjs8YnI+PGJyPi8vIGJyZWFrIG91dCBpbmRpdmlkdWFsIHJvdXRpbmVz
IGFuZCBzYXZlIHRvIGZpbGVzL2RpcnM8YnI+JG1hdGNoZXMgPSBhcnJheSgpOzxicj5wcmVnX21h
dGNoX2FsbCgnJSg/UCZsdDtzcWwmZ3Q7RFJPUFxzKD9QJmx0O3R5cGUmZ3Q7W2Etel0qKSBJRiBF
WElTVFMgYCg/UCZsdDtuYW1lJmd0O1teYF0qKWAvLy4qP0VORC8vKSVzaW0nLCRzcWxfZHVtcCwk
bWF0Y2hlcyk7PGJyPmVjaG8gIlNhdmluZyBzY3JpcHRzIG91dC4uLiI7PGJyPiRuPTA7PGJyPmZv
cmVhY2goJG1hdGNoZXNbJ25hbWUnXSBBUyAkbj0mZ3Q7JG5hbWUpwqAgezxicj4gJGZpbGVuYW1l
X291dCA9IHN0cnRvbG93ZXIoJG1hdGNoZXNbJ3R5cGUnXVskbl0uJ3MnLkRJUkVDVE9SWV9TRVBB
UkFUT1IuJG5hbWUuJy5zcWwnKTs8YnI+IGVjaG8gIiRmaWxlbmFtZV9vdXRcbiI7PGJyPiBmaWxl
X3B1dF9jb250ZW50cyggJHNxbF9zY3JpcHRfb3V0cHV0X2Rpci5ESVJFQ1RPUllfU0VQQVJBVE9S
LiRmaWxlbmFtZV9vdXQsJG1hdGNoZXNbJ3NxbCddWyRuXSk7PGJyPn08YnI+ZWNobyAiJG4gc2F2
ZWQuLi5kb25lXG4iOzxicj48YnI+PyZndDs8YnI+YGBg">
    ​
  </div>
</div>