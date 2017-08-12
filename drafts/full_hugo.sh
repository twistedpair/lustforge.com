#### THIS WON'T RUN STRAIGHT THROUGH - Ran the commands and 


# Change this to your domain
YOUR_DOMAIN="yoursite.com"

# Don't exit these
BUCKET_NAME="${YOUR_DOMAIN}-cdn"
LOG_BUCKET_NAME="${BUCKET_NAME}-logs"
REGION="us-east-1"

# One fresh bucket please!
aws s3 mb s3://$BUCKET_NAME --region $REGION
# And another for the logs
aws s3 mb s3://$LOG_BUCKET_NAME --region $REGION


# Let AWS write the logs to this location
aws s3api put-bucket-acl --bucket $LOG_BUCKET_NAME \
--grant-write 'URI="http://acs.amazonaws.com/groups/s3/LogDelivery"' \
--grant-read-acp 'URI="http://acs.amazonaws.com/groups/s3/LogDelivery"'

# Setup logging
LOG_POLICY="{\"LoggingEnabled\":{\"TargetBucket\":\"$LOG_BUCKET_NAME\",\"TargetPrefix\":\"$BUCKET_NAME\"}}"
aws s3api put-bucket-logging --bucket $BUCKET_NAME --bucket-logging-status $LOG_POLICY


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

# YOUR_DOMAIN="mydomain.com" # Note, don't add www
aws acm request-certificate --domain-name $YOUR_DOMAIN --subject-alternative-names "www.$YOUR_DOMAIN" --idempotency-token "`date +%s`"

## TODO wait and poll until complete
aws acm list-certificates --certificate-statuses ISSUED

## TODO pull this out in an automatic way
# SSL_ARN="arn:aws:acm:us-east-1:7865196219991:certificate/de305d54-75b4-431b-adb2-eb6b9e546014"
SSL_ARN="arn:aws:acm:us-east-1:366519641993:certificate/d1150d86-02ed-475b-a02b-9bf8f76c75ac"

aws  configure  set preview.cloudfront true # Honey badger don't care

CALLER_REF="`date +%s`" # current second
echo "{
    \"Comment\": \"$BUCKET_NAME Static Hosting\", 
    \"Logging\": {
        \"Bucket\": \"$LOG_BUCKET_NAME.s3.amazonaws.com\", 
        \"Prefix\": \"$BUCKET_NAME/\", 
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

## TODO auto parse this ID
aws cloudfront list-distributions --query 'DistributionList.Items[].{id:Id,comment:Comment,domain:DomainName}'

## TODO find via the target domain
aws route53 list-hosted-zones


# HOSTED_ZONE_ID="/hostedzone/A3NWZQV036URT"
# DISTRO_URL="97ed3tyctbdsqm.cloudfront.net"
HOSTED_ZONE_ID="/hostedzone/Z2Q9SJUGAIGX3W"
DISTRO_URL="d1gimziojeij2.cloudfront.net"
# Note: All CloudFront Aliases point to Z2FDTNDATAQYW2 https://docs.aws.amazon.com/Route53/latest/APIReference/CreateAliasRRSAPI.html
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

## HOSTED_ZONE_ID="/hostedzone/A3NWZQV036URT"
aws route53 change-resource-record-sets --hosted-zone-id $HOSTED_ZONE_ID --change-batch file://r53Batch.json