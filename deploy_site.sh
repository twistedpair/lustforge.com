#!/bin/bash
set -eu

# Run this in your Hugo blog repo directory

# These are mine. They won't work for you :)
DISTRIBUTION_ID=E2BRJGICC6S6CS
BUCKET_NAME=lustforge-cdn
PROFILE=lauf # or `default` if you don't use profiles

hugo -v -d docs/

# Invalidate landing page so everything sees new post - warning, first 1K/mo free, then 1/2 cent each
aws cloudfront create-invalidation --profile ${PROFILE} --distribution-id ${DISTRIBUTION_ID} --paths /index.html /

# TODO commit
# TODO push
