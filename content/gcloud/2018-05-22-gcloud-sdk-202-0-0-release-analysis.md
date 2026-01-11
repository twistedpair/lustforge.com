---
draft: false
title: "gcloud SDK 202.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2018-05-22
url: /gcloud/gcloud-sdk-202-0-0-release-analysis/
summary: "Version 202.0.0 introduces breaking changes to Cloud Composer disk size, Compute Engine interconnects commands, Firebase Test Lab flags, and Compute Engine sole-tenancy node deletion. Key new features include GA promotion for Compute Engine flow logs, beta promotion for sole-tenancy, and a new Kubernetes Engine `--disk-type` flag. Significant unannounced changes include the removal of the Cloud IoT v1 API client, groundwork for Category Manager, and several hidden features for Compute Engine resource policies, Dataproc, and DLP."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - app-engine
  - cloud-datastore-emulator
  - cloud-tools-for-powershell
  - compute-engine
  - kubernetes-engine
---

Version 202.0.0 introduces breaking changes to Cloud Composer disk size, Compute Engine interconnects commands, Firebase Test Lab flags, and Compute Engine sole-tenancy node deletion. Key new features include GA promotion for Compute Engine flow logs, beta promotion for sole-tenancy, and a new Kubernetes Engine `--disk-type` flag. Significant unannounced changes include the removal of the Cloud IoT v1 API client, groundwork for Category Manager, and several hidden features for Compute Engine resource policies, Dataproc, and DLP.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Unannounced Changes 🕵️](#unannounced-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Increased minimum '--disk-size' of 'gcloud beta composer environments create' to 20GB.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/RELEASE_NOTES)
- Deprecated 'gcloud compute interconnects attachments create'. Users should now use 'gcloud compute interconnects attachments dedicated create'.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/RELEASE_NOTES)
- Deprecated Firebase Test Lab Robo test crawler-related flags: '--max-depth', '--max-steps' (use '--timeout'), and '--app-initial-activity' (use '--robo-script').
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/RELEASE_NOTES)
- The '--delete-nodes' flag for 'gcloud beta compute sole-tenancy node-groups' now accepts node names instead of node indexes.
  - File: [flags.py:55](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/sole_tenancy/node_groups/flags.py#L55)
- DLP inspect job input options ('datastore-kind', 'path', 'input-table') are no longer positional arguments, requiring explicit flag usage.
  - File: [flags.yaml:76](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dlp/flags.yaml#L76)

## New Features by Service

### App Engine

- Updated the Python SDK to version 1.9.70.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Datastore Emulator

- Released version 2.0.0, requiring Java 8 (or later) and bubbling up index.yaml parsing errors in the App Engine local development server.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Tools For PowerShell

- Updated to version 1.0.1.8, fixing bugs where 'Get-GcpProject' did not enumerate collections and the local SSD option for attach disk cmdlet did not work.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/RELEASE_NOTES)

### Compute Engine

- Added help text output upon creating interconnects/interconnect attachments, which can be hidden with the '--no-user-output-enabled' flag.
  - Flags: `--no-user-output-enabled`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/RELEASE_NOTES)
- Promoted the '--enable-flow-logs' flag for 'gcloud compute networks subnets create' and 'update' to General Availability (GA).
  - Flags: `--enable-flow-logs`
  - File: [flags.py:98](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/networks/subnets/flags.py#L98)
- Promoted 'gcloud compute sole-tenancy' commands to beta.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/RELEASE_NOTES)

### Kubernetes Engine

- Added '--disk-type' to 'gcloud beta container clusters create' and 'gcloud beta node-pools create' to allow setting of the node VM boot disk type.
  - Flags: `--disk-type`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/RELEASE_NOTES)
- Updated Google Kubernetes Engine's kubectl from version 1.8.6 to 1.9.7.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/RELEASE_NOTES)

## API Changes

### Composer

