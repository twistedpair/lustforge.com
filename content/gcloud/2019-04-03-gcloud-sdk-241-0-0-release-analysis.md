---
draft: false
title: "gcloud SDK 241.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2019-04-03
url: /gcloud/gcloud-sdk-241-0-0-release-analysis/
summary: "Google Cloud SDK version 241.0.0 introduces a breaking change requiring the `--runtime` flag for new Cloud Functions deployments and deprecates legacy network creation in Compute Engine. This release includes critical security updates, patching `kubectl` for `CVE-2019-1002101` and removing vulnerable older `kubectl` versions. It also delivers numerous new features and promotions to GA/beta across services like Cloud Composer, BigQuery, Cloud Memorystore, Kubernetes Engine, and adds authenticated push subscriptions for Cloud Pub/Sub."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - bigquery
  - cloud-build
  - cloud-composer
  - cloud-dns
  - cloud-data-catalog
  - cloud-firestore-emulator
  - cloud-functions
  - cloud-memorystore
  - cloud-pub-sub
  - cloud-video-intelligence-api
  - compute-engine
  - kubernetes-engine
---

Google Cloud SDK version 241.0.0 introduces a breaking change requiring the `--runtime` flag for new Cloud Functions deployments and deprecates legacy network creation in Compute Engine. This release includes critical security updates, patching `kubectl` for `CVE-2019-1002101` and removing vulnerable older `kubectl` versions. It also delivers numerous new features and promotions to GA/beta across services like Cloud Composer, BigQuery, Cloud Memorystore, Kubernetes Engine, and adds authenticated push subscriptions for Cloud Pub/Sub.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- The `gcloud functions deploy` command now requires the `--runtime` flag to be set when deploying a new function.
- The creation of new legacy networks in Compute Engine has been deprecated.
- Vulnerable `kubectl.1.9` and `kubectl.1.10` versions have been removed from Google Kubernetes Engine.

## Security Updates

- Google Kubernetes Engine's `kubectl` was updated to `1.11.9` to address security vulnerability `CVE-2019-1002101`. [HIGH]
- Updated extra Google Kubernetes Engine `kubectl` versions (`1.11` patch `1.11.9`, `1.12` patch `1.12.7`, `1.13` patch `1.13.5`, `1.14` patch `1.14.0`) and removed vulnerable versions (`1.9`, `1.10`). [HIGH]

## New Features by Service

### BigQuery

- Added DML/DDL query results display that shows the number of affected rows for DML and the performed operation and target name for DDL.

### Cloud Build

- Added `--network=cloudbuild` to `gcloud builds submit --tag` invocations of `docker build` to enable access to metadata during Dockerfile `RUN` operations.
  - Flags: `--network`

### Cloud Composer

- Added three new flags (`--enable-private-environment`, `--enable-private-endpoint`, `--master-ipv4-cidr`) to `gcloud beta composer environments create` to support Private IP Composer environments.
  - Flags: `--enable-private-environment`, `--enable-private-endpoint`, `--master-ipv4-cidr`
- Added `gcloud beta composer environments list-upgrades` to list all supported image version upgrades for a specified environment.
- Added two mutually exclusive flags (`--airflow-version`, `--image-version`) to `gcloud beta composer environments update` to allow for in-place environment upgrades.
  - Flags: `--airflow-version`, `--image-version`

### Cloud DNS

- Added support for DNS peering in `gcloud beta dns managed-zones`.
- Added `--enable-logging` flag to `gcloud beta dns policies` to enable query logging.
  - Flags: `--enable-logging`

### Cloud Data Catalog

- Added the `gcloud beta data-catalog entries` command group, which provides lookup, describe, and schema update functionality for Cloud Data Catalog entries.

### Cloud Firestore Emulator

- Released Cloud Firestore Emulator version `1.4.2` which adds implementations for `BeginTransaction` and `Rollback`.

### Cloud Functions

