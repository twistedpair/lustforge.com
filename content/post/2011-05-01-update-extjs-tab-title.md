---
title: Update ExtJs TabPanel Tab Title
author: Joseph Lust
layout: post
date: 2011-05-01
url: /2011/05/01/update-extjs-tab-title/
tags:
  - ExtJs
---
Isn&#8217;t [ExtJs][1] the cat&#8217;s meow? I think so, but many cats have hairballs. For ExtJs, this includes missing the ability to update the title of a `TabPanel` tab title once it has been rendered. Sure, you can find the _item_ and _title_ properties for your tab post-render, but that won&#8217;t update your page. You need to crawl the DOM. I&#8217;ve created an update to do just this.

Just paste the below override in your code and you can then call the `setTabTitle(tabNo,newTitle)` method to update a given tab title. You&#8217;ll need to know the index of your tab in the tab panel.

For example:

```javascript
this.ownerCt.setTabTitle(0,'New Title!')
```

The override code:

```javascript
/**
 * Overrides the Ext.TabPanel to add .setTabTitle() function
 * @author Lust
 *
 */
Ext.override(Ext.TabPanel, {
 /**
 * Set the title of a specific tab
 */
 setTabTitle: function( tabNo, newTitle ) {
     // make sure we have a number and tab exists
     if( tabNo>=0 && !Ext.isEmpty( this.getTabEl(tabNo))) {
        var tabEl = this.getTabEl(tabNo); // walk down dom, update title span
         Ext.getDom(tabEl).down('.x-tab-strip-text').innerHTML = newTitle;
     }
   }
 });
```

**Note: Those using ExtJs 3.3.1+, see Anup's comment on some tweaks.**

 [1]: https://www.sencha.com/products/extjs/
