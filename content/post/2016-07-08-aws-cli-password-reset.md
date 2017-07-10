---
title: "AWS Command Line Password Reset"
author: Joseph Lust
layout: post
date: 2016-07-08
url: /2016/07/08/aws-cli-password-reset/
image: /img/aws_access_denied.png
summary: "Your AWS login expired. Time to call the sysamdin, or can you solo this one?"
tags:
  - AWS
  - IAM
  - awscli
---

# Oh, Nuts
Your AWS console login just expired, as the login prompt *has been warning for weeks*. You need to update that Route 53 entry and your boss is waiting. Do you call the sysadmin and beg for a reset, or can you solve this yourself?

# AWS CLI To the Rescue
No worries, you've got this covered in 15 seconds.

Use the iam API call [update-login-profile][0] combined with your aws iam username (login name for the [AWS Console Login][2]). 

```bash
aws iam update-login-profile --user-name jsmith --password sesame --password-reset-required
```

The combination is cracked. Login. Whistle innocently like this never happened.

# Other Dead Ends

The awscli has another tempting, but misleading API called [change-password][3].

If you tried it, you'd be saddened to see the required `--old-password` parameter. This is a red herring. Dodge left.

# You Don't Have AWS CLI Admin Access
We got a problem here. Your choices are:

- Kowtow to your sysadmin for mercy
- If it's a root account, use the [password reset process][4] to get a reset email[^1]

 [^1]: This email will be sent to the root account email only. You've got access, right?

 [0]: https://docs.aws.amazon.com/cli/latest/reference/iam/update-login-profile.html
 [2]: https://console.aws.amazon.com/
 [3]: https://docs.aws.amazon.com/cli/latest/reference/iam/change-password.html
 [4]: https://www.amazon.com/ap/forgotpassword?openid.pape.preferred_auth_policies=MultifactorPhysical&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fsignin.aws.amazon.com%2Foauth%3Fresponse_type%3Dcode%26client_id%3Darn%253Aaws%253Aiam%253A%253A015428540659%253Auser%252Fhomepage%26redirect_uri%3Dhttps%253A%252F%252Fconsole.aws.amazon.com%252Fconsole%252Fhome%253Fstate%253DhashArgs%252523%2526isauthcode%253Dtrue%26noAuthCookie%3Dtrue&prevRID=14XBRCDW9RJD7GXZ9KTP&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=aws&openid.mode=checkid_setup&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=aws.ssop&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0
 
