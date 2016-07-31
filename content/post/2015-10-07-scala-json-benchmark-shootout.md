---
draft: true
title: Scala JSON Benchmark Shootout
author: Joseph Lust
layout: post
date: 2015-10-07
url: /2015/10/07/scala-json-benchmark-shootout/
tags:
  - Json
  - Scala
---

Do all of the following:
https://stackoverflow.com/questions/8054018/what-json-library-to-use-in-scala

Serialize large, small. Do a bunch of times. Take last 50-30% and do basic stats on them.

Deserialize too.

Charts. Strengths, weaknesses.

Objects with lots of nesting. Objects with large arrays.

Example basis: https://github.com/derekwyatt/spray-json-vs-argonaut/tree/master/src/test/scala/com/codeseq