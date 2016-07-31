---
title: 'Convert MySQL Dump to Routines Files [PHP script]'
author: Joseph Lust
layout: post
date: 2010-11-06
url: /2010/11/06/convert-mysql-dump-to-routines-php-script/
tags:
  - MySQL
  - PHP
---
Perhaps you are like me and&#8230; well&#8230; didn't get righteous about backuping up your MySQL routines to an SCM until your first database scare?

If you did, you&#8217;d wish you could just take that database export script from [PHPMyAdmin][1] and parse / convert it to a bunch of tidy little Procedure, Function, and Trigger files. Why, that would be nice!

The following PHP script (PHP 5+) will do the following:

- Breakout procedure/function/trigger as `[type\_name]/[routine\_name].sql` files
- Strip off those pesky `DEFINER` statements that cause nothing but trouble
- Add `DROP ``` `X` ``` IF EXISTS` before `CREATE` statements, for easier editing

**Note**: script will create `procedures/`, `functions/`, and `triggers/` directories where you specify.

**See**: Config options at the top of the file.

```php
<?php

/**
 * @author Lust
 * @copyright 2010, LustForge.com
 * Take a MySQL dump file and
 * (1) If not already in file, adds -> DROP (PROCEDURE|TRIGGER|FUNCTION) IF EXISTS `(NAME)`
 * (2) Remove DEFINER statements
 * (3) Save by name and place in directory named (PROCEDURE|TRIGGER|FUNCTION)
 */

// SETUP
// file name (input)
$sql_dump_filename = "c:\\sql\\sql_dump.sql";
// output directory
$sql_script_output_dir = "c:\\sql"; // NOTE "\\" is escape for "\"

// Read in file
echo "Reading input file...";
$sql_dump = file_get_contents($sql_dump_filename);
if(!$sql_dump || strlen($sql_dump)==0)  {
 die("Cannot open file: $sql_dump_filename\n");
}
echo "done\n";

// Create needed directories if they don't exist
echo "Making output directories...";
$dir_names = array('procedures','triggers','functions');
foreach( $dir_names AS $name) {
 $name = $sql_script_output_dir.DIRECTORY_SEPARATOR.$name;
 if(!is_dir($name))   {
 mkdir($name);
 }
}
echo "done\n";

// replace various junk
echo "Replacing junk...";
$find = array('/\$\$/',
'/DEFINER=.*?\s(PROCEDURE|TRIGGER|FUNCTION)/sim',
'/(\s+|-+)\s\s(CREATE (PROCEDURE|FUNCTION|TRIGGER) (`[^`]*`))/sim');
$replace = array('//',
'\1',
"\r\rDROP \\3 IF EXISTS \\4//\r\\2");
$sql_dump = preg_replace($find,$replace,$sql_dump);
echo "done\n";

// break out individual routines and save to files/dirs
$matches = array();
preg_match_all('%(?P<sql>DROP\s(?P<type>[a-z]*) IF EXISTS `(?P<name>[^`]*)`//.*?END//)%sim',$sql_dump,$matches);
echo "Saving scripts out...";
$n=0;
foreach($matches['name'] AS $n=>$name)  {
 $filename_out = strtolower($matches['type'][$n].'s'.DIRECTORY_SEPARATOR.$name.'.sql');
 echo "$filename_out\n";
 file_put_contents( $sql_script_output_dir.DIRECTORY_SEPARATOR.$filename_out,$matches['sql'][$n]);
}
echo "$n saved...done\n";

?>
```

 [1]: https://www.phpmyadmin.net
