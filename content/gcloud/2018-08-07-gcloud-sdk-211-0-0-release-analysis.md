---
draft: false
title: "gcloud SDK 211.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2018-08-07
url: /gcloud/gcloud-sdk-211-0-0-release-analysis/
summary: "Google Cloud SDK 211.0.0 introduces breaking changes for App Engine, removing automated `app.yaml` generation and standardizing file exclusions with `.gcloudignore`. New features include commands for Cloud Datastore index management and globbing support for Cloud Deployment Manager imports. Additionally, several `--network-tier` flags across Compute Engine commands have been promoted to General Availability, marking them as stable for production use."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - app-engine
  - cloud-datastore
  - cloud-deployment-manager
  - cloud-services
  - compute-engine
---

Google Cloud SDK 211.0.0 introduces breaking changes for App Engine, removing automated `app.yaml` generation and standardizing file exclusions with `.gcloudignore`. New features include commands for Cloud Datastore index management and globbing support for Cloud Deployment Manager imports. Additionally, several `--network-tier` flags across Compute Engine commands have been promoted to General Availability, marking them as stable for production use.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Removed automated `app.yaml` generation from `gcloud app deploy`. Users must now provide their own `app.yaml` file or use `gcloud beta app gen-config` separately to generate one.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)
- `gcloud app deploy` now uses `.gcloudignore` for file skipping across all deployments. This supersedes and overrides the `skip_files` section in `app.yaml`, potentially requiring updates to existing projects.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

## New Features by Service

### App Engine

- `gcloud app deploy` now supports `.gcloudignore` for all deployments, providing a standardized way to exclude files from your deployments.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

### Cloud Datastore

- Added new command `gcloud beta datastore indexes describe` to retrieve detailed information about a specific Datastore index.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)
- Added new command `gcloud beta datastore indexes list` to list all Datastore indexes configured for your project.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

### Cloud Deployment Manager

- Configuration files for `gcloud deployment-manager deployments create` and `update` now support glob patterns in import paths. This feature is enabled by setting the config property `deployment_manager/glob_imports` to `True`.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

### Cloud Services

- `gcloud beta services disable` now supports the `--force` option, allowing the disablement of a service even if other enabled services depend on it. Forcing the call will also disable dependent services.
  - Flags: `--force`
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)
- The `gcloud services vpc-peerings` command group has been promoted to beta status, indicating increased stability and readiness for wider use.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

### Compute Engine

- The `--network-tier` flag for `gcloud compute addresses create` has been promoted to General Availability (GA).
  - Flags: `--network-tier`
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)
- The `--network-tier` flag for `gcloud compute forwarding-rules create` has been promoted to General Availability (GA).
  - Flags: `--network-tier`
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)
- The `--default-network-tier` flag for `gcloud compute project-info update` has been promoted to General Availability (GA).
  - Flags: `--default-network-tier`
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)
- The `--network-tier` flag for `gcloud compute instances add-access-config` has been promoted to General Availability (GA).
  - Flags: `--network-tier`
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)
- The `--network-tier` flag for `gcloud compute instances create` has been promoted to General Availability (GA).
  - Flags: `--network-tier`
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)
- The `--network-tier` flag for `gcloud compute instance-templates create` has been promoted to General Availability (GA).
  - Flags: `--network-tier`
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

## API Changes

### App Engine

- The removal of automated `app.yaml` generation in `gcloud app deploy` changes the deployment API, requiring explicit `app.yaml` management by the user.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)
- The adoption of `.gcloudignore` and its precedence over `skip_files` in `app.yaml` introduces a new API for specifying file exclusions during deployment.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

### Cloud Datastore

- New API methods for listing and describing Datastore indexes are exposed via the `gcloud beta datastore indexes describe` and `list` commands.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

### Cloud Deployment Manager

- The introduction of glob pattern support in configuration import paths for `gcloud deployment-manager deployments create` and `update` extends the configuration API.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

### Cloud Services

- The `--force` option for `gcloud beta services disable` modifies the behavior of the `services.disable` API call, allowing forced disablement with cascading effects.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

### Compute Engine

- The promotion of various `--network-tier` flags to GA signifies the stabilization and official endorsement of the underlying API fields for network tier configuration across several Compute Engine resources.
  - File: [UNKNOWN_FILE_PATH:0](https://github.com/twistedpair/google-cloud-sdk/blob/211.0.0/google-cloud-sdk/UNKNOWN_FILE_PATH#L0)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}127{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+5,277{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-1,912{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/210.0.0...211.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*