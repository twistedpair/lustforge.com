---
draft: false
title: "gcloud SDK 209.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2018-07-18
url: /gcloud/gcloud-sdk-209-0-0-release-analysis/
summary: "This chunk primarily updates the Compute Engine alpha API, introducing a new 'Allocation' resource for pre-allocating specific instance configurations, which instances can then consume via `allocationAffinity`. Additionally, it adds the ability to create instances from machine images using `sourceMachineImage` and expands available GPU quota metrics to include NVIDIA P4 types. Various API descriptions were also updated for clarity."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - app-engine
  - cloud-composer
  - cloud-functions
  - cloud-tasks
  - compute-engine
  - google-kubernetes-engine
  - cloud-life-sciences-genomics-
  - ai-platform-ml-engine-
  - core-calliope
  - cloud-iot-core
  - cloud-speech-to-text
  - service-usage
  - cloud-ml-engine
  - cloud-data-loss-prevention
  - compute-engine-cloud-nat-
  - cloud-dataproc
  - cloud-data-loss-prevention-dlp-
  - cloud-genomics
  - kubernetes-policy
  - bigtable-admin
  - speech-to-text
  - cloud-category-manager
  - cloud-billing
  - cloud-debugger
  - compute
  - kubernetes-engine
  - service-management
  - cloud-iot
  - google-kubernetes-engine-gke-
  - ai-platform-training-and-prediction-ml-engine-
  - source-repository
  - cloud-sql-admin
  - firebase-test-lab
---

