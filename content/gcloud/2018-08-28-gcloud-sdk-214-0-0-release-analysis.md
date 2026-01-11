---
draft: false
title: "gcloud SDK 214.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2018-08-28
url: /gcloud/gcloud-sdk-214-0-0-release-analysis/
summary: "Google Cloud SDK 214.0.0 introduces several breaking changes across Cloud Bigtable and Compute Engine, primarily involving command and flag renames or removals. Key new features include the promotion of numerous flags to GA for Compute Engine and Cloud Functions, and new private cluster options for Kubernetes Engine. Several services received updates to commands and improved functionality."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - cloud-bigtable
  - cloud-datalab
  - cloud-dataproc
  - cloud-datastore-emulator
  - cloud-functions
  - compute-engine
  - kubernetes-engine
---

Google Cloud SDK 214.0.0 introduces several breaking changes across Cloud Bigtable and Compute Engine, primarily involving command and flag renames or removals. Key new features include the promotion of numerous flags to GA for Compute Engine and Cloud Functions, and new private cluster options for Kubernetes Engine. Several services received updates to commands and improved functionality.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Cloud Bigtable `cbt createappprofile` removed the `etag` argument. `cbt updateappprofile` and `cbt createappprofile` renamed the `--allow-transactional-writes` option to `--transactional-writes`.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/bigtable/app_profiles/commands.py)
- Cloud Bigtable routing policy specification modified: `multi_cluster_routing_use_any` is now `route-any`, or use `route-to=<cluster-id>`.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/bigtable/app_profiles/commands.py)
- Compute Engine command `gcloud compute interconnects attachments create` deprecated; use `gcloud compute interconnects attachments dedicated create` instead.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/interconnects/attachments/commands.py)
- Compute Engine command `gcloud compute networks create` removed the deprecated `--mode` flag; use `--subnet-mode` instead.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/networks/commands.py)
- Compute Engine command `gcloud compute networks switch-mode` removed; use `gcloud compute networks update --switch-to-custom-mode` instead.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/networks/commands.py)
- Compute Engine command group `gcloud compute xpn` removed; use `gcloud compute shared-vpc` instead.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/xpn/commands.py)
- Kubernetes Engine command `gcloud beta container clusters create` deprecated the `--private-cluster` flag; use `--enable-private-nodes` instead.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/clusters/commands.py)

## New Features by Service

### Cloud Bigtable

- Restored the output of the `cbt count` command.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/bigtable/commands.py)

### Cloud Datalab

- Updated the `datalab` component to the 20180820 release.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/datalab/commands.py)

### Cloud Dataproc

- Added `SCHEDULED_DELETE` column to `gcloud beta dataproc clusters list` command output.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/clusters/commands.py)

### Cloud Datastore Emulator

- Released Cloud Datastore Emulator version 2.0.2, improving backward compatibility with App Engine local development by preserving auto-generated indexes.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/datastore/emulator/commands.py)

### Cloud Functions

- Promoted the `--runtime` flag of `gcloud functions deploy` to GA.
  - Flags: `--runtime`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/deploy/commands.py)

### Compute Engine

- Promoted the `--network-tier` flag of `gcloud compute addresses create` to GA.
  - Flags: `--network-tier`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/addresses/commands.py)
- Promoted the `--network-tier` flag of `gcloud compute forwarding-rules create` to GA.
  - Flags: `--network-tier`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/forwarding_rules/commands.py)
- Promoted the `--default-network-tier` flag of `gcloud compute project-info update` to GA.
  - Flags: `--default-network-tier`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/project_info/commands.py)
- Promoted the `--network-tier` flag of `gcloud compute instances add-access-config` to GA.
  - Flags: `--network-tier`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/instances/commands.py)
- Promoted the `--network-tier` flag of `gcloud compute instances create` to GA.
  - Flags: `--network-tier`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/instances/commands.py)
- Promoted the `--network-tier` flag of `gcloud compute instance-templates create` to GA.
  - Flags: `--network-tier`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/instance_templates/commands.py)
- Promoted `gcloud compute instances simulate-maintenance-event` to GA.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/instances/commands.py)
- Promoted IAM policy commands (`get-iam-policy`, `set-iam-policy`, `add-iam-policy-bindings`, `remove-iam-policy-bindings`) to beta for `gcloud compute sole-tenancy node-groups` and `gcloud compute sole-tenancy node-templates`.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/sole_tenancy/node_groups/commands.py)

### Kubernetes Engine

- Promoted the `--disk-type` flag of `gcloud container clusters create` and `gcloud container node-pools create` to GA.
  - Flags: `--disk-type`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/clusters/commands.py)
- Promoted the `--default-max-pods-per-node` flag of `gcloud container clusters create` to beta.
  - Flags: `--default-max-pods-per-node`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/clusters/commands.py)
- Promoted the `--max-pods-per-node` flag of `gcloud container node-pools create` to beta.
  - Flags: `--max-pods-per-node`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/node_pools/commands.py)
- Modified the `--monitoring-service` flag of `gcloud containers clusters update` to enable Google Cloud Monitoring service with Kubernetes-native resource model.
  - Flags: `--monitoring-service`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/clusters/commands.py)
- Modified the `--logging-service` flag of `gcloud containers clusters update` to enable Google Cloud Logging service with Kubernetes-native resource model.
  - Flags: `--logging-service`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/clusters/commands.py)
- Modified output of `gcloud beta container clusters list` for `DEGRADED` clusters to include reason for degradation.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/clusters/commands.py)
- Added `--enable-private-nodes` and `--enable-private-endpoint` flags to `gcloud beta container clusters create`.
  - Flags: `--enable-private-nodes`, `--enable-private-endpoint`
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/clusters/commands.py)

## API Changes

### Cloud Bigtable

- Cloud Bigtable routing policy specification modified: `multi_cluster_routing_use_any` is now `route-any`, or use `route-to=<cluster-id>`.
  - File: [commands.py](https://github.com/twistedpair/google-cloud-sdk/blob/214.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/bigtable/app_profiles/commands.py)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}135{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+5,043{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-696{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/213.0.0...214.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*