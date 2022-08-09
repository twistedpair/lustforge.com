---
draft: false 
title: "Handling Giant Swagger Specs"
author: Joseph Lust
layout: post
date: 2017-08-11
url: /2017/08/11/giant-swagger-specs/
image: /img/swagger_jenkins_post_image.png
summary: "Three quick tips to wrangle giant Swagger files"
tags:
  - swagger
  - python
  - ci
  - jenkins
---

# Swagger Spec: An Embarrassment of Riches 
[Swagger Spec][10] is a great way to define and document API projects. Your code and documentation live and ship together, allowing for rapid documentation and development. However, you might say it's too good.

As your team and APIs using Swagger grow, so too do the challenges of wrangling that giant spec without breaking your APIs or driving your developers bonkers. Unfortinately, tools like the Swagger Validator start to break down for large, real worls specs [^2]. Here are some lessons I learned productionizing such large specs [^1].

# 1. Use YAML, Not JSON

JSON is hard to read and easy to corrupt in large file sizes. YAML has:

 * Better readability
 * Intellij, Atom, and SubLime [editor support][20]
 * IDE (and vim) [schema auto complete][21] 

# 2. Break Up Your Spec

Use the [$ref includes][19] functionality to compose multiple files into one spec. Break your spec into relevant sub sections (e.g. by entity type, department, etc). This will:

* Reduce checkin conflicts between developers
* Increase readability and maintainabilty
* More easily isolate spec errors


# 3. DRY: Don't Repeat YAML

Swagger allows reuse of [enums][13], so don't repeat them in the `GET` & `POST` endpoints, and inside the data objects. `$ref` references work for enums just like other Swagger object references. 

```yaml
paths:
  /widgets:
    get:
      parameters:
      - in: query
        name: shape
        required: true
        schema:
          $ref: '#/components/schemas/Shape'
      responses:
        '200':
          description: OK
components:
  schemas:
    Shape:
      type: string
      enum:
        - round
        - square
        - triangle
```

# 4. Automate Swagger Spec Validation

Preemptively validate your spec, rather than wait until your API fails to start or object mapping errors throw 500's in production.

See my [Automating Swagger Spec validation post][9] on using Yelp's [Swagger Spec Validator][15].


 [^1]: I've wrangled 10K and 11K spec files at work. 😢 
 [^2]: Running Swagger Editor locally is slow (e.g. 6min npm install/start), consider the [prebuilt Docker image][14].

 [9]: {{< ref "2017-06-17-swagger-ci-checkin-validation.md" >}}
 [10]: https://swagger.io/specification/
 [11]: http://petstore.swagger.io/
 [12]: http://editor.swagger.io/
 [13]: https://swagger.io/docs/specification/data-models/enums/
 [14]: http://halyph.com/talks/2016-swagger-slides/Run%20Swagger%20Editor%20Locally.html
 [15]: https://github.com/Yelp/swagger_spec_validator
 [16]: http://petstore.swagger.io/v2/swagger.json
 [17]: https://swagger-spec-validator.readthedocs.io/en/latest/
 [18]: https://gist.github.com/twistedpair/bc743b7e1a4b41753de6b148280410da
 [19]: http://azimi.me/2015/07/16/split-swagger-into-smaller-files.html
 [20]: https://github.com/pkkid/sublime-swagger-nav/blob/master/Swagger.sublime-syntax 
 [21]: https://plugins.jetbrains.com/plugin/8347-swagger 
 
