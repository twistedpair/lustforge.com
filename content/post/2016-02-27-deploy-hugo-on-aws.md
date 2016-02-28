---
title: "AWS Hugo Hosting, HowTo"
author: Joe
layout: post
date: 2016-02-27
url: /2016/02/27/hosting-hugo-on-aws/
tags:
  - Go
  - CloudFront
  - AWS
  - Hugo
---

Running your [Hugo][5] static blog site is easy and cheap, but there are a few snags I had to solve when I deployed mine. Follow these instruction to host your Hugo blog on AWS [S3][4] and [Cloudfront][1].

## Disclaimer
The following works for me. If you're not comfortable with a CLI, use the [AWS Web Console][16].

## Bucket Configuration

Other tutorials use the AWS web console, and feature lots of screenshots, but your're a savvy Hugo user. We'll use the AWS Commandline interface tool, ak.k. **awscli**. You can install it with `pip`, if you don't already have it.

```bash
sudo pip install awscli
aws configure # Follow instructions to setup
```

Make a bucket. The name does not matter. No one will see this. If someone is already using that name, you'll need to pick another. We'll also add a bucket to hold all of our **logs**, so that you can know who visited.

```bash
# Set your domain here
YOUR_DOMAIN="yourdomain.com"
REGION="us-east-1"
# Don't change these
BUCKET_NAME="${YOUR_DOMAIN}-cdn"
LOG_BUCKET_NAME="${BUCKET_NAME}-logs"

# One fresh bucket please!
aws s3 mb s3://$BUCKET_NAME --region $REGION
# And another for the logs
aws s3 mb s3://$LOG_BUCKET_NAME --region $REGION
```

## Bucket Permissions and Logging

Give AWS the rights to insert logs into your bucket. Then tell S3 to log your website visits to that bucket.

``` bash
# Let AWS write the logs to this location
aws s3api put-bucket-acl --bucket $LOG_BUCKET_NAME \
--grant-write 'URI="http://acs.amazonaws.com/groups/s3/LogDelivery"' \
--grant-read-acp 'URI="http://acs.amazonaws.com/groups/s3/LogDelivery"'

# Setup logging
LOG_POLICY="{\"LoggingEnabled\":{\"TargetBucket\":\"$LOG_BUCKET_NAME\",\"TargetPrefix\":\"$BUCKET_NAME\"}}"
aws s3api put-bucket-logging --bucket $BUCKET_NAME --bucket-logging-status $LOG_POLICY
```

## Create S3 Bucket Website

We'll tell S3 to turn our bucket into a website. This will give it a public URL that does redirecting for us. We need this since Hugo blog pages like **foo.com/bob/** are really **foo.com/bob/index.html**. We need to redirect those root paths like **/bob/** to **/bob/index.html**. Normally you'd need rewrite rules with Nginx or Apache, but S3 can do that too.

```bash
# Create website config
echo "{
    \"IndexDocument\": {
        \"Suffix\": \"index.html\"
    },
    \"ErrorDocument\": {
        \"Key\": \"404.html\"
    },
    \"RoutingRules\": [
        {
            \"Redirect\": {
                \"ReplaceKeyWith\": \"index.html\"
            },
            \"Condition\": {
                \"KeyPrefixEquals\": \"/\"
            }
        }
    ]
}" > website.json

aws s3api put-bucket-website --bucket $BUCKET_NAME --website-configuration file://website.json
```
Now you can visit `http://<bucket_name>.s3-website-<region>.amazonaws.com` to browse your site!

## Get Free SSL Certificates

Everything should have SSL, so AWS decided to give away [FREE SSL certificates][7] for all AWS users. Thanks, Jeff! Make sure you can access the admin email [address on your domain][13], and then run the following and check your email. The email should go through instantly. Note that we're also requesting the `www.` variant of this domain. We'll use this for redirecting `www.foo.com` to `foo.com`.

```bash
aws acm request-certificate --domain-name $YOUR_DOMAIN --subject-alternative-names "www.$YOUR_DOMAIN" --idempotency-token "`date +%s`"
```
The idempotency token will prevent running this twice from sending two requests. Also, note that ACM will renew your certs each year automatically, so this SSL really is [set it and forget it][8].

