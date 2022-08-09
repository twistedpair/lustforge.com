---
title: ExtJs Field getForm() Override
author: Joseph Lust
layout: post
date: 2011-06-19
url: /2011/06/19/extjs-field-getform-override/
tags:
  - ExtJs

---
When using the DOM directly, if you have the element reference to an `<INPUT>` object, you can reference its parent via `el.form`. However, in ExtJs, **there is no such accessor for the form of field**. The following ExtJs override adds the `getForm()` method to a field which will search upward through the ExtDOM until it finds a parent form, or hits a recursion depth of 10.

Example usage:

```javascript
// Example useage
var myField = Ext.getCmp('myField');
var form = myField.getForm();
```

Override code: Include this before your form.

```javascript
/*
* DOM gives <INPUT> a 'form' property pointing to the parent
* however ExtJS does not do this for fields. Override to add it.
* USE: this.getForm() to get form of a field
* NOTE: maximum search depth of 10 to prevent run away bubble up search
*/
Ext.override(Ext.form.Field, {
    form : null, // cache so we don't perform many lookups
    getForm: function() {
        if( this.form===null) {
            var scope = this, maxDepth=10, n=0;
            for( ; n<maxDepth && Ext.isDefined(scope.ownerCt); n++) {
                scope=scope.ownerCt; // drill higher
                //console.log( n+":"+scope.ownerCt.id); // debug output
                if( Ext.isDefined(scope.getForm) ) {
                    this.form = scope.getForm();
                    break;
                }
            }
        }
        return this.form;
    }
});
```
