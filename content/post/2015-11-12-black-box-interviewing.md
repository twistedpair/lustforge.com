---
title: Black Box Interviewing
author: Joseph Lust
layout: post
date: 2015-11-12
url: /2015/11/12/black-box-interviewing/
summary: The majority of software developers are uninspiring
tags:
  - interviewing
  - hiring
  - developers
---

Empirically speaking, the majority of software developers are uninspiring[^1]. This applies to the formally and informally trained. Perhaps this is because many web frameworks and 4GL's don't require much understanding of bits, threads, and complexity. If you've no idea what makes the machine tick, you're creations will be simply dependent on the “magic” of computers, rather than the determinism of science and math.

I've interviewed perhaps ~~30~~ 60 software developers over the years, and have been interviewed ~~15~~ 20 times myself.

Some interviewers will ask sorting questions. I disdain this practice. Every serious interviewee has memorized an implementation of bubble sort, whether she understands it or not. The far more revealing and rigorous questions is as powerful as it is short; “Why?” Why did the language implement X like that? Why did you design your system that way? Why does the algorithm run slower on this or that memory architecture?

But such trenchant questions require a depth of understanding from the interviewer as interviewee. These are more difficult to grade on a standardized, enterprise interview rubric[^2].

I'm routinely surprised by interviewees that know only the world within the 80 character width of their IDE. They don't know how the VM executors their code, how the memory model functions, how much space their classes and objects consume, their algorithm's complexity, or the myriad steps that occur from the tokenizing and lexing of their routine to execution in the registers of the production system.

To many the frameworks, compilers, and language are simply a magic box[^3]. It's a testament to 4GL's and the FOSS frameworks that this is sufficient to create complex programs and earn a descent living. It's also a specter over developers and ops that crucial pieces of corporate infrastructure, developed by contractors that have since moved on, are fraught with memory leaks and fatal edge cases that no one understands or is capable of fixing.

Accordingly, the title “Senior Software Engineer” can be earned at some institutions for having an order of magnitude less ability than at others. A “Junior Engineer” at Company A might easily surpass the “Principal Engineer” at a neighboring Company B. At Google, you can be a “Software Developer” for 5 years without earning the mantel of “Engineer” unless you go through the grinder of being interviewed from scratch again. At other firms, the fact that you've warmed your chair for 5 years without running away automatically makes you a “Principal Engineer.”

In summary, you cannot simply judge an applicant by their title. You must grok their cumulative experience and development culture. People can drone on ad nauseam speaking to their resume and purported successes, but to distill their true technical acumen, you must challenge them with open ended technical questions and real world coding challenged. Thus, check the resume and title at the door, and treat the interview like a blackbox. If they understand what makes the machine tick and the fundamental concepts that back computer science, they'll likely be able to excel at whatever framework you're using.


 [^1]: p58, Raymond, Eric S. [The Cathedral &amp; The Bazaar][10]. Beijing: O`Reilly, 1999. Print.
 [^2]: I've been shocked when fellow interviewers fumbled, not knowing answers to our employer's standard interview deck for novice developer candidates.
 [^3]: Developers learn Spring, not Java; JQuery, not Javascript.
 
 [10]: https://en.wikipedia.org/wiki/The_Cathedral_and_the_Bazaar
 