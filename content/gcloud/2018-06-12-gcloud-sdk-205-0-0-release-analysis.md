---
draft: false
title: "gcloud SDK 205.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2018-06-12
url: /gcloud/gcloud-sdk-205-0-0-release-analysis/
summary: "Google Cloud SDK version 205.0.0 introduces new flags for Cloud Bigtable, Datastore index management commands, and promotes several Cloud Interconnect and Compute Engine features to GA. A significant security update enhances SSH key validation for Compute Engine metadata. The release also includes extensive Python 2/3 compatibility refactoring, new API clients for Cloud File and Source Repositories, and foundational improvements to Calliope's argument parsing."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - cloud-bigtable
  - cloud-datastore
  - cloud-interconnect
  - cloud-storage
  - cloud-tpu
  - compute-engine
  - dataproc
  - cloud-functions
  - cloud-source-repositories
  - iam
  - app-engine
  - cloud-filestore-possible-
  - compute-engine-alpha-
  - compute-engine-beta-
  - compute-engine-v1-
  - container-analysis
  - cloud-filestore
  - cloud-life-sciences-genomics-
  - cloud-speech-to-text-api
  - cloud-sql-admin-api
  - tpu
  - cloud-tpu-alpha-
  - cloud-filestore-inferred-
---

Google Cloud SDK version 205.0.0 introduces new flags for Cloud Bigtable, Datastore index management commands, and promotes several Cloud Interconnect and Compute Engine features to GA. A significant security update enhances SSH key validation for Compute Engine metadata. The release also includes extensive Python 2/3 compatibility refactoring, new API clients for Cloud File and Source Repositories, and foundational improvements to Calliope's argument parsing.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Unannounced Changes 🕵️](#unannounced-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Removed explicit Python 2.7 requirement check in the `install.sh` script, which changes the SDK's Python version preference and may affect environments relying on its previous strict enforcement.
  - File: [install.sh:61](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/install.sh#L61)
- The `--admin-enabled` flag for Compute Interconnect Attachments is deprecated and hidden. Users should now use `--enable-admin` instead.
  - File: [flags.py:93](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/interconnects/attachments/flags.py#L93)
- The `AddTemplateFlag` helper for Dataproc workflow templates has been removed, replaced by concept-based resource arguments. Direct callers of this helper function will experience breakage.
  - File: [flags.py:37](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/flags.py#L37)
- The `AddFunctionNameArg` helper utility was removed. Commands using this utility will need to adapt to the new concept-based resource argument parsing.
  - File: [flags.py:31](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/flags.py#L31)
- The default value for `--message-format` in Cloud Source Repositories topic flags has been removed. Commands that relied on 'json' being the default might now need to explicitly specify it if the API default is different or no longer implicitly 'json'.
  - File: [flags.py:52](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/source/flags.py#L52)
- The entire Google Cloud IoT Core v1 API definition, including its client, message definitions, and resource definitions, has been removed from the SDK. This change will prevent any interactions with `cloudiot_v1` endpoints via this SDK version.
- The standard query parameters `bearer_token` and `pp` (pretty-print) have been removed from the API definitions of multiple services. If client code explicitly used these parameters, this constitutes a breaking change. This affects: Bigtable Admin (v2), Bio (v1), Category Manager (v1alpha1, v1alpha2), Cloud Billing (v1), Cloud Build (v1), Cloud Debugger (v2), Cloud Error Reporting (v1beta1), and Cloud Functions (v1). The `prettyPrint` parameter (camelCase) remains available.
- Removed `bearer_token` and `pp` fields from `StandardQueryParameters`. This may impact clients directly using these parameters for OAuth authentication or pretty-printing.
  - File: [cloudiot_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot_v1.json#L44)
- Removed the entire `groups` resource, including its IAM methods (`setIamPolicy`, `getIamPolicy`, `testIamPermissions`) and all device management functionality (`devices.get`, `devices.patch`, `devices.delete`, `devices.modifyCloudToDeviceConfig`, `devices.configVersions.list`, `devices.states.list`) under the `cloudiot.projects.locations.registries.groups` hierarchy from the Cloud IoT v1 API. This is a significant breaking change for any automation or tools interacting with device groups.
  - File: [cloudiot_v1.json:1211](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot_v1.json#L1211)
- Removed `bearer_token` and `pp` fields from `StandardQueryParameters` in Cloud KMS v1 messages and API definition. This may impact clients directly using these parameters.
  - File: [cloudkms_v1_messages.py:880](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L880)
- Removed `bearer_token` and `pp` fields from `StandardQueryParameters` in Cloud Resource Search v1 messages and API definition. This may impact clients directly using these parameters.
  - File: [cloudresourcesearch_v1_messages.py:143](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudresourcesearch/v1/cloudresourcesearch_v1_messages.py#L143)
- Removed `bearer_token` and `pp` fields from `StandardQueryParameters` in Cloud Scheduler v1alpha1 messages and API definition. This may impact clients directly using these parameters.
  - File: [cloudscheduler_v1alpha1_messages.py:800](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudscheduler/v1alpha1/cloudscheduler_v1alpha1_messages.py#L800)
- Removed `bearer_token` and `pp` fields from `StandardQueryParameters` in Cloud Shell v1 messages and API definition. This may impact clients directly using these parameters.
  - File: [cloudshell_v1_messages.py:309](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudshell/v1/cloudshell_v1_messages.py#L309)
- Removed `bearer_token` and `pp` fields from `StandardQueryParameters` in Cloud Shell v1alpha1 messages and API definition. This may impact clients directly using these parameters.
  - File: [cloudshell_v1alpha1_messages.py:321](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudshell/v1alpha1/cloudshell_v1alpha1_messages.py#L321)
- Removed `bearer_token` and `pp` fields from `StandardQueryParameters` in Cloud Tasks v2beta2 messages and API definition. This may impact clients directly using these parameters.
  - File: [cloudtasks_v2beta2_messages.py:1545](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_messages.py#L1545)
- Removed `bearer_token` and `pp` fields from `StandardQueryParameters` in Cloud Composer v1beta1 messages and API definition. This may impact clients directly using these parameters.
  - File: [composer_v1beta1_messages.py:781](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1beta1/composer_v1beta1_messages.py#L781)
- In Compute Engine Beta API, the 'type' enum and field within the `NetworkEndpointGroup` message have been removed. Previously, only 'LOAD_BALANCING' was a valid value for this field.
  - File: [compute_beta_messages.py:24057](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L24057)
- In Compute Engine Beta API, a new `NETWORK_ENDPOINT_GROUPS` metric has been added to the `Quota` message's `MetricValueValuesEnum`, which has shifted the integer values of subsequent enum members. Code relying on explicit integer values for these enums may be affected.
  - File: [compute_beta_messages.py:27408](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L27408)
- The `type` field, which specified the type of the network endpoint group (only 'LOAD_BALANCING' was valid), has been removed from the `NetworkEndpointGroup` message.
  - File: [compute_beta.json:10545](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json#L10545)
- The `bearer_token` and `pp` (pretty-print) fields have been removed from the `StandardQueryParameters` message across multiple APIs (Container, Container Analysis, Dataflow). This affects internal API message structures.
  - File: [container_v1_messages.py:3343](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1/container_v1_messages.py#L3343)
- The `bearer_token` and `pp` (pretty-print) fields have been removed from the `StandardQueryParameters` message across multiple APIs (Container, Container Analysis, Dataflow). This affects internal API message structures.
  - File: [container_v1.json:43](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container_v1.json#L43)
- Removed `bearer_token` and `pp` (pretty-print) parameters from `StandardQueryParameters` in the DLP v2 API. This may affect custom API calls relying on these parameters.
  - File: [dlp_v2_messages.py:3697](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py#L3697)
- Removed `bearer_token` and `pp` (pretty-print) parameters from the `dlp_v2.json` API definition. This may affect clients generated from this definition.
  - File: [dlp_v2.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp_v2.json#L44)
- The `bearer_token` and `pp` (pretty-print) fields have been removed from the `StandardQueryParameters` across several API versions, including Genomics v1, v1alpha2, v2alpha1, IAM v1, Language v1, Logging v2, ML v1, OS Login v1, and v1alpha. Clients explicitly using these parameters may experience breakage.
- Removed `bearer_token` and `pp` (pretty-print) fields from `StandardQueryParameters` across multiple APIs. Clients directly using these query parameters for authentication or response formatting might be affected.
  - File: [oslogin_v1beta_messages.py:226](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/oslogin/v1beta/oslogin_v1beta_messages.py#L226)
- Removed 'bearer_token' and 'pp' (pretty-print) standard query parameters from the Video Intelligence v1 API definition and its Python client messages. Clients relying on these specific parameters may be affected.
  - File: [videointelligence_v1_messages.py:1008](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/videointelligence/v1/videointelligence_v1_messages.py#L1008)
- Removed 'bearer_token' and 'pp' (pretty-print) standard query parameters from the Video Intelligence v1 API definition. Clients relying on these specific parameters may be affected.
  - File: [videointelligence_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/videointelligence_v1.json#L44)
- Removed 'bearer_token' and 'pp' (pretty-print) standard query parameters from the Vision v1 API definition and its Python client messages. Clients relying on these specific parameters may be affected.
  - File: [vision_v1_messages.py:2689](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision/v1/vision_v1_messages.py#L2689)
- Removed 'bearer_token' and 'pp' (pretty-print) standard query parameters from the Vision v1 API definition. Clients relying on these specific parameters may be affected.
  - File: [vision_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision_v1.json#L44)
- Removal of 'bearer_token' query parameter from Vision API v1 discovery document. Clients explicitly using this parameter for OAuth bearer token might be affected.
  - File: [vision_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision_v1.json#L44)
- Removal of 'pp' (pretty-print) query parameter from Vision API v1 discovery document. Clients relying on this specific parameter for response formatting might be affected, though 'prettyPrint' remains available.
  - File: [vision_v1.json:69](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision_v1.json#L69)

## Security Updates

- Added validation for SSH keys in Compute Engine metadata to prevent private keys from being uploaded and to ensure public keys adhere to the expected 'username:key' format. [MEDIUM]
  - File: [metadata_utils.py:20](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/metadata_utils.py#L20)
- New capabilities to manage signed URL keys for Cloud CDN on Backend Buckets and Backend Services have been introduced, allowing for more granular control over content access and security for CDN-served assets. [MEDIUM]
  - File: [compute_v1_client.py:520](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_client.py#L520)
- Introduced the `Secret` message with `cipherText` and `keyName` in Genomics v1alpha2 and v2alpha1 APIs. This new message is used by the `Action.credentials` field to securely specify encrypted credentials for pulling private container images, enhancing credential management. [MEDIUM]

## New Features by Service

### Cloud Bigtable

- Added new flags to the `cbt` command-line tool for specifying a custom User Agent, columns to read, and limiting cells per column.
  - Flags: `-user-agent`, `-columns`, `-cells-per-column`
  - File: [arguments.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/command_lib/bigtable/arguments.py)

### Cloud Datastore

- Added `gcloud datastore indexes` command group to beta, including `cleanup` and `create` commands for managing Datastore indexes.
  - Flags: `gcloud datastore indexes cleanup`, `gcloud datastore indexes create`

### Cloud Interconnect

- Promoted interconnects attachments partner related commands to General Availability (GA).
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/command_lib/compute/interconnects/attachments/flags.py)

### Cloud Storage

- Updated the gsutil component to version 4.32.

### Cloud TPU

- Added the `--preemptible` flag to `gcloud beta compute tpus create` to allow creation of preemptible TPUs.
  - Flags: `--preemptible`
  - File: [util.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/command_lib/compute/tpus/util.py)
- Introduced 'tpu:v1' API version and removed 'tpu:v1beta1', with 'tpu:v1alpha1' becoming the default.
  - File: [apis_map.py:673](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/apis_map.py#L673)
- The Cloud TPU v1 API has been introduced, providing programmatic access to manage Cloud TPU resources. This includes capabilities to list and retrieve information about accelerator types and supported TensorFlow versions, as well as perform CRUD operations (create, delete, get, list) on TPU nodes. Furthermore, it adds functionality to reimage, reset, start, and stop TPU nodes, and to manage long-running operations associated with these actions.
  - File: [tpu_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/tpu_v1_client.py)
- Introduces the Cloud TPU v1 API, providing full lifecycle management for TPU nodes (create, get, list, delete, reimage, reset, stop, start), along with listing available TensorFlow versions and accelerator types.
  - File: [tpu_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu_v1.json)
- The SDK's API generation configuration for the Cloud TPU API has been updated to include a 'v1' stable version, replacing a previously listed 'v1beta1' entry.
  - File: [regen_apis_config.yaml:408](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L408)

### Compute Engine

- Added the `--network` flag to `gcloud compute images export` to enable specifying a network other than 'default' for the export process.
  - Flags: `--network`
  - File: [flags.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/command_lib/compute/images/flags.py)
- Promoted the `--quic-override` flag for `compute target-https-proxies create` and `update` commands to General Availability (GA).
  - Flags: `--quic-override`
- New flags `--plan` (for commitment duration) and `--resources` (for VCPU and MEMORY commitments) are added for creating Compute Commitments. A new `--type` flag is also introduced for commitment types like `memory-optimized`.
  - Flags: `--plan`, `--resources`, `--type`
  - File: [flags.py:79](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/commitments/flags.py#L79)
- New bandwidth options ('50m', '100m', '200m', '300m', '400m', '500m', '1g', '2g', '5g', '10g') are available for Interconnect Attachments.
  - Flags: `--bandwidth`
  - File: [flags.py:27](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/interconnects/attachments/flags.py#L27)
- Added new fields and methods to support Cloud CDN Signed URLs for Backend Buckets. This includes the `BackendBucketCdnPolicy` message, the `cdnPolicy` field in `BackendBucket`, and `addSignedUrlKey`/`deleteSignedUrlKey` methods for backend buckets.
  - File: [compute_v1.json:1672](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json#L1672)
- Added new fields to support Cloud CDN Signed URLs for Backend Services. This includes `signedUrlCacheMaxAgeSec` and `signedUrlKeyNames` in `CdnPolicy`, and `addSignedUrlKey`/`deleteSignedUrlKey` methods for backend services.
  - File: [compute_v1.json:2078](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json#L2078)
- Introduced `DistributionPolicy` and `DistributionPolicyZoneConfiguration` message types in v1, and added a `distributionPolicy` field to `InstanceGroupManager`, indicating expanded support for configuring instance distribution in regional managed instance groups.
  - File: [compute_v1.json:3770](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json#L3770)
- Added a new message type `RegionTargetHttpsProxiesSetSslCertificatesRequest` to allow setting SSL certificates for regional Target HTTPS Proxies in the alpha API.
  - File: [compute_alpha.json:16553](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L16553)
- Added a `status` field to the `NodeGroup` message with enum values like CREATING, DELETING, INVALID, and READY in alpha and beta APIs.
  - File: [compute_alpha.json:13560](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L13560)
- Added `NETWORK_ENDPOINT_GROUPS` to the `AcceleratorType` enum in alpha and beta APIs, indicating support for this resource type.
  - File: [compute_alpha.json:15339](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L15339)

### Dataproc

- Introduced new resource argument definitions for Dataproc workflow templates, including a completer for regions and standardized project attributes.
  - Flags: `--template`, `--region`
  - File: [flags.py:42](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/dataproc/flags.py#L42)
- Added a `bootDiskType` field to the `DiskConfig` message, allowing specification of the boot disk type (e.g., pd-ssd, pd-standard) for clusters.
  - File: [dataproc_v1_messages.py:752](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataproc/v1/dataproc_v1_messages.py#L752)

### Cloud Functions

- Introduced concept-based resource arguments for Cloud Functions, enabling more standardized and robust argument parsing for functions and regions.
  - Flags: `--region`, `--function`
  - File: [flags.py:250](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/flags.py#L250)

### Cloud Source Repositories

- Enhanced flexibility for updating Pub/Sub topic configurations, allowing for partial updates to message format or service account without respecifying all fields.
  - Flags: `--message-format`, `--service-account`
  - File: [util.py:165](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/source/util.py#L165)

### IAM

- Groundwork laid for new `add-iam-policy-binding` commands through the YAML command framework. This includes new command type `ADD_IAM_POLICY_BINDING` and logic to fetch, modify, and set IAM policies.
  - File: [yaml_command_translator.py:93](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/apis/yaml_command_translator.py#L93)

### App Engine

- Introduced a new 'rolloutStrategy' field to `EndpointsApiService` to specify how Endpoints service configurations are managed (FIXED or MANAGED).
  - File: [appengine_v1_messages.py:1144](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/appengine/v1/appengine_v1_messages.py#L1144)

### Cloud Filestore (possible)

- Added new API definitions for 'file' service (v1alpha1 and v1beta1), indicating support for a new file storage service.
  - File: [apis_map.py:440](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/apis_map.py#L440)

### Compute Engine (Alpha)

- Added new service for managing regional SSL certificates, including operations to delete, get, insert, list, and test IAM permissions for these certificates.
  - File: [compute_alpha_client.py:10064](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L10064)
- Introduced a new service for managing regional Target HTTPS Proxies, supporting delete, get, insert, list, set SSL certificates, set URL maps, and test IAM permissions.
  - File: [compute_alpha_client.py:10370](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L10370)
- Added the `GetNatMappingInfo` method to the `RoutersService` to retrieve runtime NAT mapping information of VM endpoints.
  - File: [compute_alpha_client.py:11148](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L11148)
- Added the `AggregatedList` method to the global `SslCertificatesService` to retrieve a consolidated list of all regional and global SSL certificate resources.
  - File: [compute_alpha_client.py:12022](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L12022)
- Added the `AggregatedList` method to the global `TargetHttpsProxiesService` to retrieve a consolidated list of all regional and global Target HTTPS Proxy resources.
  - File: [compute_alpha_client.py:12894](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L12894)
- Added API request messages for full CRUD (Create, Read, Update, Delete) operations and IAM test permissions for regional SSL Certificates.
  - File: [compute_alpha_messages.py:13526](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L13526)
- Introduced resource collections for regional SSL Certificates and regional Target HTTPS Proxies, indicating support for these resources.
  - File: [resources.py:335](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/resources.py#L335)

### Compute Engine (Beta)

- Added `status` field and `StatusValueValuesEnum` to `NodeGroupNode` for tracking the operational status (CREATING, DELETING, INVALID, READY) of individual nodes within a node group.
  - File: [compute_beta_messages.py:25344](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L25344)

### Compute Engine (v1)

- New methods `AddSignedUrlKey` and `DeleteSignedUrlKey` added to Backend Buckets for managing Cloud CDN Signed URL Keys.
  - File: [compute_v1_client.py:520](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_client.py#L520)
- New methods `AddSignedUrlKey` and `DeleteSignedUrlKey` added to Backend Services for managing Cloud CDN Signed URL Keys.
  - File: [compute_v1_client.py:686](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_client.py#L686)
- Added `cdnPolicy` field to `BackendBucket` and introduced `BackendBucketCdnPolicy` to configure signed URL caching and list configured key names.
  - File: [compute_v1_messages.py:1951](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L1951)
- Extended `BackendServiceCdnPolicy` with `signedUrlCacheMaxAgeSec` and `signedUrlKeyNames` for configuring signed URL caching and managing keys for Cloud CDN.
  - File: [compute_v1_messages.py:2421](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L2421)
- Introduced `DistributionPolicy` and `DistributionPolicyZoneConfiguration` messages and added `distributionPolicy` field to `InstanceGroupManager`, enabling specified instance distribution in regional managed instance groups.
  - File: [compute_v1_messages.py:13780](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L13780)

### Container Analysis

- Added `continuousAnalysis` field and `ContinuousAnalysisValueValuesEnum` to the `Discovered` message, introducing continuous analysis functionality.
  - File: [containeranalysis_v1alpha1_messages.py:1049](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/containeranalysis/v1alpha1/containeranalysis_v1alpha1_messages.py#L1049)

### Cloud Filestore

- Initial integration of the Cloud Filestore API into the SDK. This chunk introduces the v1alpha1 message definitions and resource structures, along with the v1beta1 API client.
  - File: [file_v1alpha1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1alpha1/file_v1alpha1_messages.py#L1)
- Groundwork for the Cloud Filestore service by introducing its `v1beta1` API messages and resource definitions. This enables future SDK functionality for managing Filestore instances, locations, and long-running operations.
  - File: [file_v1beta1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1beta1/file_v1beta1_messages.py#L1)
- Introduction of the Cloud Filestore API (v1alpha1), enabling programmatic creation, retrieval, updating, and deletion of Filestore instances, volumes, and network configurations. It defines operations for listing locations and managing long-running operations related to Filestore resources.
  - File: [file_v1alpha1.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file_v1alpha1.json)
- A new API version, `file:v1beta1`, for Cloud Filestore has been introduced, allowing for the creation and management of cloud file servers via API.
  - File: [file_v1beta1.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file_v1beta1.json)

### Cloud Life Sciences (Genomics)

- The Genomics v1alpha2 and v2alpha1 APIs now support specifying a `subnetwork` for VM network configurations within pipeline resources.
- The Genomics v1alpha2 and v2alpha1 APIs now allow specifying encrypted credentials (`Secret`) within an `Action` to pull container images from private registries.
  - File: [genomics_v2alpha1_messages.py:67](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v2alpha1/genomics_v2alpha1_messages.py#L67)

### Cloud Speech-to-Text API

- Added `biasingStrength` field with enum options (BIASING_STRENGTH_UNSPECIFIED, LOW, MEDIUM, HIGH) to `SpeechContext`, enabling more granular control over speech recognition hints for v1 and v1p1beta1.
  - File: [speech_v1_messages.py:283](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1/speech_v1_messages.py#L283)

### Cloud SQL Admin API

- The `DemoteMaster` functionality is now described as demoting a standalone instance to a Cloud SQL read replica for an external database server, indicating activated or clarified functionality.
  - File: [sqladmin_v1beta4_client.py:449](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin/v1beta4/sqladmin_v1beta4_client.py#L449)

### TPU

- Introduction of the Google Cloud TPU v1 API definitions. This includes new message types for managing Accelerator Types, TensorFlow Versions, Nodes (create, delete, get, list, reimage, reset, start, stop), and long-running operations. A key addition is the `SchedulingConfig` within the `Node` message, which contains a `preemptible` boolean field, enabling support for preemptible TPU instances.
  - File: [tpu_v1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/tpu_v1_messages.py#L1)

### Cloud TPU (Alpha)

- Adds 'schedulingConfig' to the TPU Node schema in the v1alpha1 API, allowing configuration for preemptible TPU nodes.
  - File: [tpu_v1alpha1.json:344](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu_v1alpha1.json#L344)

### Cloud Filestore (inferred)

- The SDK's API generation configuration now includes a 'file' API with 'v1alpha1' (default) and 'v1beta1' versions, indicating new support for a file storage service.
  - File: [regen_apis_config.yaml:274](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L274)

## Credential & Auth Changes

- Implemented new validation logic within `metadata_utils.py` to check the format of SSH keys and prevent private keys from being added to Compute Engine instance metadata.
  - File: [metadata_utils.py:80](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/metadata_utils.py#L80)
- The `bearer_token` query parameter, previously used for OAuth bearer tokens, has been removed from `StandardQueryParameters` across multiple API versions, including Cloud IoT v1, Cloud KMS v1, Cloud Resource Search v1, Cloud Scheduler v1alpha1, Cloud Shell v1 and v1alpha1, Cloud Tasks v2beta2, and Cloud Composer v1beta1. Clients should rely on `access_token` or standard OAuth 2.0 practices.
  - File: [cloudiot_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot_v1.json#L44)
- A new `SignedUrlKey` message has been added, which includes `keyName` and `keyValue` fields, for managing signing keys used in Cloud CDN Signed URLs.
  - File: [compute_v1_messages.py:23720](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L23720)
- In Genomics v1alpha2 and v2alpha1 APIs, the `Action` message now includes a `credentials` field which uses the new `Secret` type for securely providing encrypted credentials for private container image access. The description for the `ENABLE_IMAGE_STREAMING` flag has also been updated to reflect this new credential handling mechanism.
- Removed the `bearer_token` field from `StandardQueryParameters` across multiple APIs (OS Login, Pub/Sub, Runtime Config, Service Management, Service Networking, Service User, Source Repository, Spanner, Speech-to-Text, Testing). Authentication should rely on the standard `Authorization` header.
  - File: [oslogin_v1beta_messages.py:226](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/oslogin/v1beta/oslogin_v1beta_messages.py#L226)
- The 'bearer_token' query parameter has been removed from the Vision API v1 discovery document, potentially indicating a shift in how authentication tokens are handled for this API.
  - File: [vision_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision_v1.json#L44)

## API Changes

### Compute Engine

- Refactored the internal API method for setting security policies on backend services, including making `MakeSetSecurityPolicyRequestTuple` public.
  - File: [client.py:79](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/backend_services/client.py#L79)
- Introduced a new GA-specific patch request method (`_MakePatchRequestTupleGa`) and re-organized patch logic for interconnect attachments, supporting their promotion to GA.
  - File: [client.py:108](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/interconnects/attachments/client.py#L108)
- Updated API definitions for `compute_alpha`, `compute_beta`, and `compute_v1` versions, with notable schema changes in `compute_alpha.json`.
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- API revisions updated from '20180525' to '20180604' for alpha, beta, and v1 APIs.
  - File: [compute_alpha.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L7)
- Clarified descriptions for `fingerprint` fields in several resources (BackendService, InstanceGroupManager, Metadata, SslPolicy, Subnetwork, UrlMap) to suggest a `get()` request for the latest fingerprint.
  - File: [compute_alpha.json:2171](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L2171)
- The `ManagedInstance` resource description was updated for clarity from 'Next available tag: 12' to 'A Managed Instance resource'.
  - File: [compute_alpha.json:12030](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L12030)
- An output-only `region` field was added to the `SslCertificate` message in the alpha API.
  - File: [compute_alpha.json:19169](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L19169)

### Cloud Functions

- Modified the `CreateFunction` method to explicitly accept a `location` argument, changing its call signature and internal resource resolution.
  - File: [util.py:340](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/functions/util.py#L340)

### Cloud IoT

- Restructured the `cloudiot_v1` API client, involving the removal of client and resource-specific Python files and updates to message definitions.
  - File: [cloudiot_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_client.py)
- The `groups` resource and all its associated methods and device management capabilities under `cloudiot.projects.locations.registries.groups` have been removed from the Cloud IoT v1 API definition.
  - File: [cloudiot_v1.json:1211](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot_v1.json#L1211)

### Cloud TPU

- The Cloud TPU API version has been promoted from `v1alpha1` to `v1` in resource definitions.
  - File: [resources.yaml:2](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/tpus/resources.yaml#L2)
- Introduction of the Cloud TPU v1 API, including new resource definitions (e.g., Projects, Locations, AcceleratorTypes, Nodes, Operations, TensorFlowVersions) and a generated client library to interact with these resources.
  - File: [resources.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/resources.py)
- The TPU API configuration has been updated to support a new 'v1' version.
  - File: [regen_apis_config.yaml:408](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L408)

### Internal SDK API

- The `CreateRequest` method in `DeclarativeArgumentGenerator` now accepts an `override_method` parameter, allowing commands to specify a different API method for request creation, useful for operations involving multiple API calls or specialized handling.
  - File: [arg_marshalling.py:75](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/apis/arg_marshalling.py#L75)

### Cloud Source Repositories

- The internal helper `CreateTopicResourcePresentationSpec` was modified to explicitly take `help_text` as an argument, changing its internal API.
  - File: [resource_args.py:67](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/source/resource_args.py#L67)

### Multiple APIs (e.g., Access Context Manager, API Keys, App Engine, Bigtable Admin, etc.)

- Removed 'bearer_token' and 'pp' (pretty-print) fields from 'StandardQueryParameters' across numerous API definitions. This is unlikely to affect gcloud CLI users directly, as these are typically handled internally by the SDK.
  - File: [accesscontextmanager_v1alpha_messages.py:650](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/accesscontextmanager/v1alpha/accesscontextmanager_v1alpha_messages.py#L650)

### App Engine

- Clarified the description for the 'configId' field within the `EndpointsApiService` to better explain rollout strategies.
  - File: [appengine_v1beta_messages.py:1196](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/appengine/v1beta/appengine_v1beta_messages.py#L1196)

### Bigtable Cluster Admin

- The API revision for `bigtableclusteradmin_v1` has been rolled back from `20180514` to `20180509`, indicating a minor correction in the API definition.
  - File: [bigtableclusteradmin_v1.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/bigtableclusteradmin_v1.json#L7)

### Multiple APIs

- Removed the `bearer_token` and `pp` (pretty-print) fields from the `StandardQueryParameters` object across various APIs including Cloud KMS, Cloud Resource Search, Cloud Scheduler, Cloud Shell, Cloud Tasks, and Cloud Composer.
  - File: [cloudkms_v1_messages.py:880](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L880)

### Compute Engine (Alpha)

- New Compute Alpha API methods for regional SSL certificate management: `compute.regionSslCertificates.delete`, `compute.regionSslCertificates.get`, `compute.regionSslCertificates.insert`, `compute.regionSslCertificates.list`, `compute.regionSslCertificates.testIamPermissions`.
  - File: [compute_alpha_client.py:10064](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L10064)
- New Compute Alpha API methods for regional Target HTTPS Proxy management: `compute.regionTargetHttpsProxies.delete`, `compute.regionTargetHttpsProxies.get`, `compute.regionTargetHttpsProxies.insert`, `compute.regionTargetHttpsProxies.list`, `compute.regionTargetHttpsProxies.setSslCertificates`, `compute.regionTargetHttpsProxies.setUrlMap`, `compute.regionTargetHttpsProxies.testIamPermissions`.
  - File: [compute_alpha_client.py:10370](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L10370)
- New Compute Alpha API method `compute.routers.getNatMappingInfo` for retrieving router NAT mapping information.
  - File: [compute_alpha_client.py:11148](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L11148)
- New Compute Alpha API method `compute.sslCertificates.aggregatedList` for listing all SSL certificates.
  - File: [compute_alpha_client.py:11662](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L11662)
- New Compute Alpha API method `compute.targetHttpsProxies.aggregatedList` for listing all Target HTTPS Proxies.
  - File: [compute_alpha_client.py:12508](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L12508)
- New API request messages for regional SSL Certificates and related resource collection definitions were added.
  - File: [compute_alpha_messages.py:13526](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L13526)

### Compute Engine (Beta)

- The `NetworkEndpointGroup` message has been modified, removing the `TypeValueValuesEnum` and the `type` field.
  - File: [compute_beta_messages.py:24057](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L24057)
- The `NodeGroupNode` message now includes `StatusValueValuesEnum` and a `status` field to track node states.
  - File: [compute_beta_messages.py:25344](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L25344)
- The `Quota` message's `MetricValueValuesEnum` now includes `NETWORK_ENDPOINT_GROUPS`, causing a shift in enum integer values.
  - File: [compute_beta_messages.py:27357](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L27357)

### Compute Engine (v1)

- Client methods `AddSignedUrlKey` and `DeleteSignedUrlKey` were added for both Backend Buckets and Backend Services.
  - File: [compute_v1_client.py:520](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_client.py#L520)
- The `BackendBucket` message now includes `cdnPolicy` and a new `BackendBucketCdnPolicy` message defines CDN configurations including signed URL cache settings.
  - File: [compute_v1_messages.py:1951](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L1951)
- The `BackendServiceCdnPolicy` message now includes `signedUrlCacheMaxAgeSec` and `signedUrlKeyNames` fields.
  - File: [compute_v1_messages.py:2421](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L2421)
- New messages `DistributionPolicy` and `DistributionPolicyZoneConfiguration` were added and integrated into the `InstanceGroupManager` message.
  - File: [compute_v1_messages.py:13780](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L13780)

### Kubernetes Engine

- The `DailyMaintenanceWindow` message had a minor unicode character fix in the `startTime` description.
  - File: [container_v1_messages.py:1885](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1/container_v1_messages.py#L1885)
- The `SubjectAccessReviewStatus` message was updated to include a `denied` boolean field, and the `reason` field was reordered.
  - File: [container_v1_messages.py:3497](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1/container_v1_messages.py#L3497)

### Dataflow

- Minor unicode character fixes were applied to descriptions within the `WorkerMessage` message.
  - File: [dataflow_v1b3_messages.py:4642](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataflow/v1b3/dataflow_v1b3_messages.py#L4642)

### Deployment Manager

- A minor descriptive change for the `type` field in `DeploymentmanagerTypeProvidersGetTypeRequest` from 'The name of the type provider for this request.' to 'The name of the type provider type for this request.'.
  - File: [deploymentmanager_alpha_messages.py:1026](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/deploymentmanager/alpha/deploymentmanager_alpha_messages.py#L1026)
- Clarified the description for the `type` parameter in `DeploymentmanagerTypeProvidersGetTypeRequest` (v2beta, alpha, and v2 APIs), changing 'type provider' to 'type provider type'.
  - File: [deploymentmanager_v2beta_messages.py:1006](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/deploymentmanager/v2beta/deploymentmanager_v2beta_messages.py#L1006)
- Updated API revisions for Deployment Manager Alpha, v2, and v2beta to '20180604'.
  - File: [deploymentmanager_alpha.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/deploymentmanager_alpha.json#L7)

### Discovery API

- Updated the `batchPath` for the Discovery v1 API from 'batch' to 'batch/discovery/v1'.
  - File: [discovery_v1.json:19](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/discovery_v1.json#L19)

### Cloud DLP

- Refactored descriptions for `GooglePrivacyDlpV2DeltaPresenceEstimationConfig`, `GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues`, and `GooglePrivacyDlpV2DeltaPresenceEstimationResult` for improved readability.
  - File: [dlp_v2_messages.py:1466](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py#L1466)
- Corrected string literals and clarified descriptions for `lowerBound` and `upperBound` in `GooglePrivacyDlpV2FixedSizeBucketingConfig`.
  - File: [dlp_v2_messages.py:1852](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py#L1852)
- Minor wording change in the description for `GooglePrivacyDlpV2HotwordRule`.
  - File: [dlp_v2_messages.py:1866](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py#L1866)
- Clarified `redactAllText` in `GooglePrivacyDlpV2ImageRedactionConfig` to state 'Only one should be provided'.
  - File: [dlp_v2_messages.py:1909](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py#L1909)
- Clarified the behavior of an empty `infoTypes` list in `GooglePrivacyDlpV2InfoTypeTransformation`, stating it applies to all requested infoTypes in `InspectConfig`.
  - File: [dlp_v2_messages.py:1993](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py#L1993)
- Significantly clarified the `OutputSchemaValueValuesEnum`, `outputSchema` field, and `table` field descriptions for `GooglePrivacyDlpV2OutputStorageConfig`, detailing usage for Inspect vs. Risk jobs and column handling.
  - File: [dlp_v2_messages.py:2661](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py#L2661)
- Refined the description for `GooglePrivacyDlpV2RedactImageRequest` to specifically mention image redaction by covering content with a colored rectangle.
  - File: [dlp_v2_messages.py:2989](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py#L2989)
- Extended `GooglePrivacyDlpV2SaveFindings` compatibility to include 'Risk' jobs, in addition to 'Inspect'.
  - File: [dlp_v2_messages.py:3145](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py#L3145)

### Cloud DNS

- Updated API revisions for DNS v1, v1alpha2, v1beta1, v1beta2, and v2beta1 APIs to '20180604'.
  - File: [dns_v1.json:4](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dns_v1.json#L4)

### Cloud Filestore

- Added new message definitions for Cloud Filestore v1alpha1, including core resources like `Instance`, `NetworkConfig`, `VolumeConfig`, `Operation`, and `Location` with their respective fields and enums.
  - File: [file_v1alpha1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1alpha1/file_v1alpha1_messages.py#L1)
- Added resource collection definitions for Cloud Filestore v1alpha1, mapping API paths for projects, locations, instances, and operations.
  - File: [resources.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1alpha1/resources.py#L1)
- Added the API client for Cloud Filestore v1beta1, providing methods to interact with operations (Cancel, Delete, Get, List) and locations (Get, List).
  - File: [file_v1beta1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1beta1/file_v1beta1_client.py#L1)
- Introduced the `v1beta1` API for Cloud Filestore, defining message structures for operations (e.g., `CancelOperationRequest`, `Operation`), locations (e.g., `Location`, `FileProjectsLocationsGetRequest`), and standard error handling (`Status`).
  - File: [file_v1beta1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1beta1/file_v1beta1_messages.py#L1)
- Addition of the `file:v1alpha1` Discovery API definition for Cloud Filestore, including schemas for `Instance`, `VolumeConfig`, `NetworkConfig`, `Location`, and `Operation` resources, along with methods for listing and managing these resources.
  - File: [file_v1alpha1.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file_v1alpha1.json)

### Multiple APIs (Genomics, IAM, Language, Logging, ML, OS Login)

- The `bearer_token` and `pp` fields have been removed from the `StandardQueryParameters` message across various APIs.
  - File: [genomics_v1_messages.py:2842](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L2842)

### Cloud Life Sciences (Genomics)

- In Genomics v1alpha2 and v2alpha1, the `PipelineResources.Network` message now includes a `subnetwork` field. The `Action` message has gained a `credentials` field of the new `Secret` type.

### OS Login API

- Removed `bearer_token` and `pp` from `StandardQueryParameters` in v1, v1alpha, and v1beta API message and JSON definitions.
  - File: [oslogin_v1beta_messages.py:226](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/oslogin/v1beta/oslogin_v1beta_messages.py#L226)

### Cloud Pub/Sub API

- Removed `bearer_token` and `pp` from `StandardQueryParameters` in v1 API message and JSON definitions.
  - File: [pubsub_v1_messages.py:1006](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/pubsub/v1/pubsub_v1_messages.py#L1006)

### Cloud Runtime Config API

- Removed `bearer_token` and `pp` from `StandardQueryParameters` in v1beta1 API message and JSON definitions.
  - File: [runtimeconfig_v1beta1_messages.py:1052](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/runtimeconfig/v1beta1/runtimeconfig_v1beta1_messages.py#L1052)

### Service Management API

- Removed `bearer_token` and `pp` from `StandardQueryParameters` in v1 API message and JSON definitions. Also included minor cosmetic changes to string quotes in descriptions.
  - File: [servicemanagement_v1_messages.py:3875](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_messages.py#L3875)

### Service Networking API

- Removed `bearer_token` and `pp` from `StandardQueryParameters` in v1alpha API message and JSON definitions. Also included minor cosmetic changes to string quotes in descriptions.
  - File: [servicenetworking_v1alpha_messages.py:2047](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking/v1alpha/servicenetworking_v1alpha_messages.py#L2047)

### Service User API

- Removed `bearer_token` and `pp` from `StandardQueryParameters` in v1 API message and JSON definitions. Also included minor cosmetic changes to string quotes in descriptions.
  - File: [serviceuser_v1_messages.py:1963](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceuser/v1/serviceuser_v1_messages.py#L1963)

### Cloud Source Repositories API

- Removed `bearer_token` and `pp` from `StandardQueryParameters` in v1 API message and JSON definitions.
  - File: [sourcerepo_v1_messages.py:491](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sourcerepo/v1/sourcerepo_v1_messages.py#L491)

### Cloud Spanner API

- Removed `bearer_token` and `pp` from `StandardQueryParameters` in v1 API message and JSON definitions.
  - File: [spanner_v1_messages.py:2609](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/spanner/v1/spanner_v1_messages.py#L2609)

### Cloud Speech-to-Text API

- Added `biasingStrength` to `SpeechContext` in v1 and v1p1beta1 API message and JSON definitions. Removed `bearer_token` and `pp` from `StandardQueryParameters`.
  - File: [speech_v1_messages.py:283](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1/speech_v1_messages.py#L283)

### Cloud SQL Admin API

- Updated the description for the `AddServerCa` method and the `DemoteMaster` method in v1beta4. Added a new `privateNetwork` string field to `IpConfiguration` in v1beta4, marked as 'Reserved for future use'.
  - File: [sqladmin_v1beta4_client.py:371](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin/v1beta4/sqladmin_v1beta4_client.py#L371)

### Cloud Storage API

- Minor cosmetic changes to string quotes in descriptions for `Policy` members, roles, and `TestIamPermissionsResponse` permissions.
  - File: [storage_v1_messages.py:895](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/storage/v1/storage_v1_messages.py#L895)

### Cloud Testing API

- Removed `bearer_token` and `pp` from `StandardQueryParameters` in v1 API message and JSON definitions. Also included minor cosmetic changes to string quotes in descriptions.
  - File: [testing_v1_messages.py:934](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/testing/v1/testing_v1_messages.py#L934)

### TPU

- The `Node` message in the `tpu.v1alpha1` API was updated to include a new `schedulingConfig` field and the associated `SchedulingConfig` message, which allows for specifying preemptible TPUs. This required re-indexing of existing fields (`serviceAccount`, `state`, `tensorflowVersion`).
  - File: [tpu_v1alpha1_messages.py:229](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1alpha1/tpu_v1alpha1_messages.py#L229)

### Cloud TPU (Alpha)

- The 'Node' schema in the TPU v1alpha1 API now includes a 'schedulingConfig' field, which contains a 'preemptible' boolean field to specify preemptible TPU nodes.
  - File: [tpu_v1alpha1.json:344](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu_v1alpha1.json#L344)

### Video Intelligence API

- Removed 'bearer_token' and 'pp' (pretty-print) standard query parameters from the API definition and its Python messages, consolidating pretty-print functionality under 'prettyPrint'.
  - File: [videointelligence_v1_messages.py:1008](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/videointelligence/v1/videointelligence_v1_messages.py#L1008)
- Removed 'bearer_token' and 'pp' standard query parameters from the v1 API definition.
  - File: [videointelligence_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/videointelligence_v1.json#L44)

### Vision API

- Updated the description for 'bestGuessLabels' in 'GoogleCloudVisionV1p2beta1WebDetection' and 'WebDetection' schemas for clarity. Also removed 'bearer_token' and 'pp' standard query parameters from Python client messages.
  - File: [vision_v1_messages.py:1803](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision/v1/vision_v1_messages.py#L1803)
- Removed 'bearer_token' and 'pp' standard query parameters from the v1 API definition.
  - File: [vision_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision_v1.json#L44)

### Cloud Vision API

- The description for 'bestGuessLabels' in the Vision API v1 discovery document has been updated for clarity, specifying that it infers the topic from similar images on the open web.
  - File: [vision_v1.json:1431](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision_v1.json#L1431)

## Unannounced Changes

*Changes found in code but not mentioned in official release notes:* 🕵️

### Groundwork

- Enhanced Python runtime detection in `install.sh` to prefer unversioned `python` and `python3` if `python2` is not found, indicating broader Python 3 compatibility efforts.
  - File: [install.sh:77](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/install.sh#L77)
- Introduced a new `sourcerepo.py` API client layer for Google Cloud Source Repositories, enabling new programmatic interactions with source control.
  - File: [sourcerepo.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/source/sourcerepo.py#L1)
- Introduced `_allow_py3` attribute and `DisallowPython3` decorator in Calliope's base classes, along with Python 3 compatibility checks, allowing command groups to explicitly opt out of Python 3 support.
  - File: [base.py:665](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/base.py#L665)
- Added a new module `calliope/concepts/multitype.py` for handling multiple types of concepts, suggesting new advanced argument parsing capabilities.
  - File: [multitype.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/multitype.py#L1)
- Introduced new Google Cloud File API clients, messages, and discovery documents for v1alpha1 and v1beta1, laying groundwork for managing file storage services.
  - File: [file_v1alpha1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1alpha1/file_v1alpha1_client.py#L1)
- Added new Google Cloud TPU API client, messages, and discovery documents for v1, providing a robust API layer for TPU resource management, complementing the announced `--preemptible` flag.
  - File: [tpu_v1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/tpu_v1_client.py#L1)
- Introduced `FullySpecifiedAnchorFallthrough` and `FilteredDeps` classes in the concepts dependency management, allowing for more granular control and filtering of resource attribute fallthroughs.
  - File: [deps.py:195](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/deps.py#L195)
- A new `snapshot` resource definition has been added to `compute/resources.yaml`, laying groundwork for new snapshot management commands.
  - File: [resources.yaml:73](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/resources.yaml#L73)
- Introduced `googlecloudsdk/command_lib/projects/resource_args.py` to centralize the definition and fallback logic for the `project` resource attribute across various services, replacing individual `ProjectAttributeConfig` definitions.
  - File: [resource_args.py:0](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/projects/resource_args.py#L0)
- Introduced conditional import of the gRPC library, indicating current Python 3 incompatibility for gRPC features and preventing crashes.
  - File: [grpc_util.py:22](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/grpc_util.py#L22)
- Added an API endpoint override property for 'binaryauthorization', laying groundwork for future features related to this service.
  - File: [properties.py:1384](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/properties.py#L1384)
- New API request messages (`ComputeRegionSslCertificatesDeleteRequest`, `GetRequest`, `InsertRequest`, `ListRequest`, `TestIamPermissionsRequest`) were added for regional SSL Certificates in Compute Alpha.
  - File: [compute_alpha_messages.py:13526](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L13526)
- Added resource collections for `REGIONSSLCERTIFICATES` and `REGIONTARGETHTTPSPROXIES` in Compute Alpha resources.
  - File: [resources.py:335](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/resources.py#L335)
- Added `StatusValueValuesEnum` and a `status` field to `NodeGroupNode` in Compute Beta for node status tracking.
  - File: [compute_beta_messages.py:25344](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L25344)
- Added `NETWORK_ENDPOINT_GROUPS` to the `MetricValueValuesEnum` within the `Quota` message in Compute Beta, expanding available quota metrics.
  - File: [compute_beta_messages.py:27357](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L27357)
- New client methods (`AddSignedUrlKey`, `DeleteSignedUrlKey`) were introduced for `backendBuckets` and `backendServices` in Compute v1.
  - File: [compute_v1_client.py:520](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_client.py#L520)
- The `BackendBucket` message was updated to include a `cdnPolicy` field, alongside the new `BackendBucketCdnPolicy` message for CDN configuration, including signed URL cache settings.
  - File: [compute_v1_messages.py:1951](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L1951)
- The `BackendServiceCdnPolicy` message was extended with `signedUrlCacheMaxAgeSec` and `signedUrlKeyNames` fields for more detailed CDN signed URL configuration.
  - File: [compute_v1_messages.py:2421](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L2421)
- New API request messages (`ComputeBackendBucketsAddSignedUrlKeyRequest`, `DeleteSignedUrlKeyRequest`, `ComputeBackendServicesAddSignedUrlKeyRequest`, `DeleteSignedUrlKeyRequest`) were added for managing signed URL keys.
  - File: [compute_v1_messages.py:3705](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L3705)
- New messages `DistributionPolicy` and `DistributionPolicyZoneConfiguration` were added to Compute v1, along with the `distributionPolicy` field in `InstanceGroupManager`, indicating support for regional instance group distribution policies.
  - File: [compute_v1_messages.py:13780](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L13780)
- A new `SignedUrlKey` message was added, defining the structure for signed URL keys with `keyName` and `keyValue` fields.
  - File: [compute_v1_messages.py:23720](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L23720)
- Added `SslCertificateAggregatedList` message in `compute_alpha.json`, likely groundwork for a feature to list SSL certificates across scopes.
  - File: [compute_alpha.json:19200](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L19200)
- Added new package structure and client library for a new 'Cloud File' service (v1alpha1), including services for instances, operations, and locations. This suggests the introduction or groundwork for a new managed file storage product (e.g., Filestore).
  - File: [file_v1alpha1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1alpha1/file_v1alpha1_client.py#L1)
- Groundwork for the Cloud Filestore API by adding Python message definitions for v1alpha1. This lays the foundation for managing Cloud Filestore resources.
  - File: [file_v1alpha1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1alpha1/file_v1alpha1_messages.py#L1)
- Groundwork for the Cloud Filestore API by adding resource definitions for v1alpha1. This defines the structure for API resource names and collections.
  - File: [resources.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1alpha1/resources.py#L1)
- Groundwork for the Cloud Filestore API by adding the Python API client for v1beta1, enabling programmatic interaction with the service.
  - File: [file_v1beta1_client.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1beta1/file_v1beta1_client.py#L1)
- Addition of `v1beta1` API messages for Google Cloud Filestore, including definitions for operations, locations, and common API parameters and error statuses.
  - File: [file_v1beta1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1beta1/file_v1beta1_messages.py#L1)
- Addition of resource definitions and base URLs for the `v1beta1` Google Cloud Filestore API, setting up resource paths for projects, locations, and operations.
  - File: [resources.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file/v1beta1/resources.py#L1)
- Introduction of the `file:v1beta1` API discovery document for Cloud Filestore, including its full API surface definition.
  - File: [file_v1beta1.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file_v1beta1.json)
- Addition of `Action.credentials` field and `Secret` message in Genomics v1alpha2 and v2alpha1 APIs for encrypted private image credentials, along with the new `Network.subnetwork` field.
  - File: [genomics_v2alpha1_messages.py:67](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v2alpha1/genomics_v2alpha1_messages.py#L67)
- Introduced a new package marker file for the TPU v1 API, signifying groundwork for a new API version.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/__init__.py)
- Added `privateNetwork` string field to Cloud SQL Admin's `IpConfiguration` in v1beta4, marked as 'Reserved for future use', indicating future feature development.
  - File: [sqladmin_v1beta4_messages.py:652](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin/v1beta4/sqladmin_v1beta4_messages.py#L652)
- New resource definitions for the Cloud TPU v1 API were added, outlining the structure for projects, locations, accelerator types, nodes, operations, and TensorFlow versions.
  - File: [resources.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/resources.py)
- Added new API client and message definitions for the Google Cloud TPU v1 API, which represents a stable API version.
  - File: [tpu_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/tpu_v1_messages.py)
- Configuration added for a new 'file' API with 'v1alpha1' and 'v1beta1' versions, suggesting groundwork for Cloud Filestore or a similar service.
  - File: [regen_apis_config.yaml:274](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L274)
- The TPU API configuration was updated to promote or introduce a 'v1' version, replacing a 'v1beta1' entry in the API generation config.
  - File: [regen_apis_config.yaml:408](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L408)

### Refactoring

- Widespread addition of `from __future__ import unicode_literals` and adjustments to string/bytes handling across numerous Python files, indicating a large-scale refactoring for Python 2/3 compatibility.
  - File: [appengine_firewall_api_client.py:15](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/app/api/appengine_firewall_api_client.py#L15)
- Deletion of several `__init__.py` files in `api_lib/util`, `calliope/concepts`, and various `core` subdirectories, likely part of Python packaging refactoring or preparation for Python 3.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/util/__init__.py)
- Added `__hash__` methods to several Calliope `ConceptSpec` and `Attribute` classes, likely for performance improvements in data structures like sets or dictionaries.
  - File: [concepts.py:96](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/concepts.py#L96)
- Significant refactoring of concept dependency handling logic within `calliope/concepts/deps.py`, indicating internal improvements to argument resolution.
  - File: [deps.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/deps.py)
- Major rewrite of `googlecloudsdk/core/util/platforms.py`, enhancing platform utility functions, potentially related to improved Python version detection and environment setup.
  - File: [platforms.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/util/platforms.py)
- Removed the `google-cloud-sdk/lib/googlecloudsdk/command_lib/app/__init__.py` file, suggesting internal restructuring within the `app` command group.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/app/__init__.py)
- Several App Engine command utility files (e.g., `browser_dispatcher.py`, `create_util.py`) had `from __future__ import unicode_literals` added, indicating Python 2/3 compatibility adjustments.
  - File: [browser_dispatcher.py:16](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/app/browser_dispatcher.py#L16)
- The `trigger_build_server_side` property in `app/deploy_util.py` now uses `.GetBool()` for retrieving boolean values, improving property handling.
  - File: [deploy_util.py:117](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/app/deploy_util.py#L117)
- Consolidated project attribute configuration across several services (Bigtable, Category Manager, Composer, Binary Authorization, DNS) by replacing specific `ProjectAttributeConfig` definitions with a common `project_resource_args.PROJECT_ATTRIBUTE_CONFIG`.
  - File: [arguments.py:243](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/bigtable/arguments.py#L243)
- Clarified the help text for the `--replacement-disk` flag for Compute Images, noting that the value is purely informational and not validated.
  - File: [flags.py:38](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/images/flags.py#L38)
- Significant refactoring in `compute/tpus/util.py`, including the removal of custom API interaction functions (e.g., `Describe`, `Delete`, `Create`) in favor of a more generic API client (`apis.GetMessagesModule`), aligning with the TPU API v1 promotion.
  - File: [util.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/tpus/util.py#L18)
- Extensive refactoring for Python 2/3 compatibility, including adding `absolute_import` and `unicode_literals` to many files, converting `range` to `list(range)`, and using `six.text_type` for string conversions.
  - File: [flags.py:16](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/functions/flags.py#L16)
- Deletion of empty package marker files `google-cloud-sdk/lib/googlecloudsdk/command_lib/pubsub/__init__.py`, `google-cloud-sdk/lib/googlecloudsdk/command_lib/util/apis/__init__.py`, and `google-cloud-sdk/lib/googlecloudsdk/command_lib/util/args/__init__.py`.
  - File: [__init__.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/pubsub/__init__.py#L1)
- Clarified help text for `--authorized-gae-apps`, `--authorized-networks`, and `--database-flags` in Cloud SQL to explicitly state that values *replace* existing lists during updates.
  - File: [flags.py:163](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/sql/flags.py#L163)
- Improved handling of base64 encoded data for Pub/Sub messages in Cloud Scheduler by ensuring proper unicode conversion before JSON serialization.
  - File: [util.py:104](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/scheduler/util.py#L104)
- Various minor wording and formatting improvements in help texts and error messages across several services (IAM, KMS, Monitoring, Spanner, Scheduler).
  - File: [iam_util.py:98](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/iam/iam_util.py#L98)
- Refactoring of CLI tree generation and cache utilities for improved robustness and Python 2/3 compatibility, including changes to file I/O using `io.open` and error handling.
  - File: [cache_util.py:163](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/meta/cache_util.py#L163)
- Correction in static completion output to ensure proper encoding when writing to the completion stream, and added a robustness check for closing the file object.
  - File: [lookup.py:192](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/static_completion/lookup.py#L192)
- Improved help text generation for '--labels' and '--update-labels' flags by introducing more descriptive format help messages for keys and values.
  - File: [labels_util.py:91](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/args/labels_util.py#L91)
- Refactored Python package structure by removing content from numerous `__init__.py` files across `command_lib/util/concepts`, `command_lib/util/hooks`, `core`, and `third_party` directories, potentially indicating a move to implicit namespace packages.
  - File: [__init__.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/__init__.py#L1)
- Enhanced resource completer logic to consider API versions when retrieving collection information for attributes.
  - File: [completers.py:278](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/completers.py#L278)
- Improved resource parsing and dependency resolution for complex resource arguments by adding anchor-based fallthroughs and refining fallthrough value handling.
  - File: [info_holders.py:201](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/info_holders.py#L201)
- Modified SSH command utility to support more flexible output handling, allowing stdout to be piped to a specific file or written to the console log.
  - File: [ssh.py:935](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/ssh/ssh.py#L935)
- Cleaned up `pytype` annotations in `metadata_table.py` and `persistent_cache_base.py` for improved type checking.
  - File: [metadata_table.py:263](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/cache/metadata_table.py#L263)
- Updated Python 2 unicode string literals to be compatible with Python 3.
  - File: [console_attr.py:372](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/console/console_attr.py#L372)
- Enhanced GCE metadata server response decoding by explicitly using `http_encoding.Decode` for robustness.
  - File: [gce_read.py:54](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/credentials/gce_read.py#L54)
- Implemented Python 3 compatibility fix for `map` function, explicitly converting its iterator output to a list.
  - File: [execution_utils.py:311](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/execution_utils.py#L311)
- Improved datetime parsing flexibility in resource expressions to accommodate either 'T' or a space as separators.
  - File: [resource_expr.py:480](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/resource/resource_expr.py#L480)
- Enhanced YAML printer to correctly represent `collections.OrderedDict` objects, preserving insertion order in YAML output.
  - File: [yaml_printer.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/resource/yaml_printer.py#L18)
- Improved error message for `AmbiguousResourcePath` by providing more specific collection information.
  - File: [resources.py:841](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/resources.py#L841)
- Corrected the suggested command for re-running installation to use 'gcloud' instead of the interpreter path, improving user instructions.
  - File: [update_manager.py:1423](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/updater/update_manager.py#L1423)
- Updated Python version compatibility checks to provide more tailored messages for Python 2.x and 3.x, and introduced an option to raise an exception instead of exiting.
  - File: [platforms.py:395](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/util/platforms.py#L395)
- A typo in the description for the `OFFLINE` status of `CloudFunction` messages was corrected, changing `isn’t` to `isn't`.
  - File: [cloudfunctions_v1_messages.py:91](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudfunctions/v1/cloudfunctions_v1_messages.py#L91)
- Minor cosmetic cleanup in Cloud Resource Manager v1 messages, replacing unicode left/right double quotation marks (`“`, `”`) with standard ASCII double quotation marks (`"`).
  - File: [cloudresourcemanager_v1_messages.py:917](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudresourcemanager/v1/cloudresourcemanager_v1_messages.py#L917)
- Minor cosmetic cleanup in Cloud Resource Manager v2alpha1 messages, replacing unicode apostrophe (`’`) with standard ASCII single quotation mark (`'`) in `Folder` resource descriptions for `displayName` and `parent` fields.
  - File: [cloudresourcemanager_v2alpha1_messages.py:194](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudresourcemanager/v2alpha1/cloudresourcemanager_v2alpha1_messages.py#L194)
- Minor cosmetic cleanup in Cloud Resource Manager v2beta1 messages, replacing unicode apostrophe (`’`) with standard ASCII single quotation mark (`'`) in `Folder` resource descriptions for `displayName` and `parent` fields.
  - File: [cloudresourcemanager_v2beta1_messages.py:266](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudresourcemanager/v2beta1/cloudresourcemanager_v2beta1_messages.py#L266)
- Improved documentation/description for `fingerprint` fields in several Compute Alpha, Beta, and v1 messages (e.g., `BackendService`, `InstanceGroupManager`, `Metadata`, `SslPolicy`, `Subnetwork`, `TargetVpnGateway`, `UrlMap`).
  - File: [compute_alpha_messages.py:2559](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L2559)
- Description updates for `DistributionPolicy` and `DistributionPolicyZoneConfiguration` in Compute Beta.
  - File: [compute_beta_messages.py:16661](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L16661)
- The description for `ManagedInstance` was changed from 'Next available tag: 12' to 'A Managed Instance resource.' in Compute Beta and v1.
  - File: [compute_beta_messages.py:23728](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L23728)
- Removed `bearer_token` and `pp` fields from `StandardQueryParameters` messages across Container, Container Analysis, and Dataflow APIs, indicating internal API refactoring.
  - File: [container_v1_messages.py:3343](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1/container_v1_messages.py#L3343)
- Minor description updates for various fields across Compute Engine and Deployment Manager APIs, improving clarity without adding new functionality.
  - File: [compute_alpha.json:2171](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json#L2171)
- Removal of `bearer_token` and `pp` (pretty-print) from `StandardQueryParameters` across various APIs (Genomics, IAM, Language, Logging, ML, OS Login). This appears to be an internal cleanup/refactoring of common API parameters.
  - File: [genomics_v1_messages.py:2842](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L2842)
- Minor text changes in Genomics v1alpha2 and v2alpha1 API descriptions, such as replacing 'NVIDIA\xae Tesla\xae' with 'NVIDIA(R) Tesla(R)' for accelerator types.
  - File: [genomics_v1alpha2_messages.py:1027](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1alpha2/genomics_v1alpha2_messages.py#L1027)
- API revision updates for `replicapoolupdater_v1beta1.json`, `sqladmin_v1beta3.json`, `sqladmin_v1beta4.json`, `storage_v1.json`, and `toolresults_v1beta3.json` indicating general regeneration or minor updates to API definitions.
  - File: [replicapoolupdater_v1beta1.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/replicapoolupdater_v1beta1.json#L7)
- Minor cosmetic changes to string quotes in API message and JSON descriptions across Service Management, Service Networking, Service Usage, Service User, Storage, and Testing APIs.
  - File: [servicemanagement_v1_messages.py:608](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_messages.py#L608)
- Updated `tpu.v1alpha1` API message definitions to include `SchedulingConfig` for Node resources, aligning with features introduced in the `tpu.v1` API.
  - File: [tpu_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1alpha1/tpu_v1alpha1_messages.py)
- Removal of redundant 'bearer_token' and 'pp' standard query parameters from Video Intelligence v1 API client messages and API definition.
  - File: [videointelligence_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/videointelligence/v1/videointelligence_v1_messages.py)
- Removal of redundant 'bearer_token' and 'pp' standard query parameters from Video Intelligence v1 API definition.
  - File: [videointelligence_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/videointelligence_v1.json)
- Removal of redundant 'bearer_token' and 'pp' standard query parameters from Vision v1 API client messages and API definition. Also a minor description update.
  - File: [vision_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision/v1/vision_v1_messages.py)
- Removal of redundant 'bearer_token' and 'pp' standard query parameters from Vision v1 API definition.
  - File: [vision_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision_v1.json)
- Removed 'bearer_token' query parameter from Vision API v1 discovery document.
  - File: [vision_v1.json:44](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision_v1.json#L44)
- Removed 'pp' (pretty-print) query parameter from Vision API v1 discovery document.
  - File: [vision_v1.json:69](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision_v1.json#L69)
- Clarified description for 'bestGuessLabels' field in Vision API v1 discovery document.
  - File: [vision_v1.json:1431](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/vision_v1.json#L1431)

### Hidden Feature

- Added new fine-grained bandwidth options ('50m', '100m', '200m', '300m', '400m', '500m', '1g', '2g', '5g', '10g') for interconnect attachments, not explicitly mentioned in release notes.
  - File: [client.py:34](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/interconnects/attachments/client.py#L34)
- Added a new `multitype.py` module, introducing `MultitypeConceptSpec` and `TypedConceptResult` to support concepts that can represent multiple resource types, with type resolution based on actively specified attributes.
  - File: [multitype.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/multitype.py#L1)
- The `DEFAULT_LIST_FORMAT` for Compute Routes now includes `nextHopNetwork`, enhancing the displayed information for routes.
  - File: [flags.py:39](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/routes/flags.py#L39)
- Added a new `IdentityProjector` class, a no-op resource projector that preserves the original object, likely for internal use cases.
  - File: [resource_projector.py:517](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/core/resource/resource_projector.py#L517)
- Added `regionSslCertificates` service to the Compute Alpha client, enabling management of regional SSL certificates.
  - File: [compute_alpha_client.py:79](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L79)
- Added `regionTargetHttpsProxies` service to the Compute Alpha client, enabling management of regional Target HTTPS Proxies.
  - File: [compute_alpha_client.py:81](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L81)
- New Compute Alpha API methods for regional SSL certificate management have been added.
  - File: [compute_alpha_client.py:10064](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L10064)
- New Compute Alpha API methods for regional Target HTTPS Proxy management have been added.
  - File: [compute_alpha_client.py:10370](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L10370)
- The `GetNatMappingInfo` method was added to the Compute Alpha RoutersService, providing new functionality to retrieve NAT mapping information for VM endpoints.
  - File: [compute_alpha_client.py:11148](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L11148)
- The `AggregatedList` method was added to the Compute Alpha SslCertificatesService, allowing for a combined listing of regional and global SSL certificates.
  - File: [compute_alpha_client.py:11662](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L11662)
- The `AggregatedList` method was added to the Compute Alpha TargetHttpsProxiesService, providing a way to list all regional and global Target HTTPS Proxies.
  - File: [compute_alpha_client.py:12508](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L12508)
- The full API definition for the new Cloud Filestore service (v1alpha1) has been added to the SDK, allowing interaction with file server instances, volumes, and networks. This is a new service integration not explicitly mentioned in the provided release notes.
  - File: [file_v1alpha1.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/file_v1alpha1.json)
- A new client library for the Cloud TPU v1 API was introduced, enabling interaction with Cloud TPU resources through methods for managing accelerator types, nodes (create, delete, reimage, reset, start, stop), operations, locations, and TensorFlow versions.
  - File: [tpu_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu/v1/tpu_v1_client.py)
- Introduction of the Cloud TPU v1 API, providing full lifecycle management for TPU nodes.
  - File: [tpu_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu_v1.json)
- Addition of 'schedulingConfig' with a 'preemptible' option to the TPU v1alpha1 API for node configuration.
  - File: [tpu_v1alpha1.json](https://github.com/twistedpair/google-cloud-sdk/blob/205.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/tpu_v1alpha1.json)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}316{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+12,722{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-3,603{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/204.0.0...205.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*