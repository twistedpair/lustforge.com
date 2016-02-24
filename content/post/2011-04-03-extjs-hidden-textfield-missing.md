---
title: Extjs Hidden Textfield Missing
author: Joe
layout: post
date: 2011-04-03
url: /2011/04/03/extjs-hidden-textfield-missing/
tags:
  - ExtJs

---
I love [ExtJS][1], but some days it just does not love me back.

For instance, if you have a hidden textfield, and you **don't set the width property, it won't be added to your form**. Sure, you say, why would you need the width for a hidden input? Well, ExtJS thinks you might call `myHiddenTextfield.show()` some day, so it still needs to put it in there with a width. No width, no love.

If you are having this error, it will result in `form.findField(myHiddenTextfield)` returning `null`, and you getting an error if you attempt to set the non-existent field.
  
**Note**: ExtJS admonishes the use of hidden fields, saying that the more advanced controls for AJAX/JSONP and POST/GET mean you don&#8217;t need them, but in some cases, it is just nice to have all your eggs in one basket, and not across multiple objects and scopes.

 [1]: https://www.sencha.com/products/extjs/

