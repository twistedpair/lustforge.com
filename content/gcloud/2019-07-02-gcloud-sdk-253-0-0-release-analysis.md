---
draft: false
title: "gcloud SDK 253.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2019-07-02
url: /gcloud/gcloud-sdk-253-0-0-release-analysis/
summary: "SDK 253.0.0 introduces several GA promotions, notably for Compute Engine's IAP tunnel, guest attributes, and HTTP/2 health checks, alongside new SSH key expiration flags. It also adds new BigQuery capabilities like scheduled queries and persistent UDFs. Key updates include a `kubectl` security fix for CVE-2019-11246 and breaking changes involving flag removals in Cloud Run and a command deprecation in Compute Engine."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - bigquery
  - cloud-firestore-emulator
  - cloud-key-management-service
  - compute-engine
  - kubernetes-engine
---

SDK 253.0.0 introduces several GA promotions, notably for Compute Engine's IAP tunnel, guest attributes, and HTTP/2 health checks, alongside new SSH key expiration flags. It also adds new BigQuery capabilities like scheduled queries and persistent UDFs. Key updates include a `kubectl` security fix for CVE-2019-11246 and breaking changes involving flag removals in Cloud Run and a command deprecation in Compute Engine.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Deprecated `gcloud beta compute resource-policies create-snapshot-schedule`; use `gcloud beta compute resource-policies create snapshot-schedule` instead.
- Removed `--kubeconfig` and `--context` flags and the `--platform=kubernetes` option from `gcloud beta run`.

## Security Updates

- Promoted Google Kubernetes Engine `kubectl` to 1.12.9 from 1.12.8 to address CVE-2019-11246. [MEDIUM]

## New Features by Service

### BigQuery

- Added support for persistent user-defined functions and stored procedures using `bq show --routine`, `bq ls --routines`, and `bq rm --routine`.
  - Flags: `--routine`, `--routines`
- Added support for creating scheduled queries using `bq query` with `--schedule`, `--destination_table`, and `--target_dataset` flags.
  - Flags: `--schedule`, `--destination_table`, `--target_dataset`
- Added 'clustered fields' information for `bq ls dataset` and `bq show table` commands.

### Cloud Firestore Emulator

- Released Cloud Firestore emulator v1.6.0, which now allows calling `SetSecurityRules` with invalid rules.

### Cloud Key Management Service

- Promoted `gcloud kms import-jobs` and related import commands to beta.

### Compute Engine

- Promoted `gcloud compute instances get-guest-attributes` to GA.
- Promoted the `--storage-location` flag of `gcloud compute images create` to beta.
  - Flags: `--storage-location`
- Promoted `http2` value to v1 for the `--protocol` flag used with `gcloud compute backend-services create` and `gcloud compute backend-services update`.
  - Flags: `--protocol`
- Promoted `gcloud compute start-iap-tunnel` to GA.
- Promoted the `--tunnel-through-iap` flag of `gcloud compute ssh` and `gcloud compute scp` to GA.
  - Flags: `--tunnel-through-iap`
- Promoted the `--internal-ip` flag of `gcloud compute scp` to GA.
  - Flags: `--internal-ip`
- Promoted `gcloud compute health-checks create http2` and `gcloud compute health-checks update http2` commands to GA.
- Promoted `gcloud compute instances import` to beta.
- Added `--ssh_key_expiration` and `--ssh_key_expire_after` flags to `gcloud compute scp`, `gcloud compute ssh`, and `gcloud compute connect-to-serial-port` commands for setting SSH key expirations.
  - Flags: `--ssh_key_expiration`, `--ssh_key_expire_after`

### Kubernetes Engine

- Promoted `--database-encryption-key`, `--database-encryption-key-keyring`, `--database-encryption-key-location`, and `--database-encryption-key-project` flags of `gcloud container clusters update` to beta, enabling Database Encryption for Kubernetes Secrets.
  - Flags: `--database-encryption-key`, `--database-encryption-key-keyring`, `--database-encryption-key-location`, `--database-encryption-key-project`

## Credential & Auth Changes

- Promoted the `--audiences` flag of `gcloud auth print-identity-token` to GA.

## API Changes

### App Engine

- Updated the Java SDK to version 1.9.76.

### BigQuery

- Increased the number of projects listed by the `bq show` command.
- Modified `bq show --connection` to use the default location when the connection name is provided in 'short' form.
- Fixed Python 3 compatibility issues in BigQuery commands.

### Cloud SQL

- Updated `gcloud sql instances describe` to consistently show the 'STOPPED' instance state.

### Compute Engine

- Fixed a bug where `gcloud compute images import` incorrectly created temporary Cloud Storage buckets in the US multi-region when the source image file was located in a different region.
- Relaxed validation for `--enable-logging` and `--logging-sample-rate` flags in `gcloud compute backend-services create` and `gcloud compute backend-services update`.

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}166{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+18,024{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-3,836{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/252.0.0...253.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*