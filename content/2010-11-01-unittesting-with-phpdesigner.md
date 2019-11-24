---
title: Unittesting with PhpDesigner and SimpleTest
author: Joseph Lust
layout: post
date: 2010-11-01
url: /2010/11/01/unittesting-with-phpdesigner/
tags:
  - PHP

---
Here is how to unitest within [PhpDesigner][1]. The following was done on a Windows 7 machine with PhpDesigner 7.2.

1. Install <a title="Download WAMP" href="http://www.wampserver.com/en/download.php" target="_blank">WAMP server</a> on your Windows machine. This is needed because the default PhpDesigner PHP engine cannot connect to databases (i.e. MySQL).

  * Just use the default installer setup and location
  * We&#8217;ll assume your WAMP is installed in `c:\wamp`

2. Now point your PhpDesigner at the WAMP.

  * **PhpDesigner** > **Tools** > **Preferences&#8230;**
  * Set the _Debugger_ to use the _PHP Interpreter_ your `c:\wamp\bin\php\php5.3.0\php-cgi.exe` and the init file `c:\WAMP\bin\php\php5.3.0\php.ini`
  * Set the _Syntax Checker_ to use the above values too
  * Set _Run_ to use the above values too
  * Point your _Localhost_ folder to the WAMP localhost `c:\wamp\www\`
  * Restart your PhpDesigner installation

3. Now download and install the <a title="Download SimpleTest" href="http://www.simpletest.org/en/download.html" target="_blank">SimpleTest </a>unittesting framework

  * Just download the files (**1.0.1 recommended**, I could not get 1.1 released 2 days ago to run)
  * Unzip the files to the location of your PHP project

4. Create a helloworld test and run it from the comfort of PhpDesginer!

    ```php
    <?php
    // hide warnings from  SimpleTest 1.0.1
    require_once(dirname(__FILE__).'/error_suppress.inc');
    // autorun this test<br />
    require_once(dirname(__FILE__).'/simpletest/autorun.php');
    // test all harvesters
    class TestOfHelloWorld extends UnitTestCase {
        function testHelloWorld()   {
            this->assertEqual( 4, 4, 'Numbers do not match');
        }
    }
    ?>
    ```

  * Note I&#8217;ve made a PHP file to hide Warnings from SimpleTest 1.0.1

  Example: error_suppress.php

```php
<?php
//Include this to override some common warnings when running SimpleTest in PhpDesigner
error_reporting(E_ALL &amp; ~E_DEPRECATED);// surpress dep errors - using old testing scripts
date_default_timezone_set('US/Eastern');       // suppress errors of unset timezone
?>
```

  * Click **Run** and look for the green lights! 

### If you are a Dreamhost user (like me)

  * For database unittests, you&#8217;ll need to open an external IP on your database
  * Login to panel.dreamhost.com for your account
  * Click Goodies >MySQL Databases [on left]
  * Click on the name of your database user [in &#8220;Users with Access&#8221; column]
  * Copy your local computer&#8217;s IP address to the list of allowed address and click &#8220;Modify&#8221;

 [1]: http://www.mpsoftware.dk/phpdesigner.php
