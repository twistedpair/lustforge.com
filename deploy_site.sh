#!/bin/bash
set -eu

# These are mine. They won't work for you :)
DISTRIBUTION_ID=E2BRJGICC6S6CS
BUCKET_NAME=lustforge-cdn

# place AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY into your GH secrets
export AWS_ACCESS_KEY_ID=${{ secrets.AWS_ACCESS_KEY_ID }}
export AWS_SECRET_ACCESS_KEY=${{ secrets.AWS_SECRET_ACCESS_KEY }}

if [[ -z ${AWS_ACCESS_KEY_ID} ]]; then
  echo "secrets.AWS_ACCESS_KEY_ID must defined in your GitHub secrets"
  exit 1
fi

if [[ -z ${AWS_SECRET_ACCESS_KEY} ]]; then
  echo "secrets.AWS_SECRET_ACCESS_KEY must defined in your GitHub secrets"
  exit 1
fi

# Invalidate landing page so everything sees new post - warning, first 1K/mo free, then 1/2 cent each
export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths /index.html /

# commit and push
git add docs/
git commit -m "Publish github pages"
git push origin HEAD