- Significant API additions for v1beta1 messages and JSON definitions, supporting new Composer features.
  - File: [composer_v1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/third_party/apis/composer/v1beta1/composer_v1beta1_messages.py)

### Compute Engine

- Extensive API additions and changes for beta client, messages, and resources, enabling new Compute Engine features and promotions.
  - File: [compute_beta_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/third_party/apis/compute/beta/compute_beta_client.py)

### Container Analysis

- Updates to v1alpha1 client, messages, resources, and JSON definitions.
  - File: [containeranalysis_v1alpha1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/third_party/apis/containeranalysis/v1alpha1/containeranalysis_v1alpha1_client.py)

### Dataproc

- API additions for v1beta2 messages and JSON, likely supporting new workflow template parameters.
  - File: [dataproc_v1beta2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/third_party/apis/dataproc/v1beta2/dataproc_v1beta2_messages.py)

### DLP

- Extensive API additions for dlp/v2 messages and JSON, enabling new DLP inspection and job management capabilities.
  - File: [dlp_v2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/third_party/apis/dlp/v2/dlp_v2_messages.py)

### Pub/Sub

- Updates to pubsub/v1 client, messages, and JSON definitions.
  - File: [pubsub_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/third_party/apis/pubsub/v1/pubsub_v1_client.py)

## Unannounced Changes

*Changes found in code but not mentioned in official release notes:* 🕵️

### Other

- The Cloud IoT v1 API client, messages, and JSON definitions have been removed from the SDK.
  - File: [cloudiot_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py)

### Groundwork

- New files for the 'category_manager' API, suggesting groundwork for a new Category Manager service or features.
  - File: [annotations.py](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/category_manager/annotations.py)
- New helper functions for KMS resource flags (`AddKeyResourceFlags`, `AddKeyResourceArgument`, `AddKeyVersionResourceArgument`), indicating potential future KMS command expansion or refactoring.
  - File: [flags.py:126](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/kms/flags.py#L126)
- Added framework for `arg_fallthrough` and `command_level_fallthroughs` in the declarative command schema, enabling more flexible argument default resolution.
  - File: [yaml_command_schema.yaml:76](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/apis/yaml_command_schema.yaml#L76)

### Refactoring

- Significant refactoring of concept parsing logic, moving core functionality from `concept_parsers.py` to a new `info_holders.py` module.
  - File: [concept_parsers.py](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/concept_parsers.py)
- Numerous Python 2/3 compatibility changes, including `__future__` imports and `six.moves` usage, across various modules.
  - File: [__init__.py:14](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/billing/__init__.py#L14)

### Hidden Feature

- New argument `ForwardingRuleArgumentForRoute` added to Compute Engine commands for specifying a target forwarding rule for routes.
  - File: [flags.py:110](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/forwarding_rules/flags.py#L110)
- Added new flags for Compute Engine Resource Policies for backup schedules: '--max-retention-days', '--guest-flush', and '--snapshot-labels'.
  - File: [flags.py:88](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/resource_policies/flags.py#L88)
- The '--concurrent-node-count' flag for Kubernetes Engine cluster upgrades is no longer hidden, making it publicly available.
  - File: [flags.py:1548](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py#L1548)
- Several new hidden flags for DLP inspect jobs, including time range constraints ('--min-time', '--max-time'), custom job ID ('--job-id'), finding limits ('--max-findings-per-item'), and output options ('--output-topics', '--output-tables').
  - File: [flags.yaml:94](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dlp/flags.yaml#L94)
- A new hidden flag '--identifying-fields' has been added for DLP BigQuery input configuration.
  - File: [hooks.py:333](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dlp/hooks.py#L333)

### Feature Flag

- A new hidden flag `--parameters` has been added to Dataproc workflow template commands.
  - File: [flags.py:64](https://github.com/twistedpair/google-cloud-sdk/blob/202.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/flags.py#L64)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}180{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+20,770{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-16,409{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/201.0.0...202.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*