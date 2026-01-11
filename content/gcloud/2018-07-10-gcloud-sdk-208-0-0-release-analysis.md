---
draft: false
title: "gcloud SDK 208.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2018-07-10
url: /gcloud/gcloud-sdk-208-0-0-release-analysis/
summary: "Google Cloud SDK 208.0.0 introduces several new beta features, including Cloud Filestore and `gcloud compute network-endpoint-groups` commands, along with numerous new flags for Compute Engine and Cloud Functions. Key changes include a warning about the default `--enable-ip-alias` behavior in Kubernetes Engine and the removal of the `container/use_v1_api` property. Significant internal groundwork was laid for new APIs like Cloud Composer, Service Networking, VPC Access, and a migration to `v1beta1` for Binary Authorization attestors."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - cloud-sdk
  - app-engine
  - cloud-dataproc
  - cloud-datastore-emulator
  - cloud-filestore
  - cloud-functions
  - cloud-machine-learning-engine
  - cloud-storage
  - compute-engine
  - service-usage
  - compute-engine-load-balancing-
  - compute-engine-vpc-network-peering-
  - cloud-sql
  - vpc-access
  - binary-authorization
  - kubernetes-engine
  - dataproc
  - filestore
  - core-framework
  - cloud-composer
  - service-networking
  - serverless-vpc-access
---