- Added `--service-account` flag to `gcloud functions deploy`.
  - Flags: `--service-account`
- Added `--vpc-connector` flag to `gcloud beta functions deploy`.
  - Flags: `--vpc-connector`

### Cloud Memorystore

- Added `gcloud redis instances failover` which provides the ability to failover a standard tier Cloud Memorystore for Redis instance from the master node to its replica.
- Added `--redis-version` flag to `gcloud beta redis instances create` to enable the specification of a preferred Redis version compatibility (`redis_3_2` or `redis_4_0`).
  - Flags: `--redis-version`
- Modified the `--update-redis-config` flag of `gcloud redis instances update` to accept three additional parameters (`activedefrag`, `lfu-decay-time`, `lfu-log-factor`) for Redis 4.0 compatible instances.
  - Flags: `--update-redis-config`

### Cloud Pub/Sub

- Added optional flags `--push-auth-service-account` and `--push-auth-token-audience` for defining an authenticated push subscription to `gcloud beta pubsub subscriptions create`, `gcloud beta pubsub subscriptions update`, and `gcloud beta pubsub subscriptions modify-push-config`.
  - Flags: `--push-auth-service-account`, `--push-auth-token-audience`

### Cloud Video Intelligence API

- Added `gcloud beta ml video transcribe-speech|detect-text|detect-object` commands for the Cloud Video Intelligence API.

### Compute Engine

- Modified `gcloud compute networks subnets update` to support specifying `--logging-aggregation-interval`, `--logging-flow-sampling`, and `--logging-metadata` flags in a single call.
  - Flags: `--logging-aggregation-interval`, `--logging-flow-sampling`, `--logging-metadata`

### Kubernetes Engine

- Added the `--enable-intra-node-visibility` flag to `gcloud beta container clusters create`.
  - Flags: `--enable-intra-node-visibility`

## Credential & Auth Changes

- Added the `--service-account` flag to `gcloud functions deploy` to specify the service account under which the function will run.
- Added optional flags `--push-auth-service-account` and `--push-auth-token-audience` for defining an authenticated push subscription to `gcloud beta pubsub subscriptions create`, `gcloud beta pubsub subscriptions update`, and `gcloud beta pubsub subscriptions modify-push-config`.

## API Changes

### App Engine

- Updated the Java SDK to version `1.9.73` and the Python SDK to version `1.9.85`.

### Cloud Asset Inventory

- The `gcloud asset` command group was promoted to GA.

### Cloud Bigtable

- The `gcloud bigtable app-profiles` command group, `gcloud bigtable clusters create`, `update`, and `delete` commands were promoted to GA.

### Cloud Storage

- The `gsutil` component was updated to `4.38`.

### Compute Engine

- The `--logging-aggregation-interval`, `--logging-flow-sampling`, and `--logging-metadata` flags for `gcloud compute networks subnets create` and `update` were promoted to beta. Additionally, `gcloud compute reservations` command group, `--reservation` and `--reservation-affinity` flags for `gcloud compute instance-templates create`, `--reservation` and `--reservations-from-file` for `gcloud compute commitments create`, `gcloud compute commitments update-reservations`, and 100G interconnect link type support for `gcloud compute interconnects create` were promoted to beta.

### Firebase Test Lab

- The `--num-flaky-test-attempts` flag of `gcloud firebase test android run` and `gcloud firebase test ios run` was promoted to GA.

### Kubernetes Engine

- The `--security-group` flag of `gcloud container clusters create`, enabling support for Google Groups in Kubernetes RBAC rules, was promoted to beta.
- The `--enable-tpu` flag and the `--tpu-ipv4-cidr` flag of `gcloud container clusters create`, enabling support for Cloud TPU, were promoted to GA.
- The default output formatting for the `gcloud beta container binauthz attestations list` command was changed.

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}250{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+21,022{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-16,490{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/240.0.0...241.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*