---
draft: false
title: "gcloud SDK 550.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2025-12-16
url: /gcloud/gcloud-sdk-550-0-0-release-analysis/
summary: "The Google Cloud SDK 550.0.0 release introduces extensive new functionality for Cloud Key Management Service's single-tenant HSMs and promotes Workforce Identity Federation for Compute Engine to GA. It includes numerous API updates across various services, with new APIs for Lustre, Observability, Storage Batch Operations, and Vector Search. Additionally, the release contains several hidden features and significant refactorings, notably for Cloud Run instance management and project environment tag handling."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - google-cloud-cli
  - app-engine
  - artifact-registry
  - bigquery
  - cloud-composer
  - cloud-dataplex
  - cloud-filestore
  - cloud-key-management-service
  - cloud-run
  - cloud-spanner
  - cloud-storage
  - cloud-workstations
  - compute-engine
  - developer-connect
  - eventarc
  - kubernetes-engine
  - network-connectivity
---

The Google Cloud SDK 550.0.0 release introduces extensive new functionality for Cloud Key Management Service's single-tenant HSMs and promotes Workforce Identity Federation for Compute Engine to GA. It includes numerous API updates across various services, with new APIs for Lustre, Observability, Storage Batch Operations, and Vector Search. Additionally, the release contains several hidden features and significant refactorings, notably for Cloud Run instance management and project environment tag handling.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Unannounced Changes 🕵️](#unannounced-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- The `--broker-disk-size-gb` flag for Managed Kafka clusters has been renamed to `--broker-disk-size-gib` to accurately reflect the unit in Gibibytes. Users relying on the old flag name will need to update their scripts.
  - File: [flags.yaml:104](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/managed_kafka/flags.yaml#L104)
- The `--enable-workload-certificate` flag for Cloud Run services has been removed. New flags `--identity-certificate` and `--identity-type` have been introduced (currently hidden).
  - File: [flags.py:72](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/run/flags.py#L72)

## New Features by Service

### Google Cloud CLI

- Updated the Linux bundled Python for the `gcloud` CLI to 3.13.10 with pip v25.3.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### App Engine

- Updated the Java SDK to version 3.0.3 and upgraded Eclipse Jetty web server to versions 12.0.31 and 12.1.5, fixing several issues.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Artifact Registry

- Made the `show-package-vulnerability` flag public for `gcloud artifacts versions describe`.
  - Flags: `show-package-vulnerability`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### BigQuery

- Added an error message on how to set a quota project ID when expected by the API.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Updated `bq info` command to show OpenSSL version.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added new `--scheduling_policy_max_slots` flag to set a slot usage cap on BigQuery jobs.
  - Flags: `--scheduling_policy_max_slots`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added new `--scheduling_policy_concurrency` flag to cap the number of concurrently running BigQuery jobs.
  - Flags: `--scheduling_policy_concurrency`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added new `--use_gcloud_config` to allow disabling the reading of the active `gcloud` CLI configuration.
  - Flags: `--use_gcloud_config`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added setting `--mtls` flag value from gcloud `context_aware.use_client_certificate` config property.
  - Flags: `--mtls`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Composer

- Added `--airflow-version` to `gcloud composer environments update` to upgrade Cloud Composer environment.
  - Flags: `--airflow-version`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Dataplex

- Added one-time trigger support to `dataplex datascans create` commands.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Filestore

- Added `gcloud filestore instances resume-replica` command for filestore instances to resume a standby replica instance.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Key Management Service

- Added `gcloud kms single-tenant-hsm create` (beta, GA) command to create a single-tenant Hardware Security Module (HSM) instance.
  - Flags: `--location`, `--total-approver-count`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud kms single-tenant-hsm describe` (beta, GA) command to show details of a single-tenant HSM instance.
  - Flags: `--location`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud kms single-tenant-hsm list` (beta, GA) command to list single-tenant HSM instances.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud kms single-tenant-hsm proposal create` (beta, GA) command to create a proposal for operations on a single-tenant HSM instance.
  - Flags: `--location`, `--operation-type`, `--single-tenant-hsm-instance-proposal-id`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud kms single-tenant-hsm proposal execute` (beta, GA) command to execute an approved proposal.
  - Flags: `--location`, `--single-tenant-hsm-instance`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud kms single-tenant-hsm proposal list` (beta, GA) command to list proposals for a single-tenant HSM instance.
  - Flags: `--location`, `--single-tenant-hsm-instance`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud kms single-tenant-hsm proposal describe` (beta, GA) command to show details of a single-tenant HSM instance proposal.
  - Flags: `--location`, `--single-tenant-hsm-instance`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud kms single-tenant-hsm proposal delete` (beta, GA) command to delete a proposal on a single-tenant HSM instance.
  - Flags: `--location`, `--single-tenant-hsm-instance`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud kms single-tenant-hsm proposal approve` (beta, GA) command to approve a proposal, supporting `--quorum-reply`, `--required-challenge-replies`, and `--quorum-challenge-replies` flags.
  - Flags: `--location`, `--single-tenant-hsm-instance`, `--quorum-reply`, `--required-challenge-replies`, `--quorum-challenge-replies`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud kms operations describe` (beta, GA) command to show details of a KMS operation.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Updated `gcloud kms keys versions describe` to allow `--attestation-file` flag for `HSM_SINGLE_TENANT` key versions.
  - Flags: `--attestation-file`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Updated `gcloud kms keys versions get-certificate-chain` to allow retrieving certificate chains for `HSM_SINGLE_TENANT` key versions.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Updated `gcloud kms import-jobs create` (beta, GA) to include `--single-tenant-hsm-instance` flag.
  - Flags: `--single-tenant-hsm-instance`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Run

- Promoted `gcloud run worker-pools` IAM policy management commands to beta.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Spanner

- Added `--directed-read` flag to `gcloud spanner cli` to route read-only transactions to specific replica types or regions.
  - Flags: `--directed-read`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `--proto-descriptor-file` flag to `gcloud spanner cli` to provide a protobuf-serialized FileDescriptorSet message.
  - Flags: `--proto-descriptor-file`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Storage

- Promoted `--activity-data-retention-period-days` flag in `gcloud storage insights dataset-configs` to GA.
  - Flags: `--activity-data-retention-period-days`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Workstations

- Added `--instance-metadata` flag to `gcloud beta workstations configs create` and `gcloud beta workstations configs update` commands.
  - Flags: `--instance-metadata`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Compute Engine

- Added `--ip-collection` flag to `gcloud compute addresses create` command.
  - Flags: `--ip-collection`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `--resource-manager-tags` flag for alpha to `gcloud compute images create` to allow users to add Resource Manager tags to the image resource during creation.
  - Flags: `--resource-manager-tags`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Developer Connect

- Updated `gcloud developer-connect insights-configs create` to support `--target-projects` flag.
  - Flags: `--target-projects`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Eventarc

- Added `--max-retry-attempts` to `gcloud eventarc triggers create` and `gcloud eventarc triggers update` to support specifying a RetryPolicy.
  - Flags: `--max-retry-attempts`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Kubernetes Engine

- Promoted `gcloud container fleet rollouts describe|list` to beta.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Promoted `gcloud container fleet rolloutsequences create|describe|list|update|delete` to beta.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

### Network Connectivity

- Added `gcloud network-connectivity transport delete`, `gcloud network-connectivity transport list`, and `gcloud network-connectivity transport describe` commands.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud network-connectivity transport remote-profiles list` and `gcloud network-connectivity transport remote-profiles describe` commands.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `gcloud network-connectivity transport create` command.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)

## Credential & Auth Changes

- Added support for Workforce Identity Federation in GA gcloud compute commands.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/RELEASE_NOTES)
- Removed beta gating and `NotImplementedError` for SSH with federated workforce identities and certificate authentication, indicating GA support for these features.
  - File: [ssh.py:1360](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/ssh/ssh.py#L1360)

## API Changes

### AI Platform

- Significant updates to `v1beta1` API client messages.
  - File: [aiplatform_v1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/aiplatform/v1beta1/aiplatform_v1beta1_messages.py)

### Cloud KMS

- Extensive updates to `v1` API client messages to support single-tenant HSM features.
  - File: [cloudkms_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/cloudkms/v1/cloudkms_v1_messages.py)

### Compute Engine

- Updates to `alpha` API client and messages, likely related to new flags like `--resource-manager-tags` and `--ip-collection`.
  - File: [compute_alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/compute/alpha/compute_alpha_messages.py)

### Dataproc

- Updates to `v1` API client and messages.
  - File: [dataproc_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/dataproc/v1/dataproc_v1_messages.py)

### Datastream

- Updates to `v1` API client messages.
  - File: [datastream_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/datastream/v1/datastream_v1_messages.py)

### IAM

- Updates to `v1` API client and messages, likely to support Workforce Identity Federation features.
  - File: [iam_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/iam/v1/iam_v1_messages.py)

### Lustre

- Introduction of a new `v1alpha` API client and messages.
  - File: [lustre_v1alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/lustre/v1alpha/lustre_v1alpha_messages.py)

### NetApp

- Updates to `v1alpha1` and `v1beta1` API client messages.
  - File: [netapp_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/netapp/v1alpha1/netapp_v1alpha1_messages.py)

### Network Management

- Updates to `v1alpha1` API client and messages.
  - File: [networkmanagement_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/networkmanagement/v1alpha1/networkmanagement_v1alpha1_messages.py)

### Observability

- Introduction of a new `v1` API client and messages.
  - File: [observability_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/observability/v1/observability_v1_messages.py)

### Privileged Access Manager

- Updates to `v1alpha` and `v1beta` API client messages.
  - File: [privilegedaccessmanager_v1alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/privilegedaccessmanager/v1alpha/privilegedaccessmanager_v1alpha_messages.py)

### Pub/Sub

- Updates to `v1` API client messages.
  - File: [pubsub_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/pubsub/v1/pubsub_v1_messages.py)

### Recaptcha Enterprise

- Updates to `v1` API client messages.
  - File: [recaptchaenterprise_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/recaptchaenterprise/v1/recaptchaenterprise_v1_messages.py)

### Cloud Run

- Updates to `v1` API client and messages, supporting new instance and identity features.
  - File: [run_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/run/v1/run_v1_messages.py)

### SaaS Service Management

- Updates to `v1beta1` API client messages, including some client reductions.
  - File: [saasservicemgmt_v1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/saasservicemgmt/v1beta1/saasservicemgmt_v1beta1_messages.py)

### Security Command Center

- Updates to `v1`, `v1beta2`, and `v2` API client messages.
  - File: [securitycenter_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/securitycenter/v1/securitycenter_v1_messages.py)

### Spanner

- Updates to `v1` API client messages, supporting new CLI flags.
  - File: [spanner_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/spanner/v1/spanner_v1_messages.py)

### SQL Admin

- Significant updates to `v1beta4` API client messages.
  - File: [sqladmin_v1beta4_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/sqladmin/v1beta4/sqladmin_v1beta4_messages.py)

### Storage Batch Operations

- Introduction of a new `v1` API client and messages.
  - File: [storagebatchoperations_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/storagebatchoperations/v1/storagebatchoperations_v1_messages.py)

### Vector Search

- Introduction of a new `v1beta` API client and messages.
  - File: [vectorsearch_v1beta_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/generated_clients/apis/vectorsearch/v1beta/vectorsearch_v1beta_messages.py)

## Unannounced Changes

*Changes found in code but not mentioned in official release notes:* 🕵️

### Feature Flag

- Added `--kms-key` to `--create-disk` arguments and a hidden `--clear-encryption-key` flag for Backup and DR restore operations.
  - File: [compute_flags.py:153](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/backupdr/restore/compute_flags.py#L153)
- Added a hidden `--delay-execution` flag for Cloud Run jobs, indicating whether triggered executions can be delayed to start.
  - File: [flags.py:1995](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/run/flags.py#L1995)
- Added an alpha `--bucket-list` flag for Cloud Storage batch jobs, allowing operations on multiple buckets.
  - File: [flags.py:1320](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/storage/flags.py#L1320)

### Hidden Feature

- Added `bootDisk` configuration option for Slurm login nodes in Cluster Director update and create commands, allowing specification of disk type, size, and image.
  - File: [flags.py:804](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/cluster_director/clusters/flags.py#L804)
- Added new flags `--exclude-membership-names` and `--include-membership-names` for Container Fleet rollouts to selectively target memberships.
  - File: [flags.py:73](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/fleet/rollouts/flags.py#L73)
- Introduced a new `Instance` resource, associated API client library, commands, and a custom printer format for Cloud Run, enabling more detailed management and viewing of individual service instances.
  - File: [instance.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/run/instance.py)
- Added a hidden `--service-class-id` flag for `gcloud compute instances network-interfaces`, used with network attachments.
  - File: [flags.py:314](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/instances/network_interfaces/flags.py#L314)
- Added `UUID` as a supported scalar type in Cloud Spanner write operations.
  - File: [write_util.py:134](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/spanner/write_util.py#L134)

### Groundwork

- Implemented stricter client-side validation for Config Management features, gating legacy fields such as `management`, `configSync.metricsGcpServiceAccountEmail`, `policyController`, `hierarchyController`, and `binauthz`.
  - File: [flags.py:73](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/fleet/config_management/flags.py#L73)
- Added a utility for shortening GCP region names, used internally for generating GCS bucket names in Cloud Run source deployments.
  - File: [region_name_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/run/sourcedeploys/region_name_util.py)
- Added internal support for `service-class-id` on Compute Engine network interfaces, indicating future functionality for network attachment configurations.
  - File: [flags.py:1570](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/instances/flags.py#L1570)
- Added `automigrationconfig` to the Infrastructure Manager resources, indicating groundwork for new migration features.
  - File: [resources.yaml:135](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/infra_manager/resources.yaml#L135)
- Introduced new `v1_resources.yaml` and added `projects_none_networks` to `v1alpha1` and `v1beta1` Network Security resources, likely preparing for new API versions or features.
  - File: [v1_resources.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/network_security/v1_resources.yaml)

### Refactoring

- Refactored environment tag handling for projects to use `resource-manager tags` API, changing how environment messages are retrieved and displayed in `gcloud projects` commands.
  - File: [util.py:269](https://github.com/twistedpair/google-cloud-sdk/blob/550.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/projects/util.py#L269)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}347{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+15,536{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-4,866{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/549.0.1...550.0.0)*