Google Cloud SDK 208.0.0 introduces several new beta features, including Cloud Filestore and `gcloud compute network-endpoint-groups` commands, along with numerous new flags for Compute Engine and Cloud Functions. Key changes include a warning about the default `--enable-ip-alias` behavior in Kubernetes Engine and the removal of the `container/use_v1_api` property. Significant internal groundwork was laid for new APIs like Cloud Composer, Service Networking, VPC Access, and a migration to `v1beta1` for Binary Authorization attestors.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Unannounced Changes 🕵️](#unannounced-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- A warning was added that the default value of `--enable-ip-alias` will change for `gcloud container clusters create` command, making VPC native (IP alias enabled) clusters the default in the future. Users are advised to use `--[no-]enable-ip-alias` to suppress this warning.
  - File: [RELEASE_NOTES:10](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L10)
- The `gcloud` property `container/use_v1_api` and its alias `container/use_v1_api_client` were removed.
  - File: [properties.py:24](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/properties.py#L24)
- The `servicenetworking` API has been promoted from `v1alpha` to `v1beta`. The `PeerApiCall` function in `peering.py` has been renamed to `CreateConnection` and the underlying API method and request messages have changed (e.g., `ServicenetworkingServicesPeerRequest` to `ServicenetworkingServicesConnectionsCreateRequest`). This might affect any code directly interacting with the `v1alpha` API for service peering.
  - File: [peering.py:22](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/services/peering.py#L22)
- The Cloud TPU `v1` and `v1alpha1` APIs, along with their corresponding clients and messages, have been entirely removed from the SDK. This indicates that these specific API versions are no longer supported.
  - File: [tpu_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/tpu_v1_client.py)
- Removed internal functions `AddListAttestationsFlags` and `AddCreateAttestationFlags` for Binary Authorization, which may indicate changes to the CLI commands that previously used these to define flags.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/binauthz/flags.py)
- Removed constants and logic related to forcing Kubernetes Engine v1 API usage via `container/use_v1_api` properties, indicating deprecation or removal of this compatibility mechanism.
  - File: [constants.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/constants.py)
- Removed `ValidateIstioConfigUpdateArgs` function, suggesting changes in how Istio config updates are handled, potentially breaking existing update workflows for Istio.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py)
- The `--trigger-event` flag for Cloud Functions no longer has explicitly listed choices in the help text, which might affect users relying on this for discoverability.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/flags.py)
- The internal utility function `AddIdArg` for creating resource ID flags has been removed from `command_lib/tasks/flags.py`.
  - File: [flags.py:41](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/tasks/flags.py#L41)
- Deprecated properties `container.use_v1_api` and `container.use_v1_api_client` have been removed. Any scripts or internal logic relying on these properties will now fail.
  - File: [properties.py:786](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/properties.py#L786)
- The `orderBy` query parameter was removed from the `cloudtasks.projects.locations.queues.tasks.list` method in Cloud Tasks v2beta2. This means tasks can no longer be explicitly sorted by `schedule_time` or `pull_message.tag` using this parameter.
  - File: [cloudtasks_v2beta2_client.py:285](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_client.py#L285)
- The `AttachedDisk.TypeValueValuesEnum` enum in the Compute alpha API has a new value `NVDIMM`. This has shifted the integer values for `NVME` and `SCSI` (from 0 to 1, and 1 to 2 respectively). Clients relying on the integer representation of these enum values may break.
  - File: [compute_alpha_messages.py:1245](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L1245)
- The `index` field has been removed from the `NodeGroupNode` message in the Compute alpha API.
  - File: [compute_alpha_messages.py:30509](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L30509)
- The `nodeIndexes` field has been removed from the `NodeGroupsDeleteNodesRequest` message in the Compute alpha API. Clients should now use the `nodes` field, which has been re-indexed.
  - File: [compute_alpha_messages.py:30552](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L30552)
- In the `RouterNatSubnetworkToNat` message in the Compute alpha API, the enum `SourceIpRangesToNatsValueListEntryValuesEnum` has been renamed to `SourceIpRangesToNatValueListEntryValuesEnum`, and the field `sourceIpRangesToNats` has been renamed to `sourceIpRangesToNat`.
  - File: [compute_alpha_messages.py:35671](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L35671)
- The `ComputeProjectsDisableXpnHostRequest` and `ComputeProjectsDisableXpnResourceRequest` message classes have been removed from the `compute/v1` API. Functionality for Node Group management has been introduced in new message classes.
  - File: [compute_v1_messages.py:8342](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L8342)
- The `index` field has been removed from the `NodeGroupNode` schema in `compute_alpha.json`.
  - File: [compute_alpha.json:13581](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L13581)
- The `nodeIndexes` field has been removed from the `NodeGroupsDeleteNodesRequest` schema in `compute_alpha.json`. The `nodes` field should be used instead.
  - File: [compute_alpha.json:13632](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L13632)
- The field `sourceIpRangesToNats` in the `RouterNatSubnetworkToNat` schema has been renamed to `sourceIpRangesToNat` in `compute_alpha.json`.
  - File: [compute_alpha.json:18243](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L18243)
- The `Reset` method and `ResetNodeRequest` schema have been removed from the TPU API (`tpu/v1` and `tpu/v1alpha1`). This means users can no longer programmatically reset TPU nodes using this method.
  - File: [tpu_v1_client.py:251](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/tpu_v1_client.py#L251)
- The `Reset` method and `ResetNodeRequest` schema have been removed from the TPU API (`tpu/v1` and `tpu/v1alpha1`). This means users can no longer programmatically reset TPU nodes using this method.
  - File: [tpu_v1alpha1_client.py:251](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1alpha1/tpu_v1alpha1_client.py#L251)

## New Features by Service

### Cloud SDK

- TAB completion for commands, flags, and constant flag value choices is now approximately 10x faster.
  - File: [RELEASE_NOTES:18](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L18)

### App Engine

- The Python SDK was updated to version 1.9.72.
  - File: [RELEASE_NOTES:24](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L24)

### Cloud Dataproc

- Added `gcloud beta dataproc workflow-templates import` to enable creating and updating workflow templates using a YAML file.
  - File: [RELEASE_NOTES:30](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L30)
- Added `gcloud beta dataproc workflow-templates export` to enable exporting a workflow template to a YAML file.
  - File: [RELEASE_NOTES:28](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L28)
- Added `--parameters` flag to `gcloud beta dataproc workflow-templates instantiate` to enable parameterization of workflow templates.
  - Flags: `--parameters`
  - File: [RELEASE_NOTES:32](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L32)
- Introduced support for Dataproc Workflow Templates v1beta2, enabling the definition and management of complex job sequences through a new YAML schema.
  - File: [WorkflowTemplate_v1beta2_schema.yaml:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/dataproc/schemas/WorkflowTemplate_v1beta2_schema.yaml#L1)

### Cloud Datastore Emulator

- Released Cloud Datastore Emulator version 2.0.1, with improved backward compatibility with App Engine local development by allowing special entity kinds to be whitelisted for App Engine.
  - File: [RELEASE_NOTES:37](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L37)

### Cloud Filestore

- The `gcloud filestore` command group is now available in beta, allowing creation, configuration, and manipulation of Cloud Filestore instances.
  - File: [RELEASE_NOTES:44](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L44)
- Ability to update Cloud Filestore instances, including resizing file share capacity, updating descriptions, and labels. This functionality is primarily available for the `v1beta1` API version.
  - File: [filestore_client.py:194](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/filestore/filestore_client.py#L194)
- Introduced the `v1beta1` API for managing Cloud Filestore instances, including new client methods for `Create`, `Delete`, `Get`, `List`, and `Patch` operations on `projects.locations.instances`. This also includes comprehensive new message types for `Instance`, `FileShareConfig`, `NetworkConfig`, `Export`, `NfsExport`, `SmbExport`, and `ClientList`.
  - File: [file_v1beta1_client.py:38](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1beta1/file_v1beta1_client.py#L38)
- Introduced the `v1beta1` API for Cloud Filestore, enabling management of instances, file shares, and network configurations. New API methods include `file.projects.locations.instances.list`, `get`, `create`, `patch`, and `delete` for Filestore instances, along with new message types like `Instance`, `FileShareConfig`, `NetworkConfig`, `Export`, `ClientList`, `NfsExport`, and `SmbExport`.
  - File: [file_v1beta1.json:206](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file_v1beta1.json#L206)

### Cloud Functions

- Added `--runtime` flag to `gcloud beta functions deploy`.
  - Flags: `--runtime`
  - File: [RELEASE_NOTES:52](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L52)
- Added flags (`--clear-env-vars`, `--set-env-vars`, `--env-vars-file`, `--remove-env-vars`, `--update-env-vars`) to `gcloud beta functions deploy` for setting custom environment variables.
  - Flags: `--clear-env-vars`, `--set-env-vars`, `--env-vars-file`, `--remove-env-vars`, `--update-env-vars`
  - File: [RELEASE_NOTES:54](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L54)
- New functionality to manage environment variables for Cloud Functions during deployment. This includes setting, clearing, and removing variables.
  - Flags: `--build-env-vars`, `--set-env-vars`, `--clear-env-vars`, `--remove-env-vars`
  - File: [flags.py:206](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/flags.py#L206)
- Added support for new event triggers from Firebase Realtime Database, Cloud Firestore, and Firebase Analytics.
  - File: [triggers.py:93](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/functions/triggers.py#L93)
- Introduced utilities for managing environment variables during deployment using `--update-env-vars`, `--remove-env-vars`, and `--clear-env-vars` flags.
  - Flags: `--update-env-vars`, `--remove-env-vars`, `--clear-env-vars`
  - File: [env_vars_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/deploy/env_vars_util.py)
- Enhanced event trigger validation and creation logic to support new resource types like Firebase Database, Firestore Document, and Firebase Analytics Events.
  - File: [trigger_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/deploy/trigger_util.py)

### Cloud Machine Learning Engine

- The `--python-version` flag of `gcloud ml-engine versions create` was promoted to GA.
  - Flags: `--python-version`
  - File: [RELEASE_NOTES:64](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L64)

### Cloud Storage

- The `gsutil` component was updated to version 4.33.
  - File: [RELEASE_NOTES:70](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L70)

### Compute Engine

- Added KMS integration flags (`--boot-disk-kms-key`, `--boot-disk-kms-keyring`, `--boot-disk-kms-location`, `--boot-disk-kms-project`) to `gcloud compute instance-templates create`.
  - Flags: `--boot-disk-kms-key`, `--boot-disk-kms-keyring`, `--boot-disk-kms-location`, `--boot-disk-kms-project`
  - File: [RELEASE_NOTES:75](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L75)
- Added `--use-serving-port` flag to `gcloud compute health-checks http create`, `https create`, `http2 create`, and `ssl create` commands.
  - Flags: `--use-serving-port`
  - File: [RELEASE_NOTES:92](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L92)
- The `source-instance` flags (`--source-instance`, `--source-instance-zone`, `--configure-disk`) of `gcloud compute instance-templates create` command were promoted to GA.
  - Flags: `--source-instance`, `--source-instance-zone`, `--configure-disk`
  - File: [RELEASE_NOTES:97](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L97)
- The `gcloud compute network-endpoint-groups` command group was promoted to beta.
  - File: [RELEASE_NOTES:80](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L80)
- The `--network-endpoint-group` and `--network-endpoint-group-zone` flags were promoted to beta for `gcloud compute backend-services add-backend`, `remove-backend`, and `update-backend`.
  - Flags: `--network-endpoint-group`, `--network-endpoint-group-zone`
  - File: [RELEASE_NOTES:83](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L83)
- The `--max-connections-per-endpoint` and `--max-rate-per-endpoint` flags were promoted to beta for `gcloud compute backend-services add-backend` and `update-backend`.
  - Flags: `--max-connections-per-endpoint`, `--max-rate-per-endpoint`
  - File: [RELEASE_NOTES:89](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/RELEASE_NOTES#L89)
- Added support to specify the IP type (`INTERNAL` or `EXTERNAL`) for `gcloud compute scp` operations, allowing `scp` to use internal IP addresses.
  - File: [scp_utils.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/scp_utils.py)
- Added support for a new disk interface type `NVDIMM` in the `AttachedDisk` message in the Compute alpha API.
  - File: [compute_alpha_messages.py:1245](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L1245)
- Introduced new API to list internal IP addresses for a network, including new messages `ComputeNetworksListIpAddressesRequest`, `InternalIpAddress`, and `IpAddressesList` in the Compute alpha API.
  - File: [compute_alpha_messages.py:10688](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L10688)
- Added `requestId` field to `ComputeRegionInstanceGroupManagersUpdatePerInstanceConfigsRequest` for idempotency in the Compute alpha API.
  - File: [compute_alpha_messages.py:13384](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L13384)
- Added `drainTimeoutSeconds` field to `ComputeSubnetworksPatchRequest` for managing connection draining during subnetwork role swaps (e.g., for internal HTTP(S) Load Balancers) in the Compute alpha API.
  - File: [compute_alpha_messages.py:16057](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L16057)
- Introduced new API for aggregated listing of URL maps, including new messages `ComputeUrlMapsAggregatedListRequest`, `UrlMapsAggregatedList`, and `UrlMapsScopedList` in the Compute alpha API.
  - File: [compute_alpha_messages.py:17735](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L17735)
- Added an `output-only` `status` field, of type `InstanceGroupManagerStatus` (which includes an `isStable` field), to the `InstanceGroupManager` message in the Compute alpha API, to provide information about the manager's operational state.
  - File: [compute_alpha_messages.py:24241](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L24241)
- Added an `output-only` `size` field to the `NodeGroup` message in the Compute alpha API, indicating the total number of nodes in the group.
  - File: [compute_alpha_messages.py:30195](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L30195)
- Added an `output-only` `state` field, of type `StateValueValuesEnum` (with `DRAINING` and `READY` values), to the `Subnetwork` message in the Compute alpha API, indicating the subnetwork's operational state.
  - File: [compute_alpha_messages.py:37838](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L37838)
- Added new IAM policy methods (`GetIamPolicy`, `SetIamPolicy`) for Disks, Images, Instance Templates, Instances, and Snapshots in the Compute beta API, enabling fine-grained access control management for these resources.
  - File: [compute_beta_client.py:1362](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_client.py#L1362)
- Introduced comprehensive API support for managing Node Groups, Node Templates, and Node Types in the `v1` API. This includes new services `NodeGroupsService`, `NodeTemplatesService`, and `NodeTypesService` with methods like `AddNodes`, `DeleteNodes`, `SetNodeTemplate` for Node Groups, and `Insert`, `Delete`, `Get`, `List` operations for all three resource types.
  - File: [compute_v1_client.py:65](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_client.py#L65)
- Added `GetIamPolicy` and `SetIamPolicy` API request messages for `Disks`, `Images`, `Instance Templates`, `Instances`, and `Snapshots` in the `beta` API, enabling IAM policy management for these Compute Engine resources.
  - File: [compute_beta_messages.py:4885](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L4885)
- Added a new `portSpecification` field and `PortSpecificationValueValuesEnum` to the `TCPHealthCheck` message in the `beta` API, allowing more flexible port selection for health checks (options include `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`).
  - File: [compute_beta_messages.py:32596](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L32596)
- New API methods and schemas for Node Group management have been introduced, including `ComputeNodeGroupsAddNodesRequest` and `ComputeNodeGroupsAggregatedListRequest`, along with new resource collections `NODEGROUPS`, `NODETEMPLATES`, and `NODETYPES`.
  - File: [resources.py:222](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/resources.py#L222)
- Added new API method `compute.networks.listIpAddresses` to list internal IP addresses in a specified network, supporting various filter types (`SUBNETWORK`, `RESERVED`, etc.).
  - File: [compute_alpha.json:37038](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L37038)
- Added new API method `compute.urlMaps.aggregatedList` to retrieve all `UrlMap` resources (regional and global) for a project.
  - File: [compute_alpha.json:49007](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L49007)
- The `compute.subnetworks.patch` method now supports a `drainTimeoutSeconds` parameter to specify the time allowed for draining connections from a subnetwork when transitioning its role.
  - File: [compute_alpha.json:46293](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L46293)
- The `InstanceGroupManager` resource now includes an `Output Only` `status` field, providing detailed information about the stability of the managed instance group through the new `InstanceGroupManagerStatus` schema.
  - File: [compute_alpha.json:8094](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L8094)
- The `NodeGroup` resource now includes an `Output Only` `size` field, indicating the total number of nodes in the group.
  - File: [compute_alpha.json:13503](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L13503)
- The `Subnetwork` resource now includes an `Output Only` `state` field, which can be `READY` or `DRAINING`.
  - File: [compute_alpha.json:20432](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L20432)
- IAM policy management has been added for `disks`, `images`, `instanceTemplates`, `instances`, and `snapshots` resources, with new `getIamPolicy` and `setIamPolicy` methods.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)
- The `NodeGroup` resource now includes an `size` field to report the total number of nodes in the group.
  - File: [compute_beta.json:11402](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L11402)
- The `TcpHealthCheck` resource now includes a `portSpecification` field, allowing explicit control over how ports are selected for health checking, with options like `USE_FIXED_PORT`, `USE_NAMED_PORT`, and `USE_SERVING_PORT`.
  - File: [compute_beta.json:17821](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L17821)

### Service Usage

- Introduced programmatic API calls to enable, batch enable, disable, and list Google Cloud services.
  - File: [serviceusage.py:23](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/services/serviceusage.py#L23)

### Compute Engine (Load Balancing)

- The `--load-balancing-scheme` flag for backend services and forwarding rules now supports `INTERNAL_SELF_MANAGED` (alpha), likely for Traffic Director integration.
  - Flags: `--load-balancing-scheme`
  - File: [flags.py:181](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/backend_services/flags.py#L181)
- The `--ports` flag for forwarding rules now supports a more flexible input, including the keyword `ALL` and multiple comma-separated port ranges (alpha).
  - Flags: `--ports`
  - File: [flags.py:365](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/forwarding_rules/flags.py#L365)

### Compute Engine (VPC Network Peering)

- Added new flags for configuring custom route import and export in VPC network peering connections.
  - Flags: `--import-custom-routes`, `--export-custom-routes`
  - File: [flags.py:19](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/networks/peerings/flags.py#L19)

### Cloud SQL

- A comprehensive set of new flags to configure various aspects of Cloud SQL instances, including private IP, maintenance windows, replica settings, binary logging, instance resources, and database versions.
  - Flags: `--assign-private-ip`, `--no-assign-private-ip`, `--connect-mode`, `--enable-google-root-certificates`, `--maintenance-window-day`, `--maintenance-window-hour`, `--network`, `--private-ip-address`, `--recreate-replica`, `--replica-activation-policy`, `--root-password`, `--enable-binlog`, `--force-restart`, `--instance-maintenance-version`, `--no-enable-binlog`, `--availability-type`, `--cpu-type`, `--memory-type`, `--storage-size`, `--database-version`, `--storage-auto-increase`, `--no-storage-auto-increase`
  - File: [flags.py:360](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/sql/flags.py#L360)
- Added a new group of flags (`--source-ip-address`, `--source-port`, `--master-username`, `--master-password`, `--prompt-for-master-password`, `--master-dump-file-path`, `--master-ca-certificate-path`, `--client-certificate-path`, `--client-key-path`) for configuring external primary instances and creating replicas of them.
  - Flags: `--source-ip-address`, `--source-port`, `--master-username`, `--master-password`, `--prompt-for-master-password`, `--master-dump-file-path`, `--master-ca-certificate-path`, `--client-certificate-path`, `--client-key-path`
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/sql/flags.py)
- Added the `--network` flag for specifying the VPC network an instance will be part of.
  - Flags: `--network`
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/sql/flags.py)

### VPC Access

- New API client and message definitions (`v1alpha1`) are added, indicating the introduction of the Cloud VPC Access service, which allows serverless environments to connect to VPC networks.
  - File: [vpcaccess_v1alpha1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess/v1alpha1/vpcaccess_v1alpha1_client.py)
- Initial groundwork for VPC Access API (`vpcaccess`) at `v1alpha1` has been added to the SDK.
  - File: [apis_map.py:737](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/apis_map.py#L737)

### Binary Authorization

- Added new resource specifications and presentation for `attestors`, laying groundwork for new `gcloud container binauthz attestors` commands (beta).
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/binauthz/flags.py)
- Added client library for Binary Authorization API `v1beta1`, enabling management of `attestors` and project-level `policies`. This includes operations such as creating, deleting, getting, listing, and updating `attestors`, as well as getting and updating the project `policy`.
  - File: [binaryauthorization_v1beta1_client.py:6](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/binaryauthorization/v1beta1/binaryauthorization_v1beta1_client.py#L6)
- Initial release of the Binary Authorization API (v1beta1), enabling the creation and management of policies, admission rules, attestors, and public keys for enforcing container image deployment policies.
  - File: [binaryauthorization_v1beta1.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/binaryauthorization_v1beta1.json#L1)
- Registers the `v1beta1` API for Binary Authorization, alongside the existing `v1alpha1`.
  - File: [regen_apis_config.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml)

### Kubernetes Engine

- The `--addons` flag now supports different addon options based on the release track (alpha vs. beta/GA).
  - Flags: `--addons`
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py)
- Added the `desiredLoggingService` field to `ClusterUpdate` messages, allowing users to configure the logging service for a cluster with options like `logging.googleapis.com/kubernetes`, `logging.googleapis.com`, or `none`.
  - File: [container_v1alpha1_messages.py:562](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L562)
- Expanded the description for the `desiredMonitoringService` field in `ClusterUpdate` messages to explicitly mention `monitoring.googleapis.com/kubernetes` for Kubernetes-native resource model in Stackdriver.
  - File: [container_v1alpha1_messages.py:582](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L582)
- Added the `desiredLoggingService` field to `ClusterUpdate` messages (v1beta1), allowing users to configure the logging service for a cluster with options like `logging.googleapis.com/kubernetes`, `logging.googleapis.com`, or `none`.
  - File: [container_v1beta1_messages.py:504](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1beta1/container_v1beta1_messages.py#L504)
- Expanded the description for the `desiredMonitoringService` field in `ClusterUpdate` messages (v1beta1) to explicitly mention `monitoring.googleapis.com/kubernetes` for Kubernetes-native resource model in Stackdriver.
  - File: [container_v1beta1_messages.py:525](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1beta1/container_v1beta1_messages.py#L525)

### Dataproc

- Introduced `--source` and `--destination` flags for workflow templates, enabling importing and exporting of templates from/to YAML files.
  - Flags: `--source`, `--destination`
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/flags.py)
- The `--parameters` flag for workflow templates is no longer hidden, making it generally available.
  - Flags: `--parameters`
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/flags.py)

### Filestore

- Updated the list format for Filestore instances to use `FILE_SHARE_NAME` instead of `VOLUME_NAME` and adjusted the upper bound for file share capacity.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/filestore/instances/flags.py)
- Added new functions `AddInstanceCreateArgs` and `AddInstanceUpdateArgs` to simplify adding arguments for creating and updating Filestore instances, including description, tier, file share, network, and labels.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/filestore/instances/flags.py)

### Core/Framework

- Introduced a new abstraction (`ProgressTrackerSymbols`) for console spinner characters, enabling the use of Unicode spinner characters (e.g., `⠏`, `⠛`) when supported by the terminal. Otherwise, ASCII characters (`|`, `/`, `-`, `\`) are used.
  - File: [console_attr.py:161](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/console/console_attr.py#L161)

### Cloud Composer

- Initial client library for the Cloud Composer API (v1) was added, providing programmatic methods for creating, deleting, getting, listing, and patching environments, as well as managing long-running operations.
  - File: [composer_v1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_client.py#L1)
- Introduction of the Cloud Composer v1 API, providing programmatic management of Apache Airflow environments. This includes operations for creating, getting, listing, updating, and deleting environments, as well as managing environment configurations (e.g., node configuration, software packages, Airflow overrides, environment variables).
  - File: [composer_v1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_messages.py#L1)
- Registers the `v1` API as the default version for Cloud Composer.
  - File: [regen_apis_config.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml)

### Service Networking

- Introduced the new `v1beta` API for Service Networking. This includes new client services for operations, service connections, and services, offering methods such as `servicenetworking.operations.get`, `servicenetworking.services.connections.create`, `servicenetworking.services.connections.list`, and `servicenetworking.services.addSubnetwork` to manage VPC network peering connections and subnets.
  - File: [servicenetworking_v1beta_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking/v1beta/servicenetworking_v1beta_client.py#L1)
- Introduced messages for the `v1beta` version of the Service Networking API, including `AddSubnetworkRequest` and `AddSubnetworkResponse`, indicating new functionality for managing (adding) subnetworks in peered service networks.
  - File: [servicenetworking_v1beta_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking/v1beta/servicenetworking_v1beta_messages.py#L1)
- Introduction of the Service Networking API (v1beta), enabling automatic management of network configurations for certain services.
  - File: [servicenetworking_v1beta.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking_v1beta.json#L1)
- Registers the `v1beta` API as the default version for Service Networking.
  - File: [regen_apis_config.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml)

### Serverless VPC Access

- Introduction of the Serverless VPC Access API (v1alpha1) for managing VPC Access connectors, including operations like creating, deleting, getting, and listing connectors.
  - File: [vpcaccess_v1alpha1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess/v1alpha1/vpcaccess_v1alpha1_client.py#L1)
- Introduces the `v1alpha1` API for Serverless VPC Access, enabling the creation, retrieval, listing, and deletion of VPC access connectors.
  - File: [vpcaccess_v1alpha1.json](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess_v1alpha1.json)

## Credential & Auth Changes

- The `http.Http` client, used for making API requests, now supports specifying custom CA certificates through a new `ca_certs` argument. This allows for more flexible certificate trust store configurations, potentially for enterprise environments or custom proxies.
  - File: [http.py:8](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/credentials/http.py#L8)
- Introduced flags for specifying master credentials (`--master-username`, `--master-password`, `--prompt-for-master-password`) and SSL certificates (`--master-ca-certificate-path`, `--client-certificate-path`, `--client-key-path`) when configuring Cloud SQL external primary instances and their replicas.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/sql/flags.py)
- The core HTTP client now supports explicit CA certificate file specification via a new `ca_certs` parameter, which is overridden by the `core/custom_ca_certs_file` gcloud configuration property.
  - File: [http.py:41](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/http.py#L41)
- The HTTP client used for credentials now also accepts an explicit `ca_certs` argument.
  - File: [http.py:36](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/credentials/http.py#L36)

## API Changes

### Compute Engine

- Extensive updates to Compute Engine API messages for alpha, beta, and v1, supporting new features like KMS integration for boot disks, network endpoint groups, and health check configurations.
  - File: [compute_v1_messages.py:14](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L14)
- Significant updates to `compute_v1_messages.py` and `compute_v1.json`, indicating changes to the Compute Engine v1 API, alongside updates to alpha and beta clients/messages.
  - File: [compute_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/third_party/apis/compute/v1/compute_v1_messages.py)
- Clarified the descriptions for `signedUrlCacheMaxAgeSec` and `signedUrlKeyNames` fields in `BackendBucketCdnPolicy` and `BackendServiceCdnPolicy` messages in the Compute alpha API for better understanding of Cloud CDN signed URL behavior.
  - File: [compute_alpha_messages.py:2380](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L2380)
- Updated the description for the `condition` field in the `Binding` message in the Compute alpha API, explicitly marking it as `Unimplemented` and removing mentions of internal visibility.
  - File: [compute_alpha_messages.py:3236](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L3236)
- Expanded and clarified the descriptions for `filter`, `maxResults`, `order_by`, and `pageToken` query parameters in several list request messages (`ComputeInstanceGroupManagersListManagedInstancesRequest`, `ComputeProjectsGetXpnResourcesRequest`, `ComputeProjectsListXpnHostsRequest`, `ComputeRegionInstanceGroupManagersListManagedInstancesRequest`) in the Compute alpha API.
  - File: [compute_alpha_messages.py:7550](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L7550)
- Updated the docstrings for `BackendBucketsService.AddSignedUrlKey` and `BackendBucketsService.DeleteSignedUrlKey` methods in the Compute beta API for clarity on adding/deleting keys for signed URL validation.
  - File: [compute_beta_client.py:605](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_client.py#L605)
- Updated the docstrings for `BackendServicesService.AddSignedUrlKey` and `BackendServicesService.DeleteSignedUrlKey` methods in the Compute beta API for clarity on adding/deleting keys for signed URL validation.
  - File: [compute_beta_client.py:823](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_client.py#L823)
- Added the `size` field (output only, integer) to the `NodeGroup` message in the `beta` API, indicating the total number of nodes in the node group.
  - File: [compute_beta_messages.py:25672](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L25672)
- Descriptions for `signedUrlCacheMaxAgeSec` and `signedUrlKeyNames` in `BackendBucketCdnPolicy` and `BackendServiceCdnPolicy` have been clarified for better understanding of Cloud CDN signed URL caching behavior.
  - File: [compute_v1_messages.py:2037](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L2037)
- Expanded and clarified descriptions for common list request parameters (`filter`, `maxResults`, `order_by`, `pageToken`) across several Compute Engine API methods, including `compute.instanceGroupManagers.listManagedInstances`.
  - File: [compute_v1_messages.py:6124](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L6124)
- Added `NVDIMM` as a new supported disk interface type within the `compute_alpha.json` API.
  - File: [compute_alpha.json:1064](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L1064)
- The description for `Binding.condition` in IAM policies has been updated to explicitly state that it is 'Unimplemented' in `compute_alpha.json`.
  - File: [compute_alpha.json:2752](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L2752)
- Clarified descriptions for the `addSignedUrlKey` and `deleteSignedUrlKey` methods on backend buckets and backend services.
  - File: [compute_alpha.json:25891](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L25891)
- The Compute Engine Beta API revision has been updated from `20180620` to `20180701`.
  - File: [compute_beta.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L7)
- Descriptions for `signedUrlCacheMaxAgeSec` and `signedUrlKeyNames` in `BackendBucket` and `BackendService` resources have been clarified to better explain their function in Cloud CDN Signed URLs.
  - File: [compute_beta.json:1891](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L1891)
- The description for the `condition` field within IAM `Binding` has been updated to mark it as 'Unimplemented', changing from a previous internal visibility note.
  - File: [compute_beta.json:2563](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L2563)
- A new schema `GlobalSetPolicyRequest` has been introduced, including `bindings`, `etag`, and a primary `policy` field for setting IAM policies globally, with `bindings` and `etag` deprecated in favor of `policy`.
  - File: [compute_beta.json:4988](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L4988)
- The `SecurityPolicy` description has been updated with an internal tag reference `(== resource_for beta.securityPolicies ==)`.
  - File: [compute_beta.json:16341](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L16341)
- Descriptions for `addSignedUrlKey` and `deleteSignedUrlKey` methods on `backendBuckets` and `backendServices` have been updated for clarity.
  - File: [compute_beta.json:22082](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L22082)
- Expanded descriptions and examples have been added for common list query parameters (`filter`, `maxResults`, `order_by`, `pageToken`) across multiple Compute Engine list methods.
  - File: [compute_beta.json:26340](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L26340)
- Clarified the descriptions for `signedUrlCacheMaxAgeSec` and `signedUrlKeyNames` within `BackendBucketCdnPolicy` and `BackendServiceCdnPolicy` to improve accuracy regarding Cloud CDN Signed URL behavior.
  - File: [compute_v1.json:1740](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json#L1740)
- Introduced a new `NodeGroup` API resource schema, defining properties such as `creationTimestamp`, `description`, `id`, `kind`, `name`, `nodeTemplate`, `selfLink`, and `size`.
  - File: [compute_v1.json:9925](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json#L9925)

### Cloud Functions

- `cloudfunctions_v1_messages.py` was updated to include `environmentVariables` support for Cloud Functions.
  - File: [cloudfunctions_v1_messages.py:14](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudfunctions/v1/cloudfunctions_v1_messages.py#L14)
- Updates to `cloudfunctions_v1_messages.py` and `cloudfunctions_v1.json`, indicating changes to the Cloud Functions v1 API.
  - File: [cloudfunctions_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/third_party/apis/cloudfunctions/v1/cloudfunctions_v1_messages.py)
- Added new fields `environmentVariables` and `network` to the `CloudFunction` message for `cloudfunctions/v1`. The `environmentVariables` field allows setting runtime environment variables, and the `network` field enables VPC network connectivity for functions.
  - File: [cloudfunctions_v1_messages.py:47](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudfunctions/v1/cloudfunctions_v1_messages.py#L47)

### Cloud Filestore

- Introduction of the `file/v1beta1` API client, messages, and schema, enabling management of Filestore instances.
  - File: [file_v1beta1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1beta1/file_v1beta1_client.py#L1)
- Full API client and message definitions for Cloud Filestore `v1beta1` are added, indicating its promotion to beta. This also includes a change in attribute name from `instance.volumes` to `instance.fileShares` for file share configurations.
  - File: [file_v1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1beta1/file_v1beta1_client.py)

### Cloud Composer

- Introduction of the `composer/v1` API client, messages, and schema.
  - File: [composer_v1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_client.py#L1)
- New API client, messages, and resources (`composer/v1`) were generated for Cloud Composer.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/third_party/apis/composer/v1/__init__.py)
- Added the `composer/v1` API client (`ComposerV1`) and its associated messages and resources, defining the API for managing Cloud Composer environments and operations.
  - File: [composer_v1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_client.py#L1)
- Added new API definitions for Cloud Composer v1, including message classes such as `Environment`, `EnvironmentConfig`, `NodeConfig`, `SoftwareConfig`, `Operation`, `OperationMetadata`, and request/response messages for environment and operation management. This also introduces resource collections for `projects`, `projects.locations`, `projects.locations.environments`, and `projects.locations.operations`.
  - File: [composer_v1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_messages.py#L1)
- Added the entire API definition for Cloud Composer v1, enabling management of Apache Airflow environments. This includes schemas for `Environment`, `EnvironmentConfig`, `SoftwareConfig`, `NodeConfig`, and methods for creating, getting, listing, patching, and deleting environments, as well as listing, getting, and deleting operations.
  - File: [composer_v1.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer_v1.json#L1)
- Updated `regen_apis_config.yaml` to register and set `composer:v1` as the default API version.
  - File: [regen_apis_config.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml)

### Service Networking

- Introduction of the `servicenetworking/v1beta` API client, messages, and schema.
  - File: [servicenetworking_v1beta_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking/v1beta/servicenetworking_v1beta_client.py#L1)
- Full API client and message definitions for Service Networking `v1beta` are added, confirming its promotion from alpha. The API method for creating connections has changed from `services.Peer` to `services_connections.Create`.
  - File: [servicenetworking_v1beta_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking/v1beta/servicenetworking_v1beta_client.py)
- New API client, messages, and resources (`servicenetworking/v1beta`) were generated, indicating the introduction or significant update of the Service Networking API.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/third_party/apis/servicenetworking/v1beta/__init__.py)
- Service Networking API `v1beta` has been added and set as the new default API version. `v1alpha` is no longer the default.
  - File: [apis_map.py:594](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/apis_map.py#L594)
- The `MetricDescriptor` schema in the `servicenetworking/v1alpha` API has been updated to include an optional `metadata` field, which references a new `MetricDescriptorMetadata` message type. This new metadata structure provides fields for `ingestDelay`, `launchStage`, and `samplePeriod` to guide metric usage.
  - File: [servicenetworking_v1alpha_messages.py:1146](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking/v1alpha/servicenetworking_v1alpha_messages.py#L1146)
- Introduced the `v1beta` version of the Service Networking API by adding new message definitions in `servicenetworking_v1beta_messages.py`. This new API version includes messages for operations such as `AddSubnetworkRequest`, `AddSubnetworkResponse`, and general API definition components like `Api` and `AuthProvider`.
  - File: [servicenetworking_v1beta_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking/v1beta/servicenetworking_v1beta_messages.py#L1)
- Updated the `v1alpha` Service Networking API schema (`servicenetworking_v1alpha.json`) to include a `metadata` field within `MetricDescriptor` and introduced the new `MetricDescriptorMetadata` schema. This new metadata includes `launchStage`, `samplePeriod`, and `ingestDelay` for providing richer context about API metrics.
  - File: [servicenetworking_v1alpha.json:1576](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking_v1alpha.json#L1576)
- Updated `regen_apis_config.yaml` to register and set `servicenetworking:v1beta` as the default API version.
  - File: [regen_apis_config.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml)

### VPC Access

- Introduction of the `vpcaccess/v1alpha1` API client, messages, and schema.
  - File: [vpcaccess_v1alpha1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess/v1alpha1/vpcaccess_v1alpha1_client.py#L1)
- New API client and message definitions (`v1alpha1`) are added for the Cloud VPC Access service, signifying its introduction.
  - File: [vpcaccess_v1alpha1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess/v1alpha1/vpcaccess_v1alpha1_client.py)
- New API client, messages, and resources (`vpcaccess/v1alpha1`) were generated for VPC Access, indicating a new VPC Access API version.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/third_party/apis/vpcaccess/v1alpha1/__init__.py)

### Binary Authorization

- The Binary Authorization API introduced a `v1beta1` version for attestors, including new client and message definitions. This updates resource names from `attestationAuthorities` to `attestors` in API calls.
  - File: [authorities.py:28](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/container/binauthz/authorities.py#L28)
- New API client, messages, and resources (`binaryauthorization/v1beta1`) were generated, indicating the introduction or significant update of the Binary Authorization API.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/third_party/apis/binaryauthorization/v1beta1/__init__.py)
- Added API definition for `binaryauthorization/v1beta1`.
  - File: [apis_map.py:140](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/apis_map.py#L140)
- Introduced new `binaryauthorization_v1beta1_client.py` with methods for `projects.attestors` (Create, Delete, Get, GetIamPolicy, List, SetIamPolicy, TestIamPermissions, Update) and `projects.policy` (GetIamPolicy, SetIamPolicy, TestIamPermissions, GetPolicy, UpdatePolicy).
  - File: [binaryauthorization_v1beta1_client.py:31](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/binaryauthorization/v1beta1/binaryauthorization_v1beta1_client.py#L31)
- Added new API message classes for `binaryauthorization/v1beta1`, including `AdmissionRule`, `Attestor`, `Policy`, `UserOwnedDrydockNote`, and IAM-related messages (`IamPolicy`, `Binding`).
  - File: [binaryauthorization_v1beta1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/binaryauthorization/v1beta1/binaryauthorization_v1beta1_messages.py#L1)
- Added resource definitions for `binaryauthorization/v1beta1`, defining collections for `PROJECTS`, `PROJECTS_ATTESTORS`, and `PROJECTS_POLICY`.
  - File: [resources.py:27](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/binaryauthorization/v1beta1/resources.py#L27)
- Introduced the complete `binaryauthorization:v1beta1` API definition, including new schemas for `Policy`, `AdmissionWhitelistPattern`, `AdmissionRule`, `Attestor`, `UserOwnedDrydockNote`, `AttestorPublicKey`, and resource methods for `projects.policy` and `projects.attestors` (e.g., `create`, `get`, `update`, `delete`, `list`, `setIamPolicy`, `getIamPolicy`, `testIamPermissions`).
  - File: [binaryauthorization_v1beta1.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/binaryauthorization_v1beta1.json#L1)
- Updated `regen_apis_config.yaml` to register `binaryauthorization:v1beta1`.
  - File: [regen_apis_config.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml)

### Filestore

- New API client, messages, and resources (`file/v1beta1`) were generated for Filestore, suggesting a new Filestore API version.
  - File: [file_v1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/third_party/apis/file/v1beta1/file_v1beta1_client.py)

### Cloud Tasks

- Updates to `cloudtasks_v2beta2_client.py` and `cloudtasks_v2beta2_messages.py`, indicating changes to the Cloud Tasks v2beta2 API.
  - File: [cloudtasks_v2beta2_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_client.py)
- Removed the `orderBy` query parameter from the `cloudtasks.projects.locations.queues.tasks.list` method for `cloudtasks/v2beta2`.
  - File: [cloudtasks_v2beta2_client.py:285](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_client.py#L285)

### Container Engine

- Updates to `container_v1alpha1_messages.py` and `container_v1beta1_messages.py`, indicating changes to Container Engine alpha and beta APIs.
  - File: [container_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py)

### Composer

- Composer API `v1` has been added and set as the new default API version. `v1beta1` is no longer the default.
  - File: [apis_map.py:284](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/apis_map.py#L284)

### Compute Engine (Alpha)

- Added a new `compute.networks.ListIpAddresses` method to list internal IP addresses in a specified network.
  - File: [compute_alpha_client.py:7240](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L7240)
- Added `requestId` as a query parameter for the `compute.regionInstanceGroupManagers.updatePerInstanceConfigs` method.
  - File: [compute_alpha_client.py:9958](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L9958)
- Added `drainTimeoutSeconds` as a query parameter for the `compute.subnetworks.patch` method.
  - File: [compute_alpha_client.py:12788](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L12788)
- Added a new `compute.urlMaps.AggregatedList` method to retrieve a list of all UrlMap resources, both regional and global.
  - File: [compute_alpha_client.py:14462](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L14462)

### Cloud Logging

- The `MetricDescriptor` schema in the `logging/v2` API has been updated to include an optional `metadata` field, which references a new `MetricDescriptorMetadata` message type. This new metadata structure provides fields for `ingestDelay`, `launchStage`, and `samplePeriod` to guide metric usage.
  - File: [logging_v2_messages.py:2384](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/logging/v2/logging_v2_messages.py#L2384)

### Service Management

- The `MetricDescriptor` schema in the `servicemanagement/v1` API has been updated to include an optional `metadata` field, which references a new `MetricDescriptorMetadata` message type. This new metadata structure provides fields for `ingestDelay`, `launchStage`, and `samplePeriod` to guide metric usage.
  - File: [servicemanagement_v1_messages.py:1851](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_messages.py#L1851)

### Service User

- The `MetricDescriptor` schema in the Service User API (v1) now includes an optional `metadata` field, which references a new `MetricDescriptorMetadata` object. This metadata object provides fields for `ingestDelay`, `launchStage`, and `samplePeriod` to guide metric usage.
  - File: [serviceuser_v1_messages.py:1054](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceuser/v1/serviceuser_v1_messages.py#L1054)

### SQL Admin

- Minor API revision update for `sqladmin_v1beta4`.
  - File: [sqladmin_v1beta4.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin_v1beta4.json#L7)

### Cloud Storage

- Minor API revision update for `storage_v1`.
  - File: [storage_v1.json:4](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/storage_v1.json#L4)

### Cloud Tool Results

- Minor API revision update for `toolresults_v1beta3`.
  - File: [toolresults_v1beta3.json:5](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/toolresults_v1beta3.json#L5)

### Serverless VPC Access

- Added the new `vpcaccess:v1alpha1` API definition and registered it in the API configuration.
  - File: [vpcaccess_v1alpha1.json](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess_v1alpha1.json)

## Unannounced Changes

*Changes found in code but not mentioned in official release notes:* 🕵️

### Hidden Feature

- The `SERVERLESS` addon (which auto-enables Istio if not specified) was added as an alpha addon option for Kubernetes Engine clusters.
  - File: [api_adapter.py:125](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/container/api_adapter.py#L125)
- Added a hidden flag `--resource-usage-bigquery-dataset` to export cluster resource usage to BigQuery for Kubernetes Engine.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py)
- Added a hidden flag `--connected-vpc` to specify the VPC network for Cloud Functions.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/flags.py)
- Added hidden flags `--max-instances` and `--clear-max-instances` for Cloud Functions to control the maximum number of function instances.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/flags.py)
- The `environmentVariables` field was added to the `CloudFunction` message in `cloudfunctions/v1`, explicitly described in the API definition as a 'Beta Feature'.
  - File: [cloudfunctions_v1_messages.py:47](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudfunctions/v1/cloudfunctions_v1_messages.py#L47)
- The `network` field was added to the `CloudFunction` message in `cloudfunctions/v1`, explicitly described in the API definition as an 'Alpha feature, available only for whitelisted users'.
  - File: [cloudfunctions_v1_messages.py:69](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudfunctions/v1/cloudfunctions_v1_messages.py#L69)
- Added new `getIamPolicy` and `setIamPolicy` methods for `disks`, allowing granular IAM policy management for individual disks.
  - File: [compute_beta.json:23278](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L23278)
- Added new `getIamPolicy` and `setIamPolicy` methods for `images`, allowing granular IAM policy management for individual images.
  - File: [compute_beta.json:25969](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L25969)
- Added new `getIamPolicy` and `setIamPolicy` methods for `instanceTemplates`, allowing granular IAM policy management for individual instance templates.
  - File: [compute_beta.json:27579](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L27579)
- Added new `getIamPolicy` and `setIamPolicy` methods for `instances`, allowing granular IAM policy management for individual instances.
  - File: [compute_beta.json:28132](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L28132)
- Added new `getIamPolicy` and `setIamPolicy` methods for `snapshots`, allowing granular IAM policy management for individual snapshots.
  - File: [compute_beta.json:37035](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L37035)
- Added `size` field to the `NodeGroup` resource.
  - File: [compute_beta.json:11402](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L11402)
- Added `portSpecification` field to `TcpHealthCheck` for advanced port selection in health checks.
  - File: [compute_beta.json:17821](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L17821)
- The API description for `GoogleCloudMlV1TrainingInput.masterType` and `GoogleCloudMlV1TrainingInput.scaleTier` in the `ml/v1` API has been updated to remove mentions of Cloud TPU being in the `Beta` launch stage, suggesting a potential move to General Availability.
  - File: [ml_v1_messages.py:962](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/ml/v1/ml_v1_messages.py#L962)

### Groundwork

- Added `resource_usage_bigquery_dataset` option to `CreateClusterOptions` in Kubernetes Engine, allowing configuration of BigQuery export for cluster resource usage.
  - File: [api_adapter.py:352](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/container/api_adapter.py#L352)
- A new `serviceusage.py` module was introduced with substantial additions, indicating groundwork for new service management capabilities.
  - File: [serviceusage.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/services/serviceusage.py#L1)
- A new `ssh/ip.py` module was added, likely providing improved utilities for SSH IP address handling.
  - File: [ip.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/ssh/ip.py#L1)
- Added new YAML schema definition for Dataproc Workflow Templates v1beta2, detailing the structure for jobs, labels, placement, and parameters. This is groundwork for the new Workflow Template feature.
  - File: [WorkflowTemplate_v1beta2_schema.yaml:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/dataproc/schemas/WorkflowTemplate_v1beta2_schema.yaml#L1)
- Changes to Calliope's concept dependency resolution (`deps.py`) to allow more explicit control and better type handling for plural (list) values in fallthroughs for resource arguments.
  - File: [deps.py:60](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/deps.py#L60)
- New module structure for `gcloud compute networks peerings` commands.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/networks/peerings/__init__.py)
- Addition of `AddCreateRouterArgsForAlpha` suggests future alpha features for router creation, mirroring the existing `AddCreateRouterArgs`.
  - File: [flags.py:98](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/routers/flags.py#L98)
- Addition of `ClearScreen` function for console manipulation, potentially for interactive commands or visual output.
  - File: [console_attr.py:287](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/console/console_attr.py#L287)
- New modules `command_lib/functions/deploy/env_vars_util.py` were added to manage environment variables for Cloud Functions, indicating new functionality not yet fully announced.
  - File: [env_vars_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/deploy/env_vars_util.py)
- Introduced new files and updated existing ones to generate static completion CLI trees, which is an internal improvement for gcloud's tab completion.
  - File: [generate.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/static_completion/generate.py)
- New file `export.py` introduces utilities for generating YAML schemas for `gcloud export/import` commands, providing a standardized way to define and validate resource configurations.
  - File: [export.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/apis/export.py#L0)
- New file `map_util.py` introduces utility functions (`AddMapUpdateFlag`, `AddMapRemoveFlag`, `AddMapClearFlag`, `AddMapSetFlag`, `AddMapSetFileFlag`) to standardize handling of dictionary-like arguments on the command line (e.g., `--update-labels=KEY=VALUE`).
  - File: [map_util.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/args/map_util.py#L0)
- New file `ip.py` introduces an `IpTypeEnum` for `INTERNAL` and `EXTERNAL` IP addresses, likely for future use in networking-related commands.
  - File: [ip.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/ssh/ip.py#L0)
- The `data/cli` directory, which likely contains the static completion CLI tree, is now included in the SDK's Python compilation process.
  - File: [local_state.py:605](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/updater/local_state.py#L605)
- Complete new API client, messages, and resource definitions for the `Binary Authorization v1beta1` service have been added, providing functionality for managing attestors and policies.
  - File: [binaryauthorization_v1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/binaryauthorization/v1beta1/binaryauthorization_v1beta1_client.py)
- Initial groundwork for the new Cloud Composer service API includes the creation of the `composer/v1` package marker and the `ComposerV1` client library.
  - File: [composer_v1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_client.py#L1)
- New API client and message definitions for Cloud Composer v1 have been added. This groundwork enables comprehensive programmatic control over Composer environments, including detailed configuration options for nodes and software within the environment. This is a significant addition not mentioned in the release notes.
  - File: [composer_v1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_messages.py#L1)
- An internal annotation was added to the `SecurityPolicy` class description in the Compute alpha API (`(== resource_for beta.securityPolicies ==)`).
  - File: [compute_alpha_messages.py:36154](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L36154)
- Introduced the `GlobalSetPolicyRequest` message in the `beta` API, defining fields for `bindings`, `etag`, and `policy`, which serves as groundwork for the new IAM policy management functionality.
  - File: [compute_beta_messages.py:18392](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L18392)
- The `compute_alpha.json` API revision has been updated to `20180701`.
  - File: [compute_alpha.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L7)
- The `requestId` parameter has been added to the `compute.nodeGroups.addNodes` method for idempotency.
  - File: [compute_alpha.json:41694](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L41694)
- Minor description clarification for the `SecurityPolicy` schema.
  - File: [compute_alpha.json:18720](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L18720)
- New `GlobalSetPolicyRequest` schema with deprecated `bindings` and `etag` fields in favor of a new `policy` field for more unified IAM policy setting.
  - File: [compute_beta.json:4988](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L4988)
- Updated the Compute Engine API `v1` revision from `20180620` to `20180701`.
  - File: [compute_v1.json:4](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json#L4)
- Updated Kubernetes Engine API `v1alpha1` and `v1beta1` revisions from `20180620` to `20180701`.
  - File: [v1alpha1.json:4](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1.json#L4)
- Updated Deployment Manager API revisions (`alpha`, `v2`, `v2beta`) from `20180620` to `20180622`.
  - File: [deploymentmanager_alpha.json:5](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/deploymentmanager_alpha.json#L5)
- Updated DNS API revisions (`v1`, `v1alpha2`, `v1beta1`, `v1beta2`, `v2beta1`) from `20180620` to `20180622`.
  - File: [dns_v1.json:4](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dns_v1.json#L4)
- Added new `v1beta` API definitions for the Service Networking API, including message classes such as `AddSubnetworkRequest`, `AddSubnetworkResponse`, `Api`, and `AuthProvider`. This is foundational work for new features in service networking.
  - File: [servicenetworking_v1beta_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking/v1beta/servicenetworking_v1beta_messages.py#L1)
- Updated the `v1alpha` Service Networking API schema by adding `metadata` to `MetricDescriptor` and defining a new `MetricDescriptorMetadata` object with fields like `launchStage`, `samplePeriod`, and `ingestDelay`. This enhances metric reporting capabilities.
  - File: [servicenetworking_v1alpha.json:1576](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking_v1alpha.json#L1576)
- Added new Python package structures for the `vpcaccess` API, including `__init__.py` and `resources.py` files for `v1alpha1`.
  - File: [__init__.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess/__init__.py#L1)
- Updated `regen_apis_config.yaml` to include `vpcaccess: v1alpha1` and `servicenetworking: v1beta`, indicating these APIs are now part of the SDK's auto-generated API clients.
  - File: [regen_apis_config.yaml:1](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L1)
- Complete addition of the `vpcaccess:v1alpha1` API, including schemas for connectors, operations, and locations, indicating the introduction of Serverless VPC Access functionality.
  - File: [vpcaccess_v1alpha1.json](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess_v1alpha1.json)
- Registration of `composer:v1` as the default API version for Cloud Composer in `regen_apis_config.yaml`.
  - File: [regen_apis_config.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml)
- Registration of `servicenetworking:v1beta` as the default API version for Service Networking in `regen_apis_config.yaml`.
  - File: [regen_apis_config.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml)
- Registration of the `binaryauthorization:v1beta1` API in `regen_apis_config.yaml`.
  - File: [regen_apis_config.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml)

### Refactoring

- The internal `Create` method for `NetworkEndpointGroupsClient` in Compute Engine was refactored, removing the `neg_type` parameter.
  - File: [network_endpoint_groups.py:31](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/network_endpoint_groups.py#L31)
- Deletions were observed in Cloud TPU API client, messages, and JSON files (`tpu/v1` and `v1alpha1`), indicating internal cleanup or re-organization of the API definitions.
  - File: [tpu_v1_client.py:27](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/tpu_v1_client.py#L27)
- Refactored `dataproc/util.py` to support schema-based YAML validation using `jsonschema` (via `_ValidateYaml` function) and introduced stream-based YAML reading and writing (`ReadYaml`, `WriteYaml`, `MessageToYaml`). This enhances flexibility for handling Dataproc configurations, especially for the new Workflow Templates.
  - File: [util.py:17](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/dataproc/util.py#L17)
- Minor refactoring in `datastore/operations.py` to simplify the instantiation of `waiter.CloudOperationPollerNoResources` by removing a redundant lambda function.
  - File: [operations.py:87](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/datastore/operations.py#L87)
- Refactored `dns/transaction_util.py` to use `googlecloudsdk.core.util.files.FileReader` and `files.FileWriter` for transaction file handling, standardizing file I/O operations.
  - File: [transaction_util.py:142](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/dns/transaction_util.py#L142)
- Extensive refactoring in the Cloud Filestore client (`filestore_client.py`) to support multiple API versions (alpha, beta) using an adapter pattern. New internal constants and utility functions for API client retrieval were introduced.
  - File: [filestore_client.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/filestore/filestore_client.py#L18)
- Improved error messages for `403 Forbidden` errors in Cloud Functions by extracting and displaying specific permission details.
  - File: [util.py:120](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/functions/util.py#L120)
- The `subprocess.check_output` call for `git version` is now wrapped with `encoding.Decode` to prevent UnicodeDecodeErrors.
  - File: [git.py:99](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/source/git.py#L99)
- Added a warning for unspecified IP allocation policy (`--enable-ip-alias`) during Kubernetes Engine cluster creation, indicating a future default change.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py)
- Refactored `RowDataParser` and added `_StripQuotes` for more robust parsing of column values in Spanner write operations.
  - File: [write_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/spanner/write_util.py)
- Refactored the static completion lookup logic, changing `FLAG_*` constants from integers to strings and removing `_GetFlagMode` function. This includes internal changes to `_FindCompletions` and new helper functions for loading completion data.
  - File: [lookup.py:20](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/static_completion/lookup.py#L20)
- Internal refactoring in `ResourceInfo` for concept fallthroughs, ensuring `plural` is consistently set and `copy.deepcopy` is used for fallthroughs.
  - File: [info_holders.py:17](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/info_holders.py#L17)
- Internal changes to `_ConsoleWriter` to allow immediate flushing of output, which is now enabled for `stderr_writer` to ensure critical errors are displayed promptly.
  - File: [log.py:140](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/log.py#L140)
- Refinements to `resource_expr.py` to disable deprecated diff warnings for dictionary attributes during resource expression matching, improving stability.
  - File: [resource_expr.py:119](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/resource/resource_expr.py#L119)
- Major internal refactoring in `resource_projector.py` to improve recursive object detection during resource projection by switching from a list to a set and using object `id()`s.
  - File: [resource_projector.py:65](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/resource/resource_projector.py#L65)
- Improved precision and consistency for `DateTime` fractional second formatting in `times.py` by using integer-based rounding, addressing potential floating-point discrepancies.
  - File: [times.py:330](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/core/util/times.py#L330)
- Refined descriptions for `AddSignedUrlKey` and `DeleteSignedUrlKey` methods in `backendBuckets` and `backendServices` to clarify their purpose for validating requests with signed URLs.
  - File: [compute_alpha_client.py:613](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L613)
- Expanded the descriptions for common listing parameters (`filter`, `maxResults`, `order_by`, `pageToken`) across various `Compute` API request messages (e.g., `ComputeInstanceGroupManagersListManagedInstancesRequest`, `ComputeProjectsGetXpnResourcesRequest`), providing more detailed guidance on their usage.
  - File: [compute_beta_messages.py:6756](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L6756)
- Clarified the description of the `condition` field within the `Binding` message, explicitly stating it is 'Unimplemented' and removing previous notes about internal or trusted tester visibility.
  - File: [compute_beta_messages.py:3029](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L3029)
- Minor rewording of descriptions for `AddSignedUrlKey` and `DeleteSignedUrlKey` methods in both `BackendBucketsService` and `BackendServicesService` (`v1` client) to be more precise about 'validating requests with signed URLs'.
  - File: [compute_v1_client.py:521](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_client.py#L521)
- Added an internal `resource_for` tag to the description of the `SecurityPolicy` message in the `beta` API, likely for tooling or metadata purposes.
  - File: [compute_beta_messages.py:31180](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L31180)
- Expanded and clarified descriptions for common list query parameters (`filter`, `maxResults`, `order_by`, `pageToken`) in various Compute Engine list methods.
  - File: [compute_beta.json:26340](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L26340)
- Removed the generic `Operation` schema definition from `compute_v1.json`. This is likely a refactoring to consolidate `Operation` definitions or to generate them differently.
  - File: [compute_v1.json:9925](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json#L9925)
- The `replicapoolupdater_v1beta1.json` API definition received a minor revision update from `20180620` to `20180622`.
  - File: [replicapoolupdater_v1beta1.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/replicapoolupdater_v1beta1.json#L7)

### Feature Flag

- The `--neg-type` flag in network endpoint groups is now conditionally added, hinting at feature gating for different API versions or tracks. It remains hidden and defaults to 'load-balancing'.
  - File: [flags.py:28](https://github.com/twistedpair/google-cloud-sdk/blob/208.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/network_endpoint_groups/flags.py#L28)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}157{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+35,295{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-13,356{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/207.0.0...208.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*