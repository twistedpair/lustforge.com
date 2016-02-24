---
title: Open ExtJs Menu on Mouseover
author: Joe
layout: post
date: 2011-07-06
url: /2011/07/06/open-extjs-menu-on-mouseover/
tags:
  - ExtJs

---
Would you believe there is no way to open an ExtJs toolbar menu when you hover over the corresponding button? This functionality is all over the ExtJs [homepage](https://www.sencha.com), but not in their framework. Boo! Nope, nothing without pulling the buttons out of the toolbar (see <a title="ExtJs Forum Topic" href="http://www.sencha.com/forum/showthread.php?69931-toolbar-menu-open-on-hover" target="_blank">here</a>), which is a no go for existing applications.

So, I present you with the **HoverButton**. It is just like the standard button, but hides after `250ms` of mouseout from the button or the opened menu. Just use the `xtype` of **hoverButton** where you used **button** before. That was easy!

To achieve this, listeners check for mouseover/out of the button and set a [Ext.util.DelayedTask][1], and if the user moves to the menulist, the close is delayed until they leave. Pretty simple. Enjoy.

```javascript
/**
 * Add autoShow on mouseover option to buttons with menus
 * @copyright LustForge.com 2011
 * @author J.Lust
 * @version ExtJs 3.3.4
 */
Ext.HoverButton = Ext.extend( Ext.Button, {

    // hide task properties and helpers
    hideTask : null,
    hideTaskMs : 250, // timeout in ms
    hideTaskFn : function() {
        if( this.hideTask !== null ) {
            this.hideTask.cancel();
        }
        this.hideTask = new Ext.util.DelayedTask(this.hideMenu,this);
        this.hideTask.delay( this.hideTaskMs );
    },

    // extend init props
    initComponent : function (  ) {

        // add hide/show, if this is a button with menu
        var config = {}, menuConfig = {};
        if( Ext.isDefined(this.initialConfig.menu) ) {
            config = {
                listeners : {
                    menutriggerover : {
                        fn: function(b) {
                            //console.log('menutriggerOver');
                            b.showMenu();
                        },
                        scope:this
                    },
                    menutriggerout : {
                        fn: function(b) {
                            //console.log('menutriggerOut');
                            this.hideTaskFn();
                        },
                        scope:this
                    }
                }
            };
            // add listeners to see if user is over extended menu list
            menuConfig = {
                listeners : {
                    // if mousing over menu list, disable timeout
                    mouseover : {
                        fn: function(b) {
                            // cancel hide if they went away and came back
                            if( this.hideTask !== null ) {
                                //console.log('menu mouseOver');
                                this.hideTask.cancel();
                                this.hideTask = null;
                            }
                        },
                        scope:this
                    },
                    // on mousing out of menu list, resume timeout
                    mouseout: {
                        fn: function(b) {
                            //console.log('menu mouseOut');
                            this.hideTaskFn();
                        },
                        scope:this
                    }
                }
            };

            Ext.apply( this.menu, menuConfig );
        }

        // apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        // call parent
        Ext.HoverButton.superclass.initComponent.apply(this,arguments);
    }
});
Ext.reg('hoverButton', Ext.HoverButton );
```

 [1]: http://www.objis.com/formationextjs/lib/extjs-4.0.0/docs/api/Ext.util.DelayedTask.html


