---
draft: false 
title: "Cloud Build Triggers: Excluding Branches"
author: Joseph Lust
layout: post
date: 2018-11-07
url: /2018/11/07/cloud-build-triggers-excluding-branches/
summary: "Exclude branches likes master from Cloud Build triggers"
tags:
  - cloud-build 
  - google-cloud-platform
  - git
  - regex 
---

[Cloud Build][1] is a powerful, scalable, and cheap way to run your CI/CD builds, but the triggers have some limitations, like branch exclusions. 

For example, perhaps you have triggers to:

1. Build/deploy the tags to _production_
2. Build/deploy the `master branch to _integration_
3. Build/test feature branches on **NOT** `master|develop`

You can handle cases 1 & 2 with `branch` and `tag` triggers, but case 3 requires regex exclusions. Unfortunately, this is not an option in [Cloud Build triggers][3].

# Regex Contortions to the Rescue

It's well know that the solution to a regex problem is always more regex.

So, using some negative classes (a bunch of them actually), we can make a **NOT** `master` trigger regex for Cloud Build.

e.g. `^(([^m]|m($|[^a]|a($|[^s]|s($|[^t]|t($|[^e]|e($|[^r]))))))|master.+)`[^2]

# Don't Forget to Match the Entire Branch

Make sure you match the **entire branch** name, unless you want to **match multiple branches**.

e.g. "`^master$`" to match master, **not** "`master`"

Otherwise, when Jill checks in her feature branch `jill-css-masterpiece`, it will automatically get sent to _integration_ or worse [^10].

Match it like you mean it 😉.

 [^2]: I'm not proud of this solution, but it JustWorks™
 [^10]: Many teams have `master` commits ship to production

 [1]: https://cloud.google.com/cloud-build/
 [3]: https://cloud.google.com/cloud-build/docs/running-builds/automate-builds#build_trigger
 
