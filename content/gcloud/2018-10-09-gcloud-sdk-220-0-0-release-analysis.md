---
draft: false
title: "gcloud SDK 220.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2018-10-09
url: /gcloud/gcloud-sdk-220-0-0-release-analysis/
summary: "Google Cloud SDK 220.0.0 introduces several breaking changes, including default disabling of legacy metadata APIs for new Kubernetes Engine node pools and deprecation of the internal `gsutil` implementation for Python 3 support. Key security enhancements include default secure node pool configurations and KMS encryption for Dataproc clusters. New features span across various services, adding enhanced logging, Python version specification for Composer, and DML support for Cloud Spanner queries."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - cloud-sdk
  - cloud-build
  - cloud-composer
  - cloud-dataproc
  - cloud-key-management-service
  - compute-engine
  - internet-of-things
---

Google Cloud SDK 220.0.0 introduces several breaking changes, including default disabling of legacy metadata APIs for new Kubernetes Engine node pools and deprecation of the internal `gsutil` implementation for Python 3 support. Key security enhancements include default secure node pool configurations and KMS encryption for Dataproc clusters. New features span across various services, adding enhanced logging, Python version specification for Composer, and DML support for Cloud Spanner queries.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Modified output of `gcloud container clusters list` for DEGRADED clusters to include reason for degradation.
  - File: [list.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/clusters/list.py#L1)
- Starting in 1.12, new Kubernetes Engine node pools (and default node pools in new clusters) will be created with their legacy Compute Engine instance metadata APIs disabled by default. The flag `--metadata disable-legacy-endpoints=true` can be used to explicitly create a new node pool (or default pool in a new cluster) with legacy metadata APIs disabled.
  - File: [create.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/node_pools/create.py#L1)
- The `gsutil` implementation for specific commands is now deprecated to support Python 3. Commands that previously called `gsutil` internally (e.g., `functions deploy`, `compute images import`, `dataproc jobs submit` variants, `composer environments storage` commands) now use a different implementation. The `storage/use_gsutil` property can temporarily restore the old behavior but will eventually be removed.
  - File: [gsutil_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/storage/gsutil_client.py#L1)

## Security Updates

- Starting in 1.12, new Kubernetes Engine node pools (and default node pools in new clusters) will have their legacy Compute Engine instance metadata APIs disabled by default to enhance metadata protection. Users can explicitly disable them with `--metadata disable-legacy-endpoints=true`. [HIGH]
  - File: [create.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/node_pools/create.py#L1)
- Added the `--gce-pd-kms-key` flag to `dataproc clusters create` to enable protecting clusters with Google Cloud KMS encryption for persistent disks. [MEDIUM]
  - File: [create.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/clusters/create.py#L1)

## New Features by Service

### Cloud SDK

- Commands that upload to Google Cloud Storage can now control the upload/download chunksize using the `storage/chunk_size` property.
  - File: [upload.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/storage/upload.py#L1)
- Added functionality to `gcloud beta help` that allows running a search for terms of interest within the help text of gcloud commands.
  - File: [gcloud_main.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/gcloud_main.py#L1)

### Cloud Build

- Added a warning message to `gcloud builds submit` for builds submitted with configs that don't specify a logging option.
  - File: [submit.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/builds/submit.py#L1)

### Cloud Composer

- Added the `--python-version` flag to `gcloud beta composer environments create` to specify the Python version used within the created environment.
  - Flags: `--python-version`
  - File: [create.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/beta/composer/commands/environments/create.py#L1)

### Cloud Dataproc

- Added the `--gce-pd-kms-key` flag to `dataproc clusters create` to enable protecting clusters with Google Cloud KMS encryption.
  - Flags: `--gce-pd-kms-key`
  - File: [create.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/clusters/create.py#L1)

### Cloud Key Management Service

- Modified `gcloud kms locations list` to display information about the availability of Hardware Security Modules in each location.
  - File: [list.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/kms/locations/list.py#L1)

### Compute Engine

- Added support for managed SSL certificates to `gcloud beta compute ssl-certificates`.
  - File: [ssl_certificates.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/beta/compute/commands/ssl_certificates.py#L1)

### Internet of Things

- Added `--log-level` flag for `gcloud iot devices create`, `gcloud iot devices update`, `gcloud iot registries create`, and `gcloud iot registries update` for beta.
  - Flags: `--log-level`
  - File: [create.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/beta/iot/commands/devices/create.py#L1)
- Added `gcloud iot commands` to beta, expanding IoT Core command-line capabilities.
  - File: [list.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/beta/iot/commands/commands/list.py#L1)

## API Changes

### App Engine

- Updated the Java SDK to version 1.9.66.
  - File: [java_sdk.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/appengine/java_sdk.py#L1)
- Updated the Python SDK to version 1.9.77.
  - File: [python_sdk.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/appengine/python_sdk.py#L1)

### Cloud Spanner

- Updated `gcloud spanner execute-sql` to accept DML statements, extending its functionality for database interaction.
  - File: [execute_sql.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/220.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/spanner/execute_sql.py#L1)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}122{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+6,406{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-707{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/219.0.1...220.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*