This chunk primarily updates the Compute Engine alpha API, introducing a new 'Allocation' resource for pre-allocating specific instance configurations, which instances can then consume via `allocationAffinity`. Additionally, it adds the ability to create instances from machine images using `sourceMachineImage` and expands available GPU quota metrics to include NVIDIA P4 types. Various API descriptions were also updated for clarity.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Unannounced Changes 🕵️](#unannounced-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Removed deprecated `gcloud beta dnskeys` command group; please use `gcloud beta dns-keys` instead.
  - File: [RELEASE_NOTES:11](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/RELEASE_NOTES#L11)
- Modified `gcloud container clusters create` and `gcloud container node-pools create` commands to create clusters and node-pools with node autorepair enabled by default if they use COS base image. Use the `--no-enable-autorepair` flag to disable this behavior.
  - File: [RELEASE_NOTES:13](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/RELEASE_NOTES#L13)
- The `googlecloudsdk.calliope.concepts.deps.Deps` class and `FilteredDeps` class have been removed. Any internal code directly importing or relying on these classes for resource attribute resolution will need to be updated. The core `Get` functionality has been refactored into a standalone function `deps_lib.Get`.
  - File: [deps.py:276](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/deps.py#L276)
- The signature of the `ConceptSpec.Initialize` method (and its overrides in `ResourceSpec` and `MultitypeConceptSpec`) has changed, now accepting a `fallthroughs_map` and optional `parsed_args` instead of a `deps` object. This requires updates to internal callers of these methods.
  - File: [concepts.py:318](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/concepts.py#L318)
- The `redis/v1alpha1` and `redis/v1beta1` API definitions, including messages and JSON schemas, have been removed from the SDK. This will break any existing code or commands relying on these specific API versions.
  - File: [redis_v1alpha1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/redis/v1alpha1/redis_v1alpha1_messages.py#L1)
- The `redis/v1beta1` API definitions, including messages and JSON schemas, have been removed from the SDK. This will break any existing code or commands relying on these specific API versions.
  - File: [redis_v1beta1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/redis/v1beta1/redis_v1beta1_messages.py#L1)
- Removed the F3 keybinding for toggling between 'vi' and 'emacs' command line edit modes in the interactive shell.
  - File: [bindings.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/interactive/bindings.py)
- The `redis/v1alpha1` and `redis/v1beta1` API versions for Cloud Memorystore for Redis appear to be significantly removed or deprecated, based on large deletions in their client and message definition files.
  - File: [redis_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/redis/v1alpha1/redis_v1alpha1_messages.py)
- The `redis/v1alpha1` and `redis/v1beta1` API versions for Cloud Memorystore for Redis appear to be significantly removed or deprecated, based on large deletions in their client and message definition files.
  - File: [redis_v1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/redis/v1beta1/redis_v1beta1_messages.py)
- Removed the `GoogleCloudVisionV1alpha1BatchOperationMetadata` message class, affecting batch operations metadata.
  - File: [alpha_vision_v1_messages.py:1189](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L1189)
- Removed the `GoogleCloudVisionV1alpha1ImportCatalogsResponse` message class, affecting the response structure for importing catalogs.
  - File: [alpha_vision_v1_messages.py:1210](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L1210)
- Removed the `GoogleCloudVisionV1alpha1ReferenceImage` message class, affecting how reference images and their metadata are represented.
  - File: [alpha_vision_v1_messages.py:1229](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L1229)
- The `csvFileUri` description in `ImportProductSetsGcsSource` was significantly rewritten, indicating changes in expected CSV column names and format (e.g., from `image_uri` to `image-uri`). Existing import processes using the old column names may break.
  - File: [alpha_vision_v1_messages.py:2668](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L2668)
- Removed the `NormalizedBoundingPoly` message class.
  - File: [alpha_vision_v1_messages.py:2989](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L2989)
- Removed the `ProductInfo` message class, affecting how product information is returned in search results.
  - File: [alpha_vision_v1_messages.py:3260](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L3260)
- Removed `CategoryValueValuesEnum` and `ViewValueValuesEnum` enums from `ProductSearchParams`.
  - File: [alpha_vision_v1_messages.py:3274](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L3274)
- Removed `catalogName`, `category`, `normalizedBoundingPoly`, `productCategory`, and `view` fields from `ProductSearchParams`.
  - File: [alpha_vision_v1_messages.py:3280](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L3280)
- Removed `CategoryValueValuesEnum`, `category`, `productCategory`, and `products` fields from `ProductSearchResults`.
  - File: [alpha_vision_v1_messages.py:3345](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L3345)
- Removed `bearer_token` and `pp` (pretty-print) fields from `StandardQueryParameters` in the API messages, potentially affecting client libraries that relied on these for API requests.
  - File: [alpha_vision_v1_messages.py:3654](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L3654)
- Removed deprecated global query parameters `bearer_token` and `pp` from the `alpha_vision_v1` API definition.
  - File: [alpha_vision_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision_v1.json#L44)
- Removed several deprecated product search fields, including `catalogName`, `category`, `productCategory`, `normalizedBoundingPoly`, and `view` from `ProductSearchParams` in the `alpha_vision_v1` API. The `NormalizedBoundingPoly` definition was also removed.
  - File: [alpha_vision_v1.json:703](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision_v1.json#L703)
- Removed deprecated product search result fields `category`, `productCategory`, `products`, and the `ProductInfo` definition from `ProductSearchResults` in the `alpha_vision_v1` API.
  - File: [alpha_vision_v1.json:1913](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision_v1.json#L1913)
- Removed `GoogleCloudVisionV1alpha1BatchOperationMetadata`, `GoogleCloudVisionV1alpha1ImportCatalogsResponse`, and `GoogleCloudVisionV1alpha1ReferenceImage` definitions from `alpha_vision_v1` API, indicating removal of associated batch operations and reference image concepts for `v1alpha1`.
  - File: [alpha_vision_v1.json:3528](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision_v1.json#L3528)
- Removed `v1alpha1` version of the `alpha_vision` API from the `apis_map.py`.
  - File: [apis_map.py:82](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/apis_map.py#L82)
- Completely removed `v1alpha1` and `v1beta1` API versions for the Redis service, including all client messages and JSON definitions. This is a significant API removal.
  - File: [redis_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/redis/v1alpha1/redis_v1alpha1_messages.py)
- The `privateCluster` and `masterIpv4CidrBlock` fields in the GKE `Cluster` message (v1alpha1, v1beta1) have been deprecated. Users should migrate to `private_cluster_config.enabled` and `private_cluster_config.master_ipv4_cidr_block` respectively.
  - File: [container_v1alpha1.json:258](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L258)
- The `instanceId` field in the Dataproc `InstantiateWorkflowTemplateRequest` message (v1beta2) has been deprecated. The `requestId` field is introduced as its replacement.
  - File: [dataproc_v1beta2_messages.py:1630](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataproc/v1beta2/dataproc_v1beta2_messages.py#L1630)
- Removed `GoogleCloudRedisV1LocationMetadata`, `GoogleCloudRedisV1ZoneMetadata`, and `OperationMetadata` message definitions and their corresponding JSON schemas from the Redis `v1alpha1` API.
  - File: [redis_v1alpha1_messages.py:40](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/redis/v1alpha1/redis_v1alpha1_messages.py#L40)
- Removed `GoogleCloudRedisV1LocationMetadata`, `GoogleCloudRedisV1ZoneMetadata`, `LocationMetadata`, `ZoneMetadata`, and `OperationMetadata` message definitions and their corresponding JSON schemas from the Redis `v1beta1` API.
  - File: [redis_v1beta1_messages.py:40](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/redis/v1beta1/redis_v1beta1_messages.py#L40)
- The `role` field in IAM `Binding` messages for Source Repository is no longer explicitly marked as 'Required' in its description. While this might be a documentation correction, it could potentially affect client-side validation that relied on this requirement.
  - File: [sourcerepo_v1_messages.py:98](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sourcerepo/v1/sourcerepo_v1_messages.py#L98)
- The `role` field in IAM `Binding` messages for Spanner is no longer explicitly marked as 'Required' in its description. Similar to Source Repository, this could affect client-side validation.
  - File: [spanner_v1_messages.py:146](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/spanner/v1/spanner_v1_messages.py#L146)
- The `dlp/v1alpha1` and `vision/v1alpha1` alpha API versions have been removed from the SDK's API regeneration configuration, potentially indicating their deprecation or removal from active support.
  - File: [regen_apis_config.yaml:449](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L449)

## Security Updates

- The `Binding` message in the Container Analysis API (v1alpha1) now includes a `condition` field of type `Expr`, enabling more granular, conditional IAM policies. The `Expr` object itself was newly introduced for defining conditions based on various attributes. [MEDIUM]
  - File: [containeranalysis_v1alpha1_messages.py:180](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/containeranalysis/v1alpha1/containeranalysis_v1alpha1_messages.py#L180)
- The description for `realms` within the `Expr` object in the Kubernetes Engine (GKE) API (v1alpha1, v1beta1) was expanded to clarify how realm groups and `RealmAclRep` objects are used for matching and access determination. [LOW]
  - File: [container_v1alpha1.json:2633](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L2633)

## New Features by Service

### App Engine

- Updated the Go SDK to version 1.9.67.
  - File: [RELEASE_NOTES:20](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/RELEASE_NOTES#L20)
- Updated the Python SDK to version 1.9.73.
  - File: [RELEASE_NOTES:24](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/RELEASE_NOTES#L24)
- Added an `Entrypoint` message type and the `entrypoint` field to `Version` messages in App Engine `v1` and `v1beta` APIs, allowing specification of a shell command as the application's entrypoint.
  - File: [appengine_v1_messages.py:1186](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/appengine/v1/appengine_v1_messages.py#L1186)
- Added `disableTraceSampling` field to the `EndpointsApiService` message in the App Engine `v1beta` API, providing control over trace sampling.
  - File: [appengine_v1beta_messages.py:1198](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/appengine/v1beta/appengine_v1beta_messages.py#L1198)

### Cloud Composer

- Promoted `gcloud composer` commands to GA.
  - File: [RELEASE_NOTES:29](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/RELEASE_NOTES#L29)
- Significant updates to utilities for patching, deleting, and managing Composer environments.
  - File: [environment_patch_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/composer/environment_patch_util.py)

### Cloud Functions

- Promoted `gcloud functions` commands to GA.
  - File: [RELEASE_NOTES:33](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/RELEASE_NOTES#L33)

### Cloud Tasks

- Promoted `gcloud tasks` commands to beta.
  - File: [RELEASE_NOTES:37](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/RELEASE_NOTES#L37)

### Compute Engine

- Promoted `--zones` flag of `gcloud compute instance-groups managed create` command to GA.
  - Flags: `--zones`
  - File: [RELEASE_NOTES:42](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/RELEASE_NOTES#L42)
- Promoted `get-iam-policy`, `set-iam-policy`, `add-iam-policy-bindings`, and `remove-iam-policy-bindings` to beta in the `gcloud compute disks`, `gcloud compute images`, `gcloud compute instance-templates`, `gcloud compute instances`, and `gcloud compute snapshots` command groups.
  - File: [RELEASE_NOTES:43](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/RELEASE_NOTES#L43)
- Added support for updating a subnetwork's role to `ACTIVE` with an optional `drainTimeoutSeconds` via the `MakeSubnetworkUpdateRequest` API.
  - Flags: `--set-role-active`, `--drain-timeout-seconds`
  - File: [subnets_utils.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/subnets_utils.py)
- Added new command-line flags and utilities for managing Router Network Address Translation (NAT) configurations.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/compute/routers/nats/flags.py)
- Introduced new command-line resources and API messages for VPC Access (`v1alpha1`).
  - File: [resources.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/compute/networks/vpc_access/resources.yaml)
- Introduced support for `PARTNER` interconnect type.
  - File: [flags.py:25](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/interconnects/flags.py#L25)
- Introduced alpha flags `--role` and `--drain-timeout` for updating subnetworks, enabling management of active/backup reserved IP address ranges for Internal HTTP(S) Load Balancers.
  - Flags: `--role`, `--drain-timeout`
  - File: [flags.py:107](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/networks/subnets/flags.py#L107)
- Added `--storage-location` flag for specifying the storage location for snapshots within resource policies.
  - Flags: `--storage-location`
  - File: [flags.py:110](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/resource_policies/flags.py#L110)
- Significant API updates across Compute Engine alpha, beta, and v1, indicating the introduction of new resources, fields, or capabilities.
  - File: [compute_alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/compute/alpha/compute_alpha_messages.py)
- Added new command library files under `command_lib/compute/routers/nats/` and `command_lib/compute/networks/vpc_access/` for configuring Cloud Router Network Address Translation (NAT) and VPC Access features, respectively.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/compute/routers/nats/__init__.py)
- Introduced `AllocationsService` in the Compute Alpha API, allowing for management of resource allocations. This includes methods like `AggregatedList`, `Get`, `GetIamPolicy`, `Insert`, `List`, `SetIamPolicy`, `TestIamPermissions`, and `UpdateResourceShape` for the new `allocations` resource.
  - File: [compute_alpha_client.py:385](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L385)
- Added support for new GPU types and quotas, including `GPUS_ALL_REGIONS`, `NVIDIA_P100_VWS_GPUS`, `NVIDIA_P4_GPUS`, `NVIDIA_P4_VWS_GPUS`, and their `PREEMPTIBLE_` variants.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)
- Introduced new fields `labelFingerprint` and `labels` to the `SecurityPolicy` schema, along with a `securityPolicies.setLabels` method to manage labels on security policies.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)
- Enhanced VM scheduling capabilities by adding `nodeAffinities` to the `Scheduling` object, allowing configuration of desired nodes based on `key`, `operator` (`IN`, `NOT_IN`), and `values`.
  - File: [compute_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json)
- Added new command-line infrastructure for Network Address Translation Service (NATS) configuration within Compute Routers.
  - File: [flags.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/compute/routers/nats/flags.py#L1)
- Laid groundwork for VPC Access management within Compute Networks with new resource definitions.
  - File: [resources.yaml:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/compute/networks/vpc_access/resources.yaml#L1)
- Updated forwarding rules utilities and flags, likely introducing new configuration options.
  - File: [forwarding_rules_utils.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/api_lib/compute/forwarding_rules_utils.py)
- Enhanced health checks utilities and flags with new configuration options.
  - File: [health_checks_utils.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/api_lib/compute/health_checks_utils.py)
- Updated subnet utilities and flags, likely adding new management capabilities.
  - File: [subnets_utils.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/api_lib/compute/subnets_utils.py)
- Significant updates to target HTTP proxies and URL maps, suggesting new load balancing configuration features.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/compute/target_http_proxies/flags.py)

### Google Kubernetes Engine

- Added API support for configuring and clearing a BigQuery dataset for resource usage export on GKE clusters via `ClusterUpdate` messages.
  - Flags: `--resource-usage-bigquery-dataset`, `--clear-resource-usage-bigquery-dataset`
  - File: [api_adapter.py:1082](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/container/api_adapter.py#L1082)
- Introduced a new `kubernetespolicy/v1alpha1` API, including client, messages, and API definition, likely for managing Kubernetes policies.
  - File: [kubernetespolicy_v1alpha1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_client.py)

### Cloud Life Sciences (Genomics)

- Introduced a new internal abstraction layer for Genomics API clients (`GenomicsV1ApiClient` and `GenomicsV2ApiClient`) in `genomics_client.py`. This includes a factory function `CreateFromName` to dynamically select the appropriate client based on the operation name, enhancing support for different Genomics API versions (v1 and v2alpha1).
  - File: [genomics_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/genomics/genomics_client.py)

### AI Platform (ML Engine)

- Added support for specifying `modelClass` and `packageUris` when creating and patching ML Engine model versions. `modelClass` defines the fully qualified name of a Python class for custom prediction, and `packageUris` specify Cloud Storage URIs for user-supplied Python code.
  - File: [versions_api.py:47](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/ml_engine/versions_api.py#L47)
- Added `modelClass` field to `GoogleCloudMlV1Version` for specifying a Python class to handle custom prediction logic.
  - File: [ml_v1_messages.py:1150](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/ml/v1/ml_v1_messages.py#L1150)
- Added `packageUris` field to `GoogleCloudMlV1Version` to specify Google Cloud Storage locations for custom prediction packages and dependencies.
  - File: [ml_v1_messages.py:1162](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/ml/v1/ml_v1_messages.py#L1162)

### Core / Calliope

- Added a new function `EnableUserProjectQuota()` in the Calliope base module, allowing commands to explicitly enable the quota project header for the current project.
  - File: [base.py:887](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/base.py#L887)

### Cloud IoT Core

- Introduced the Cloud IoT Core `v1` API client, messages, and resource definitions.
  - File: [cloudiot_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py)
- Introduced or significantly updated the Cloud IoT Core v1 API, including new client, message definitions, and resources.
  - File: [cloudiot_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py)
- Added a new `v1` API client, messages, and resources, indicating new or expanded support for Cloud IoT Core `v1` API.
  - File: [cloudiot_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py)
- Introduced support for Device Groups, enabling operations such as listing device configuration versions, listing device states, retrieving and updating devices, and managing IAM policies for device groups. New API clients and methods are added for these functionalities.
  - File: [cloudiot_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py)
- Introduced new API endpoints and messages to manage device groups within registries, including operations for listing device configuration versions and states (`CloudiotProjectsLocationsRegistriesGroupsDevicesConfigVersionsListRequest`, `CloudiotProjectsLocationsRegistriesGroupsDevicesStatesListRequest`), retrieving and patching individual devices within groups (`CloudiotProjectsLocationsRegistriesGroupsDevicesGetRequest`, `CloudiotProjectsLocationsRegistriesGroupsDevicesPatchRequest`), listing devices in groups (`CloudiotProjectsLocationsRegistriesGroupsDevicesListRequest`), and modifying cloud-to-device configurations for devices in groups (`CloudiotProjectsLocationsRegistriesGroupsDevicesModifyCloudToDeviceConfigRequest`).
  - File: [cloudiot_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_messages.py)
- Added new API endpoints for managing IAM policies for device groups, including `setIamPolicy`, `getIamPolicy`, and `testIamPermissions` methods under `cloudiot.projects.locations.registries.groups`.
  - File: [v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1.json)

### Cloud Speech-to-Text

- Introduced the `v1p1beta1` API client and messages for Speech-to-Text, implying new capabilities or improved models.
  - File: [speech_v1p1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_client.py)
- Introduced a new `speech/v1p1beta1` API version for Cloud Speech-to-Text, including new client, message definitions, and resources.
  - File: [speech_v1p1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_messages.py)
- Added new resource collections (`PROJECTS`, `PROJECTS_LOCATIONS`, `PROJECTS_LOCATIONS_DATASETS`) to the `v1p1beta1` API, suggesting new capabilities for managing speech resources within specific projects and geographical locations.
  - File: [resources.py:34](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/resources.py#L34)
- Introduced new API endpoints and message types in `speech_v1p1beta1.json` to support AutoML for Speech. This includes the definition of `Dataset` resources (with properties like `displayName`, `useLoggedData`, `uri`, `languageCode`, `dataProcessingRegion`, `dataStats`, `blockingOperationIds`, `models`), `DataStats` (for `trainingExampleCount`, `testExampleCount`, `dataErrors`), and `DataErrors` (listing various audio format and file size errors). New `Model` resources are defined with `displayName`, `trainingType`, `createTime`, and `evaluateModelResponses`. Associated API methods for `datasets.create`, `datasets.list`, `datasets.get`, `models.create`, `models.list`, `models.deploy`, and `models.evaluate` have been added under `speech.projects.locations` to manage these resources.
  - File: [speech_v1p1beta1.json:552](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech_v1p1beta1.json#L552)

### Service Usage

- Introduced the Service Usage `v1` API client, messages, and resource definitions.
  - File: [serviceusage_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/serviceusage/v1/serviceusage_v1_client.py)
- Introduced a new `serviceusage/v1` API, including new client, message definitions, and resources.
  - File: [serviceusage_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/serviceusage/v1/serviceusage_v1_messages.py)
- Added a new `v1` API client, messages, and resources for the Service Usage API, making it the new default version.
  - File: [serviceusage_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceusage/v1/serviceusage_v1_client.py)
- Added support for the Service Usage API (v1), enabling users to manage Google Cloud services for their projects. This includes functionality to enable, disable, batch enable, list, and get services and their associated long-running operations.
  - File: [serviceusage_v1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceusage/v1/serviceusage_v1_client.py#L1)
- Added new API client, message definitions, and resource definitions for the Service Usage API v1, enabling management of Google Cloud services.
  - File: [serviceusage_v1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceusage/v1/serviceusage_v1_messages.py#L1)
- Integration of the full Service Usage API (v1), enabling management of Google Cloud Platform services such as listing, enabling, and disabling services.
  - File: [serviceusage_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceusage_v1.json)

### Cloud ML Engine

- Added 54 lines of new flags to `ml_engine/flags.py`, suggesting new or expanded functionality for ML Engine commands.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/ml_engine/flags.py)
- Added new flags to configure user-supplied prediction code for ML Engine models.
  - Flags: `--model-class`, `--package-uris`
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/ml_engine/flags.py)
- The SDK now supports specifying `model_class` and `package_uris` when creating or updating ML Engine model versions, enabling more granular control over custom model deployments.
  - File: [versions_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/ml_engine/versions_util.py)

### Cloud Data Loss Prevention

- A new file `dlp/hooks.py` was introduced with 32 lines of code, indicating groundwork for new command-line hooks for DLP.
  - File: [hooks.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/dlp/hooks.py)

### Compute Engine (Cloud NAT)

- Introduced a new set of commands and flags for configuring Network Address Translation (NAT) on Compute Engine routers. This includes options for automatic or manual external IP allocation (`--auto-allocate-nat-external-ips`, `--nat-external-ip-pool`), defining source subnetwork IP ranges to NAT (`--nat-all-subnet-ip-ranges`, `--nat-primary-subnet-ip-ranges`, `--nat-custom-subnet-ip-ranges`), setting various connection idle timeouts (`--udp-idle-timeout`, `--icmp-idle-timeout`, `--tcp-established-idle-timeout`, `--tcp-transitory-idle-timeout`), and configuring minimum ports per VM (`--min-ports-per-vm`).
  - Flags: `--nat-external-ip-pool`, `--auto-allocate-nat-external-ips`, `--nat-all-subnet-ip-ranges`, `--nat-primary-subnet-ip-ranges`, `--nat-custom-subnet-ip-ranges`, `--udp-idle-timeout`, `--icmp-idle-timeout`, `--tcp-established-idle-timeout`, `--tcp-transitory-idle-timeout`, `--min-ports-per-vm`
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/routers/nats/flags.py)

### Cloud Dataproc

- Added flags `--source` and `--destination` for importing and exporting Dataproc WorkflowTemplates as YAML files. Exported templates will not contain output-only fields like `id`, `name`, `version`, `createTime`, or `updateTime`.
  - Flags: `--source`, `--destination`
  - File: [flags.py:53](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/flags.py#L53)
- Updates to Dataproc API utilities and command flags, indicating new cluster or job management capabilities.
  - File: [util.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/api_lib/dataproc/util.py)

### Cloud Data Loss Prevention (DLP)

- Added flag `--output-file` to DLP redact commands, allowing users to specify a file path to which redacted text or image content will be written.
  - Flags: `--output-file`
  - File: [hooks.py:416](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dlp/hooks.py#L416)
- Added new hooks for DLP functionalities.
  - File: [hooks.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/dlp/hooks.py)

### Cloud Genomics

- Added the `name` argument for Genomics operations, allowing users to specify the operation's name directly.
  - File: [flags.py:22](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/genomics/flags.py#L22)
- Enhanced the Genomics API client, potentially exposing new functionalities.
  - File: [genomics_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/api_lib/genomics/genomics_client.py)

### Kubernetes Policy

- Introduced a new `kubernetespolicy/v1alpha1` API, including new client, message definitions, and resources.
  - File: [kubernetespolicy_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_messages.py)
- Added a completely new `v1alpha1` API client, messages, and resources for Kubernetes Policy, providing alpha support for Kubernetes policy management.
  - File: [kubernetespolicy_v1alpha1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_client.py)
- Introduced a new `v1alpha1` API for Kubernetes Policy, including a client (`KubernetespolicyV1alpha1`) and message definitions, enabling management of Kubernetes Policy Namespaces (create, get, list, delete).
  - File: [kubernetespolicy_v1alpha1_client.py:23](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_client.py#L23)
- Introduced the `kubernetespolicy:v1alpha1` API, which provides hooks to synchronize policies between GCP and Kubernetes clusters, enabling policy management for clusters through GCP. This includes new schemas for `Namespace`, `ClusterPolicy`, and `ObjectMeta`.
  - File: [kubernetespolicy_v1alpha1.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy_v1alpha1.json#L1)
- Integrated new API client, message definitions, and resource definitions for the Kubernetes Policy API (v1alpha1).
  - File: [kubernetespolicy_v1alpha1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_messages.py#L1)
- Integrated the new `kubernetespolicy/v1alpha1` API into the SDK's API configuration, suggesting new functionality for managing Kubernetes policies.
  - File: [regen_apis_config.yaml:318](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L318)

### Bigtable Admin

- Introduced conditional IAM bindings by adding a `condition` field of type `Expr` to the `Binding` message in the Bigtable Admin `v2` API. A new `Expr` message type was also added to represent expression text for conditions.
  - File: [bigtableadmin_v2_messages.py:549](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/bigtableadmin/v2/bigtableadmin_v2_messages.py#L549)

### Speech-to-Text

- Added a new `v1p1beta1` API client, messages, and resources for the Speech-to-Text API, indicating an updated beta version with expanded capabilities.
  - File: [speech_v1p1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_client.py)
- Updated API client, message definitions, and resource definitions for the Speech-to-Text API (v1p1beta1), indicating new beta speech recognition capabilities.
  - File: [speech_v1p1beta1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_client.py#L1)

### Cloud Category Manager

- Added support for IAM Conditions within `Binding` messages, allowing for more fine-grained access control using expressions defined by the new `Expr` message type.
  - File: [categorymanager_v1alpha2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/categorymanager/v1alpha2/categorymanager_v1alpha2_messages.py)

### Cloud Billing

- Added support for IAM Conditions within `Binding` messages, allowing for more fine-grained access control using expressions defined by the new `Expr` message type.
  - File: [cloudbilling_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudbilling/v1/cloudbilling_v1_messages.py)

### Cloud Debugger

- Enhanced `SourceLocation` to include `column` information, providing more precise details about a location in the source code.
  - File: [clouddebugger_v2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/clouddebugger/v2/clouddebugger_v2_messages.py)

### Compute

- Introduced new `Allocation` resources in the alpha API, allowing management of allocated capacity, including creation, listing, and updates, with support for specific SKU details and instance properties.
  - File: [compute_alpha_messages.py:1152](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L1152)
- Added the ability to set labels on security policies in the beta API via the `compute.securityPolicies.setLabels` method.
  - File: [compute_beta_client.py:9686](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_client.py#L9686)
- Added new GPU quota metrics to the beta and v1 APIs, including `GPUS_ALL_REGIONS`, `NVIDIA_P100_VWS_GPUS`, `NVIDIA_P4_GPUS`, `NVIDIA_P4_VWS_GPUS`, and their preemptible variants.
  - File: [compute_beta_messages.py:28129](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L28129)
- Introduced node affinity (`SchedulingNodeAffinity`) for instance scheduling in the v1 API, allowing instances to be scheduled based on node labels.
  - File: [compute_v1_messages.py:26282](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L26282)

### Kubernetes Engine

- Added an `annotations` field of type `AnnotationsValue` to the `AuditEvent` message for storing unstructured key-value maps from plugins.
  - File: [container_v1_messages.py:165](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1/container_v1_messages.py#L165)
- Added API definitions for node scheduling strategy in GKE clusters, including `STRATEGY_UNSPECIFIED`, `PRIORITIZE_LEAST_UTILIZED`, and `PRIORITIZE_MEDIUM_UTILIZED` for `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:374](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L374)
- Introduced a new `PrivateClusterConfig` message with fields like `enablePrivateEndpoint`, `enablePrivateNodes`, and `masterIpv4CidrBlock` to consolidate private cluster settings in `v1alpha1` and `v1beta1` APIs.
  - File: [container_v1alpha1_messages.py:2794](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L2794)
- Added API definitions for `MasterUpdateFreeze` and `MasterUpdateRestriction` within `MaintenancePolicy` to allow users to freeze GKE master updates during critical business periods for `v1alpha1` and `v1beta1` APIs.
  - File: [container_v1alpha1_messages.py:2219](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L2219)
- Added API definitions for a `SecurityProfile` message with fields `disableRuntimeRules` and `name` to allow users to select and potentially disable runtime rules for GKE clusters in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:2850](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L2850)
- Added `MasterUpdateRestriction` and `MasterUpdateFreeze` objects to `MaintenancePolicy`, allowing users to define periods when GKE master updates are frozen.
  - File: [container_v1alpha1.json:1117](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L1117)
- Introduced a `nodeSchedulingStrategy` field to the `Cluster` message with new enumeration options (`PRIORITIZE_LEAST_UTILIZED`, `PRIORITIZE_MEDIUM_UTILIZED`) to control Kubernetes scheduler behavior for GKE clusters.
  - File: [container_v1alpha1.json:285](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L285)
- Added `securityProfile` fields to the `Cluster` and `UpdateClusterRequest` messages, allowing users to select and manage security profiles for GKE clusters, including an option to disable runtime rules.
  - File: [container_v1alpha1.json:285](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L285)
- Introduced a `privateClusterConfig` object for more explicit control over private cluster features, including `enablePrivateNodes`, `enablePrivateEndpoint`, `masterIpv4CidrBlock`, and output-only `privateEndpoint` and `publicEndpoint`.
  - File: [container_v1alpha1.json:285](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L285)
- Added `desiredResourceUsageExportConfig` to `UpdateClusterRequest` for configuring resource usage export.
  - File: [container_v1alpha1.json:1601](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L1601)

### Service Management

- Introduced support for IAM Conditions within service management bindings by adding a `condition` field of type `Expr` to the `Binding` message, allowing for more granular and context-aware access control policies.
  - File: [servicemanagement_v1_messages.py:349](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_messages.py#L349)
- Added a `excludeFinalQuotaSettingsInResponse` parameter to the `servicemanagement.services.projectSettings.patch` method, providing clients with control over whether updated quota settings are included in the operation response.
  - File: [servicemanagement_v1_messages.py:3713](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_messages.py#L3713)

### Cloud IoT

- Introduced new API client, message definitions, and resource definitions for the Cloud IoT API v1, enabling new IoT functionalities.
  - File: [cloudiot_v1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py#L1)

### Google Kubernetes Engine (GKE)

- Broad updates to container command utilities and flags, suggesting new GKE cluster management features.
  - File: [container_command_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/container/container_command_util.py)

### AI Platform Training and Prediction (ML Engine)

- Added new flags for ML Engine commands and updated version management utilities.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/ml_engine/flags.py)

### Source Repository

- Introduction of IAM Conditions for `Binding` messages, allowing more granular, condition-based access control policies for Source Repository resources. This is facilitated by the new `Expr` message type.
  - File: [sourcerepo_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sourcerepo/v1/sourcerepo_v1_messages.py)

### Cloud SQL Admin

- Expanded `Export` and `Import` operations to support 'SQL dump or CSV file' formats, as indicated by updated documentation in `sqladmin_v1beta4_client.py`. Corresponding messages in `sqladmin_v1beta4_messages.py` now detail specific constraints for these operations, such as CSV format not being supported for PostgreSQL instances and specific rules for database/table selection during export/import.
  - File: [sqladmin_v1beta4_client.py:477](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin/v1beta4/sqladmin_v1beta4_client.py#L477)

### Firebase Test Lab

- Enhanced iOS test configuration by adding `IosRuntimeConfiguration` to `IosDeviceCatalog` to support specifying test `locales` and `orientations`.
  - File: [testing_v1_messages.py:649](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/testing/v1/testing_v1_messages.py#L649)

## Credential & Auth Changes

- Expanded default Docker registry authentication to include `marketplace.gcr.io` as an `AUTHENTICATED_LAUNCHER_REGISTRY`, ensuring proper credential handling for Google Cloud Marketplace images.
  - File: [constants.py:22](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/core/docker/constants.py#L22)
- Removed the `bearer_token` query parameter from the `alpha_vision_v1` API, which may affect how OAuth bearer tokens are passed for requests to this specific API.
  - File: [alpha_vision_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision_v1.json#L44)

## API Changes

### Compute Engine (Alpha)

- The `compute:alpha` API definition revision was updated from `20180701` to `20180711`.
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- Updated example operating system images in the `sourceImage` descriptions for `AttachedDisk` and `Disk` resources from Debian 8 to Debian 9 (Stretch).
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- Minor description updates for the `tags` field in the `Instance` resource and properties within `ShieldedVmConfig` and `ShieldedVmIntegrityPolicy` resources for improved clarity.
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- Substantial updates to the alpha Compute Engine API messages and definition, indicating an evolving API surface.
  - File: [compute_alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py)

### Redis

- Removed API definitions for `redis/v1alpha1` and `redis/v1beta1`, indicating potential API version deprecation or restructuring.
  - File: [redis_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/redis/v1alpha1/redis_v1alpha1_messages.py)

### Cloud Composer

- The Cloud Composer API client (`api_lib/composer`) now supports explicit selection of API versions (GA `v1` or Beta `v1beta1`) via a `release_track` argument in `GetService`, `GetClientInstance`, and `GetMessagesModule` functions. This allows for commands to target specific API versions for environments and operations.
  - File: [environments_util.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/composer/environments_util.py#L18)
- Updates to `v1` and `v1beta1` Composer API messages (`composer_v1_messages.py` with 61 additions, `composer_v1beta1_messages.py` with 80 additions/deletions), indicating API definition changes.
  - File: [composer_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/composer/v1/composer_v1_messages.py)
- Updated `composer/v1` and `v1beta1` APIs, including changes to message definitions.
  - File: [composer_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/composer/v1/composer_v1_messages.py)
- Significant additions to Cloud Composer `v1` and `v1beta1` API messages and JSON definitions, indicating new features or configuration options.
  - File: [composer_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_messages.py)
- The description for `NodeConfig`'s `oauthScopes` in `composer/v1beta1` has been clarified to explicitly state that the `https://www.googleapis.com/auth/cloud-platform` scope must be included in the list of specified scopes.
  - File: [composer_v1beta1_messages.py:394](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1beta1/composer_v1beta1_messages.py#L394)
- The `updateMask` documentation for `ComposerProjectsLocationsEnvironmentsPatchRequest` in `composer/v1beta1` now correctly references `config.softwareConfig.airflowConfigOverrides.<section>-<name>` for Apache Airflow config overrides, replacing the previous `config.softwareConfig.properties.<section>-<name>`.
  - File: [composer_v1beta1_messages.py:137](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1beta1/composer_v1beta1_messages.py#L137)

### Compute Engine

- New parameters `set_role_active` and `drain_timeout_seconds` added to the `MakeSubnetworkUpdateRequest` function, impacting `ComputeSubnetworksPatchRequest`.
  - File: [subnets_utils.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/subnets_utils.py)
- Significant updates to the `alpha`, `beta`, and `v1` Compute Engine APIs, including client and message definitions, indicating schema changes and new functionalities. `compute_alpha_messages.py` saw 1446 insertions/deletions, and `compute_alpha.json` had 1080 insertions/deletions.
  - File: [compute_alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/compute/alpha/compute_alpha_messages.py)
- Changed the logic for determining Instance Group Manager (IGM) stability, now leveraging the `igm_ref.status.isStable` field if available, and removing alpha-specific stability checks. This indicates an update in the underlying IGM status API.
  - File: [wait_info.py:24](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/instance_groups/managed/wait_info.py#L24)
- Modified the `AddResourcePoliciesArgs` function signature in `flags.py` to accept a `resource` argument, making the help text for `--resource-policies` more generic.
  - File: [flags.py:113](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/resource_policies/flags.py#L113)
- Updated the logic in `MakeDiskBackupSchedulePolicy` to include `storageLocations` when constructing `ResourcePolicyBackupSchedulePolicySnapshotProperties` messages, integrating the new `--storage-location` flag.
  - File: [util.py:76](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/resource_policies/util.py#L76)
- Substantial additions to Compute Engine API messages and clients across `alpha`, `beta`, and `v1` versions, introducing new capabilities.
  - File: [compute_alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py)
- The `sourceMachineImage` query parameter was added to the `compute.instances.insert` method.
  - File: [compute_alpha_client.py:5150](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L5150)
- The description for `compute.instances.setShieldedVmIntegrityPolicy` was updated to clarify that it can only be used on a running VM instance.
  - File: [compute_alpha_client.py:5549](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L5549)
- The description for `compute.instances.updateShieldedVmConfig` was updated to clarify that it can only be used on a stopped VM instance.
  - File: [compute_alpha_client.py:5809](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L5809)
- Updated the API revision for Beta and V1 Compute Engine APIs from `20180701` to `20180711`.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)
- Clarified usage descriptions for `compute.instances.setShieldedVmIntegrityPolicy` (can only be used on a running VM instance) and `compute.instances.updateShieldedVmConfig` (can only be used on a stopped VM instance).
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)

### Google Kubernetes Engine

- API adapter updated to handle `desiredResourceUsageExportConfig` with `BigQueryDestination` in `ClusterUpdate` messages.
  - File: [api_adapter.py:1082](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/container/api_adapter.py#L1082)
- Updated `container/v1`, `v1alpha1`, and `v1beta1` APIs, including changes to message definitions.
  - File: [container_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/container/v1/container_v1_messages.py)

### Cloud Life Sciences (Genomics)

- The internal API for managing Genomics operations has been re-architected. A new `GenomicsApiClient` base class and version-specific clients (`GenomicsV1ApiClient`, `GenomicsV2ApiClient`) are introduced to standardize interaction across different API versions. The `Poller`, `GetOperation`, and `CancelOperation` methods are now abstracted.
  - File: [genomics_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/genomics/genomics_client.py)

### Service Usage

- The `serviceusage` API client has been updated to use the `v1` version instead of `v1beta1`.
  - File: [serviceusage.py:222](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/services/serviceusage.py#L222)
- Introduced a new `v1` API client, messages, resources, and JSON definitions for Service Usage, setting it as the default API version and deprecating `v1beta1` as default.
  - File: [serviceusage_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceusage/v1/serviceusage_v1_client.py)
- Full integration of the `serviceusage/v1` API, including the `ServiceusageV1` client, its `OperationsService` with `Cancel`, `Delete`, `Get`, `List` methods, and `ServicesService` with `BatchEnable`, `Disable`, `Enable`, `Get`, `List` methods, along with new message and resource definitions.
  - File: [serviceusage_v1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceusage/v1/serviceusage_v1_client.py#L1)
- Full new API schema and client definition for `serviceusage:v1` added to the SDK.
  - File: [serviceusage_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceusage_v1.json)
- The `serviceusage/v1` API has been configured as the new default API version in the SDK's API regeneration configuration.
  - File: [regen_apis_config.yaml:379](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L379)

### Cloud Container Engine

- Updates across `v1`, `v1alpha1`, and `v1beta1` Container APIs messages, suggesting changes or additions to Kubernetes Engine API definitions.
  - File: [container_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/container/v1/container_v1_messages.py)

### Cloud Logging

- Updates to the `v2` Logging API client and messages, indicating evolution of the logging service API.
  - File: [logging_v2_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/logging/v2/logging_v2_client.py)
- Updated the `logging/v2` API, including changes to client and message definitions.
  - File: [logging_v2_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/logging/v2/logging_v2_client.py)
- Descriptive changes in `logging/v2` API client and messages, replacing references to 'Stackdriver Logging' with 'Logging' and 'Stackdriver Trace' with 'Trace' in various method and field descriptions.
  - File: [logging_v2_client.py:460](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/logging/v2/logging_v2_client.py#L460)

### Genomics

- The `genomics_client.py` file received 125 insertions, indicating a significant update or expansion of the Genomics API client logic.
  - File: [genomics_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/api_lib/genomics/genomics_client.py)
- Updated the `genomics/v1` API, including minor changes to message definitions.
  - File: [genomics_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/genomics/v1/genomics_v1_messages.py)
- The description for the `role` field within IAM `Binding` messages in `v1` was updated, removing the 'Required' designation.
  - File: [genomics_v1_messages.py:257](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L257)

### Vision API

- Updated the `alpha_vision/v1` API, including significant changes to message definitions.
  - File: [alpha_vision_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py)

### App Engine

- Updated `appengine/v1` and `v1beta` APIs, including changes to message definitions.
  - File: [appengine_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/appengine/v1/appengine_v1_messages.py)
- Added `Entrypoint` message type and `entrypoint` field to `Version` messages in App Engine `v1` and `v1beta` APIs. The `v1beta` `EndpointsApiService` also gained a `disableTraceSampling` field.
  - File: [appengine_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/appengine/v1/appengine_v1_messages.py)

### Bigtable Admin

- Updated the `bigtableadmin/v2` API, including changes to message definitions.
  - File: [bigtableadmin_v2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/bigtableadmin/v2/bigtableadmin_v2_messages.py)
- Modified the `Binding` message in Bigtable Admin `v2` to include a `condition` field, leveraging a new `Expr` message type for conditional IAM policies.
  - File: [bigtableadmin_v2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/bigtableadmin/v2/bigtableadmin_v2_messages.py)

### Category Manager

- Updated the `categorymanager/v1alpha2` API, including changes to message definitions.
  - File: [categorymanager_v1alpha2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/categorymanager/v1alpha2/categorymanager_v1alpha2_messages.py)

### Cloud Billing

- Updated the `cloudbilling/v1` API, including changes to message definitions.
  - File: [cloudbilling_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/cloudbilling/v1/cloudbilling_v1_messages.py)
- The `Binding` message in `cloudbilling/v1` now includes a `condition` field and the `role` field description has been updated. The protobuf field numbers for `condition`, `members`, and `role` have been reordered. A new `Expr` message has been defined to represent expression text for IAM conditions.
  - File: [cloudbilling_v1_messages.py:156](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudbilling/v1/cloudbilling_v1_messages.py#L156)

### Cloud Debugger

- Updated the `clouddebugger/v2` API, including minor changes to message definitions.
  - File: [clouddebugger_v2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/clouddebugger/v2/clouddebugger_v2_messages.py)
- The `SourceLocation` message in `clouddebugger/v2` now includes a `column` field. The protobuf field numbers for `column`, `line`, and `path` have been reordered.
  - File: [clouddebugger_v2_messages.py:698](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/clouddebugger/v2/clouddebugger_v2_messages.py#L698)

### Cloud Functions

- Updated the `cloudfunctions/v1` API, including changes to message definitions.
  - File: [cloudfunctions_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/cloudfunctions/v1/cloudfunctions_v1_messages.py)
- The description for the `network` field within the `CloudFunction` message in `cloudfunctions/v1` has been updated for greater clarity regarding VPC Network connectivity requirements and supported formats.
  - File: [cloudfunctions_v1_messages.py:73](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudfunctions/v1/cloudfunctions_v1_messages.py#L73)

### Cloud KMS

- Updated the `cloudkms/v1` API, including minor changes to message definitions.
  - File: [cloudkms_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py)
- Removed 'Required' from the description of the `role` field in the `Binding` message within the IAM policy definition.
  - File: [cloudkms_v1_messages.py:102](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L102)

### Cloud Resource Manager

- Updated the `cloudresourcemanager_v1beta1` API, including minor changes to message definitions.
  - File: [cloudresourcemanager_v1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/cloudresourcemanager_v1beta1_messages.py)
- Removed 'Required' from the description of the `role` field in the `Binding` message within the IAM policy definition.
  - File: [cloudresourcemanager_v1beta1_messages.py:111](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudresourcemanager/v1beta1/cloudresourcemanager_v1beta1_messages.py#L111)

### Cloud Tasks

- Updated the `cloudtasks/v2beta2` API, including minor changes to client and message definitions.
  - File: [cloudtasks_v2beta2_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_client.py)
- Minor additions and modifications to the Cloud Tasks `v2beta2` API client, messages, and JSON definitions.
  - File: [cloudtasks_v2beta2_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_client.py)
- Removed 'Required' from the description of the `role` field in the `Binding` message within the IAM policy definition.
  - File: [cloudtasks_v2beta2_messages.py:350](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_messages.py#L350)
- The description for the `role` field within the `Binding` object for `cloudtasks.projects.locations.queues.setIamPolicy` no longer states that it is 'Required'.
  - File: [cloudtasks_v2beta2.json:393](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks_v2beta2.json#L393)

### Container Analysis

- Updated the `containeranalysis_v1alpha1` API, including changes to message definitions.
  - File: [containeranalysis_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/containeranalysis_v1alpha1_messages.py)
- The `Binding` message (v1alpha1) now includes a `condition` field, referencing a new `Expr` object, enabling conditional IAM policies.
  - File: [containeranalysis_v1alpha1_messages.py:180](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/containeranalysis/v1alpha1/containeranalysis_v1alpha1_messages.py#L180)

### Dataproc

- Updated `dataproc/v1` and `v1beta2` APIs, including changes to message definitions.
  - File: [dataproc_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/dataproc/v1/dataproc_v1_messages.py)
- Minor additions and modifications to Dataproc `v1` and `v1beta2` API messages and JSON definitions.
  - File: [dataproc_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataproc/v1/dataproc_v1_messages.py)
- The `InstantiateWorkflowTemplateRequest` message (v1beta2) deprecates `instanceId` and introduces `requestId` as its replacement.
  - File: [dataproc_v1beta2_messages.py:1630](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataproc/v1beta2/dataproc_v1beta2_messages.py#L1630)

### Deployment Manager

- Updated `deploymentmanager/alpha`, `v2`, and `v2beta` APIs, including changes to message definitions.
  - File: [deploymentmanager_alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/deploymentmanager/alpha/deploymentmanager_alpha_messages.py)
- Updated API revisions for `v2`, `v2beta`, and `alpha` versions. The description for the `condition` field in IAM `Binding` messages was clarified to indicate it is 'Unimplemented' for public use.
  - File: [deploymentmanager_v2_messages.py:75](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/deploymentmanager/v2/deploymentmanager_v2_messages.py#L75)

### Cloud DNS

- Minor updates across several Cloud DNS API versions (e.g., `dns_v1`, `dns_v1beta1`).
  - File: [dns_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/dns_v1.json)
- Updated API revisions across `v1`, `v1alpha2`, `v1beta1`, `v1beta2`, and `v2beta1` API versions.
  - File: [dns_v1.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dns_v1.json#L7)

### IAM

- Updated the `iam/v1` API, including minor changes to message definitions.
  - File: [iam_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/iam/v1/iam_v1_messages.py)
- Clarified the description for the `condition` field in `GoogleIamV1Binding` messages (v1alpha1 and v1beta1 APIs) to state that it is 'Unimplemented'.
  - File: [container_v1alpha1_messages.py:1415](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L1415)
- Removed the 'Required' annotation from the description of the `role` field in `GoogleIamV1Binding` messages (v1alpha1 and v1beta1 APIs).
  - File: [container_v1alpha1_messages.py:1434](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L1434)
- Updated the description for `SECURITY_REALM` in `GoogleIamV1Condition` messages (v1alpha1 and v1beta1 APIs) to include details about realm groups.
  - File: [container_v1alpha1_messages.py:1502](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L1502)
- The description for the `role` field within IAM `Binding` messages in `v1` was updated, removing the 'Required' designation.
  - File: [iam_v1_messages.py:125](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/iam/v1/iam_v1_messages.py#L125)

### Cloud ML Engine

- Updated the `ml/v1` API, including changes to message definitions.
  - File: [ml_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/ml/v1/ml_v1_messages.py)
- The command-line utilities are updated to pass `model_class` and `package_uris` to the `versions_client.Create` and `versions_client.Patch` API calls, indicating new fields are available in the underlying ML Engine API for model version management.
  - File: [versions_util.py:78](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/ml_engine/versions_util.py#L78)

### Cloud Pub/Sub

- Updated the `pubsub/v1` API, including changes to message definitions.
  - File: [pubsub_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/pubsub/v1/pubsub_v1_messages.py)

### Replicapool Updater

- Updated the `replicapoolupdater_v1beta1` API definition.
  - File: [replicapoolupdater_v1beta1.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/replicapoolupdater_v1beta1.json)

### Cloud RuntimeConfig

- Updated the `runtimeconfig_v1beta1` API, including changes to message definitions.
  - File: [runtimeconfig_v1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/runtimeconfig/v1beta1/runtimeconfig_v1beta1_messages.py)

### Service Management

- Updated the `servicemanagement/v1` API, including changes to client and message definitions.
  - File: [servicemanagement_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_client.py)
- Minor additions and modifications to Service Management `v1` API client, messages, and JSON definitions.
  - File: [servicemanagement_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_client.py)
- Added `excludeFinalQuotaSettingsInResponse` as a new query parameter to the `servicemanagement.services.projectSettings.patch` method.
  - File: [servicemanagement_v1_client.py:541](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_client.py#L541)
- The `Binding` message in `servicemanagement/v1` was modified to include a new `condition` field of the newly defined `Expr` message type. The `members` and `role` fields were renumbered to accommodate this addition.
  - File: [servicemanagement_v1_messages.py:349](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_messages.py#L349)
- The `ServicemanagementServicesProjectSettingsPatchRequest` message in `servicemanagement/v1` now includes a new boolean field `excludeFinalQuotaSettingsInResponse`. Other fields in the request message were renumbered.
  - File: [servicemanagement_v1_messages.py:3713](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_messages.py#L3713)

### Cloud Source Repositories

- Updated the `sourcerepo/v1` API, including changes to message definitions.
  - File: [sourcerepo_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/sourcerepo/v1/sourcerepo_v1_messages.py)

### Cloud Spanner

- Updated the `spanner/v1` API, including changes to client and message definitions.
  - File: [spanner_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/spanner/v1/spanner_v1_client.py)
- Behavioral clarifications were added to the descriptions of `PartitionQuery` and `PartitionRead` methods, specifying additional conditions for partition token invalidation ('is idle for too long', 'becomes too old'). The description for the `SECURITY_REALM` attribute in the IAM `Condition` message was also expanded.
  - File: [spanner_v1_client.py:525](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/spanner/v1/spanner_v1_client.py#L525)

### Cloud SQL Admin

- Updated the `sqladmin/v1beta4` API, including changes to client and message definitions.
  - File: [sqladmin_v1beta4_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/sqladmin/v1beta4/sqladmin_v1beta4_client.py)
- Updated `sqladmin_v1beta4.json` definitions, clarifying `ExportContext` and `ImportContext` behaviors. Specifically noted that CSV export/import is not supported for PostgreSQL instances, detailed database/table specifications for MySQL vs. PostgreSQL during export, and updated descriptions for `instances.export` and `instances.import` operations to include support for SQL dump or CSV files.
  - File: [sqladmin_v1beta4.json:570](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin_v1beta4.json#L570)

### Cloud Storage

- Updated the `storage/v1` API, including changes to message definitions.
  - File: [storage_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/storage/v1/storage_v1_messages.py)
- Removed 'Limited availability' from the description of `kmsKeyName` in `Object` and `StorageObjectsInsertRequest`, indicating broader availability of Cloud KMS encryption for objects.
  - File: [storage_v1_messages.py:661](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/storage/v1/storage_v1_messages.py#L661)

### Firebase Test Lab

- Updated the `testing/v1` API, including changes to message definitions, and `toolresults_v1beta3` JSON.
  - File: [testing_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/testing/v1/testing_v1_messages.py)
- Added a new failure detail `TEST_NOT_APP_HOSTED` to `TestMatrix.outcomeInfo.failureDetail` for iOS tests, indicating that XC tests running on physical devices must have `IsAppHostedTestBundle` set to `true` in the xctestrun file.
  - File: [testing_v1_messages.py:1195](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/testing/v1/testing_v1_messages.py#L1195)

### Serverless VPC Access

- Updated the `vpcaccess/v1alpha1` API, including changes to message definitions.
  - File: [vpcaccess_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/vpcaccess/v1alpha1/vpcaccess_v1alpha1_messages.py)

### Service Usage API

- Major update to the Service Usage API client and messages for `v1`, with significant additions to `serviceusage_v1_messages.py` and `serviceusage_v1.json`.
  - File: [serviceusage_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceusage/v1/serviceusage_v1_messages.py)

### Cloud IoT Core API

- Added new API client, messages, and resources for `cloudiot/v1`, including `cloudiot_v1_client.py`, `cloudiot_v1_messages.py`, and `cloudiot_v1.json`.
  - File: [cloudiot_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py)

### Google Kubernetes Engine Policy API

- Introduced new API client, messages, and resources for `kubernetespolicy/v1alpha1`, including `kubernetespolicy_v1alpha1_client.py` and `kubernetespolicy_v1alpha1_messages.py`.
  - File: [kubernetespolicy_v1alpha1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_client.py)

### Cloud Speech-to-Text API

- Added new API client, messages, and resources for `speech/v1p1beta1`, including `speech_v1p1beta1_client.py` and `speech_v1p1beta1_messages.py`.
  - File: [speech_v1p1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_client.py)

### Compute Engine API

- Substantial additions to `compute/alpha` messages and client, with large increases in `compute_alpha_messages.py` and `compute_alpha.json`.
  - File: [compute_alpha_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py)

### Cloud Vision (Alpha)

- The `Patch` method for Product resources in the alpha Vision API now has a clarified docstring, explicitly stating that only the `display_name`, `description`, and `labels` fields can be updated.
  - File: [alpha_vision_v1_client.py:931](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_client.py#L931)

### Cloud Vision API (alpha)

- Updated the description for `updateMask` in `AlphaVisionProjectsLocationsProductsPatchRequest` for clarity.
  - File: [alpha_vision_v1_messages.py:282](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L282)
- Updated the description for `bestGuessLabels` in `GoogleCloudVisionV1p2beta1WebDetection` for clarity.
  - File: [alpha_vision_v1_messages.py:2344](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L2344)
- Updated field indexing for `filter`, `productCategories`, `productSet` in `ProductSearchParams` due to field removals.
  - File: [alpha_vision_v1_messages.py:3326](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L3326)
- Updated field indexing for `indexTime` and `results` in `ProductSearchResults` due to field removals.
  - File: [alpha_vision_v1_messages.py:3362](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L3362)
- Updated the description for `bestGuessLabels` in `WebDetection` for clarity.
  - File: [alpha_vision_v1_messages.py:3858](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L3858)

### Alpha Vision

- Extensive updates to the `alpha_vision_v1` API definition, including removal of several deprecated fields related to product search (e.g., `category`, `productCategory`, `NormalizedBoundingPoly`), and clarifications in descriptions for `csvFileUri` and `bestGuessLabels`.
  - File: [alpha_vision_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision_v1.json)

### Cloud IoT Core

- Introduced a new `v1` API client, messages, resources, and JSON definitions for Cloud IoT Core.
  - File: [cloudiot_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py)
- Significant expansion of the API for `cloudiot/v1` to introduce Device Groups. New service clients and methods have been added for managing device configurations, states, and IAM policies under `projects.locations.registries.groups.devices.configVersions`, `projects.locations.registries.groups.devices.states`, `projects.locations.registries.groups.devices`, and `projects.locations.registries.groups`.
  - File: [cloudiot_v1_client.py:38](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py#L38)
- Removed 'Required' from the description of the `role` field in the `Binding` message within the IAM policy definition, clarifying that while roles are typically required, the API description no longer explicitly states it as a general rule here.
  - File: [cloudiot_v1_messages.py:34](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_messages.py#L34)

### Container (GKE)

- Significant additions to Container (GKE) API messages across `v1`, `v1alpha1`, and `v1beta1` versions, implying new GKE features or configuration options.
  - File: [container_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1/container_v1_messages.py)

### Kubernetes Policy

- Added an entirely new `v1alpha1` API client, messages, and JSON definitions for Kubernetes Policy.
  - File: [kubernetespolicy_v1alpha1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_client.py)
- Introduced the `kubernetespolicy/v1alpha1` API, including message definitions for managing Kubernetes cluster policies. This encompasses `PodSecurityPolicy` with options like `AllowedFlexVolume`, `AllowedHostPath`, `FSGroupStrategyOptions`, `RunAsUserStrategyOptions`, `SELinuxStrategyOptions`, and `SupplementalGroupsStrategyOptions`. It also includes messages for `ClusterRole`, `ClusterRoleBinding`, `Role`, `RoleBinding` for RBAC, and `ResourceQuota` for resource management.
  - File: [kubernetespolicy_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_messages.py)
- Introduced resource definitions for the new `kubernetespolicy/v1alpha1` API, including `BASE_URL`, `DOCS_URL`, and resource `Collections` for `projects` and `projects.namespaces`.
  - File: [resources.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/resources.py#L1)
- New `kubernetespolicy:v1alpha1` API added with resources such as `Namespace` and `ClusterPolicy` for managing Kubernetes policies from GCP.
  - File: [kubernetespolicy_v1alpha1.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy_v1alpha1.json#L1)

### Logging

- Minor additions and modifications to the Logging `v2` API client, messages, and JSON definitions.
  - File: [logging_v2_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/logging/v2/logging_v2_client.py)

### ML Engine

- Minor additions and modifications to ML Engine `v1` API messages and JSON definitions.
  - File: [ml_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/ml/v1/ml_v1_messages.py)

### Pub/Sub

- Minor additions and modifications to Pub/Sub `v1` API messages and JSON definitions.
  - File: [pubsub_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/pubsub/v1/pubsub_v1_messages.py)

### Source Repository

- Minor additions and modifications to Source Repository `v1` API messages and JSON definitions.
  - File: [sourcerepo_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sourcerepo/v1/sourcerepo_v1_messages.py)
- The `Binding` message in `sourcerepo:v1` now includes a new `condition` field of type `Expr`. A new `Expr` message type is also defined.
  - File: [sourcerepo_v1_messages.py:86](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sourcerepo/v1/sourcerepo_v1_messages.py#L86)

### Spanner

- Minor additions and modifications to Spanner `v1` API client, messages, and JSON definitions.
  - File: [spanner_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/spanner/v1/spanner_v1_client.py)

### Speech-to-Text

- Introduced a new `v1p1beta1` API client, messages, resources, and JSON definitions for Speech-to-Text.
  - File: [speech_v1p1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_client.py)

### SQL Admin

- Significant additions and modifications to SQL Admin `v1beta4` API client, messages, and JSON definitions.
  - File: [sqladmin_v1beta4_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin/v1beta4/sqladmin_v1beta4_client.py)

### Storage

- Minor additions and modifications to Storage `v1` API messages and JSON definitions.
  - File: [storage_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/storage/v1/storage_v1_messages.py)

### Testing

- Minor additions and modifications to Testing `v1` API messages and JSON definitions.
  - File: [testing_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/testing/v1/testing_v1_messages.py)

### VPC Access

- Minor additions to VPC Access `v1alpha1` API messages and JSON definitions.
  - File: [vpcaccess_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess/v1alpha1/vpcaccess_v1alpha1_messages.py)
- Added a new `ERROR` status to `Connector.StatusValueValuesEnum`, indicating a connector is in a bad state and manual deletion is recommended.
  - File: [vpcaccess_v1alpha1_messages.py:37](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess/v1alpha1/vpcaccess_v1alpha1_messages.py#L37)

### Cloud Category Manager

- The `Binding` message in `categorymanager/v1alpha2` now includes a `condition` field and the `role` field description has been updated. The protobuf field numbers for `condition`, `members`, and `role` have been reordered. A new `Expr` message has been defined to represent expression text for IAM conditions.
  - File: [categorymanager_v1alpha2_messages.py:203](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/categorymanager/v1alpha2/categorymanager_v1alpha2_messages.py#L203)

### Compute

- The `SecurityPolicy` message in the beta API now includes `labelFingerprint` and `labels` fields, which has shifted the field numbers for subsequent fields (`name`, `rules`, `selfLink`).
  - File: [compute_beta_messages.py:31180](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L31180)
- Enum values for `Quota.MetricValueValuesEnum` have shifted in the beta and v1 APIs due to the addition of new GPU metrics.
  - File: [compute_beta_messages.py:28183](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L28183)
- The `ALLOCATIONS` collection has been added to the Compute Alpha API resources, indicating a new resource type is available.
  - File: [resources.py:38](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/resources.py#L38)

### Kubernetes Engine

- Existing fields in the `AuditEvent` message were re-indexed after the addition of the new `annotations` field.
  - File: [container_v1_messages.py:209](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1/container_v1_messages.py#L209)
- The `masterIpv4CidrBlock` field in the `Cluster` message is now deprecated in `v1alpha1` and `v1beta1` APIs, with a note to use `private_cluster_config.master_ipv4_cidr_block` instead.
  - File: [container_v1alpha1_messages.py:312](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L312)
- The `privateCluster` field in the `Cluster` message is now deprecated in `v1alpha1` and `v1beta1` APIs, with a note to use `private_cluster_config.enabled` instead.
  - File: [container_v1alpha1_messages.py:340](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L340)
- Added the `nodeSchedulingStrategy` field to the `Cluster` message in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:339](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L339)
- Added the `privateClusterConfig` field to the `Cluster` message in `v1alpha1` and `v1beta1` APIs.
  - File: [container_v1alpha1_messages.py:343](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L343)
- Added the `securityProfile` field to the `Cluster` message in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:345](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L345)
- Added the `desiredResourceUsageExportConfig` field to the `ClusterUpdate` message in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:610](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L610)
- Added the `securityProfile` field to the `ClusterUpdate` message in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:612](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L612)
- Added the `masterUpdateRestriction` field to the `MaintenancePolicy` message in `v1alpha1` and `v1beta1` APIs.
  - File: [container_v1alpha1_messages.py:2123](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L2123)
- Added the `securityProfile` field to the `UpdateMasterRequest` message in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:3450](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L3450)
- The `Cluster` message (v1alpha1, v1beta1) now includes new fields: `nodeSchedulingStrategy`, `securityProfile` (referencing a new `SecurityProfile` object), and `privateClusterConfig` (referencing a new `PrivateClusterConfig` object).
  - File: [container_v1alpha1.json:285](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L285)
- The `MaintenancePolicy` message (v1alpha1, v1beta1) now includes a `masterUpdateRestriction` field, referencing a new `MasterUpdateRestriction` object.
  - File: [container_v1alpha1.json:1117](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L1117)
- The `UpdateClusterRequest` message (v1alpha1) now includes `securityProfile` and `desiredResourceUsageExportConfig` fields.
  - File: [container_v1alpha1.json:1601](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L1601)
- The `SetMasterAuthRequest` message (v1alpha1) now includes a `securityProfile` field.
  - File: [container_v1alpha1.json:1912](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L1912)

### Kubernetes Engine / Audit Logging

- Added an `annotations` field to the `AuditLog` object in the `container_v1.json` API definition, allowing unstructured key-value maps to be stored with audit events.
  - File: [container_v1.json:2152](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1.json#L2152)

### Runtime Config

- The `condition` field in the `Binding` message now explicitly states it is 'Unimplemented' in its description, and removed previous internal visibility notes.
  - File: [runtimeconfig_v1beta1_messages.py:119](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/runtimeconfig/v1beta1/runtimeconfig_v1beta1_messages.py#L119)
- The `role` field in the `Binding` message no longer includes 'Required' in its description.
  - File: [runtimeconfig_v1beta1_messages.py:138](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/runtimeconfig/v1beta1/runtimeconfig_v1beta1_messages.py#L138)
- Updated the description for the `SECURITY_REALM` enum value within the `Condition` message to include details about 'realm groups' and the `RealmAclRep` object.
  - File: [runtimeconfig_v1beta1_messages.py:228](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/runtimeconfig/v1beta1/runtimeconfig_v1beta1_messages.py#L228)

### Redis API

- Removed generated API message definitions and JSON schema files for Redis API v1alpha1 and v1beta1, suggesting an internal restructuring or regeneration of API clients.
  - File: [redis_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/redis/v1alpha1/redis_v1alpha1_messages.py)

### Cloud Speech-to-Text

- New resource collections (`PROJECTS`, `PROJECTS_LOCATIONS`, `PROJECTS_LOCATIONS_DATASETS`) were added to the `v1p1beta1` API's `resources.py` and are implied in the updated `speech_v1p1beta1.json`.
  - File: [resources.py:34](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/resources.py#L34)
- Added new client services: `ProjectsLocationsDatasetsService`, `ProjectsLocationsModelsService`, `ProjectsLocationsService`, and `ProjectsService` to the `SpeechV1p1beta1` API client.
  - File: [speech_v1p1beta1_client.py:38](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_client.py#L38)
- Introduced new API methods for managing datasets: `Create`, `Get`, and `List` on `speech.projects.locations.datasets` resources.
  - File: [speech_v1p1beta1_client.py:77](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_client.py#L77)
- Introduced new API methods for managing models: `Create`, `Deploy`, `Evaluate`, and `List` on `speech.projects.locations.models` resources.
  - File: [speech_v1p1beta1_client.py:168](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_client.py#L168)
- Added new message classes to support custom model and dataset management: `DataErrors`, `DataStats`, `Dataset`, `DeployModelRequest`, `EvaluateModelRequest`, `EvaluateModelResponse`, `ListDatasetsResponse`, `ListModelsResponse`, and `Model`.
  - File: [speech_v1p1beta1_messages.py:12](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_messages.py#L12)
- The `documentationLink` for `speech_v1p1beta1.json` has been updated from `https://cloud.google.com/speech/` to `https://cloud.google.com/speech-to-text/docs/quickstart-protocol`.
  - File: [speech_v1p1beta1.json:17](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech_v1p1beta1.json#L17)

## Unannounced Changes

*Changes found in code but not mentioned in official release notes:* 🕵️

### Hidden Feature

- Introduction of a new `Allocation` resource and associated nested types (e.g., `AllocationSpecificSKUAllocation`, `AllocationSpecificSKUAllocationAllocatedInstanceProperties`) within the `compute:alpha` API schema. This enables the pre-allocation of specific instance configurations, including machine type, accelerators, and local SSDs. New API methods for `compute.allocations` (e.g., `get`, `insert`, `list`, `updateResourceShape`, and IAM methods like `getIamPolicy`, `setIamPolicy`, `testIamPermissions`) were also added.
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- Added the `allocationAffinity` property to the `Instance` resource within the `compute:alpha` API, allowing instances to specify how they consume pre-allocated capacity (e.g., `ANY_ALLOCATION`, `SPECIFIC_ALLOCATION`).
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- The `compute.instances.insert` and `compute.instances.run` methods in the `compute:alpha` API now include a `sourceMachineImage` parameter, enabling instance creation from a machine image.
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- Expanded the `Quota.metric` enum in the `compute:alpha` API to include new GPU-related metrics, specifically for NVIDIA P4 GPUs and their preemptible counterparts (e.g., `GPUS_ALL_REGIONS`, `NVIDIA_P4_GPUS`, `NVIDIA_P4_VWS_GPUS`, `PREEMPTIBLE_NVIDIA_P100_VWS_GPUS`, `PREEMPTIBLE_NVIDIA_P4_GPUS`, `PREEMPTIBLE_NVIDIA_P4_VWS_GPUS`).
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- Introduced new API client (`cloudiot_v1_client.py`) and API definitions for Cloud IoT `v1` API, suggesting new Cloud IoT support.
  - File: [cloudiot_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py)
- Introduced new `gcloud compute routers nats` command group, flags, and utilities (`nats_utils.py`), indicating the development of a new Cloud NAT feature.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/compute/routers/nats/flags.py)
- Added new `resources.yaml` file for `compute/networks/vpc_access`, indicating a new VPC Access feature.
  - File: [resources.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/compute/networks/vpc_access/resources.yaml)
- Introduced new API client (`kubernetespolicy_v1alpha1_client.py`) and API definitions for Kubernetes Policy `v1alpha1` API, suggesting new Kubernetes policy management capabilities.
  - File: [kubernetespolicy_v1alpha1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_client.py)
- Introduced new API client (`serviceusage_v1_client.py`) and API definitions for Service Usage `v1` API.
  - File: [serviceusage_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/serviceusage/v1/serviceusage_v1_client.py)
- Introduced new API client (`speech_v1p1beta1_client.py`) and API definitions for Speech `v1p1beta1` API, suggesting updates to the Cloud Speech-to-Text API.
  - File: [speech_v1p1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_client.py)
- The Kubernetes Engine `--enable-autorepair` flag, previously suppressed, is now fully exposed. Additionally, a warning (`WarnForUnspecifiedAutorepair`) advising users about the default behavior of node auto-repair was removed.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py)
- The interactive coshell now explicitly checks for and sources `~/.bashrc` before `$ENV` at startup.
  - File: [coshell.py:24](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/interactive/coshell.py#L24)
- Major additions to Compute Engine command-line interface, including new files for Cloud Routers NAT (`routers/nats/`) and VPC Access (`networks/vpc_access/`) configuration.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/compute/routers/nats/__init__.py)
- Added support for IAM Conditions within `Binding` messages for Cloud Category Manager, including a new `Expr` message for condition expressions.
  - File: [categorymanager_v1alpha2_messages.py:203](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/categorymanager/v1alpha2/categorymanager_v1alpha2_messages.py#L203)
- Added support for IAM Conditions within `Binding` messages for Cloud Billing, including a new `Expr` message for condition expressions.
  - File: [cloudbilling_v1_messages.py:156](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudbilling/v1/cloudbilling_v1_messages.py#L156)
- Enhanced `SourceLocation` in Cloud Debugger to include a `column` field for more precise source code location reporting.
  - File: [clouddebugger_v2_messages.py:698](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/clouddebugger/v2/clouddebugger_v2_messages.py#L698)
- Introduced extensive API support for Cloud IoT Core Device Groups, allowing for new device and group management operations and IAM policy controls. This includes new service clients and methods for `projects.locations.registries.groups` and its sub-resources.
  - File: [cloudiot_v1_client.py:38](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py#L38)
- Added new `AllocationsService` and associated API methods within the Compute Alpha API for managing resource allocations. This introduces new capabilities for interacting with Compute Engine resource allocation, including listing, getting, inserting, and updating allocations.
  - File: [compute_alpha_client.py:385](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L385)
- The introduction of the `kubernetespolicy:v1alpha1` API schema, defining objects like `Namespace` and `ClusterPolicy` for managing Kubernetes policies from GCP.
  - File: [kubernetespolicy_v1alpha1.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy_v1alpha1.json#L1)
- Integration of the Service Usage API (v1), introducing new capabilities for managing Google Cloud services for projects, such as enabling/disabling services programmatically.
  - File: [serviceusage_v1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceusage/v1/serviceusage_v1_client.py#L1)
- Added support for IAM Conditions within `servicemanagement/v1` bindings, allowing more flexible and secure access policies. This includes the new `Expr` message type.
  - File: [servicemanagement_v1_messages.py:349](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_messages.py#L349)
- A new query parameter `excludeFinalQuotaSettingsInResponse` was added to `servicemanagement.services.projectSettings.patch`, giving more control over API response content.
  - File: [servicemanagement_v1_messages.py:3713](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_messages.py#L3713)
- IAM Conditions (via the new `condition` field and `Expr` message) were added to `Binding` messages for Source Repository, enhancing access control granularity.
  - File: [sourcerepo_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sourcerepo/v1/sourcerepo_v1_messages.py)
- Added extensive API capabilities for managing custom Speech-to-Text datasets and models (create, get, list datasets; create, deploy, evaluate, list models) in the `v1p1beta1` API. This indicates a new AutoML-style feature for Speech-to-Text, allowing users to train and manage custom speech models.
  - File: [speech_v1p1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_client.py)
- New API definitions for AutoML Speech resources (`Dataset`, `DataStats`, `DataErrors`, `Model`, `EvaluateModelResponse`, `ListDatasetsResponse`, `ListModelsResponse`, `DeployModelRequest`, `EvaluateModelRequest`) and their corresponding methods have been added to `speech_v1p1beta1.json`, indicating a significant new feature set not mentioned in release notes.
  - File: [speech_v1p1beta1.json:552](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech_v1p1beta1.json#L552)

### Refactoring

- Extensive reordering and explicit definition of all `compute.addresses` API methods (`aggregatedList`, `delete`, `get`, `insert`, `list`, `setLabels`, `testIamPermissions`) within the `compute:alpha` API JSON schema. This appears to be a structural reorganization.
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- Extensive refactoring of resource concept handling within `calliope/concepts` and `command_lib/util/concepts` modules.
  - File: [concepts.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/calliope/concepts/concepts.py)
- Changed integer division from `/` to `//` in `DEFAULT_OPERATION_MAX_TRIES` for Python 2/3 compatibility.
  - File: [operations_util.py:37](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/app/operations_util.py#L37)
- Added `from __future__ import division` import statement to numerous Python files, indicating a widespread refactoring effort for Python 2 to 3 compatibility to ensure consistent integer division behavior.
  - File: [utils.py:16](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/category_manager/utils.py#L16)
- Internal refactoring of how Compute Engine target HTTP proxy arguments are resolved, specifically changing the invocation of `flags.TARGET_HTTP_PROXY_ARG` to `flags.TargetHttpProxyArg()` and passing `include_alpha`.
  - File: [forwarding_rules_utils.py:77](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/forwarding_rules_utils.py#L77)
- Changed integer division from `/` to `//` in the `InterpretMachineType` function within Compute Engine instance utilities for Python 2/3 compatibility.
  - File: [instance_utils.py:124](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/instance_utils.py#L124)
- Added `from __future__ import division` to numerous files across `compute`, `container`, `dataflow`, `dataproc`, `datastore`, and `debug` API libraries. This ensures consistent floating-point division behavior.
  - File: [managed_instance_groups_utils.py:16](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/managed_instance_groups_utils.py#L16)
- Refactored `api_lib/compute/resource_specs.py` to use `float()` explicitly or rely on `__future__.division` for floating point calculations in `_MachineTypeMemoryToCell` and `_FormatCustomMachineTypeName`.
  - File: [resource_specs.py:140](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/resource_specs.py#L140)
- Significant refactoring of YAML utility functions in Dataproc: `ReadYaml` and `WriteYaml` now accept streams instead of file paths, `ReadYaml` supports schema validation, and a new `MessageToYaml` function was added for direct message-to-YAML string conversion. Introduced imports for `pkg_resources` and `jsonschema.validators`.
  - File: [util.py:32](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/dataproc/util.py#L32)
- Refactored HTTP transport for container image operations by introducing a new helper function `Http()` in `api_lib/container/images/util.py` to ensure consistent `response_encoding='utf8'`.
  - File: [util.py:64](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/container/images/util.py#L64)
- Widespread addition of `from __future__ import division` to many Python files across various `api_lib` and `command_lib` modules. This is a Python 2/3 compatibility change, ensuring division behaves as float division.
- Removal of the `CanonicalizeOperationName` function from `genomics_util.py`. Its functionality for handling Genomics operation name canonicalization and version detection is now integrated into the new `genomics_client.py` module.
  - File: [genomics_util.py:195](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/genomics/genomics_util.py#L195)
- Added `from __future__ import division` import to numerous Python files across the SDK. This is a common refactoring to ensure consistent integer division behavior in preparation for Python 3.
  - File: [versions_api.py:15](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/ml_engine/versions_api.py#L15)
- Updated memory calculation in `sql/instance_prop_reducers.py` to use integer division (`//`) instead of floating-point division (`/`), ensuring consistent behavior for machine type derivations.
  - File: [instance_prop_reducers.py:223](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/sql/instance_prop_reducers.py#L223)
- Changed time calculation for operation timeouts in `util/waiter.py` to use integer division (`//`) for `max_wait_ms` and `time_passed_ms`, improving robustness and cross-Python-version compatibility.
  - File: [waiter.py:257](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/util/waiter.py#L257)
- Added `from __future__ import division` to numerous Python files across `calliope` and `command_lib` modules. This prepares the codebase for consistent integer division behavior in Python 3 environments.
  - File: [cli_tree.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/cli_tree.py#L18)
- Changed float division `/` to integer division `//` in `_TruncateToLineWidth` to ensure consistent behavior across Python 2 and Python 3, specifically for `width // 2`.
  - File: [exceptions.py:175](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/exceptions.py#L175)
- Changed float division `/` to integer division `//` in `_Visit` to ensure consistent behavior across Python 2 and Python 3, specifically for `self._num_visited // self._num_nodes`.
  - File: [walker.py:157](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/walker.py#L157)
- Extensive internal refactoring of resource concept parsing within `googlecloudsdk/calliope/concepts/concepts.py`. This includes the introduction of new abstract `Parse` methods in `ConceptSpec` and `ResourceSpec`, and several helper methods (`IsAnchor`, `_ParseFromPluralValue`, `BuildFullFallthroughsMap`, `GetArgAndBaseFallthroughsForAttribute`, `_GetAttributeAnchorFallthroughs`, `_AddAnchorFallthroughs`) to centralize and refine resource attribute resolution logic.
  - File: [concepts.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/concepts.py)
- Significant refactoring of `MultitypeConceptSpec` to align with the new resource parsing architecture, including updated methods like `_GetActivelySpecifiedAttributes`, `_GetPossibleTypes`, `_GetActiveType`, and `Initialize`. This enhances the handling of concepts that can resolve to multiple underlying types.
  - File: [multitype.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/multitype.py)
- Widespread addition of `from __future__ import division` across numerous Python files in `api_lib` and `command_lib`, likely part of an ongoing Python 2 to Python 3 migration effort to ensure consistent division behavior.
  - File: [create_util.py:4](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/app/create_util.py#L4)
- Refactoring of resource concept parsing and handling within `calliope.concepts` with large insertions/deletions in `concepts.py`, `deps.py`, and `multitype.py`.
  - File: [concepts.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/concepts.py)
- The App Engine Go runtime staging registry (`_STAGING_REGISTRY`) in `staging.py` was updated to explicitly separate `STANDARD` environment Go runtimes from `FLEX` and `MANAGED_VMS`.
  - File: [staging.py:326](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/app/staging.py#L326)
- New utility files `target_http_proxies_utils.py` and `url_maps_utils.py` were added to Compute Engine command-lib, indicating refactoring or new shared logic for HTTP proxy and URL map management.
  - File: [target_http_proxies_utils.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/target_http_proxies_utils.py)
- Clarified the `--size` flag help text for compute disks, adding a note about limiting boot disk size to 2TB due to MBR partition table limitations.
  - File: [flags.py:335](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/instances/flags.py#L335)
- Widespread addition of `from __future__ import division` and extra blank lines across many files for Python 2/3 compatibility.
  - File: [flags.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/addresses/flags.py#L18)
- Added `from __future__ import division` imports across numerous Python files, indicating a general refactoring effort or preparation for future Python 3 compatibility.
- Numerous Python files across `api_lib` and `command_lib` received `from __future__ import division` imports, indicating ongoing refactoring efforts for Python 2 to Python 3 compatibility.
- The `ClusterUpgradeMessage` function in Kubernetes Engine utilities was refactored into more modular helper functions, `_MasterUpgradeMessage` and `_NodeUpgradeMessage`, to improve code organization and maintainability.
  - File: [container_command_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/container_command_util.py)
- Numerous Python files across various command libraries (e.g., `crash_handling`, `dataflow`, `dataproc`, `datastore`, `deployment_manager`, `dns`, `emulators`, `endpoints`, `error_reporting`, `feedback`, `filestore`, `functions`, `genomics`, `iam`, `interactive`, `iot`, `kms`, `logging`, `ml`, `ml_engine`, `monitoring`, `organizations`, `oslogin`, `projects`, `pubsub`, `redis`, `resource_manager`, `runtime_config`, `scheduler`, `search_help`, `services`, `source`, `spanner`, `sql`, `static_completion`, `storage`, `tasks`, `util`) have added `from __future__ import division`. This is a Python 2 compatibility change, ensuring that the division operator `/` performs float division, consistent with Python 3.
  - File: [crash_handling.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/crash_handling.py#L18)
- The interactive shell's `KeyBindings` constructor no longer accepts an `edit_mode` parameter, indicating a refactoring of how editing modes are configured.
  - File: [application.py:161](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/interactive/application.py#L161)
- The interactive shell now dynamically sets its editing mode (EMACS or VI) via a `SetModes` callback, allowing it to adapt to `coshell` mode changes.
  - File: [application.py:299](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/interactive/application.py#L299)
- Changed division operations from `/` to `//` in `googlecloudsdk/command_lib/functions/deploy/source_util.py` and `googlecloudsdk/command_lib/interactive/application.py` to explicitly perform integer division, primarily for Python 2/3 compatibility.
  - File: [source_util.py:137](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/deploy/source_util.py#L137)
- Added `from __future__ import division` imports across many Python files, likely as part of Python 3 compatibility efforts.
  - File: [bindings.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/interactive/bindings.py#L18)
- Renamed the internal keybinding for web help from 'browse' to 'web-help' in the interactive shell.
  - File: [bindings.py:108](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/interactive/bindings.py#L108)
- Updated local ML Engine prediction utility to encode instances to UTF-8 before writing to `stdin`, improving Python 3 compatibility.
  - File: [local_utils.py:90](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/ml_engine/local_utils.py#L90)
- Numerous Python files across various `command_lib` directories have added `from __future__ import division`, indicating a widespread effort towards Python 3 compatibility and refactoring.
  - File: [versions_util.py:16](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/ml_engine/versions_util.py#L16)
- Refactored the logic for parsing and applying label updates to ML Engine versions, utilizing `repeated.CachedResult` for more efficient attribute retrieval.
  - File: [versions_util.py:40](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/ml_engine/versions_util.py#L40)
- Added logic to sort `additionalProperties` for `NotificationChannel` labels in Cloud Monitoring utilities, ensuring consistent output order.
  - File: [util.py:354](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/monitoring/util.py#L354)
- Refactored resource concept parsing logic in `info_holders.py`, including delegating `BuildFullFallthroughsMap` and replacing `_ParseUncached` with a direct call to `concept_spec.Parse`.
  - File: [info_holders.py:175](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/info_holders.py#L175)
- Widespread addition of `from __future__ import division` across numerous Python files, indicating a refactoring effort towards Python 3 compatibility.
  - File: [labels_util.py:38](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/args/labels_util.py#L38)
- Implemented a fix in the metrics reporter to prevent an `ImportError` on Python 3 by explicitly removing the script's directory from `sys.path` to avoid shadowing standard library modules.
  - File: [metrics_reporter.py:23](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/core/metrics_reporter.py#L23)
- Refactoring of `StandardQueryParameters` field definitions, including removal of `bearer_token` and `pp` attributes, and re-indexing of subsequent fields.
  - File: [alpha_vision_v1_messages.py:3680](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/alpha_vision/v1/alpha_vision_v1_messages.py#L3680)
- Extensive changes to the `calliope/concepts` module (`concepts.py`, `deps.py`, `multitype.py`), suggesting a significant internal refactoring of how gcloud handles resource concepts and dependencies.
  - File: [concepts.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/concepts.py)
- Significant updates to `command_lib/interactive/` files, suggesting an overhaul or improvements to the interactive gcloud shell experience.
  - File: [application.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/interactive/application.py)
- Updates to `googlecloudsdk/core/docker/constants.py` and `googlecloudsdk/core/metrics_reporter.py`, indicating internal adjustments to Docker integration and metrics reporting.
  - File: [constants.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/core/docker/constants.py)
- Updated the description for the `network` field in Cloud Functions `CloudFunction` message to provide clearer guidance on VPC Network connectivity.
  - File: [cloudfunctions_v1_messages.py:73](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudfunctions/v1/cloudfunctions_v1_messages.py#L73)
- Updated internal documentation links in the Cloud Tasks client, changing references from `/cloud-tasks/docs/queue-yaml` to `/tasks/docs/queue-yaml` and from `/cloud-tasks/pdfs/managing-cloud-tasks-scaling-risks-2017-06-05.pdf` to `/tasks/docs/manage-cloud-task-scaling`.
  - File: [cloudtasks_v2beta2_client.py:400](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_client.py#L400)
- Documentation URLs for Cloud Tasks have been updated from `/cloud-tasks/` to `/tasks/` across various API definitions.
  - File: [resources.py:19](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/resources.py#L19)
- Docstring clarifications for `SetShieldedVmIntegrityPolicy` and `UpdateShieldedVmConfig` methods in the beta API, specifying required VM states (running/stopped) for these operations.
  - File: [compute_beta_client.py:4845](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_client.py#L4845)
- Updated example Debian image versions from 'debian-8' to 'debian-9' in `AttachedDiskInitializeParams` and `Disk` docstrings across beta and v1 APIs.
  - File: [compute_beta_messages.py:1306](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L1306)
- Clarification in the `Instance.tags` docstring across beta and v1 APIs, indicating that multiple tags can be specified via the `tags.items` field.
  - File: [compute_beta_messages.py:19789](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L19789)
- Minor docstring clarifications for properties of `ShieldedVmConfig` and `ShieldedVmIntegrityPolicy` in the beta API.
  - File: [compute_beta_messages.py:31477](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L31477)
- Updated example Debian image versions in `sourceImage` descriptions within Compute Engine disk and instance initialization parameters from `debian-8` to `debian-9`.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)
- The description for `tags` in Compute Engine `Instance` was rephrased to explicitly mention that multiple tags can be specified via the `tags.items` field.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)
- Minor rewording of descriptions for Shielded VM configuration fields (`enableIntegrityMonitoring`, `enableSecureBoot`, `enableVtpm`) and `ShieldedVmIntegrityPolicy` to improve clarity.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)
- Removed a comment (`Currently restricted because of b/36071127#comment27`) from the `diskType` field description in Kubernetes Engine `NodeConfig`, suggesting a possible removal of a previous restriction.
  - File: [container_v1_messages.py:2407](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1/container_v1_messages.py#L2407)
- The description of `imageUri` in Dataproc `InstanceGroupConfig` (v1) was clarified to indicate it "can be specified or may be inferred".
  - File: [dataproc_v1_messages.py:1073](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataproc/v1/dataproc_v1_messages.py#L1073)
- Descriptions for `updateMask` fields in various Container Analysis API requests (`ContaineranalysisProjectsScanConfigsPatchRequest`, `UpdateOperationRequest`) were clarified to specify "The fields to update.".
  - File: [containeranalysis_v1alpha1_messages.py:745](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/containeranalysis/v1alpha1/containeranalysis_v1alpha1_messages.py#L745)
- The "Required" text was removed from the description of the `role` field in the `Binding` message across several APIs (e.g., Kubernetes Engine, Dataproc, Container Analysis, Deployment Manager), standardizing its definition.
  - File: [container_v1alpha1.json:2463](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1alpha1.json#L2463)
- The description for the `condition` field within the `Binding` message in the Deployment Manager (alpha) API was simplified to "Unimplemented.".
  - File: [deploymentmanager_alpha_messages.py:99](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/deploymentmanager/alpha/deploymentmanager_alpha_messages.py#L99)
- Rebranding changes in `logging/v2` API definitions, replacing 'Stackdriver Logging' with 'Logging' and 'Stackdriver Trace' with 'Trace' in API descriptions.
  - File: [logging_v2_client.py:460](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/logging/v2/logging_v2_client.py#L460)
- Rebranding of 'Stackdriver Logging' to 'Logging' across various API descriptions, including `LogEntry`, `LogSink`, `LogExclusion`, `LogMetric`, `uniqueWriterIdentity` and API methods such as `entries.write`, `entries.list`, and `monitoredResourceDescriptors.list`. Also updated 'Google Stackdriver' to 'Google', 'Stackdriver Trace' to 'Trace', and 'Monitoring & Logging' to 'Monitoring and Logging'.
  - File: [logging_v2.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/logging_v2.json#L7)
- Clarified the description for `GoogleCloudMlV1AcceleratorConfig.count` to specify accelerators are attached 'to each machine running the job'.
  - File: [ml_v1_messages.py:81](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/ml/v1/ml_v1_messages.py#L81)
- Updated `NVIDIA_TESLA_V100` accelerator type description to note it is 'Not supported for batch prediction'.
  - File: [ml_v1_messages.py:93](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/ml/v1/ml_v1_messages.py#L93)
- Removed the 'Required' qualifier from the description of the `role` field in IAM `Binding` messages for ML Engine.
  - File: [ml_v1_messages.py:1336](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/ml/v1/ml_v1_messages.py#L1336)
- Updated descriptions for `labels` and `LabelsValue` across `CreateSnapshotRequest`, `Snapshot`, `Subscription`, and `Topic` resources to refer to the 'Creating and managing labels' documentation in Pub/Sub.
  - File: [pubsub_v1_messages.py:55](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/pubsub/v1/pubsub_v1_messages.py#L55)
- Removed the 'Required' qualifier from the description of the `role` field in IAM `Binding` messages for Pub/Sub.
  - File: [pubsub_v1_messages.py:41](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/pubsub/v1/pubsub_v1_messages.py#L41)
- Significant internal refactoring of how resource concepts and command arguments are processed within the `calliope` and `command_lib` modules, impacting the CLI's argument parsing infrastructure.
  - File: [concepts.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/concepts.py)
- Minor internal updates across many `api_lib/app` files, indicating general maintenance and compatibility updates for App Engine API utilities.
  - File: [env.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/api_lib/app/env.py)
- The documentation link for Cloud Speech-to-Text APIs (v1 and v1p1beta1) was updated.
  - File: [resources.py:19](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1/resources.py#L19)
- Updated the `documentationLink` in the `speech_v1.json` API definition from `https://cloud.google.com/speech/` to `https://cloud.google.com/speech-to-text/docs/quickstart-protocol`.
  - File: [speech_v1.json:14](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech_v1.json#L14)
- Clarifications and constraints for Cloud SQL Admin `ExportContext` and `ImportContext` messages, particularly concerning PostgreSQL instances and CSV formats, were added to `sqladmin_v1beta4_messages.py` to refine API behavior documentation.
  - File: [sqladmin_v1beta4_messages.py:386](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin/v1beta4/sqladmin_v1beta4_messages.py#L386)
- Minor description clarification for `AndroidRuntimeConfiguration` in Firebase Test Lab API messages.
  - File: [testing_v1_messages.py:275](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/testing/v1/testing_v1_messages.py#L275)
- The `versions` field in `IosDeviceCatalog` was shifted to index 3 in the API message definition due to the insertion of the new `runtimeConfiguration` field at index 2.
  - File: [testing_v1_messages.py:651](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/testing/v1/testing_v1_messages.py#L651)

### Groundwork

- Added regular expression for Go 1.10+ runtime fingerprinting (`go1\d\d(\w+\d)?`), indicating groundwork for newer Go runtimes in App Engine.
  - File: [env.py:29](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/app/env.py#L29)
- Significant additions to `googlecloudsdk/api_lib/genomics/genomics_client.py` and `googlecloudsdk/command_lib/genomics/flags.py` (125 and 25 insertions, respectively), suggesting expanded Genomics API capabilities.
  - File: [genomics_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/api_lib/genomics/genomics_client.py)
- Added new helper functions `IsRegionalHealthCheckRef` and `IsGlobalHealthCheckRef` in Compute Engine health check utilities for determining the scope of health check resource references.
  - File: [health_checks_utils.py:474](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/health_checks_utils.py#L474)
- The introduction of `GenomicsV2ApiClient` and its associated logic in `genomics_client.py` suggests groundwork for enhanced or new features utilizing the Genomics v2alpha1 API.
  - File: [genomics_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/genomics/genomics_client.py)
- Introduced a new class `MultitypeResourceSpec`, inheriting from `MultitypeConceptSpec` and `concepts.ResourceSpec`. This class includes specific overrides for `IsAnchor`, `_GetUniqueNameForSpec`, and `_GetAttributeAnchorFallthroughs`, laying groundwork for more sophisticated handling of resource arguments that can represent multiple resource types.
  - File: [multitype.py:247](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/multitype.py#L247)
- Composer command utilities (`delete_util.py`, `environment_patch_util.py`, `storage_util.py`, `util.py`) were updated to pass `release_track` to API calls, indicating a shift towards dynamic API version selection based on the command's release track.
  - File: [delete_util.py:28](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/composer/delete_util.py#L28)
- A new utility file `update_util.py` was added to `command_lib/util/args`, likely to standardize and centralize update argument processing across various `gcloud` commands.
  - File: [update_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/args/update_util.py)
- Enabled support for regional backend services in URL maps via the `BackendServiceArgumentForUrlMap` function, which now conditionally includes `compute.regionBackendServices` for alpha API versions.
  - File: [flags.py:128](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/backend_services/flags.py#L128)
- Introduced support for regional health checks by modifying `HealthCheckArgument` to include `compute.regionHealthChecks` for alpha API versions and adding new completers (`HealthChecksCompleterAlpha`, `GlobalHealthChecksCompleter`, `RegionHealthChecksCompleter`).
  - File: [flags.py:322](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/backend_services/flags.py#L322)
- Added new completer classes `HealthChecksCompleterAlpha`, `GlobalHealthChecksCompleter`, and `RegionHealthChecksCompleter` to support regional health checks for alpha API versions.
  - File: [completers.py:180](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/completers.py#L180)
- Updated forwarding rules to support regional HTTP proxies by replacing `TARGET_HTTP_PROXY_ARG` with a new `TargetHttpProxyArg` function that includes `compute.regionTargetHttpProxies` for alpha API versions.
  - File: [flags.py:215](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/forwarding_rules/flags.py#L215)
- New empty initialization file `__init__.py` added for `vpc_access` in the `command_lib/compute/networks/` directory.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/networks/vpc_access/__init__.py)
- New `resources.yaml` file defining resource attributes for `project`, `region`, `operation`, and `connector` for the VPC Access API, indicating groundwork for a new service or feature related to VPC Access.
  - File: [resources.yaml](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/networks/vpc_access/resources.yaml)
- New `instance_template` resource definition added in `resources.yaml`, providing a structured way to reference Compute Engine instance templates.
  - File: [resources.yaml:65](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/resources.yaml#L65)
- Added a new internal helper function `RouterArgumentForNat()` in `routers/flags.py` to facilitate argument parsing for NAT-related commands.
  - File: [flags.py:88](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/routers/flags.py#L88)
- Created new files (`__init__.py`, `flags.py`, `nats_utils.py`) under `command_lib/compute/routers/nats/`, providing the full command structure and utility logic for the new Cloud NAT features.
  - File: [](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/routers/nats/)
- Groundwork was added to support regional `target HTTP proxies` in Compute Engine. This includes new completers (`GlobalTargetHttpProxiesCompleter`, `RegionTargetHttpProxiesCompleter`, `TargetHttpProxiesCompleterAlpha`) and extending `TargetHttpProxyArgument` to handle regional collections when `include_alpha` is enabled.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/target_http_proxies/flags.py)
- A new utility file, `target_http_proxies_utils.py`, was added with functions (`ResolveTargetHttpProxyUrlMap`, `IsRegionalTargetHttpProxiesRef`, `IsGlobalTargetHttpProxiesRef`) to facilitate parsing regional and global URL maps for Compute Engine `Target HTTP Proxies`.
  - File: [target_http_proxies_utils.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/target_http_proxies/target_http_proxies_utils.py)
- Groundwork was added to support regional `URL maps` in Compute Engine. This includes new completers (`GlobalUrlMapsCompleter`, `RegionalUrlMapsCompleter`, `UrlMapsCompleterAlpha`) and extending `UrlMapArgument` and `UrlMapArgumentForTargetProxy` to handle regional collections when `include_alpha` is enabled.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/url_maps/flags.py)
- A new utility file, `url_maps_utils.py`, was added with functions (`ResolveUrlMapDefaultService`, `IsRegionalUrlMapRef`, `IsGlobalUrlMapRef`) to facilitate parsing regional and global backend services for Compute Engine `URL maps`.
  - File: [url_maps_utils.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/url_maps/url_maps_utils.py)
- The interactive shell's `EOFError` handling now respects a new `self.coshell.ignore_eof` setting, which can prevent the shell from exiting on Ctrl-D.
  - File: [application.py:317](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/interactive/application.py#L317)
- Added new utility functions to `command_lib/util/args/update_util.py` (71 lines added), likely supporting new or enhanced argument update logic.
  - File: [update_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/args/update_util.py)
- Significant additions to `command_lib/util/concepts/info_holders.py` (188 lines added), suggesting expansion of resource concept definitions for future commands or improved resource parsing.
  - File: [info_holders.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/info_holders.py)
- New flag definitions added to `command_lib/ml_engine/flags.py` (54 lines added), implying new or expanded functionality for ML Engine commands.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/ml_engine/flags.py)
- Improved interactive shell command completion logic by passing additional context (`command`, `last_word`, `next_to_last_word`) to the completion function.
  - File: [coshell.py:65](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/interactive/coshell.py#L65)
- Added `COSHELL_VERSION` environment variable to the interactive coshell and implemented a callback mechanism (`SetModesCallback`) for tracking mutable shell mode changes.
  - File: [coshell.py:126](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/interactive/coshell.py#L126)
- Updated `apis_map.py` to reflect new, updated, and potentially removed API versions, serving as internal API management.
  - File: [apis_map.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/third_party/apis/apis_map.py)
- Introduced `update_util.py` to provide utilities (`UpdateResult`, `AddClearableField`, `ParseClearableField`) for creating and parsing arguments related to update commands, particularly for fields that can be cleared.
  - File: [update_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/args/update_util.py)
- Added `MultitypeResourceInfo` and `MultitypeResourcePresentationSpec` classes to the resource concept framework, indicating groundwork for supporting resources that can represent multiple underlying types.
  - File: [info_holders.py:372](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/info_holders.py#L372)
- Added new API endpoint override properties `file` and `vpcaccess` to allow configuration of custom endpoints for these services.
  - File: [properties.py:1432](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/core/properties.py#L1432)
- Significant additions to Cloud Composer command utilities (`environment_patch_util.py`, `storage_util.py`), suggesting groundwork for new environment management capabilities.
  - File: [environment_patch_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/composer/environment_patch_util.py)
- Significant changes in GKE command utilities (`container_command_util.py`, `flags.py`), indicating groundwork for future GKE features.
  - File: [container_command_util.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/command_lib/container/container_command_util.py)
- Internal protobuf field reordering occurred for `Binding` messages in `categorymanager/v1alpha2` and `cloudbilling/v1`, and for `SourceLocation` in `clouddebugger/v2`. While typically handled by generated code, this represents an internal schema change.
- Added new resource collection definitions `PROJECTS_LOCATIONS_REGISTRIES_GROUPS` and `PROJECTS_LOCATIONS_REGISTRIES_GROUPS_DEVICES` to support hierarchical grouping of devices in Cloud IoT Core.
  - File: [resources.py:76](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/resources.py#L76)
- New internal protobuf message types (`MessageSet`, `StatusProto`, `TypedMessage`) have been added to the Cloud Composer v1 and v1beta1 API messages and JSON definitions. These are likely for enhanced internal status reporting or future features.
  - File: [composer_v1_messages.py:347](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_messages.py#L347)
- Added API definitions for node scheduling strategy in GKE clusters, including `STRATEGY_UNSPECIFIED`, `PRIORITIZE_LEAST_UTILIZED`, and `PRIORITIZE_MEDIUM_UTILIZED` for `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:374](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L374)
- Introduced a new `PrivateClusterConfig` message with fields like `enablePrivateEndpoint`, `enablePrivateNodes`, and `masterIpv4CidrBlock` to consolidate private cluster settings in `v1alpha1` and `v1beta1` APIs.
  - File: [container_v1alpha1_messages.py:2794](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L2794)
- Added API definitions for `MasterUpdateFreeze` and `MasterUpdateRestriction` within `MaintenancePolicy` to allow users to freeze GKE master updates during critical business periods for `v1alpha1` and `v1beta1` APIs.
  - File: [container_v1alpha1_messages.py:2219](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L2219)
- Added API definitions for a `SecurityProfile` message with fields `disableRuntimeRules` and `name` to allow users to select and potentially disable runtime rules for GKE clusters in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:2850](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L2850)
- The `masterIpv4CidrBlock` field in the `Cluster` message is now deprecated in `v1alpha1` and `v1beta1` APIs, with a note to use `private_cluster_config.master_ipv4_cidr_block` instead.
  - File: [container_v1alpha1_messages.py:312](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L312)
- The `privateCluster` field in the `Cluster` message is now deprecated in `v1alpha1` and `v1beta1` APIs, with a note to use `private_cluster_config.enabled` instead.
  - File: [container_v1alpha1_messages.py:340](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L340)
- Added the `nodeSchedulingStrategy` field to the `Cluster` message in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:339](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L339)
- Added the `privateClusterConfig` field to the `Cluster` message in `v1alpha1` and `v1beta1` APIs.
  - File: [container_v1alpha1_messages.py:343](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L343)
- Added the `securityProfile` field to the `Cluster` message in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:345](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L345)
- Added the `desiredResourceUsageExportConfig` field to the `ClusterUpdate` message in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:610](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L610)
- Added the `securityProfile` field to the `ClusterUpdate` message in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:612](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L612)
- Added the `masterUpdateRestriction` field to the `MaintenancePolicy` message in `v1alpha1` and `v1beta1` APIs.
  - File: [container_v1alpha1_messages.py:2123](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L2123)
- Added the `securityProfile` field to the `UpdateMasterRequest` message in `v1alpha1` API.
  - File: [container_v1alpha1_messages.py:3450](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L3450)
- Added an `annotations` field to the `AuditLog` object in the `container_v1.json` API definition, allowing unstructured key-value maps to be stored with audit events.
  - File: [container_v1.json:2152](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1.json#L2152)
- Added entirely new API definitions, client library, and message protos for a `kubernetespolicy` `v1alpha1` service, indicating groundwork for a new Kubernetes Policy management feature.
  - File: [kubernetespolicy_v1alpha1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_client.py)
- Added extensive new API message definitions for the `kubernetespolicy/v1alpha1` service. This includes comprehensive structures for defining and managing Kubernetes policies such as Pod Security Policies, Role-Based Access Control (RBAC) roles and bindings, and resource quotas, suggesting groundwork for a new Kubernetes policy management feature.
  - File: [kubernetespolicy_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_messages.py)
- Added API request messages `KubernetespolicyProjectsNamespacesDeleteRequest`, `KubernetespolicyProjectsNamespacesGetRequest`, and `KubernetespolicyProjectsNamespacesListRequest` for interacting with Kubernetes policy namespaces within a GCP project.
  - File: [kubernetespolicy_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/kubernetespolicy_v1alpha1_messages.py)
- Groundwork for the new `kubernetespolicy/v1alpha1` API, defining its base URL, documentation URL, and initial resource collections (`projects`, `projects.namespaces`). This indicates the introduction of a new API for managing Kubernetes policies.
  - File: [resources.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/kubernetespolicy/v1alpha1/resources.py#L1)
- The `replicapoolupdater_v1beta1.json` API definition's revision was updated from `20180622` to `20180711`.
  - File: [replicapoolupdater_v1beta1.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/replicapoolupdater_v1beta1.json#L7)
- The entire `serviceusage:v1` API definition was added, including its client, messages, and resource files. This is a significant new API integration.
  - File: [serviceusage_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceusage_v1.json)
- New `PROJECTS`, `PROJECTS_LOCATIONS`, `PROJECTS_LOCATIONS_DATASETS` resource collections were added to the Cloud Speech-to-Text `v1p1beta1` API, indicating new ways to organize and manage speech-related data.
  - File: [resources.py:34](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/resources.py#L34)
- Documentation for `PartitionQuery` and `PartitionRead` methods in Cloud Spanner was updated to provide clearer details on partition token invalidation conditions.
  - File: [spanner_v1_client.py:525](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/spanner/v1/spanner_v1_client.py#L525)
- Updated `sqladmin_v1beta4.json` API revision from `20180622` to `20180711`.
  - File: [sqladmin_v1beta4.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin_v1beta4.json#L7)
- Updated `storage_v1.json` API revision from `20180622` to `20180711`.
  - File: [storage_v1.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/storage_v1.json#L7)
- Updated `testing_v1.json` API revision from `20180622` to `20180711`.
  - File: [testing_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/testing/v1/testing_v1_messages.py)
- Updated `toolresults_v1beta3.json` API revision from `20180622` to `20180711`.
  - File: [toolresults_v1beta3.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/toolresults_v1beta3.json#L7)
- Updated `vpcaccess_v1alpha1.json` API revision from `20180622` to `20180711`.
  - File: [vpcaccess_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vpcaccess/v1alpha1/vpcaccess_v1alpha1_messages.py)

### Feature Flag

- A new hidden flag, `--clear-resource-usage-bigquery-dataset`, was added to Kubernetes Engine commands. This flag, part of `AddResourceUsageBigqueryDatasetFlag`, allows disabling the export of cluster resource usage to BigQuery.
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py)

### Other

- Clarified the description for the `condition` field in `GoogleIamV1Binding` messages (v1alpha1 and v1beta1 APIs) to state that it is 'Unimplemented'.
  - File: [container_v1alpha1_messages.py:1415](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L1415)
- Removed the 'Required' annotation from the description of the `role` field in `GoogleIamV1Binding` messages (v1alpha1 and v1beta1 APIs).
  - File: [container_v1alpha1_messages.py:1434](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L1434)
- Updated the description for `SECURITY_REALM` in `GoogleIamV1Condition` messages (v1alpha1 and v1beta1 APIs) to include details about realm groups.
  - File: [container_v1alpha1_messages.py:1502](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py#L1502)
- Removed the 'Currently restricted' comment from the `diskType` description in `NodeConfig` within `container_v1.json`.
  - File: [container_v1.json:399](https://github.com/twistedpair/google-cloud-sdk/blob/209.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1.json#L399)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}750{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+17,821{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-2,753{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/208.0.2...209.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*