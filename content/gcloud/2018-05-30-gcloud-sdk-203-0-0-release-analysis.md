---
draft: false
title: "gcloud SDK 203.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2018-05-30
url: /gcloud/gcloud-sdk-203-0-0-release-analysis/
summary: "This SDK release includes a breaking change for Cloud SQL SSL certificate management, requiring a shift from `gcloud sql ssl-certs` to `gcloud sql ssl client-certs`. New features allow file-based provisioning for Cloud Dataproc and advanced SSL server CA certificate rotation for Cloud SQL, with several Compute Engine flags promoted to beta. Unannounced changes reveal groundwork for features like 'PushBlock' in Cloud Source Repositories and `max-pods-per-node` in GKE, alongside significant API updates for Vision and Pub/Sub, and a notable schema reduction in the Video Intelligence API."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - cloud-dataproc
  - cloud-sql
  - cloud-source-repositories
  - compute-engine
---

This SDK release includes a breaking change for Cloud SQL SSL certificate management, requiring a shift from `gcloud sql ssl-certs` to `gcloud sql ssl client-certs`. New features allow file-based provisioning for Cloud Dataproc and advanced SSL server CA certificate rotation for Cloud SQL, with several Compute Engine flags promoted to beta. Unannounced changes reveal groundwork for features like 'PushBlock' in Cloud Source Repositories and `max-pods-per-node` in GKE, alongside significant API updates for Vision and Pub/Sub, and a notable schema reduction in the Video Intelligence API.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Unannounced Changes 🕵️](#unannounced-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- The `gcloud sql ssl-certs` command has been deprecated. Users should now use `gcloud sql ssl client-certs` for managing client SSL certificates.
  - File: [flags.py:453](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/sql/flags.py#L453)

## New Features by Service

### Cloud Dataproc

- Added the capability to instantiate workflow templates directly from a YAML file.
  - Flags: `--file`
  - File: [flags.py:12](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/flags.py#L12)
- Added the capability to create clusters directly from a YAML file.
  - Flags: `--file`
  - File: [flags.py:12](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/flags.py#L12)

### Cloud SQL

- Introduced a new group of commands (`gcloud beta sql ssl server-ca-certs`) to support server CA certificate rotation, including list, create, rotate, and rollback operations.
  - File: [server_ca_certs.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/sql/ssl/server_ca_certs.py#L1)

### Cloud Source Repositories

- Added commands to describe and update project-level configurations.
  - File: [project_configs.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/source/project_configs.py#L1)

### Compute Engine

- The `--service-label` flag for `gcloud compute forwarding-rules create` has been promoted to beta.
  - Flags: `--service-label`
  - File: [compute_beta_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py)
- The `--shielded-vm-*` flags for `gcloud compute instances create`, `gcloud compute instances update`, and `gcloud compute instance-templates create` have been promoted to beta.
  - Flags: `--shielded-vm-*`
  - File: [compute_beta_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py)

## API Changes

### Cloud SQL Admin API

- API updated to support new SSL server CA certificate management capabilities.
  - File: [sqladmin_v1beta4.json](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin_v1beta4.json)

### Container Analysis API

- Resource paths for notes in Binary Authorization have changed from `providers` to `projects`.
  - File: [flags.py:27](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/binauthz/flags.py#L27)

### Compute Engine API

- Underlying API updated to reflect the promotion of `--service-label` and `--shielded-vm-*` flags to beta.
  - File: [compute_beta_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_client.py)

### Video Intelligence API

- Significant portions of the Video Intelligence v1 API schema have been removed, potentially indicating breaking changes for direct API users.
  - File: [videointelligence_v1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/videointelligence/v1/videointelligence_v1_messages.py#L1)

## Unannounced Changes

*Changes found in code but not mentioned in official release notes:* 🕵️

### Hidden Feature

- Added `--display-name` and `--parent-annotation` flags for Category Manager resources, suggesting new annotation management features.
  - File: [flags.py:122](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/category_manager/flags.py#L122)
- Added `--enable-pushblock` and `--disable-pushblock` flags to manage private key data blocking for Cloud Source Repositories.
  - File: [flags.py:23](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/source/flags.py#L23)
- Added `--max-pods-per-node` and `--default-max-pods-per-node` flags for Kubernetes Engine, allowing configuration of pod density on nodes.
  - File: [flags.py:1072](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py#L1072)

### Groundwork

- Introduced `organization` resource definition and new API resources for Cloud Category Manager, laying groundwork for broader management capabilities.
  - File: [resources.yaml:27](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/category_manager/resources.yaml#L27)
- Added `project` resource definition and utility functions to support the unannounced PushBlock feature in Cloud Source Repositories.
  - File: [resources.yaml:1](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/source/resources.yaml#L1)
- Extensive updates and additions to the Alpha Vision and Vision v1 API messages, indicating new or expanded alpha-stage features.
  - File: [vision_v1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision/v1/vision_v1_messages.py#L1)
- Significant changes to Pub/Sub API client and messages, suggesting underlying API enhancements.
  - File: [pubsub_v1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/pubsub/v1/pubsub_v1_messages.py#L1)

### Refactoring

- Refactoring of argument parsing logic for `calliope.concepts`, including changes to `ConceptParser` to handle command-level fallthroughs.
  - File: [concept_parsers.py:204](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/concept_parsers.py#L204)
- General refactoring for Python 2/3 compatibility, including new `absolute_import` and `unicode_literals` imports across multiple files.
  - File: [binauthz_util.py:13](https://github.com/twistedpair/google-cloud-sdk/blob/203.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/binauthz/binauthz_util.py#L13)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}137{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+9,193{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-2,394{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/202.0.0...203.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*