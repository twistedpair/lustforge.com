#!/bin/bash
set -eu

# These are mine. They won't work for you :)
DISTRIBUTION_ID=E3JOZXINTYN59S
BUCKET_NAME=lustforge-cdn

# place AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY into your GH repo secrets
if [[ -z ${AWS_ACCESS_KEY_ID} ]]; then
  echo "secrets.AWS_ACCESS_KEY_ID must defined in your GitHub secrets"
  exit 1
fi

if [[ -z ${AWS_SECRET_ACCESS_KEY} ]]; then
  echo "secrets.AWS_SECRET_ACCESS_KEY must defined in your GitHub secrets"
  exit 1
fi

# Invalidate landing page so everything sees new post - warning, first 1K/mo free, then 1/2 cent each
aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths /index.html /

# commit and push
git config --global user.email "publisher@lust.dev"
git config --global user.name "Blog Publisher"