Call ACM and get the ARN of your cert to use in the next step.

```bash
aws acm list-certificates --certificate-statuses ISSUED
# Example result
{
    "CertificateSummaryList": [
        {
            "CertificateArn": "arn:aws:acm:us-east-1:7865196219991:certificate/de305d54-75b4-431b-adb2-eb6b9e546014",
            "DomainName": "yoursite.com"
        }
    ]
}
```

## CloudFront Setup

S3 hosts your files as a website, but we want a vanity domain and custom SSL. Plus, a [worldwide 54 edge location CDN][6] would be nice. AWS CloudFront can accomplish all of this quite easily.

First we'll tell `awscli` to enable the CloudFront tools, which are presently in "Preview Mode."

```bash
aws  configure  set preview.cloudfront true # Honey badger don't care
```

This is a long config, so let's break it down:

#### Origin Config

We must use the **S3 website hosting URL** not simply point to the S3 bucket like regular CF setup. This allows us to get **index.html** redirecting. This also means we cannot use **HTTPS Only** on the origin, because its domain won't match the generic S3 certificate AWS uses for all S3 requests.

```json
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "$BUCKET_NAME-origin",
        "OriginPath": "",
        "CustomOriginConfig": {
          "OriginProtocolPolicy": "http-only",
          "HTTPPort": 80,
          "OriginSslProtocols": {
            "Quantity": 3,
            "Items": [
              "TLSv1",
              "TLSv1.1",
              "TLSv1.2"
            ]
          },
          "HTTPSPort": 443
        },
        "DomainName": "$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
      }
    ]
  }
```
#### Logging Config

- Log CF hits to the buckets we already made

```json
"Logging": {
    "Bucket": "$LOG_BUCKET_NAME.s3.amazonaws.com", 
    "Prefix": "${BUCKET_NAME}-cf/", 
    "Enabled": true
}
```
#### Cache Behavior Config

- We want everyone coming to the site to use SSL, so we'll redirect port 80 &rarr; 443.
- Cache content for 30min by DefaultCacheBehavior
- Only forward `HEAD` and `GET` requests, cache them too
- Gzip content if possible (reduce bandwidth usage, faster)
- Don't forward headers
- Don't trust other signers

```json
"DefaultCacheBehavior": {
"DefaultCacheBehavior": {
    "ViewerProtocolPolicy": "redirect-to-https",
    "DefaultTTL": 1800,
    "AllowedMethods": {
      "Quantity": 2,
      "Items": [
        "HEAD","GET"
      ],
      "CachedMethods": {
        "Quantity": 2,
        "Items": [
          "HEAD","GET"
        ]
      }
    },
    "MinTTL": 0,
    "Compress": true,
    "ForwardedValues": {
      "Headers": {
        "Quantity": 0
      },
      "Cookies": {
        "Forward": "none"
      },
      "QueryString": false
    },
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    }
  }
}
```
#### SSL Config

- Use the new SSL cert from ACM, referenced by the ARN
- Use [SNI][9], breaking wood burning browsers on WinXP, because it's FREE
- Warning: **Not** using SNI [costs `$600/mo`][14], so **use SNI**

```json
"ViewerCertificate": {
    "SSLSupportMethod": "sni-only", 
    "ACMCertificateArn": "$SSL_ARN", 
    "MinimumProtocolVersion": "TLSv1", 
    "Certificate": "$SSL_ARN", 
    "CertificateSource": "acm"
}
```

#### Error Config

- Forward Cloudfront `Not Found` and `Forbidden` errors to your custom pages
- Cache failures for 5min, then try the Origin again

```json
"CustomErrorResponses": {
    "Quantity": 2,
    "Items": [
        {
            "ErrorCode": 403, 
            "ResponsePagePath": "/404.html", 
            "ResponseCode": "404",
            "ErrorCachingMinTTL": 300
        }, 
        {
            "ErrorCode": 404, 
            "ResponsePagePath": "/404.html", 
            "ResponseCode": "404",
            "ErrorCachingMinTTL": 300
        }
    ]
}
```

#### Redirect Config

- Mask the ugly default CF domain with your vanity domain
- Accept root and `www.` variants

