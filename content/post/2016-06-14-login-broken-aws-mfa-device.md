---
title: "Login With Broken AWS MFA Device"
author: Joseph Lust
layout: post
date: 2016-06-14
url: /2016/06/14/login-broken-aws-mfa-device/
image: /img/broken_iphone.png
summary: "Your dog just broke your iPhone. How do you login to AWS without your MFA token?"
tags:
  - AWS
  - IAM
---

# Oh, Fudge
Your dog just broken your iPhone[^1] and the master token for your AWS root account is locked up in the safe at work. Your boss needs an emergency update to your prod infrastructure. How do you login to your MFA protected AWS account?

# AWS CLI To the Rescue
No worries, you've got this covered in 15 seconds.

Lookup the ARN of your MFA device in IAM, via the username you use for [AWS Console Login][10].

```bash
aws iam list-mfa-devices --user-name john_smith
```
Outputs:

```json
{
    "MFADevices": [
        {
            "UserName": "john_smith",
            "SerialNumber": "arn:aws:iam::1234567890123:mfa/john_smith",
            "EnableDate": "2016-01-01T17:00:00Z"
        }
    ]
}
```


```bash
aws iam deactivate-mfa-device --user-name john_smith --serial-number arn:aws:iam::1234567890123:mfa/john_smith
```

The safe is cracked. Login. Pretend like this never happened.

# You Don't Have AWS CLI Admin Access
We got a problem here. Your choices are:

- Use your root token / ask your sys admin to remove the MFA from your account
- Contact [AWS MFA Device Support][12]

 [^1]: Consider ordering a [physical token][11], inserting in mason jar, and burying in backyard

 [10]: https://console.aws.amazon.com/
 [11]: https://www.amazon.com/SafeNet-IDProve-Time-based-6-Digit-Services/dp/B002CRN5X8?ie=UTF8&keywords=gemalto%20aws&qid=1462806259&ref_=sr_1_1&sr=8-1
 [12]: https://aws.amazon.com/forms/aws-mfa-support
 
