#!/bin/bash
set -e

DISTRIBUTION_ID=E2BRJGICC6S6CS
BUCKET_NAME=lustforge-cdn

hugo -v 

# Copy over pages - not static js/img/css/downloads
aws s3 sync --profile lauf --acl "public-read" --sse "AES256" public/ s3://$BUCKET_NAME/ --exclude 'img' --exclude 'js' --exclude 'downloads' --exclude 'css' --exclude 'post'

# Ensure static files are set to cache forever - cache for a month --cache-control "max-age=2592000"
aws s3 sync --profile lauf --cache-control "max-age=2592000" --acl "public-read" --sse "AES256" public/img/ s3://$BUCKET_NAME/img/
aws s3 sync --profile lauf --cache-control "max-age=2592000" --acl "public-read" --sse "AES256" public/css/ s3://$BUCKET_NAME/css/
aws s3 sync --profile lauf --cache-control "max-age=2592000" --acl "public-read" --sse "AES256" public/js/ s3://$BUCKET_NAME/js/

# Downloads binaries, not part of repo - cache at edge for a year --cache-control "max-age=31536000"
aws s3 sync --profile lauf --cache-control "max-age=31536000" --acl "public-read" --sse "AES256"  static/downloads/ s3://$BUCKET_NAME/downloads/

# Invalidate landing page so everything sees new post - warning, first 1K/mo free, then 1/2 cent ea
aws cloudfront create-invalidation --profile lauf --distribution-id $DISTRIBUTION_ID --paths /index.html /