```json
"Aliases": {
    "Quantity": 2,
    "Items": [
        "$YOUR_DOMAIN", "www.$YOUR_DOMAIN"
    ]
}
```

#### Misc Config

- Serve `foo.com/index.html` to `foo.com` requests
- Use all edge nodes worldwide
- Turn it on

```json
{
    "DefaultRootObject": "index.html", 
    "PriceClass": "PriceClass_All", 
    "Enabled": true
}
```

### Making the Distribution

Sorry, it's really ugly, but such is bash escaping.

```bash
# From above
SSL_ARN="arn:aws:acm:us-east-1:7865196219991:certificate/de305d54-75b4-431b-adb2-eb6b9e546014"

CALLER_REF="`date +%s`" # current second
echo "{
    \"Comment\": \"$BUCKET_NAME Static Hosting\", 
    \"Logging\": {
        \"Bucket\": \"$LOG_BUCKET_NAME.s3.amazonaws.com\", 
        \"Prefix\": \"${BUCKET_NAME}-cf/\", 
        \"Enabled\": true,
        \"IncludeCookies\": false
    }, 
    \"Origins\": {
        \"Quantity\": 1,
        \"Items\": [
            {
                \"Id\":\"$BUCKET_NAME-origin\",
                \"OriginPath\": \"\", 
                \"CustomOriginConfig\": {
                    \"OriginProtocolPolicy\": \"http-only\", 
                    \"HTTPPort\": 80, 
                    \"OriginSslProtocols\": {
                        \"Quantity\": 3,
                        \"Items\": [
                            \"TLSv1\", 
                            \"TLSv1.1\", 
                            \"TLSv1.2\"
                        ]
                    }, 
                    \"HTTPSPort\": 443
                }, 
                \"DomainName\": \"$BUCKET_NAME.s3-website-$REGION.amazonaws.com\"
            }
        ]
    }, 
    \"DefaultRootObject\": \"index.html\", 
    \"PriceClass\": \"PriceClass_All\", 
    \"Enabled\": true, 
    \"CallerReference\": \"$CALLER_REF\",
    \"DefaultCacheBehavior\": {
        \"TargetOriginId\": \"$BUCKET_NAME-origin\",
        \"ViewerProtocolPolicy\": \"redirect-to-https\", 
        \"DefaultTTL\": 1800,
        \"AllowedMethods\": {
            \"Quantity\": 2,
            \"Items\": [
                \"HEAD\", 
                \"GET\"
            ], 
            \"CachedMethods\": {
                \"Quantity\": 2,
                \"Items\": [
                    \"HEAD\", 
                    \"GET\"
                ]
            }
        }, 
        \"MinTTL\": 0, 
        \"Compress\": true,
        \"ForwardedValues\": {
            \"Headers\": {
                \"Quantity\": 0
            }, 
            \"Cookies\": {
                \"Forward\": \"none\"
            }, 
            \"QueryString\": false
        },
        \"TrustedSigners\": {
            \"Enabled\": false, 
            \"Quantity\": 0
        }
    }, 
    \"ViewerCertificate\": {
        \"SSLSupportMethod\": \"sni-only\", 
        \"ACMCertificateArn\": \"$SSL_ARN\", 
        \"MinimumProtocolVersion\": \"TLSv1\", 
        \"Certificate\": \"$SSL_ARN\", 
        \"CertificateSource\": \"acm\"
    }, 
    \"CustomErrorResponses\": {
        \"Quantity\": 2,
        \"Items\": [
            {
                \"ErrorCode\": 403, 
                \"ResponsePagePath\": \"/404.html\", 
                \"ResponseCode\": \"404\",
                \"ErrorCachingMinTTL\": 300
            }, 
            {
                \"ErrorCode\": 404, 
                \"ResponsePagePath\": \"/404.html\", 
                \"ResponseCode\": \"404\",
                \"ErrorCachingMinTTL\": 300
            }
        ]
    }, 
    \"Aliases\": {
        \"Quantity\": 2,
        \"Items\": [
            \"$YOUR_DOMAIN\", 
            \"www.$YOUR_DOMAIN\"
        ]
    }
}" > distroConfig.json

# Now apply it
aws cloudfront create-distribution --distribution-config file://distroConfig.json
```

