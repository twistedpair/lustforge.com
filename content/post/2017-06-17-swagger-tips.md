---
draft: true
title: "Handling Giant Swagger Specs"
author: Joseph Lust
layout: post
date: 2017-06-17
url: /2017/06/17/swagger-jenkins-validation/
image: /img/swagger_jenkins_post_image.png
summary: "Three quick tips to wrangle giant Swagger files"
tags:
  - swagger
  - python
  - ci
  - jenkins
---

# The Mega Spec Problem
[Swagger Spec][10] is a great way to define and document API projects. Your code and documentation live and ship together, allowing for rapid documentation and development. However, you might say it's too good.

When a team embraces Swagger, documenting every endpoint in great detail, the Swagger files swell to untenable dimensions[^1]. What worked for the [PetStore Spec][11] no longer runs against the [Swagger Editor webapp][12][^2], so developers don't bother to validate their spec edits before checkin. CI/CD auto updates your Swagger docs on deploy, auto breaking the documentation developers and customers rely upon, ultimately impeding productivity.

Thus, an automatic quality gate on Swagger Specs can mitigate this path to rapid documentation corruption.

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

# 3. Automate Swagger Spec Validation

You can catch two types of spec defects:

1. Format errors (e.g. JSON or YAML defects)
2. Invalid spec definitions

Something as simple as running JSON through [jq][13] will catch format errors, but we'll focus on #2, since it's a catch all.

Yelp's [Swagger Spec Validator][15] is just the ticket[^3].

```bash
#!/bin/bash
set -e
FULL_SPEC_PATH="/path/to/spec.json" # Absolute, please

# Idempotent, local library install
virtualenv .
source bin/activate
pip install swagger-spec-validator

# Test the Spec
python -c "from swagger_spec_validator import validate_spec_url; validate_spec_url('file://${FULL_SPEC_PATH}')"
```

Expect no output on success, or a trace on error.

For example, let's corrupt the [Pet spec file][16], but keep it in valid JSON format.

```json
"ApiResponse_WRONG_NAME": {
  "type": "object",
  "properties": {
    ...
  }
}
```

Validation outputs the following helpful message, noting the `ApiResponse` entity references are no longer valid.

```bash
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  ...
  File "/usr/local/lib/python2.7/dist-packages/jsonschema/validators.py", line 387, in resolve_from_url
    return self.resolve_fragment(document, fragment)
  File "/usr/local/lib/python2.7/dist-packages/jsonschema/validators.py", line 421, in resolve_fragment
    "Unresolvable JSON pointer: %r" % fragment
swagger_spec_validator.common.SwaggerValidationError: Unresolvable JSON pointer: u'definitions/ApiResponse'
```

# Jenkins Wireup

Validation is great, but it will only reliably occur when fully automatic (developers are busy people!). Integration with Jenkins will ensure every Swagger Spec commit is valid, and prevent bad specs from getting into master.

Simply add an `Execute Shell` step and past the above example ([gist link][18]). The non-zero exit code on error will send an informative message to the offending developer. 

*Note:* I prefer to have this as the first build step to "fail fast" on checkin, especially for long build processes, but you may prefer to do it last, so all build errors are reported.

Example Jenkins Config Screen:

{{< figure src="/img/swagger_validator_jenkins_config.png" >}}


 [^1]: I had to wrangle an 11K spec file. :(
 [^2]: Running Swagger Editor locally is slow (e.g. 6min npm install/start), consider the [prebuilt Docker image][14].
 [^3]: Aside from the "read the docs" link to the [empty docs site][17].
 
 [10]: https://swagger.io/specification/
 [11]: http://petstore.swagger.io/
 [12]: http://editor.swagger.io/
 [13]: https://stedolan.github.io/jq/
 [14]: http://halyph.com/talks/2016-swagger-slides/Run%20Swagger%20Editor%20Locally.html
 [15]: https://github.com/Yelp/swagger_spec_validator
 [16]: http://petstore.swagger.io/v2/swagger.json
 [17]: https://swagger-spec-validator.readthedocs.io/en/latest/
 [18]: https://gist.github.com/twistedpair/bc743b7e1a4b41753de6b148280410da
 [19]: http://azimi.me/2015/07/16/split-swagger-into-smaller-files.html
 [20]: link to IDEA / Atom / Sublime
 [21]: link to auto complete for above
 