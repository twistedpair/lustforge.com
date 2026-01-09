---
draft: false
title: "gcloud SDK 551.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2026-01-06
url: /gcloud/gcloud-sdk-551-0-0-release-analysis/
summary: "Google Cloud SDK 551.0.0 removes Cloud Tools for PowerShell, marking a breaking change. New features include enhanced GPU driver versioning for AI, Direct VPC support for Cloud Functions, and broader autoscaling options for Cloud Spanner. A major internal refactoring streamlined credential handling to primarily use `google_auth`, alongside numerous unannounced additions such as hidden flags for GKE maintenance budgets and new object filtering for Storage Transfer jobs."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - ai
  - app-engine
  - cloud-backup-dr
  - cloud-dataplex
  - cloud-functions
  - cloud-memorystore
  - cloud-run
  - cloud-spanner
  - cloud-workstations
  - compute-engine
  - compute-firewall-policies
  - gemini
  - kubernetes-engine
  - workbench
---

Google Cloud SDK 551.0.0 removes Cloud Tools for PowerShell, marking a breaking change. New features include enhanced GPU driver versioning for AI, Direct VPC support for Cloud Functions, and broader autoscaling options for Cloud Spanner. A major internal refactoring streamlined credential handling to primarily use `google_auth`, alongside numerous unannounced additions such as hidden flags for GKE maintenance budgets and new object filtering for Storage Transfer jobs.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Unannounced Changes 🕵️](#unannounced-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Removed the deprecated `Cloud Tools for PowerShell` component from `gcloud` CLI. Workflows dependent on these tools should migrate to `gcloud` CLI or Client Libraries. Manual installation from older SDK versions (550.0.0 or older) is possible if required.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/RELEASE_NOTES)

## Security Updates

- Fixed an issue in `gcloud storage cp` that prevented copying files outside the destination directory, addressing a potential path traversal vulnerability during downloads. [MEDIUM]
  - File: [copy_util.py:221](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/storage/tasks/cp/copy_util.py#L221)

## New Features by Service

### AI

- Added the `--min-gpu-driver-version` flag to `gcloud beta ai endpoints deploy-model` for specifying the minimum GPU driver version required for model deployment.
  - Flags: `--min-gpu-driver-version`
  - File: [flags.py:561](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/ai/flags.py#L561)

### App Engine

- Updated the Java SDK to new major version 4.0.0 from 3.0.3, which includes API breaking changes.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Backup DR

- The `gcloud backup-dr resource-backup-config` command group has been promoted to General Availability (GA).
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Dataplex

- Added the `--enable-catalog-publishing` flag to `gcloud dataplex datascans dataprofile create` and `gcloud dataplex datascans dataprofile update` commands.
  - Flags: `--enable-catalog-publishing`
  - File: [datascan.py](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/dataplex/datascan.py)

### Cloud Functions

- Added flags for supporting Direct VPC for function deployments in `alpha` and `beta` tracks.
  - Flags: `--network`, `--subnet`, `--network-tags`, `--direct-vpc-egress`
  - File: [flags.py:602](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/flags.py#L602)

### Cloud Memorystore

- Added flags for managing labels on Redis clusters.
  - Flags: `--labels`, `--update-labels`, `--remove-labels`, `--clear-labels`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Run

- Added `gcloud beta run worker-pools logs` command group, including `read` and `tail` commands, to support viewing logs for worker pools.
  - File: [messages_util.py:91](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/run/messages_util.py#L91)

### Cloud Spanner

- Promoted autoscaler flags for Spanner instance partitions and instances, including total CPU based autoscaling and the `disable downscaling` option, to GA.
  - Flags: `--autoscaling-total-cpu-target`, `--disable-high-priority-cpu-autoscaling`, `--disable-total-cpu-autoscaling`, `--disable-downscaling`
  - File: [flags.py:380](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/spanner/flags.py#L380)

### Cloud Workstations

- Added disk configuration flags to `gcloud workstations configs create` and `gcloud workstations configs update`, including support for Hyperdisk with `--disk-type=hyperdisk-balanced-ha`.
  - Flags: `--disk-type`, `--disk-size`, `--disk-reclaim-policy`, `--disk-source-snapshot`
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/workstations/flags.py)

### Compute Engine

- Added the `--resource-manager-tags` flag (alpha) to `gcloud compute snapshots create` and `gcloud compute disks create` for adding Resource Manager tags during resource creation.
  - Flags: `--resource-manager-tags`
  - File: [resource_manager_tags_utils.py:22](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/resource_manager_tags_utils.py#L22)

### Compute Firewall Policies

- Promoted `--src-network-context` and `--dest-network-context` flags of various firewall policy rules commands to beta.
  - Flags: `--src-network-context`, `--dest-network-context`
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/firewall_policies/flags.py)

### Gemini

- The `gcloud gemini cloud-assist investigations` commands have been promoted to beta.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/RELEASE_NOTES)

### Kubernetes Engine

- Added node drain settings flags to `gcloud container node-pools create` and `gcloud container node-pools update` commands.
  - Flags: `--node-drain-grace-period-seconds`, `--node-drain-pdb-timeout-seconds`, `--respect-pdb-during-node-pool-deletion`
  - File: [flags.py:8401](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py#L8401)

### Workbench

- Added `NVIDIA_H200_141GB` and `NVIDIA_B200` as options to the `--accelerator-type` flag for creating and updating Workbench instances.
  - Flags: `--accelerator-type`
  - File: [flags.py:228](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/workbench/flags.py#L228)

## Credential & Auth Changes

- Major internal refactoring of credential handling, standardizing on `google_auth` and removing explicit `use_google_auth` parameters from various load functions across `api_lib/auth`, `command_lib/compute`, `command_lib/functions`, `command_lib/sql`, `command_lib/util/ssh`, and core credential modules.
  - File: [store.py](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/core/credentials/store.py)
- Simplified credential loading by removing the `use_google_auth=True` parameter, indicating `google_auth` is now the default or sole method for authentication.
  - File: [credentials.py:70](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/artifacts/print_settings/credentials.py#L70)

## API Changes

### AI Platform

- Significant updates to `aiplatform_v1beta1_messages.py`, likely supporting new model deployment and GPU driver version functionalities.
  - File: [aiplatform_v1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/aiplatform/v1beta1/aiplatform_v1beta1_messages.py)

### Kubernetes Engine

- Extensive changes to `container_v1_messages.py`, reflecting updates for node drain settings and maintenance disruption budgets.
  - File: [container_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/container/v1/container_v1_messages.py)

### Firestore

- Substantial additions to `firestore_v1_messages.py` and `firestore_v1beta1_messages.py`, likely for emulator fixes and other API enhancements.
  - File: [firestore_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/firestore/v1/firestore_v1_messages.py)

### Oracle Database (new API)

- Introduction of a new API client and messages for Oracle Database service, including `oracledatabase_v1alpha_client.py` and `oracledatabase_v1alpha_messages.py`.
  - File: [oracledatabase_v1alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/oracledatabase/v1alpha/oracledatabase_v1alpha_messages.py)

### NetApp

- Significant additions to `netapp_v1alpha1_messages.py` and `netapp_v1beta1_messages.py`, indicating new API capabilities for NetApp.
  - File: [netapp_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/netapp/v1alpha1/netapp_v1alpha1_messages.py)

### Storage Batch Operations

- Updates to `storagebatchoperations_v1_messages.py` and `storagebatchoperations_v1_client.py`, supporting new batch operation functionalities.
  - File: [storagebatchoperations_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/storagebatchoperations/v1/storagebatchoperations_v1_messages.py)

## Unannounced Changes

*Changes found in code but not mentioned in official release notes:* 🕵️

### Feature Flag

- Added `--rollout-plan` flag (hidden) to `gcloud compute firewall-policies` commands, indicating upcoming functionality for managing rollout plans.
  - File: [flags.py:393](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/firewall_policies/flags.py#L393)
- Added `--enable-slurm-operator` flag (hidden) to GKE container commands, suggesting future support for Slurm Operator add-on.
  - File: [flags.py:7230](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py#L7230)
- Added hidden flags for GKE maintenance disruption budget configuration, allowing specification of minor and patch version disruption intervals.
  - File: [flags.py:7489](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py#L7489)
- Added `--use-postgres-native` flag (hidden) for PostgreSQL migration in Database Migration Service.
  - File: [flags.py:562](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/database_migration/migration_jobs/flags.py#L562)

### Hidden Feature

- Introduced `--custom-wave` flag for GKE Fleet rollouts, allowing definition of custom wave templates with advanced completion and straggler migration strategies.
  - File: [flags.py:65](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/fleet/rollouts/flags.py#L65)
- Added `--mongodb-additional-options` flag for Datastream MongoDB connection profiles, providing more configuration flexibility.
  - File: [flags.py:464](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/datastream/connection_profiles/flags.py#L464)
- Added `--match-glob` and `--clear-match-glob` flags for Storage Transfer Service jobs, allowing filtering of objects by glob patterns.
  - File: [jobs_flag_util.py:382](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/transfer/jobs_flag_util.py#L382)

### Refactoring

- Removed `JobPriorityTierChange` and associated flags from Cloud Run job configuration, indicating deprecation of job priority tier functionality.
  - File: [config_changes.py:1787](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/run/config_changes.py#L1787)

### Groundwork

- Added `CreateInstance` and `DeleteInstance` methods within `serverless_operations.py`, along with new Instance-related stages, suggesting groundwork for enhanced Cloud Run instance management.
  - File: [serverless_operations.py:1995](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/run/serverless_operations.py#L1995)
- Added new resource argument configurations for Storage Batch Operations, including bucket operations and job-specific flags.
  - File: [resource_args.py:44](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/storage/batch_operations/jobs/resource_args.py#L44)
- Introduced `RegionalEndpointsType` enum and `regional_endpoint_compatibility` to the YAML command schema, laying groundwork for improved regional endpoint support in commands.
  - File: [yaml_command_schema.py:125](https://github.com/twistedpair/google-cloud-sdk/blob/551.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/apis/yaml_command_schema.py#L125)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}203{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+9,650{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-2,920{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/550.0.0...551.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*