Nice. You've got a CloudFront distribution. Run the below to get the domain name for use next.
```bash
aws cloudfront list-distributions --query 'DistributionList.Items[].{id:Id,comment:Comment,domain:DomainName}'
# i.e. d8ukw3iojeij2.cloudfront.net
```


## Route 53 Domain Setup

Only one more step! We'll point your [Route 53][10] hosted domain to the CF distribution. This uses [an alias][11] for the zone apex and a CNAME for the subdomain.

Find your current hosted zone (domain). i.e. `/hostedzone/ZAAWZQV036URT`

```bash
aws route53 list-hosted-zones
```

This config alias the domain to your Cloudfront distribution.

- The bare domain get's aliased
- The `www` subdomain uses a CNAME
- Aliases all refernce zone `ZAAWZQV036URT`, because [AWS says so][15]
- `UPSERT` so that this config is applied idempotently

```json
{
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "EvaluateTargetHealth": false,
          "DNSName": "d8ukw3iojeij2.cloudfront.net."
        },
        "Type": "A",
        "Name": "yoursite.com."
      }
    },
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "ResourceRecords": [
          {
            "Value": "d8ukw3iojeij2.cloudfront.net"
          }
        ],
        "Type": "CNAME",
        "Name": "www.yoursite.com.",
        "TTL": 300
      }
    }
  ]
}
```

Ok, here goes. Build the json and submit it. Note, you'll need to wait ~TTL seconds for the DNS to propagate.

```bash
HOSTED_ZONE_ID="/hostedzone/ZAAWZQV036URT"
DISTRO_URL="d8ukw3iojeij2.cloudfront.net"

echo "{
    \"Comment\": \"Let there be Hugo!\",
    \"Changes\": [
        {
            \"Action\":\"UPSERT\",
            \"ResourceRecordSet\": {
                \"AliasTarget\": {
                    \"HostedZoneId\": \"Z2FDTNDATAQYW2\", 
                    \"EvaluateTargetHealth\": false, 
                    \"DNSName\": \"$DISTRO_URL.\"
                }, 
                \"Type\": \"A\", 
                \"Name\": \"$YOUR_DOMAIN.\"
            }
        },{
            \"Action\":\"UPSERT\",
            \"ResourceRecordSet\": {
                \"ResourceRecords\": [
                    {
                        \"Value\": \"$DISTRO_URL\"
                    }
                ],
                \"Type\": \"CNAME\",
                \"Name\": \"www.$YOUR_DOMAIN.\",
                \"TTL\": 300
            }
        }
    ]
}" > r53Batch.json

aws route53 change-resource-record-sets --hosted-zone-id $HOSTED_ZONE_ID --change-batch file://r53Batch.json
```
## Deployment

Great job, you're an AWS API zen master now! That was *easy*, right? At least it will be easy to redo later or script with Ansible.

Note, because there are 54 edge nodes worldwide, it may **take some time** (i.e. 30min) for your distribtion to be complete. Go get a cup of coffee and let the interwebs stabalize.

See the next post to [Deploy Hugo Files to S3][12].

 [1]: https://aws.amazon.com/cloudfront/
 [2]: https://www.dreamhost.com/
 [3]: https://store.wordpress.com/plans/
 [4]: https://aws.amazon.com/s3/
 [5]: https://gohugo.io/
 [6]: https://aws.amazon.com/cloudfront/details/#Detailed_Description
 [7]: https://aws.amazon.com/certificate-manager/pricing/
 [8]: https://en.wikipedia.org/wiki/Ron_Popeil
 [9]: https://en.wikipedia.org/wiki/Server_Name_Indication
 [10]: https://aws.amazon.com/route53/
 [11]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html
 [12]: {{< ref "post/2016-02-28-deploy-hugo-files-to-s3.md" >}}
 [13]: http://www.whois-search.com/
 [14]: https://aws.amazon.com/cloudfront/pricing/#Request_Pricing_for_All_HTTP_Methods_(per_10,000)
 [15]: https://docs.aws.amazon.com/Route53/latest/APIReference/CreateAliasRRSAPI.html
 [16]: console.aws.amazon.com/console/home
 