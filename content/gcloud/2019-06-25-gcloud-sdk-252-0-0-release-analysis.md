---
draft: false
title: "gcloud SDK 252.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2019-06-25
url: /gcloud/gcloud-sdk-252-0-0-release-analysis/
summary: "Google Cloud SDK 252.0.0 introduces significant enhancements across several services, including new Cloud Data Catalog commands for managing tags and searching resources. Key flags for Cloud Functions and Compute Engine, such as `--max-instances` and `--source-snapshot`, have been promoted to General Availability. Additionally, several IAM policy management commands and Workload Identity flags for Kubernetes Engine have advanced to beta, alongside a breaking change removing `--network-interface` from `gcloud beta compute start-iap-tunnel`."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - cloud-data-catalog
  - cloud-functions
  - cloud-pub-sub
  - compute-engine
  - kubernetes-engine
---

Google Cloud SDK 252.0.0 introduces significant enhancements across several services, including new Cloud Data Catalog commands for managing tags and searching resources. Key flags for Cloud Functions and Compute Engine, such as `--max-instances` and `--source-snapshot`, have been promoted to General Availability. Additionally, several IAM policy management commands and Workload Identity flags for Kubernetes Engine have advanced to beta, alongside a breaking change removing `--network-interface` from `gcloud beta compute start-iap-tunnel`.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Removed the `--network-interface` flag from `gcloud beta compute start-iap-tunnel`.

## New Features by Service

### Cloud Data Catalog

- Added `gcloud beta data-catalog tags` and `gcloud beta data-catalog tag-templates` commands to manage tags and tag templates.
- Added `gcloud beta data-catalog search` command to search Cloud Data Catalog resources.

### Cloud Functions

- Promoted `gcloud functions add-iam-policy-binding`, `gcloud functions get-iam-policy`, `gcloud functions remove-iam-policy-binding`, and `gcloud functions set-iam-policy` commands to beta.
- Promoted `--max-instances` and `--clear-max-instances` flags of `gcloud functions deploy` to GA.
  - Flags: `--max-instances`, `--clear-max-instances`

### Cloud Pub/Sub

- Promoted labels functionality to GA for topics and subscriptions, available via `gcloud pubsub topics create`, `gcloud pubsub topics update`, `gcloud pubsub subscriptions create`, and `gcloud pubsub subscriptions update`.

### Compute Engine

- Promoted `--allow-global-access` flag of `gcloud compute forwarding-rules create` and `gcloud compute forwarding-rules update` to beta.
  - Flags: `--allow-global-access`
- Promoted `--source-snapshot` flag of `gcloud compute instances create` to GA.
  - Flags: `--source-snapshot`
- Promoted the `source-snapshot` option of the `--create-disk` flag of `gcloud compute instances create` to GA.
  - Flags: `--create-disk`
- Added `gcloud beta compute instance-groups managed update-instances` command in beta.
- Added `gcloud beta compute reservations get-iam-policy`, `gcloud beta compute reservations set-iam-policy`, `gcloud beta compute reservations add-iam-policy-binding`, and `gcloud beta compute reservations remove-iam-policy-binding` commands.

### Kubernetes Engine

- Promoted `--identity-namespace` and `--disable-workload-identity` flags of `gcloud container clusters create` and `gcloud container clusters update` to beta. These flags control Workload Identity.
  - Flags: `--identity-namespace`, `--disable-workload-identity`

## Credential & Auth Changes

- Promoted `gcloud functions add-iam-policy-binding`, `gcloud functions get-iam-policy`, `gcloud functions remove-iam-policy-binding`, and `gcloud functions set-iam-policy` commands to beta, enhancing IAM policy management for Cloud Functions.
- Added `gcloud beta compute reservations get-iam-policy`, `gcloud beta compute reservations set-iam-policy`, `gcloud beta compute reservations add-iam-policy-binding`, and `gcloud beta compute reservations remove-iam-policy-binding` commands to manage IAM policies for Compute Engine reservations.
- Promoted `--identity-namespace` and `--disable-workload-identity` flags of `gcloud container clusters create` and `gcloud container clusters update` to beta, controlling Workload Identity which allows Kubernetes service accounts to act as Google service accounts.

## API Changes

### Cloud Data Catalog

- Introduced new API endpoints via `gcloud beta data-catalog tags`, `gcloud beta data-catalog tag-templates`, and `gcloud beta data-catalog search` commands for managing and searching data catalog resources.

### Cloud Functions

- Promoted IAM policy management commands (`add-iam-policy-binding`, `get-iam-policy`, `remove-iam-policy-binding`, `set-iam-policy`) to beta, indicating increased API stability for Cloud Functions access control.
- Promoted `--max-instances` and `--clear-max-instances` flags of `gcloud functions deploy` to GA, reflecting stable API support for function scaling.

### Cloud Pub/Sub

- Promoted labels functionality for topics and subscriptions to GA, indicating stable API support for resource labeling.

### Compute Engine

- Promoted `--source-snapshot` flag and `source-snapshot` option of `--create-disk` for `gcloud compute instances create` to GA, signifying stable API for instance creation from snapshots.
- Introduced new API endpoints for Compute Engine reservations IAM policy management, exposed via new `get-iam-policy`, `set-iam-policy`, `add-iam-policy-binding`, and `remove-iam-policy-binding` commands.

### Kubernetes Engine

- Promoted Workload Identity flags (`--identity-namespace`, `--disable-workload-identity`) to beta, indicating increasing stability for the Workload Identity API.

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}133{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+10,433{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-5,980{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/251.0.0...252.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*