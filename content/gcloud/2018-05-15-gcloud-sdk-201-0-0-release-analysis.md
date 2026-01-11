---
draft: false
title: "gcloud SDK 201.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2018-05-15
url: /gcloud/gcloud-sdk-201-0-0-release-analysis/
summary: "This Google Cloud SDK release introduces a breaking change to the default TPU accelerator type for Compute Engine. Key new features include iOS app testing in Firebase Test Lab, IAM policy management for Cloud Bigtable, and new `--labels` functionality for Compute Engine instance templates. Additionally, the SDK contains numerous unannounced changes, such as full API integration for Cloud IoT, advanced DLP job trigger capabilities, and groundwork for Compute Engine resource policies and Cloud Functions runtimes."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - cloud-bigtable
  - compute-engine
  - firebase-test-lab
  - kubernetes-engine
---

This Google Cloud SDK release introduces a breaking change to the default TPU accelerator type for Compute Engine. Key new features include iOS app testing in Firebase Test Lab, IAM policy management for Cloud Bigtable, and new `--labels` functionality for Compute Engine instance templates. Additionally, the SDK contains numerous unannounced changes, such as full API integration for Cloud IoT, advanced DLP job trigger capabilities, and groundwork for Compute Engine resource policies and Cloud Functions runtimes.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Unannounced Changes 🕵️](#unannounced-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- The default TPU accelerator type for `gcloud compute tpus` commands has been modified from `tpu-v2` (deprecated) to `v2-8`.
  - File: [flags.py:42](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/tpus/flags.py#L42)

## New Features by Service

### Cloud Bigtable

- Added new commands for managing IAM policies on Cloud Bigtable instances.
  - Flags: `set-iam-policy`, `get-iam-policy`, `add-iam-policy-binding`, `remove-iam-policy-binding`
  - File: [bigtableadmin_v2_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/bigtableadmin/v2/bigtableadmin_v2_client.py)

### Compute Engine

- Added the TYPE column to the output format of `gcloud compute interconnects attachments list`.
  - File: [client.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/interconnects/attachments/client.py)
- Added the `--labels` flag to `gcloud beta compute instance-templates create-with-container` for applying resource labels during creation.
  - Flags: `--labels`
  - File: [compute_beta_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py)

### Firebase Test Lab

- Introduced support for mobile app testing on iOS with new commands for listing models, versions, and running tests.
  - Flags: `gcloud beta firebase test ios models list`, `gcloud beta firebase test ios models describe`, `gcloud beta firebase test ios versions list`, `gcloud beta firebase test ios versions describe`, `gcloud alpha firebase test ios run`
  - File: [matrix_creator.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/firebase/test/ios/matrix_creator.py)

### Kubernetes Engine

- The `--enable-stackdriver-kubernetes` flag for `gcloud container clusters create` has been promoted to beta.
  - Flags: `--enable-stackdriver-kubernetes`
  - File: [flags.py:445](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py#L445)

## API Changes

### Bigtable Admin

- API messages and client updated to support new IAM policy management operations.
  - File: [bigtableadmin_v2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/bigtableadmin/v2/bigtableadmin_v2_messages.py)

### Cloud IoT

- Introduced a completely new API client, messages, and resources for Cloud IoT v1, enabling interaction with IoT Core services.
  - File: [cloudiot_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py)

### Compute Engine

- Extensive updates to Compute Engine alpha, beta, and v1 APIs, including new messages related to instance templates, interconnects, and resource policies.
  - File: [compute_alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py)

### Container Engine

- API messages updated across v1, v1alpha1, and v1beta1 to reflect changes related to Kubernetes Engine features, including Stackdriver integration.
  - File: [container_v1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1beta1/container_v1beta1_messages.py)

### Data Loss Prevention (DLP)

- API messages updated for DLP v2 to support new job trigger configurations, including various storage input/output options.
  - File: [dlp_v2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py)

### Firebase Test Lab

- Major additions to the Testing v1 API messages and client to support iOS mobile app testing capabilities.
  - File: [testing_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/testing/v1/testing_v1_messages.py)

### Genomics

- Minor additions to Genomics v1, v1alpha2, and v2alpha1 API messages.
  - File: [genomics_v2alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v2alpha1/genomics_v2alpha1_messages.py)

### Logging

- Additions to Logging v2 API messages.
  - File: [logging_v2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/logging/v2/logging_v2_messages.py)

### OS Login

- Additions to OS Login v1alpha API messages for managing user profiles.
  - File: [oslogin_v1alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/oslogin/v1alpha/oslogin_v1alpha_messages.py)

### Service Networking

- New client and messages added for Service Networking v1alpha API.
  - File: [servicenetworking_v1alpha_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking/v1alpha/servicenetworking_v1alpha_client.py)

### Speech

- Additions to Speech v1p1beta1 API messages.
  - File: [speech_v1p1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_messages.py)

## Unannounced Changes

*Changes found in code but not mentioned in official release notes:* 🕵️

### Hidden Feature

- Added new commands and functionality for managing Access Context Manager Service Perimeters (formerly `accessZones`).
  - File: [perimeters.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/accesscontextmanager/perimeters.py)
- Expanded Cloud DLP capabilities to create and manage Job Triggers, supporting various storage inputs (Datastore, GCS, BigQuery) and output actions (Pub/Sub, BigQuery).
  - File: [flags.yaml:32](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dlp/flags.yaml#L32)
- Added foundational support for the new Cloud IoT service, including API clients, messages, and resource definitions.
  - File: [cloudiot_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1.json)
- Added new commands, flags, and utility functions for managing Compute Engine Resource Policies, specifically for VM maintenance and disk backup schedules.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/resource_policies/flags.py)

### Refactoring

- Refactored App Engine environment handling, extracting logic into a new dedicated `env` module and updating runtime registry.
  - File: [env.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/app/env.py)
- Refactored Binary Authorization attestation flags and utilities, removing deprecated v1 attestation parameters and streamlining v2 flag usage.
  - File: [flags.py:137](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/binauthz/flags.py#L137)
- Modified the default behavior for Kubernetes Engine API calls, switching from V1 to a non-V1 API version by default.
  - File: [container_command_util.py:199](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/container_command_util.py#L199)
- Introduced widespread Python 3 compatibility refactoring across the SDK, updating string handling, collection iterations, and library imports.
  - File: [info_holder.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/core/info_holder.py)
- Removed boilerplate `__init__.py` files from several `command_lib` subdirectories, signaling internal code organization improvements.
  - File: [__init__.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/__init__.py#L1)
- Refactored resource argument parsing to allow explicit `arg_name` overrides in YAML command definitions, enhancing flexibility for command authors.
  - File: [resource_arg_schema.py:66](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/apis/resource_arg_schema.py#L66)

### Feature Flag

- Introduced a hidden `--runtime` flag for `gcloud functions deploy` to support new runtimes, including Node.js 8, Python 3.7, Go, Java, and C#.
  - File: [flags.py:191](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/flags.py#L191)

### Groundwork

- Implemented internal filtering for `gcloud redis operations list` to hide 'v1internal1' operations, indicating groundwork for future Redis command exposure.
  - File: [operations_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/201.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/redis/operations_util.py)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}338{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+9,148{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-1,924{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/200.0.0...201.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*