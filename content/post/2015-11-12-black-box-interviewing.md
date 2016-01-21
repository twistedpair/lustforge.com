---
title: Black Box Interviewing
author: Joe
layout: post
date: 2015-11-12
url: /2015/11/12/black-box-interviewing/
categories:
  - Uncategorized

---
Empirically speaking, the majority of software developers are uninspiring. This applies to the formally and informally trained. Perhaps this is because many web frameworks and 4GL&#8217;s don&#8217;t require much understanding of bits, threads, and complexity. Yet, I firmly believe that if you&#8217;ve no idea what makes the machine tick, you&#8217;re creations will be simply dependent on the &#8220;magic&#8221; of computers, rather than the determinism of science and math.

I&#8217;ve interviewed perhaps 50 software developers over the years, and have been interviewed 15 times myself.

Some interviewers will ask sorting questions. I disdain this practice. Every serious interviewee has memorized an implementation of bubble sort, whether she understands it or not. The far more revealing and rigorous questions is as powerful as it is short; &#8220;Why?&#8221; Why did the language implement X like that? Why did you design your system that way? Why does the algorithm run slower on this or that memory architecture?

But such deeper, subjective questions require a depth of understanding from the interviewer as interviewee. These are more difficult to grade from a standardized, enterprise interview rubric.

I&#8217;m routinely surprised by interviewees that know only the world within the 80 character width of their IDE. They don&#8217;t know how the VM executors their code, how the memory model functions, how much space their classes and objects consume, their algorithm&#8217;s complexity, or the myriad steps that occur from the tokenizing and lexing of their routine to execution in the registers of the production system.

To many the frameworks, compilers, and language are simply a magic box. It&#8217;s a testament to 4GL&#8217;s and the FOSS frameworks that this is sufficient to create complex programs and earn a descent living. It&#8217;s also a specter over developers and ops that crucial pieces of corporate infrastructure, developed by contractors that have since moved on, are fraught with memory leaks and fatal edge cases that no one understands or is capable of fixing.

Accordingly, the title &#8220;Senior Software Engineer&#8221; can be earned at some institutions for having an order of magnitude less ability than at others. A &#8220;Junior Engineer&#8221; at Company A might easily surpass the &#8220;Principal Engineer&#8221; at a neighboring Company B. At Google, you can be a &#8220;Software Developer&#8221; for 5 years without earning the mantel of &#8220;Engineer&#8221; unless you go through the grinder of being interviewed from scratch again. At other firms, the fact that you&#8217;ve warmed your chair for 5 years without running away automatically makes you a &#8220;Principal Engineer.&#8221;

In summary, you cannot simply judge an applicant by their title. You must grok their cumulative experience and development culture. People can drone on ad nauseam speaking to their resume and purported successes, but to distill their true technical acumen, you must challenge them with open ended technical questions and real world coding challenged. Thus, check the resume and title at the door, and treat the interview like a blackbox. If they understand what makes the machine tick and the fundamental concepts that back computer science, they&#8217;ll likely be able to excel at whatever framework you&#8217;re using.