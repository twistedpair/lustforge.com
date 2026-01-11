---
draft: false
title: "gcloud SDK 243.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2019-04-23
url: /gcloud/gcloud-sdk-243-0-0-release-analysis/
summary: "Google Cloud SDK 243.0.0 introduces several breaking changes, including the deprecation of `gcloud ml-engine` in favor of `gcloud ai-platform` and flag renames for AI Platform and Compute Engine. Key new features include extensive GA promotions for Compute Engine flags and command groups, new IP alias support for Cloud Composer, and Cloud Run add-on management for Kubernetes Engine. Minor security updates and command restructuring for Cloud Tasks were also implemented."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - ai-platform
  - cloud-composer
  - cloud-sql
  - compute-engine
  - kubernetes-engine
---

Google Cloud SDK 243.0.0 introduces several breaking changes, including the deprecation of `gcloud ml-engine` in favor of `gcloud ai-platform` and flag renames for AI Platform and Compute Engine. Key new features include extensive GA promotions for Compute Engine flags and command groups, new IP alias support for Cloud Composer, and Cloud Run add-on management for Kubernetes Engine. Minor security updates and command restructuring for Cloud Tasks were also implemented.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Renamed `--worker-server-count` flag of `gcloud ml-engine jobs submit training` to `--worker-count`.
- `gcloud app repair` was updated to no longer recreate a deleted service account.
- Deprecated the `gcloud ml-engine` command group. Users should now use `gcloud ai-platform` instead.
- Changed `--no-guest-environment` to `--guest-environment` flag in `gcloud compute images import`.

## Security Updates

- Cloud Firestore Emulator version 1.4.5 added support to allow secure JWTs with warnings. [LOW]

## New Features by Service

### AI Platform

- Added the `gcloud ai-platform` command group to replace the deprecated `gcloud ml-engine`.
- Promoted `gcloud ai-platform versions create` and `gcloud ai-platform versions update` to beta.
- Added the `--enable-console-logging` flag to `gcloud beta ai-platform models create` to enable logging of stderr and stdout streams for online prediction in Stackdriver Logging.
  - Flags: `--enable-console-logging`

### Cloud Composer

- Added five new flags to `gcloud beta composer environments create` to support IP alias (VPC-native) for Composer environments.
  - Flags: `--enable-ip-alias`, `--cluster-ipv4-cidr`, `--cluster-secondary-range-name`, `--services-ipv4-cidr`, `--services-secondary-range-name`

### Cloud SQL

- Added the `--root-password` flag to `gcloud sql instances create`.
  - Flags: `--root-password`

### Compute Engine

- Promoted `gcloud compute network-endpoint-groups` command group to GA.
- Promoted `--storage-location` and `--labels` flags of `gcloud compute disks snapshot` to GA.
  - Flags: `--storage-location`, `--labels`
- Promoted `--network-endpoint-group` and `--network-endpoint-group-zone` flags of `gcloud compute backend-services add-backend`, `remove-backend`, and `update-backend` to GA.
  - Flags: `--network-endpoint-group`, `--network-endpoint-group-zone`
- Promoted `--max-connections-per-endpoint` and `--max-rate-per-endpoint` flags of `gcloud compute backend-services add-backend` and `update-backend` to GA.
  - Flags: `--max-connections-per-endpoint`, `--max-rate-per-endpoint`
- Promoted `--use-serving-port` flag to GA for `gcloud compute health-checks http create`, `https create`, `http2 create`, and `ssl create` commands.
  - Flags: `--use-serving-port`
- Promoted `--custom-request-headers` and `--no-custom-request-headers` flags of `gcloud compute backend-services create` and `update` to GA.
  - Flags: `--custom-request-headers`, `--no-custom-request-headers`
- Promoted `--no-guest-environment`, `--network`, and `--subnet` flags of `gcloud compute images import` to GA.
  - Flags: `--no-guest-environment`, `--network`, `--subnet`
- Promoted `--subnet` flag of `gcloud compute images export` to GA.
  - Flags: `--subnet`
- Promoted feature allowing `gcloud beta compute images import` and `gcloud beta compute images export` to use temporary buckets in the same region as source/destination buckets, avoiding cross-region costs and performance penalties.
- Promoted `--container-mount-disk-*` flags of `gcloud compute instances create-with-container` and `gcloud compute instances update-container` to GA.
  - Flags: `--container-mount-disk-*`
- Promoted `--container-mount-disk-*` flags of `gcloud compute instance-templates create-with-container` to GA.
  - Flags: `--container-mount-disk-*`

### Kubernetes Engine

- Added `--update-addons=CloudRun=ENABLED|DISABLED` flag to enable and disable the Cloud Run on Google Kubernetes Engine add-on for existing GKE clusters.
  - Flags: `--update-addons=CloudRun=ENABLED|DISABLED`
- Promoted the `--sandbox` flag of `gcloud container node-pools create` to beta, enabling the requested sandbox on all nodes in the node-pool.
  - Flags: `--sandbox`

## API Changes

### Cloud Tasks

- Replaced specific commands `gcloud tasks queues create-app-engine-queue` and `gcloud tasks queues update-app-engine-queue` with generic `gcloud tasks queues create` and `gcloud tasks queues update` in beta and GA.

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}201{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+6,625{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-1,941{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/242.0.0...243.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*