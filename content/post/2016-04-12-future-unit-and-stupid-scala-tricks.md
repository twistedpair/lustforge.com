---
title: "Future[Unit] and Stupid Scala Tricks"
author: Joe
layout: post
date: 2016-04-12
url: /2016/04/12/future-unit-and-stupid-scala-tricks/
tags:
  - Futures
  - Scala
---

A quick Stupid Scala trick that I ran into after multiple refactoring passes broke the code. 

## The problem
[Futures][1] sometimes execute in expected order, other times not. Testing with `Await.result(f)` didn't block. The world was no longer deterministic. Why?

## The code

Assume that the `???` is a working implementation. This was the code before.

```scala
def makeFut1():Future[A] = ???
def makeFut2():Future[B] = ???
def doSideEffect(a:A,b:B):Unit = ???

def doWork():Future[Unit] = 
  for {
    futA <- makeFut1()
    futB <- makeFut2()
  } yield { doSideEffect(futA,futB) }
```

Alas synchronous `doSideEffect(...)` method was refactored to be async, becoming:

```scala
def doSideEffect(a:A,b:B):Future[Unit] = ???
```

What broke? Nothing. Scala compiled and ran it just fine. But, WFT? We're yielding a `Future[Unit]` not a `Unit`, shouldn't that make `doWork()` return a `Future[Future[Unit]]` and fail type checking?

## Unit Type Tricks

Because we're yielding `Unit` the compiler doesn't give a damn what we return. Any `Future` executed in said yield will probably be invoked, but not as this flatmapping chain of futures, and not in the order you'd expect. 

`doSideEffect(...)` is invoked, and it's Future created, but said Future isn't tied to this sequence of Futures. Thus, the Future returned by `doWork()` won't wait for it, returning `Unit` immeadiately. As such, be careful when yielding a Unit.


 [1]: http://docs.scala-lang.org/overviews/core/futures.html#futures
