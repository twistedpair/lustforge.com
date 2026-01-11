---
draft: false
title: "gcloud SDK 229.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2019-01-08
url: /gcloud/gcloud-sdk-229-0-0-release-analysis/
summary: "Google Cloud SDK 229.0.0 introduces significant new features, including an alpha `gcloud bq` command group for BigQuery, Cloud Firestore index management, and Kaniko integration for Cloud Build with new flags. This release also includes the deprecation of HTTP/HTTPS health check flags in Compute Engine, the promotion of several flags and commands to beta and GA stability levels, and various updates and bug fixes for App Engine, Cloud Datastore, and Cloud Firestore emulators, alongside a `gsutil` component update."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - bigquery
  - cloud-build
  - cloud-firestore
  - cloud-firestore-emulator
  - cloud-tasks
  - firebase-test-lab
---

Google Cloud SDK 229.0.0 introduces significant new features, including an alpha `gcloud bq` command group for BigQuery, Cloud Firestore index management, and Kaniko integration for Cloud Build with new flags. This release also includes the deprecation of HTTP/HTTPS health check flags in Compute Engine, the promotion of several flags and commands to beta and GA stability levels, and various updates and bug fixes for App Engine, Cloud Datastore, and Cloud Firestore emulators, alongside a `gsutil` component update.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Deprecated `--http-health-check` and `--https-health-check` flags in `gcloud beta compute instance-groups managed create`. Users should transition to using the `--health-check` flag instead.
  - File: [flags.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/instance_groups/managed/flags.py#L0)

## New Features by Service

### BigQuery

- Added the `gcloud bq` command group to alpha, providing initial support for creating and managing datasets, tables, and jobs.
  - File: [commands.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/bq/commands.py#L0)

### Cloud Build

- Added properties `builds/use_kaniko` and `builds/kaniko_cache_ttl` to control the use of Kaniko (<https://github.com/GoogleContainerTools/kaniko>) when using `--tag`.
  - Flags: `builds/use_kaniko`, `builds/kaniko_cache_ttl`
  - File: [config.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/cloudbuild/config.py#L0)
- Added the `--no-cache` flag to disable layer caching when using Kaniko with `--tag`. This is only valid if the `builds/use_kaniko` flag is `True`.
  - Flags: `--no-cache`
  - File: [build.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/cloudbuild/build.py#L0)

### Cloud Firestore

- Added `gcloud beta firestore indexes` which provides index management capability for Cloud Firestore.
  - File: [commands.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/firestore/indexes/commands.py#L0)

### Cloud Firestore Emulator

- Released Cloud Firestore Emulator version 1.2.2 with added support for Java 10 and Java 11 runtimes and enabled IPv6 support by default.
  - File: [emulator.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/emulators/firestore/emulator.py#L0)
- Released Cloud Firestore Emulator version 1.2.3 with the ability to produce rule-coverage reports.
  - File: [emulator.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/emulators/firestore/emulator.py#L0)

### Cloud Tasks

- Updated Cloud Tasks to use the full list of App Engine's supported regions.
  - File: [locations.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/tasks/locations.py#L0)

### Firebase Test Lab

- Added support for Android App Bundles to the `--app` flag in `gcloud firebase test android run` commands.
  - Flags: `--app`
  - File: [run.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/firebase/test/android/run.py#L0)

## API Changes

### App Engine

- Updated the Python SDK to version `1.9.81`.
  - File: [sdk.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/appengine/python/sdk.py#L0)
- Updated the Java SDK to version `1.9.71`.
  - File: [sdk.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/appengine/java/sdk.py#L0)

### Cloud Build

- Updated `cloud-build-local` to version `0.4.3`.
  - File: [update.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/cloud_build_local/update.py#L0)

### Cloud Datastore Emulator

- Released Cloud Datastore Emulator version `2.0.3`, which fixes a bug where read contention errors were being reported as UNKNOWN.
  - File: [emulator.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/emulators/datastore/emulator.py#L0)

### Cloud Firestore Emulator

- Released Cloud Firestore Emulator version `1.2.3`, which fixed bugs regarding multiple server timestamps, array ordering during writing/reading, and query cursors containing document names. It also exposed the v1 service definition.
  - File: [emulator.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/emulators/firestore/emulator.py#L0)

### Cloud Storage

- Updated the `gsutil` component to version `4.35`.
  - File: [update.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/gsutil/update.py#L0)

### Compute Engine

- Promoted the `--tunnel-through-iap` flag of `gcloud compute ssh` and `gcloud compute scp` to beta.
  - File: [flags.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/ssh/flags.py#L0)
- Promoted the `gcloud compute interconnects get-diagnostics` command to GA (General Availability).
  - File: [get_diagnostics.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/interconnects/get_diagnostics.py#L0)
- Promoted the `--enable-logging` flag of `gcloud compute firewall-rules create` and `gcloud compute firewall-rules update` to GA (General Availability).
  - File: [flags.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/229.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/firewall_rules/flags.py#L0)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}130{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+8,753{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-1,278{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/228.0.0...229.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*