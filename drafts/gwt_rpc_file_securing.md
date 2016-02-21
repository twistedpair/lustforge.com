Securing GWT RPC Files



Show basic filter to prevent these from being poached.



For example:

Google Groups source

https://groups.google.com/forum/deferredjs/0DD97431D7765416775A04ABCE5C4124/8.cache.js

But RPC's not available in standard dir:

https://groups.google.com/forum/0DD97431D7765416775A04ABCE5C4124.gwt.rpc

Actually they are



1. GET the Url for the nocache file

2. Download and scan for all deferred js pathes

3. Start grabbing cache fragments until error returned

4. Grep all for RPC paths

5. Fetch all RPC files

egrep [A-F0-9]{32} *.cache.js -oh | sort | uniq



HotelMe.com


