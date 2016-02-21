API Authenication with Play Framework

nginx won't append CORS headers (add_header) if non 200/300 response code.

http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header
https://www.ruby-forum.com/topic/4941015

Can add a custom action composition to Controller, but order of operation is
* Method
* Global onRequest()
* Class Method (confirm this one)

So need to move to common utils and apply in error pathways (boo)

TBD when fix will go in
https://github.com/playframework/playframework/issues/1088

Problem: JS cannot read response (i.e. why was my request malformed 400? without CORS headers, so must apply in code, not nginx)

Also must handle OPTIONS headers preflight too!

