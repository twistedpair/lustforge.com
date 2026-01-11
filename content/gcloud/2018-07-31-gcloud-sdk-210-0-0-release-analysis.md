---
draft: false
title: "gcloud SDK 210.0.0 Release Analysis"
author: Joe Lust
layout: post
date: 2018-07-31
url: /gcloud/gcloud-sdk-210-0-0-release-analysis/
summary: "Google Cloud SDK version 210.0.0 introduces several breaking changes related to Container Builder command group renames and deprecations, along with changes to Kubernetes Engine cluster creation defaults. Key new features include the promotion of Compute Engine `sole-tenancy` commands to GA and the addition of new VPC flow logging flags for subnets. This release also includes significant groundwork for new services like Firestore and enhanced Cloud KMS capabilities, alongside various internal refactorings."
tags:
  - gcloud
  - google-cloud-platform
  - release-analysis
  - gcp
  - cloud-build
  - cloud-iot
  - cloud-services
  - compute-engine
  - kubernetes-engine
  - cloud-kms
  - cloud-firestore
  - cloud-key-management-service-kms-
  - cloud-tasks
  - dataproc
  - datastore
  - firestore
  - cloud-genomics
  - cloud-iam
  - identity-and-access-management
  - cloud-speech-to-text
---

Google Cloud SDK version 210.0.0 introduces several breaking changes related to Container Builder command group renames and deprecations, along with changes to Kubernetes Engine cluster creation defaults. Key new features include the promotion of Compute Engine `sole-tenancy` commands to GA and the addition of new VPC flow logging flags for subnets. This release also includes significant groundwork for new services like Firestore and enhanced Cloud KMS capabilities, alongside various internal refactorings.

**Jump to:** [Annotated Release Notes](#breaking-changes) | [Unannounced Changes 🕵️](#unannounced-changes) | [Stats 📊](#stats)

<!--more-->

## Breaking Changes

- Removed deprecated `gcloud compute interconnects patch`; users should now use `gcloud compute interconnects update`.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Deprecated the `container-builder-local` binary; users should transition to `cloud-build-local`.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Deprecated the `gcloud container builds` command group; users should transition to `gcloud builds`. Existing commands will work during a deprecation period.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Renamed the `containers.build_timeout` property to `builds.timeout` in `gcloud builds`.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Renamed the `container.build_check_tag` property to `builds.check_tag` in `gcloud builds`.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Starting in Kubernetes Engine version 1.12, `gcloud container clusters create` will have basic authentication and client certificate issuance disabled by default.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Removed automated `app.yaml` generation from `gcloud app deploy`; the deprecated `gcloud beta app gen-config` is still available separately.
  - File: [deploy_command_util.py:668](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/app/deploy_command_util.py#L668)
- The `UnidentifiedDirMatcher` now explicitly errors out if no `app.yaml` is found, instead of attempting to generate one.
  - File: [deployables.py:175](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/app/deployables.py#L175)
- Removed the `Rsync` function from `StorageClient`, which may affect Python code directly utilizing this SDK helper.
  - File: [storage_api.py:323](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/storage/storage_api.py#L323)
- Added a warning indicating that `RunGsutilCommand` is not compatible with Python 3 and should no longer be used.
  - File: [storage_util.py:299](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/storage/storage_util.py#L299)
- The `DRYRUN_AUDIT_LOG_ONLY` enum value has been removed from `AdmissionRule.EnforcementModeValueValuesEnum` in the Binary Authorization `v1beta1` API. Existing configurations using this value may fail.
  - File: [binaryauthorization_v1beta1_messages.py:49](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/binaryauthorization/v1beta1/binaryauthorization_v1beta1_messages.py#L49)
- The `Binding` message in Cloud KMS API has been updated. The `members` field was re-indexed from 1 to 2, and the `role` field from 2 to 3, to accommodate a new `condition` field at index 1. This change could break clients relying on strict positional field indexing.
  - File: [cloudkms_v1_messages.py:129](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L129)
- The `Binding` message in Cloud Resource Manager API has been updated. The `members` field was re-indexed from 1 to 2, and the `role` field from 2 to 3, to accommodate a new `condition` field at index 1. This change could break clients relying on strict positional field indexing.
  - File: [cloudresourcemanager_v1beta1_messages.py:111](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudresourcemanager/v1beta1/cloudresourcemanager_v1beta1_messages.py#L111)
- The `CryptoKeyVersion.StateValueValuesEnum` in Cloud KMS API had its integer values re-indexed to introduce a new `PENDING_GENERATION` state. `ENABLED` moved from 1 to 2, `DISABLED` from 2 to 3, and so on. Clients relying on the integer values of these enum states may experience issues.
  - File: [cloudkms_v1_messages.py:804](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L804)
- Removed `HostTypesService` and `HostsService` from the Compute Alpha API client, indicating the removal of functionality related to host types and hosts in the alpha version of the Compute API.
  - File: [compute_alpha_client.py:49](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_client.py#L49)
- Removed generic message definitions for `StatusProto`, `TypedMessage`, and `MessageSet` from `composer_v1.json` and `composer_v1beta1.json`. This could be a breaking change for any client or tool directly relying on these specific schema definitions within the Composer API.
  - File: [composer_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_messages.py)
- Removed `ComputeHostTypes` API endpoints and associated resource collections (`HOSTTYPES`, `HOSTS`) from the `compute/alpha` API.
- Removed the `VERSIONED_EXPR_UNSPECIFIED` enum value from `SecurityPolicyRuleMatcher.VersionedExprValueValuesEnum` in the `compute/beta` API, which may affect clients relying on this specific value.
  - File: [compute_beta_messages.py:31489](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L31489)
- The `Host` object has been entirely removed from the Compute Engine alpha API, and the `HttpHealthCheck` object has been significantly redefined with fields removed, added, and renamed (e.g., `hostType` removed, `host` added, `instances` removed). This will break any client code interacting with these alpha API resources.
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- The `requestId` parameter has been removed from the `compute.instances.start` method in the Compute Engine v1 API.
  - File: [compute_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json)
- The enum value `VERSIONED_EXPR_UNSPECIFIED` has been removed from `SecurityPolicyRuleMatcher.versionedExpr` in the Compute Engine beta API. If programmatic clients relied on this enum, it could be a breaking change.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)
- Removed the `bearer_token` and `pp` (prettyPrint) fields from the `StandardQueryParameters` message for the Datastore `v1` API. While these are typically internal query parameters, their removal could implicitly affect tooling that relied on them.
  - File: [datastore_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/datastore/v1/datastore_v1_messages.py)
- Removed `bearer_token` and `pp` (prettyPrint) global query parameters from the Datastore `v1` API schema.
  - File: [datastore_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/datastore_v1.json)

## Security Updates

- The `Binding` message in Cloud Tasks API now includes a `condition` field of type `Expr`, which provides groundwork for IAM Conditions. This will allow for more granular access control policies. [MEDIUM]
  - File: [cloudtasks_v2beta2_messages.py:333](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_messages.py#L333)
- Introduced a new `SecurityPolicies` API (`compute.securityPolicies` service) in `compute/v1`. This enables comprehensive management of global network security policies, including methods for adding, deleting, getting, listing, patching, and removing security rules. It also allows associating security policies with backend services (`compute.backendServices.setSecurityPolicy`), significantly enhancing network security controls. [HIGH]
- New `SecurityPolicy` resources and methods (`addRule`, `delete`, `get`, `getRule`, `insert`, `list`, `patch`, `patchRule`, `removeRule`) have been introduced in the Compute Engine v1 API, along with a `setSecurityPolicy` method for `BackendService`. This enables advanced security policy management, likely for Web Application Firewall (WAF) or similar features. [MEDIUM]
  - File: [compute_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json)

## New Features by Service

### Cloud Build

- Renamed the `container-builder-local` binary to `cloud-build-local` (no functional changes), with initial release version `0.4.0`.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Released initial `cloud-build-local` package installers for deb and RPM.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud IoT

- Promoted `gcloud registries add-iam-policy-binding` to beta.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Promoted `gcloud registries remove-iam-policy-binding` to beta.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)

### Cloud Services

- `gcloud beta services disable` now supports the `--force` option to disable dependent services.
  - Flags: `--force`
  - File: [serviceusage.py:87](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/services/serviceusage.py#L87)

### Compute Engine

- Promoted `sole-tenancy` commands to GA.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Promoted the `--internal-ip` flag of `gcloud compute ssh` to GA.
  - Flags: `--internal-ip`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added the `list-nodes` command to `gcloud compute sole-tenancy node-groups` for displaying node information.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added the `--use-serving-port` flag to `gcloud compute health-checks tcp create` command.
  - Flags: `--use-serving-port`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Promoted the `--enable-logging` flag of `gcloud compute firewall-rules create` and `update` to beta.
  - Flags: `--enable-logging`
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Promoted `gcloud compute networks subnets list-usable` to GA.
  - File: [RELEASE_NOTES](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/RELEASE_NOTES)
- Added `--aggregation-interval`, `--flow-sampling`, and `--metadata` flags to `gcloud compute networks subnets update` for configuring VPC flow logging.
  - Flags: `--aggregation-interval`, `--flow-sampling`, `--metadata`
  - File: [flags.py:130](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/networks/subnets/flags.py#L130)
- The `Commitment` message in `compute/alpha` now includes an `allocations` field for specifying resource allocations.
  - File: [compute_alpha_messages.py:3855](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L3855)
- The `SslCertificate` message in `compute/beta` now supports managed SSL certificates, introducing new fields like `expireTime`, `managed`, `selfManaged`, `subjectAlternativeNames`, and `type`, along with new `SslCertificateManagedSslCertificate` and `SslCertificateSelfManagedSslCertificate` messages.
  - File: [compute_beta_messages.py:31893](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L31893)
- The `compute/v1` Instances service now includes a `SimulateMaintenanceEvent` method to simulate maintenance events on instances.
  - File: [compute_v1_client.py:3979](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_client.py#L3979)
- The `BackendService` message in `compute/v1` now includes a `securityPolicy` field to indicate the associated security policy.
  - File: [compute_v1_messages.py:2255](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L2255)
- The `CustomerEncryptionKey` message in `compute/v1` now includes a `kmsKeyName` field for referencing encryption keys stored in Google Cloud KMS.
  - File: [compute_v1_messages.py:13522](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L13522)
- The `Firewall` message in `compute/v1` now includes a `disabled` boolean field, allowing firewall rules to be temporarily disabled.
  - File: [compute_v1_messages.py:14768](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L14768)
- In the alpha API, `Commitment` resources now include an `allocations` field. `HttpHealthCheck` resources gain new configuration fields: `checkIntervalSec`, `healthyThreshold`, `port`, `requestPath`, and `timeoutSec`.
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- In the beta API, `SslCertificate` resources now support managed and self-managed configurations through new fields: `expireTime`, `managed`, `selfManaged`, `subjectAlternativeNames`, and `type`. New types `SslCertificateManagedSslCertificate` and `SslCertificateSelfManagedSslCertificate` have been added to facilitate this.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)
- In the v1 API, `BackendService` resources can now be associated with a `securityPolicy` via the new `setSecurityPolicy` method. `CustomerEncryptionKey` now supports a `kmsKeyName` field. `Firewall` rules can be `disabled`. Instances gained a `simulateMaintenanceEvent` method.
  - File: [compute_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json)

### Kubernetes Engine

- Introduced initial CLI definitions for managing Kubernetes Managed Namespaces, including resource arguments and command logic for `kubernetespolicy.projects.namespaces`.
  - File: [command_lib.py:27](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/policy/namespaces/command_lib.py#L27)
- In the v1alpha1 API, `AuthenticatorGroupsConfig` now includes a `securityGroup` field, suggesting enhanced group authentication capabilities.
  - File: [container_v1alpha1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1alpha1/container_v1alpha1_messages.py)

### Cloud KMS

- Added new command flags and supporting logic for advanced Cloud KMS operations, including asymmetric signing (`--signature-file`, `--digest-algorithm`), input/output files (`--input-file`, `--output-file`), specifying key protection levels (`--protection-level`), attestation files (`--attestation-file`), and default algorithms for crypto keys (`--default-algorithm`). This enables more granular control over key types and operations, particularly for asymmetric keys.
  - Flags: `--signature-file`, `--input-file`, `--output-file`, `--protection-level`, `--attestation-file`, `--default-algorithm`, `--digest-algorithm`
  - File: [flags.py:196](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/kms/flags.py#L196)
- Added the `AsymmetricDecrypt` method to `CryptoKeyVersions` for decrypting data encrypted with a public key.
  - File: [cloudkms_v1_client.py:51](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_client.py#L51)
- Added the `AsymmetricSign` method to `CryptoKeyVersions` for signing data using a private key.
  - File: [cloudkms_v1_client.py:69](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_client.py#L69)
- Added the `GetPublicKey` method to `CryptoKeyVersions` for retrieving the public key associated with an asymmetric `CryptoKeyVersion`.
  - File: [cloudkms_v1_client.py:147](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_client.py#L147)

### Cloud Firestore

- Initial API client and message definitions for Cloud Firestore, supporting `v1` and `v1beta1` versions, with `v1beta1` set as the default.
  - File: [apis_map.py:466](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/apis_map.py#L466)
- Introduced the client library for the Cloud Firestore v1 API, including new message definitions and resource paths for managing projects, databases, and operations.
  - File: [firestore_v1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1/firestore_v1_messages.py#L1)
- Introduction of the Cloud Firestore API, specifically adding the `v1beta1` Python client library for data plane operations (defining messages and resources) and the `v1` Firestore Admin API via a Discovery JSON definition, providing administrative functions and metadata schemas for index, export, and import operations.
  - File: [firestore_v1beta1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/firestore_v1beta1_messages.py#L1)
- Added support for the Cloud Firestore `v1beta1` API, including new index management capabilities via `GoogleFirestoreAdminV1beta1Index` and `GoogleFirestoreAdminV1beta1IndexField` schemas.
  - File: [firestore_v1beta1.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore_v1beta1.json#L1)

### Cloud Key Management Service (KMS)

- Added comprehensive support for asymmetric keys with new `ASYMMETRIC_SIGN` and `ASYMMETRIC_DECRYPT` purposes for `CryptoKey` objects. This includes new API methods like `AsymmetricSign`, `AsymmetricDecrypt`, and `GetPublicKey` to retrieve public key material and perform asymmetric cryptographic operations.
  - File: [cloudkms_v1_messages.py:614](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L614)
- Introduced support for Hardware Security Module (HSM) protected keys via a new `protection_level` field in `CryptoKeyVersion` and `CryptoKeyVersionTemplate`, along with `KeyOperationAttestation` for verifying HSM operations.
  - File: [cloudkms_v1_messages.py:696](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L696)
- Added `CryptoKeyVersionTemplate` to specify properties for new `CryptoKeyVersion` instances, including `algorithm` and `protectionLevel`.
  - File: [cloudkms_v1_messages.py:788](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L788)

### Cloud Tasks

- Groundwork for Conditional IAM policies by adding the `Binding.condition` field and the `Expr` message type to the Cloud Tasks v2beta2 API. The `Expr` message represents an expression in Common Expression Language (CEL) syntax for defining conditions, although the feature is currently marked as 'Unimplemented'.
  - File: [cloudtasks_v2beta2.json:400](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks_v2beta2.json#L400)

### Dataproc

- In the v1beta2 API, `Binding` resources gained a `condition` field of type `Expr`, hinting at support for IAM Conditions for Dataproc policies.
  - File: [dataproc_v1beta2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataproc/v1beta2/dataproc_v1beta2_messages.py)
- Added `condition` field to the `Binding` resource and a new `Expr` resource type in the Dataproc `v1beta2` API, indicating support for IAM Conditions for more granular access control.
  - File: [dataproc_v1beta2.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataproc_v1beta2.json)

### Datastore

- Added new API client methods and messages for managing Datastore indexes, including `Get` and `List` operations for `projects.indexes` resources, and messages like `GoogleDatastoreAdminV1Index` and `GoogleDatastoreAdminV1IndexedProperty`.
  - File: [datastore_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/datastore/v1/datastore_v1_client.py)

### Firestore

- Introduced the `v1` API client and extensive message definitions for Firestore, including operations for `projects.databases.operations` (Cancel, Delete, Get, List) and `projects.locations` (Get, List).
  - File: [firestore_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1/firestore_v1_client.py)
- Introduced the `v1beta1` API client and extensive message definitions for Firestore, including operations for `projects.databases.operations` (Cancel, Delete, Get, List) and `projects.locations` (Get, List).
  - File: [firestore_v1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/firestore_v1beta1_client.py)
- Added the client library for the Firestore v1beta1 API. This new client enables programmatic interaction with Firestore documents, including operations like `BatchGet`, `BeginTransaction`, `Commit`, `CreateDocument`, `Delete`, `Get`, `List`, `ListCollectionIds`, `Listen`, `Patch`, `Rollback`, `RunQuery`, and `Write`. It also allows for the management of Firestore indexes (`Create`, `Delete`, `Get`, `List`) and provides methods for `ExportDocuments` and `ImportDocuments` at the database level.
  - File: [firestore_v1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/firestore_v1beta1_client.py)

### Cloud Genomics

- Introduced the `ContainerKilledEvent` message to the Genomics `v1`, `v1alpha2`, and `v2alpha1` APIs, providing an event for containers forcibly terminated by the worker.
  - File: [genomics_v1_messages.py:447](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L447)
- Added a new `timeout` field to the `Action` message in the Genomics `v2alpha1` API, allowing users to specify a maximum execution time for individual pipeline actions.
  - File: [genomics_v2alpha1_messages.py:249](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v2alpha1/genomics_v2alpha1_messages.py#L249)
- Added a new `condition` field of type `Expr` to the `Binding` message in the Genomics `v1` API, enabling support for conditional IAM policies.
  - File: [genomics_v1_messages.py:240](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L240)
- Introduced support for IAM policy conditions (`Expr` type), allowing more granular access control on resource bindings for Genomics v1 and v1alpha2 APIs.
  - File: [genomics_v1.json:767](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v1.json#L767)
- Added a new `ContainerKilledEvent` for Genomics pipelines, reporting when a container is forcibly terminated during execution (available across v1, v1alpha2, and v2alpha1 APIs).
  - File: [genomics_v1.json:2316](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v1.json#L2316)
- Enabled specifying a `timeout` duration for individual pipeline `Action` steps in the Genomics v2alpha1 API, allowing termination of long-running actions.
  - File: [genomics_v2alpha1.json:338](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v2alpha1.json#L338)

### Cloud IAM

- Introduced a new `LintPolicy` API method to programmatically lint and validate Cloud IAM policy objects, bindings, and conditions in the IAM v1 API.
  - File: [iam_v1_client.py:55](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/iam/v1/iam_v1_client.py#L55)

### Identity and Access Management

- Introduced a Policy Linting API with new messages `LintPolicyRequest`, `LintPolicyResponse`, and `LintResult` and a new method `iam.iamPolicies.lintPolicy` for validating IAM policies.
  - File: [iam_v1.json:1789](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/iam_v1.json#L1789)

### Cloud Speech-to-Text

- Added a new `tags` (repeated string) field to `RecognitionMetadata` for tagging input samples, enabling grouping logs and training AutoML models.
  - File: [speech_v1p1beta1_messages.py:599](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/speech/v1p1beta1/speech_v1p1beta1_messages.py#L599)

## Credential & Auth Changes

- Added the `condition` field to the `Binding` message (using new `Expr` message type) in the Cloud Genomics `v1` API, providing groundwork for conditional IAM policies.
  - File: [genomics_v1_messages.py:240](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L240)

## API Changes

### Compute Engine

- Added `aggregation_interval`, `flow_sampling`, and `metadata` parameters to `MakeSubnetworkUpdateRequest` for VPC flow logging configuration, aligning with new flags.
  - File: [subnets_utils.py:28](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/subnets_utils.py#L28)
- The `compute sole-tenancy node-types list` command completer has been updated to remove explicit `api_version='beta'`, indicating a potential graduation or internal alignment with a stable API version.
  - File: [flags.py:35](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/sole_tenancy/node_types/flags.py#L35)
- Field numbering for the `Commitment` message in `compute/alpha` was adjusted to accommodate the new `allocations` field.
  - File: [compute_alpha_messages.py:3934](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/alpha/compute_alpha_messages.py#L3934)
- Field numbering for the `SslCertificate` message in `compute/beta` was adjusted due to the insertion of new fields for managed certificates.
  - File: [compute_beta_messages.py:31915](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L31915)
- Field numbering for the `BackendService` message in `compute/v1` was adjusted to accommodate the new `securityPolicy` field.
  - File: [compute_v1_messages.py:2337](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L2337)
- Field numbering for the `CustomerEncryptionKey` message in `compute/v1` was adjusted to accommodate the new `kmsKeyName` field.
  - File: [compute_v1_messages.py:13758](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L13758)
- Field numbering for the `Firewall` message in `compute/v1` was adjusted to accommodate the new `disabled` field.
  - File: [compute_v1_messages.py:14893](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/v1/compute_v1_messages.py#L14893)
- The API revision for Compute Engine alpha, beta, and v1 APIs has been updated from `20180711` to `20180724`.
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- The `Image.licenses` description has been clarified across alpha, beta, and v1 APIs.
  - File: [compute_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_alpha.json)
- In the beta API, descriptions for `InstanceGroupManagerUpdatePolicy.minimalAction` and `SecurityPolicy` have been clarified.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)

### Kubernetes Engine

- Logic added to `CreateCluster` to set `autoscaling` if `options.enable_autoprovisioning` is specified, related to cluster autoscaling features.
  - File: [api_adapter.py:1664](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/container/api_adapter.py#L1664)
- In the v1beta1 API, descriptions for `ClusterAutoscaling.enableNodeAutoprovisioning` and `ClusterAutoscaling.resourceLimits` have been clarified.
  - File: [container_v1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/container/v1beta1/container_v1beta1_messages.py)

### Cloud Endpoints

- The `CreateServiceIfNew` function was refactored into `DoesServiceExist` and `CreateService` to support explicit service existence checks and warn before implicit creation.
  - File: [services_util.py:388](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/endpoints/services_util.py#L388)

### Cloud Services

- Renamed `PeerServicePermissionDeniedException` to `CreateConnectionsPermissionDeniedException` and introduced `ListConnectionsPermissionDeniedException` for more specific error handling.
  - File: [exceptions.py:34](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/services/exceptions.py#L34)
- A new `ListConnections` function was added to interact with service networking connections, alongside updates to `CreateConnection`.
  - File: [peering.py:54](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/services/peering.py#L54)

### Cloud Composer

- API definitions for Cloud Composer (v1beta1 to v1) were updated, aligning with the promotion of `gcloud composer` commands to GA.
  - File: [composer_v1beta1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/third_party/apis/composer/v1beta1/composer_v1beta1_messages.py)
- Removed deprecated internal message types `MessageSet`, `StatusProto`, and `TypedMessage` from `composer/v1` and `composer/v1beta1` API messages. These were likely internal cleanup and not user-facing.
  - File: [composer_v1_messages.py:347](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1/composer_v1_messages.py#L347)
- Removed deprecated internal message types `MessageSet`, `StatusProto`, and `TypedMessage` from `composer/v1` and `composer/v1beta1` API messages. These were likely internal cleanup and not user-facing.
  - File: [composer_v1beta1_messages.py:348](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer/v1beta1/composer_v1beta1_messages.py#L348)

### Cloud Tasks

- API client and message definitions for Cloud Tasks (v2beta2) were significantly updated, aligning with the promotion of `gcloud tasks` commands to beta.
  - File: [cloudtasks_v2beta2.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/third_party/apis/cloudtasks_v2beta2.json)
- Added a new message `Expr` to represent an expression text, likely for IAM Conditions. This message defines fields like `description`, `expression`, `location`, and `title`.
  - File: [cloudtasks_v2beta2_messages.py:902](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_messages.py#L902)
- The `Binding` message for IAM policies in Cloud Tasks now includes a `condition` field of type `Expr`. The fields within `Binding` have also been reordered (previously `members` and `role`, now `condition`, then `members`, then `role`). The `condition` field is currently described as 'Unimplemented'.
  - File: [cloudtasks_v2beta2_messages.py:333](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_messages.py#L333)
- The `Tasks.List` method description now explicitly states that 'The tasks may be returned in any order. The ordering may change at any time.'
  - File: [cloudtasks_v2beta2_client.py:269](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_client.py#L269)
- Updated descriptions for various fields, clarifying behavior and limits. For example, `LeaseTasksRequest.maxTasks` now states that the maximum total size of a lease tasks response is 32 MB, and `ListTasksRequest` now explicitly notes that tasks may be returned in any order.
  - File: [cloudtasks_v2beta2.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks_v2beta2.json)
- Changed HTTP method enum values from title case (e.g., `HTTP Post`) to uppercase (e.g., `HTTP POST`) in `AppEngineHttpRequest.httpMethod`.
  - File: [cloudtasks_v2beta2.json:541](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks_v2beta2.json#L541)

### Service Usage API

- Changed the `beta services list` command to flatten service names using `--flatten=config.name` instead of `--flatten=serviceName`. A new `ConsumerServiceLegacyCompleter` was introduced, suggesting backward compatibility for the old service naming convention.
  - File: [common_flags.py:27](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/services/common_flags.py#L27)

### App Engine

- Renamed references from 'Google Cloud Container Builder' to 'Google Cloud Build' in various API message and JSON schema descriptions (`Deployment.cloudBuildOptions`, `BuildInfo`).
  - File: [appengine_v1_messages.py:1045](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/appengine/v1/appengine_v1_messages.py#L1045)

### Cloud Bigtable

- Minor API revision update for `bigtableclusteradmin_v1` from '20180514' to '20180716'.
  - File: [bigtableclusteradmin_v1.json:7](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/bigtableclusteradmin_v1.json#L7)

### Binary Authorization

- Introduced the `Expr` message type and added a `condition` field to the `Binding` message for supporting IAM conditions. Also added `delegationServiceAccountEmail` to `UserOwnedDrydockNote`. The documentation URL has been updated.
  - File: [binaryauthorization_v1beta1_messages.py:280](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/binaryauthorization/v1beta1/binaryauthorization_v1beta1_messages.py#L280)

### Cloud Build

- Renamed 'Cloud Container Builder' to 'Cloud Build' across API descriptions, client information, and documentation links.
  - File: [cloudbuild_v1_messages.py:4](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudbuild/v1/cloudbuild_v1_messages.py#L4)

### Cloud IoT Core

- Introduced the `Expr` message type and added an 'unimplemented' `condition` field to the `Binding` message for IAM conditions.
  - File: [cloudiot_v1_messages.py:20](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudiot/v1/cloudiot_v1_messages.py#L20)

### Cloud KMS

- The `List` method for `CryptoKeyVersions` now supports a `view` query parameter.
  - File: [cloudkms_v1_client.py:166](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_client.py#L166)
- The `Create` method for `CryptoKey` now explicitly requires `CryptoKey.purpose` and `CryptoKey.version_template.algorithm`.
  - File: [cloudkms_v1_client.py:256](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_client.py#L256)
- The `Decrypt` and `Encrypt` methods for `CryptoKey` now explicitly state that `CryptoKey.purpose` must be `ENCRYPT_DECRYPT`.
  - File: [cloudkms_v1_client.py:280](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_client.py#L280)
- The `List` method for `CryptoKeys` now supports a `versionView` query parameter.
  - File: [cloudkms_v1_client.py:409](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_client.py#L409)
- The `UpdatePrimaryVersion` method now returns an error if called on an asymmetric key.
  - File: [cloudkms_v1_client.py:510](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_client.py#L510)

### Cloud Key Management Service (KMS)

- New message types `AsymmetricDecryptRequest`, `AsymmetricDecryptResponse`, `AsymmetricSignRequest`, `AsymmetricSignResponse`, `Digest`, `Expr`, `KeyOperationAttestation`, `CryptoKeyVersionTemplate`, `PublicKey`, and `LocationMetadata` were added to the `cloudkms_v1` API.
  - File: [cloudkms_v1_messages.py:16](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L16)
- Modified the `CryptoKey` message to include a `versionTemplate` field and updated descriptions for `primary`, `nextRotationTime`, and `rotationPeriod` to clarify behavior with different key purposes.
  - File: [cloudkms_v1_messages.py:674](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L674)
- The `CryptoKeyVersion` message was significantly updated with new fields: `algorithm`, `attestation`, `generateTime`, and `protectionLevel`. Descriptions for `CryptoKeyVersion` and its states were also expanded.
  - File: [cloudkms_v1_messages.py:696](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L696)
- Updated `EncryptRequest` message descriptions to specify size limits for `plaintext` and `additionalAuthenticatedData` based on the key version's `protection_level` (SOFTWARE vs. HSM).
  - File: [cloudkms_v1_messages.py:640](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L640)
- Added new query parameters `view` and `versionView` to `CloudkmsProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsListRequest` and `CloudkmsProjectsLocationsKeyRingsCryptoKeysListRequest` respectively, allowing control over the detail level in the response.
  - File: [cloudkms_v1_messages.py:297](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py#L297)
- New RPC methods `GetPublicKey`, `AsymmetricSign`, and `AsymmetricDecrypt` were added under `cryptoKeyVersions` resource, enabling new asymmetric key functionalities.
  - File: [cloudkms_v1.json:1461](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms_v1.json#L1461)

### Cloud Resource Manager

- A new `Expr` message type was added and a `condition` field was introduced to the `Binding` message, likely laying groundwork for IAM Conditions.
  - File: [cloudresourcemanager_v1beta1_messages.py:369](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudresourcemanager/v1beta1/cloudresourcemanager_v1beta1_messages.py#L369)

### Dataproc

- In the v1beta2 API, the `members` and `role` fields in the `Binding` resource have shifted their field numbers due to the addition of the `condition` field. Descriptions for `RegexValidation.regexes`, `TemplateParameter` (for `description`, `fields`, `name`), `ValueValidation.values`, and `WorkflowTemplate.parameters` have been clarified or expanded.
  - File: [dataproc_v1beta2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataproc/v1beta2/dataproc_v1beta2_messages.py)
- Updated descriptions for `parameters`, `TemplateParameter`, `name`, `description`, `regexes`, and `values` fields within the `dataproc_v1beta2.json` schema to provide more clarity on template parameters.
  - File: [dataproc_v1beta2.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataproc_v1beta2.json)

### Datastore

- Changed the API title from 'Google Cloud Datastore API' to 'Cloud Datastore API' in `datastore_v1.json`.
  - File: [datastore_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/datastore_v1.json)
- Added `CREATE_INDEX` and `DELETE_INDEX` as new `OperationTypeValueValuesEnum` options in `GoogleDatastoreAdminV1CommonMetadata` for Datastore Admin operations.
  - File: [datastore_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/datastore/v1/datastore_v1_messages.py)

### DLP

- Expanded the description for the `infoTypes` field in `GooglePrivacyDlpV2InspectConfig` to mention the 'ALL_BASIC' InfoType and emphasize the need for specific InfoTypes for precise control.
  - File: [dlp_v2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dlp/v2/dlp_v2_messages.py)

### Deployment Manager

- Updated the API revision for `deploymentmanager_alpha.json`, `deploymentmanager_v2.json`, and `deploymentmanager_v2beta.json` to `20180720`.
  - File: [deploymentmanager_alpha.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/deploymentmanager_alpha.json)

### DNS

- Updated the API revision for `dns_v1.json`, `dns_v1alpha2.json`, `dns_v1beta1.json`, `dns_v1beta2.json`, and `dns_v2beta1.json` to `20180720`.
  - File: [dns_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dns_v1.json)

### Cloud Firestore

- Added new API client messages and resource paths for Cloud Firestore v1. This includes operations for projects, databases, and locations. The `firestore_v1_messages.py` file also bundles admin-related message types from `v1beta1` and `v1beta2` for export, import, and index management.
  - File: [firestore_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1/firestore_v1_messages.py)
- Added new resource definitions for Cloud Firestore v1, including `PROJECTS`, `PROJECTS_DATABASES`, `PROJECTS_DATABASES_OPERATIONS`, and `PROJECTS_LOCATIONS` with `BASE_URL` set to `https://firestore.googleapis.com/v1/`.
  - File: [resources.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1/resources.py)
- Added `v1beta1` message definitions for Cloud Firestore, including comprehensive data structures for documents, values, queries, transactions, and various operations such as `BatchGetDocumentsRequest`, `CommitRequest`, `RunQueryRequest`, `ListenRequest`, and their respective responses. (2239 new lines)
  - File: [firestore_v1beta1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/firestore_v1beta1_messages.py#L1)
- Defined `v1beta1` resource collections for Cloud Firestore, including `PROJECTS`, `PROJECTS_DATABASES`, `PROJECTS_DATABASES_DOCUMENTS`, and `PROJECTS_DATABASES_INDEXES` with their respective paths. (70 new lines)
  - File: [resources.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/resources.py#L1)
- The `v1beta1` API for Cloud Firestore has been added to the SDK, including definitions for index management resources.
  - File: [firestore_v1beta1.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore_v1beta1.json#L1)

### Firestore

- The Google Cloud Firestore v1beta1 API client library (`firestore_v1beta1_client.py`) has been added to the SDK, making the Firestore v1beta1 API accessible for interaction with documents, indexes, and administrative operations.
  - File: [firestore_v1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/firestore_v1beta1_client.py)

### Cloud Firestore Admin

- Introduced the `v1` Discovery API JSON for Cloud Firestore, specifying API endpoints and schemas for administrative operations. This includes schemas for locations, long-running operations, and metadata for index, export, and import operations (e.g., `GoogleFirestoreAdminV1beta1IndexOperationMetadata`, `GoogleFirestoreAdminV1beta1ExportDocumentsMetadata`, `GoogleFirestoreAdminV1beta2FieldOperationMetadata`). (853 new lines)
  - File: [firestore_v1.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore_v1.json#L1)

### Cloud Genomics

- Added the new `ContainerKilledEvent` message to Genomics `v1`, `v1alpha2`, and `v2alpha1` API definitions.
  - File: [genomics_v1_messages.py:447](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L447)
- Added the new `Expr` message type to the Genomics `v1` API, used for defining conditions in IAM bindings.
  - File: [genomics_v1_messages.py:740](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L740)
- The `Action` message in the Genomics `v2alpha1` API now includes a `timeout` field.
  - File: [genomics_v2alpha1_messages.py:249](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v2alpha1/genomics_v2alpha1_messages.py#L249)
- Field order in the `Binding` message for Genomics `v1` API was adjusted, and a `condition` field was added.
  - File: [genomics_v1_messages.py:257](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L257)
- Extensive rephrasing and formatting updates (e.g., using backticks for code elements like `--flag-name`) were applied across various message descriptions in Genomics `v1`, `v1alpha2`, and `v2alpha1` APIs for improved clarity and consistency.
  - File: [genomics_v2alpha1_messages.py:17](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v2alpha1/genomics_v2alpha1_messages.py#L17)

### Cloud Genomics (v1)

- The `Binding` object in `genomics_v1.json` now includes a `condition` field (referencing the new `Expr` message type) to support IAM policy conditions. A new `Expr` message type is also defined.
  - File: [genomics_v1.json:767](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v1.json#L767)
- Added the `ContainerKilledEvent` message type to `genomics_v1.json`.
  - File: [genomics_v1.json:2316](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v1.json#L2316)

### Cloud Genomics (v1alpha2)

- Added the `ContainerKilledEvent` message type to `genomics_v1alpha2.json`.
  - File: [genomics_v1alpha2.json:806](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v1alpha2.json#L806)

### Cloud Genomics (v2alpha1)

- The `Action` message in `genomics_v2alpha1.json` now includes a new `timeout` field with type `google-duration`.
  - File: [genomics_v2alpha1.json:338](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v2alpha1.json#L338)
- Added the `ContainerKilledEvent` message type to `genomics_v2alpha1.json`.
  - File: [genomics_v2alpha1.json:728](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v2alpha1.json#L728)

### Cloud IAM (v1)

- Added the `LintPolicy` method to `iam_v1_client.py` and defined the `iam.iamPolicies.lintPolicy` API endpoint for linting IAM policies.
  - File: [iam_v1_client.py:55](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/iam/v1/iam_v1_client.py#L55)

### Identity and Access Management

- Added an 'unimplemented' `condition` field (referencing the new `Expr` message type) to `Binding` and `BindingDelta` messages, and re-indexed existing fields. This lays groundwork for IAM Policy Conditions.
  - File: [iam_v1_messages.py:109](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/iam/v1/iam_v1_messages.py#L109)
- Added a new `Expr` message type to define expression text for conditions.
  - File: [iam_v1_messages.py:263](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/iam/v1/iam_v1_messages.py#L263)

### Cloud Logging

- Updated the description for the `MetricDescriptor` `type` field to explicitly include `external.googleapis.com` as a valid DNS name prefix for user-defined metric types, with an example for Prometheus metrics.
  - File: [logging_v2_messages.py:2390](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/logging/v2/logging_v2_messages.py#L2390)

### Cloud ML Engine

- Added an 'unimplemented' `condition` field (referencing the new `GoogleTypeExpr` message) to `GoogleIamV1Binding`, and re-indexed existing fields. This lays groundwork for IAM Policy Conditions.
  - File: [ml_v1_messages.py:1352](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/ml/v1/ml_v1_messages.py#L1352)
- Added a new `GoogleTypeExpr` message type to define expression text for conditions.
  - File: [ml_v1_messages.py:1665](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/ml/v1/ml_v1_messages.py#L1665)

### Cloud Pub/Sub

- Relaxed the message payload requirements for `Publish` operations, removing the strict constraint that the message payload must not be empty.
  - File: [pubsub_v1_client.py:973](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/pubsub/v1/pubsub_v1_client.py#L973)
- Added an 'unimplemented' `condition` field (referencing the new `Expr` message type) to `Binding`, and re-indexed existing fields. This lays groundwork for IAM Policy Conditions.
  - File: [pubsub_v1_messages.py:29](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/pubsub/v1/pubsub_v1_messages.py#L29)
- Added a new `Expr` message type to define expression text for conditions.
  - File: [pubsub_v1_messages.py:115](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/pubsub/v1/pubsub_v1_messages.py#L115)
- Clarified the description for `PubsubMessage` and its `data` field, noting that `data` can be empty if at least one attribute is present.
  - File: [pubsub_v1_messages.py:296](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/pubsub/v1/pubsub_v1_messages.py#L296)

### Service Management

- Updated the description for the `MetricDescriptor` `type` field to explicitly include `external.googleapis.com` as a valid DNS name prefix for user-defined metric types, with an example for Prometheus metrics.
  - File: [servicemanagement_v1_messages.py:1888](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicemanagement/v1/servicemanagement_v1_messages.py#L1888)

### Service Networking

- Updated the description for the `MetricDescriptor` `type` field to explicitly include `external.googleapis.com` as a valid DNS name prefix for user-defined metric types, with an example for Prometheus metrics.
  - File: [servicenetworking_v1alpha_messages.py:1154](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/servicenetworking/v1alpha/servicenetworking_v1alpha_messages.py#L1154)

### Service Usage

- Updated the description for the `MetricDescriptor` `type` field to explicitly include `external.googleapis.com` as a valid DNS name prefix for user-defined metric types, with an example for Prometheus metrics.
  - File: [serviceuser_v1_messages.py:1064](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/serviceuser/v1/serviceuser_v1_messages.py#L1064)

### Cloud Storage

- Clarified the description for the `Patch` method on buckets by removing redundant text about patch semantics.
  - File: [storage_v1_client.py:378](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/storage/v1/storage_v1_client.py#L378)

### Cloud Tool Results

- Added new `TestIssue.CategoryValueValuesEnum` values: `availableDeepLinks` and `nonSdkApiUsageViolation`, expanding the types of test issues that can be reported.
  - File: [toolresults_v1beta3_messages.py:1276](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/toolresults/v1beta3/toolresults_v1beta3_messages.py#L1276)

## Unannounced Changes

*Changes found in code but not mentioned in official release notes:* 🕵️

### Groundwork

- Added `entrypoint` processing in `AppengineApiClient` to handle and remove an `exec ` prefix for deployment, likely for App Engine Flex.
  - File: [appengine_api_client.py:641](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/app/appengine_api_client.py#L641)
- Implemented `GetDegradedWarning` in `V1Adapter` and `V1Alpha1Adapter` to provide more specific degraded cluster warnings based on cluster conditions.
  - File: [api_adapter.py:1511](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/container/api_adapter.py#L1511)
- Added new API client and utility functions for `kubernetespolicy/v1alpha1` service, enabling `Create`, `Delete`, `Get`, and `List` operations for Kubernetes Namespaces.
  - File: [policy_api.py:20](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/container/policy/namespaces/policy_api.py#L20)
- Added `TEST_NOT_APP_HOSTED` error handling for invalid `.xctestrun` files in Firebase Test Lab.
  - File: [tool_results.py:162](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/firebase/test/tool_results.py#L162)
- Imported `OrderedDict` and used it in `DiscoveryDoc.FromJson` to preserve key order when loading JSON discovery documents, a minor internal tooling change.
  - File: [resource_generator.py:15](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/regen/resource_generator.py#L15)
- Performed a major refactoring and additions to `multitype.py`, introducing `MultitypeResourceSpec` and complex logic for parsing and resolving polymorphic resource concepts.
  - File: [multitype.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/concepts/multitype.py#L18)
- Added `__pycache__` to the default `.gcloudignore` for Python App Engine standard environment applications.
  - File: [source_files_util.py:44](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/app/source_files_util.py#L44)
- Refactored `AddCycleFrequencyArgs` to introduce a `supports_weekly` parameter and conditional group naming, indicating enhancements to resource policy cycle frequency definitions.
  - File: [flags.py:34](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/resource_policies/flags.py#L34)
- Made significant additions to the Cloud KMS API client and messages (v1), along with new command library utilities (`get_digest.py`, `maps.py`), indicating expanded KMS functionality.
  - File: [cloudkms_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudkms/v1/cloudkms_v1_messages.py)
- Empty `__init__.py` files were added for `container/policy` and `container/policy/namespaces`, laying groundwork for new command groups related to container policy.
  - File: [__init__.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/policy/__init__.py#L1)
- New module `kms/get_digest.py` was added, containing utility functions like `GetDigest` for calculating cryptographic digests (SHA256, SHA384, SHA512) of files, which is essential for KMS signing operations.
  - File: [get_digest.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/kms/get_digest.py#L1)
- New module `kms/maps.py` was added, providing mappings for Cloud KMS algorithms, key purposes (`encryption`, `asymmetric-signing`, `asymmetric-encryption`), and protection levels (`software`, `hsm`), facilitating the integration of new KMS features.
  - File: [maps.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/kms/maps.py#L1)
- New module `command_lib/util/glob.py` was created to centralize generalized globbing and ignore file parsing logic, including `Glob` class and helper functions (`_HandleSpaces`, `_Unescape`, `GetPathPrefixes`), previously embedded in `gcloudignore.py`.
  - File: [glob.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/glob.py#L1)
- New module `googlecloudsdk/core/console/multiline.py` was added, providing a framework (`SimpleSuffixConsoleOutput`, `SuffixConsoleMessage`) for managing and updating multiline console output with suffixes and indentation, likely for advanced interactive progress indicators.
  - File: [multiline.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/core/console/multiline.py#L1)
- Added an internal property (`monitoring`) for overriding Cloud Monitoring API endpoints, indicating groundwork for future monitoring features.
  - File: [properties.py:1442](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/core/properties.py#L1442)
- Extensive groundwork for new Compute Engine security policies has been added, including new API definitions for `SecurityPolicy`, `SecurityPolicyList`, `SecurityPolicyReference`, `SecurityPolicyRule`, `SecurityPolicyRuleMatcher`, and `SecurityPolicyRuleMatcherConfig` objects, and methods for managing them.
  - File: [compute_v1.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_v1.json)
- Groundwork for managed SSL certificates in Compute Engine beta API is introduced via new API definitions for `SslCertificateManagedSslCertificate` and `SslCertificateSelfManagedSslCertificate` objects.
  - File: [compute_beta.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute_beta.json)
- Groundwork for IAM Conditions in Dataproc is introduced with the new `Expr` class and the `condition` field in the `Binding` resource.
  - File: [dataproc_v1beta2_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/dataproc/v1beta2/dataproc_v1beta2_messages.py)
- Added `_CLIENT_ID` and `_CLIENT_SECRET` attributes to the generated `FirestoreV1` client.
  - File: [firestore_v1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1/firestore_v1_client.py)
- Added `_CLIENT_ID` and `_CLIENT_SECRET` attributes to the generated `FirestoreV1beta1` client.
  - File: [firestore_v1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/firestore_v1beta1_client.py)
- Added new package markers `__init__.py` files for `firestore` and its `v1` and `v1beta1` subdirectories, preparing for the new API integration.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/__init__.py)
- New generated message classes (`firestore_v1_messages.py`) and resource definitions (`resources.py`) for the Cloud Firestore v1 API client have been added, laying the groundwork for v1 command-line interface features.
  - File: [firestore_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1/firestore_v1_messages.py)
- The full `firestore_v1beta1_client.py` file was added, providing programmatic access to the Firestore v1beta1 API, including client classes and methods for managing Firestore documents and indexes, as well as export/import operations. This is foundational for supporting Firestore v1beta1 commands in the SDK.
  - File: [firestore_v1beta1_client.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/firestore_v1beta1_client.py)
- The new `FirestoreV1beta1` client defines API access scopes (`_SCOPES`) including `https://www.googleapis.com/auth/cloud-platform` and `https://www.googleapis.com/auth/datastore`.
  - File: [firestore_v1beta1_client.py:17](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/firestore_v1beta1_client.py#L17)
- Complete addition of the Cloud Firestore `v1beta1` API client library (message classes, resource definitions) and the `v1` Firestore Admin API Discovery JSON, laying the groundwork for full Cloud Firestore support in the SDK. This is a significant internal addition not covered by official release notes.
  - File: [firestore_v1beta1_messages.py:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/firestore_v1beta1_messages.py#L1)
- New `v1beta1` API definitions for Cloud Firestore were added, including index administration capabilities.
  - File: [firestore_v1beta1.json:1](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore_v1beta1.json#L1)
- A new `ContainerKilledEvent` message was introduced in the Cloud Genomics APIs (`v1`, `v1alpha2`, `v2alpha1`) for tracking forcibly terminated containers.
  - File: [genomics_v1_messages.py:447](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L447)
- Groundwork for conditional IAM policies in Cloud Genomics `v1` API was laid by adding a `condition` field to the `Binding` message and introducing the `Expr` message type.
  - File: [genomics_v1_messages.py:240](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v1/genomics_v1_messages.py#L240)
- Added resource path definitions for `projects` and `projects.indexes` for the `datastore/v1` API in the API generation configuration.
  - File: [regen_apis_config.yaml:260](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L260)
- Added configuration entries for `firestore/v1beta1` (marked as default) and `firestore/v1` APIs, enabling their generation within the SDK.
  - File: [regen_apis_config.yaml:290](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/regen_apis_config.yaml#L290)

### Refactoring

- Removed resource registry entries for `compute.hosts` and `compute.hostTypes`, likely a refactoring related to `sole-tenancy` commands promotion.
  - File: [base_classes_resource_registry.py:182](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/base_classes_resource_registry.py#L182)
- Updated a prompt message in `daisy_utils.py` from 'Google Cloud Container Builder service' to 'Google Cloud Build service', reflecting rebranding.
  - File: [daisy_utils.py:83](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/compute/daisy_utils.py#L83)
- Removed redundant `Http()` helper function from `api_lib/container/images/util.py`, now directly using `http.Http()` for transport.
  - File: [util.py:31](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/container/images/util.py#L31)
- Improved `PrintWorkflowMetadata` in Dataproc to correctly handle workflow templates, including those instantiated inline without explicit IDs.
  - File: [util.py:195](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/api_lib/dataproc/util.py#L195)
- Clarified the ALPHA release track description in `calliope/base.py` regarding API permission errors and early access requirements.
  - File: [base.py:84](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/base.py#L84)
- Added `IS_COMMAND_GROUP = True` and `IS_COMMAND = True` attributes to `Group` and `Command` base classes respectively for explicit identification.
  - File: [base.py:476](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/base.py#L476)
- Updated `_ImplementationsFromModule` to use the new `IS_COMMAND` and `IS_COMMAND_GROUP` attributes for identifying commands and groups, improving modularity.
  - File: [command_loading.py:458](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/command_loading.py#L458)
- Refined the regex in `MarkdownGenerator` for processing quoted strings, affecting how user input is rendered in markdown.
  - File: [markdown.py:783](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/calliope/markdown.py#L783)
- Added `from __future__` imports to `container/constants.py` for Python 2/3 compatibility.
  - File: [constants.py:15](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/constants.py#L15)
- Removed `.encode('utf8')` when writing instances to `stdin` in `ml_engine/local_utils.py`, likely a Python 2/3 compatibility fix or adjustment to `stdin`'s expected input type.
  - File: [local_utils.py:92](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/ml_engine/local_utils.py#L92)
- Added `property: spanner/instance` to the instance attribute in `spanner/resources.yaml` for better integration with core properties, and renamed the internal YAML anchor from `&repository` to `&database` for clarity.
  - File: [resources.yaml:18](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/spanner/resources.yaml#L18)
- Refactored concept parsing logic in `command_lib/util/concepts/info_holders.py` by introducing `_IsPluralArg` to improve how plural arguments are handled for resource arguments.
  - File: [info_holders.py:267](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/info_holders.py#L267)
- Major refactoring of `command_lib/util/concepts/presentation_specs.py`, renaming `MultitypeConceptPresentationSpec` to `MultitypeResourcePresentationSpec` and updating `GetFlagName` to prioritize the presentation name for anchor flags, improving flag generation logic for multitype resource arguments.
  - File: [presentation_specs.py:210](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/concepts/presentation_specs.py#L210)
- Extensive refactoring of the ignore file parsing logic: `command_lib/util/gcloudignore.py` now delegates core glob matching, space handling, and unescaping to a new dedicated `command_lib/util/glob.py` module, simplifying the `gcloudignore` implementation.
  - File: [gcloudignore.py:17](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/util/gcloudignore.py#L17)
- Introduced a `_display_width_cache` in `googlecloudsdk/core/console/console_attr.py` and implemented caching for `DisplayWidth` calculations, optimizing performance for console output.
  - File: [console_attr.py:279](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/core/console/console_attr.py#L279)
- Significant refactoring of the SDK's progress tracking logic, introducing `_BaseProgressTracker`, `_NormalProgressTracker`, and `_NonInteractiveProgressTracker` classes, along with integration of a new `multiline` module for improved console output in interactive and non-interactive environments.
  - File: [progress_tracker.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/core/console/progress_tracker.py)
- Internal refactoring in `session_capturer.py` to use `io.open` instead of `builtins.open` for file operations, likely for improved compatibility.
  - File: [session_capturer.py:118](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/core/resource/session_capturer.py#L118)
- Updated numerous App Engine documentation URLs within `AppEngineHttpTarget` and `AppEngineRouting` descriptions from relative paths to absolute `https://cloud.google.com/appengine/docs/...` URLs.
  - File: [cloudscheduler_v1alpha1_messages.py:44](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudscheduler/v1alpha1/cloudscheduler_v1alpha1_messages.py#L44)
- The `PubsubMessage` description was clarified from 'payload must not be empty' to 'message must contain either a non-empty data field or at least one attribute'.
  - File: [cloudscheduler_v1alpha1_messages.py:625](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudscheduler/v1alpha1/cloudscheduler_v1alpha1_messages.py#L625)
- The `DOCS_URL` for Cloud Scheduler was updated from `https://cloud.google.com/cloud-scheduler/` to `https://cloud.google.com/scheduler/`.
  - File: [resources.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudscheduler/v1alpha1/resources.py#L18)
- Updated numerous documentation links across Cloud Scheduler and Cloud Tasks API definitions from relative paths (e.g., `/appengine/docs/...`) to absolute HTTPS URLs (e.g., `https://cloud.google.com/appengine/docs/...`). This impacts `cloudscheduler_v1alpha1.json`, `cloudtasks/v2beta2/cloudtasks_v2beta2_client.py`, and `cloudtasks/v2beta2/cloudtasks_v2beta2_messages.py`.
  - File: [cloudscheduler_v1alpha1.json:14](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudscheduler_v1alpha1.json#L14)
- Minor rewording in `AppEngineRouting` descriptions for `service`, `version`, and `instance` in `cloudscheduler_v1alpha1.json`.
  - File: [cloudscheduler_v1alpha1.json:319](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudscheduler_v1alpha1.json#L319)
- Minor rewording and clarification in `PubsubMessage` and `PubsubMessage.data` descriptions in `cloudscheduler_v1alpha1.json`.
  - File: [cloudscheduler_v1alpha1.json:477](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudscheduler_v1alpha1.json#L477)
- Removed specific API object links from task size descriptions in `cloudtasks/v2beta2/cloudtasks_v2beta2_client.py`, simplifying the text.
  - File: [cloudtasks_v2beta2_client.py:126](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_client.py#L126)
- Changed HTTP method enum values from `HTTP Post`, `HTTP Get`, etc., to `HTTP POST`, `HTTP GET`, etc. (uppercase) in `AppEngineHttpRequest.HttpMethodValueValuesEnum`.
  - File: [cloudtasks_v2beta2_messages.py:156](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_messages.py#L156)
- Simplified descriptions for `TaskStatus.attemptResponseCount`, `TaskStatus.firstAttemptStatus`, and `TaskStatus.lastAttemptStatus` by replacing explicit API object references with 'pull tasks'.
  - File: [cloudtasks_v2beta2_messages.py:1746](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks/v2beta2/cloudtasks_v2beta2_messages.py#L1746)
- Numerous documentation links in the Cloud Tasks v2beta2 API definitions were updated from relative paths or non-HTTPS URLs to fully qualified `https://cloud.google.com` URLs, improving consistency and reliability of references.
  - File: [cloudtasks_v2beta2.json](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/cloudtasks_v2beta2.json)
- Minor punctuation update in the `nextPageToken` description.
  - File: [composer_v1.json:375](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer_v1.json#L375)
- Minor HTML tag update (from `<b>` to `<strong>`) within the `updateMask` description for the Composer v1 API.
  - File: [composer_v1.json:704](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer_v1.json#L704)
- Minor formatting change: added a newline at the end of `composer_v1.json` and `composer_v1beta1.json`.
  - File: [composer_v1.json:757](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/composer_v1.json#L757)
- Updated the description for the `licenses` field in the `Disk` message in both `compute/beta` and `compute/v1` APIs for clarity.
- Fixed a markdown rendering tag (`code>`) in the description for the `minimalAction` field in `InstanceGroupManagerUpdatePolicy` in `compute/beta` messages.
  - File: [compute_beta_messages.py:20856](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L20856)
- Updated the resource comment for `SecurityPolicy` in `compute/beta` messages to reflect its availability in `v1.securityPolicies`.
  - File: [compute_beta_messages.py:31210](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/compute/beta/compute_beta_messages.py#L31210)
- Added a package marker file for `firestore/v1beta1` (`__init__.py`), indicating a restructuring or further modularization of the Firestore API definitions within the SDK.
  - File: [__init__.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1beta1/__init__.py)
- Numerous descriptions and formatting (e.g., consistent use of backticks for code elements) were updated across Cloud Genomics API message definitions to enhance clarity and consistency.
  - File: [genomics_v2alpha1_messages.py:17](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v2alpha1/genomics_v2alpha1_messages.py#L17)
- Numerous documentation and description string updates for improved clarity and consistent formatting across `genomics_v1.json`, `genomics_v1alpha2.json`, and `genomics_v2alpha1.json`.
  - File: [genomics_v1.json:2327](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v1.json#L2327)
- Updated the API revision date for `replicapoolupdater_v1beta1`.
  - File: [replicapoolupdater_v1beta1.json:4](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/replicapoolupdater_v1beta1.json#L4)
- Updated the API revision date for `sqladmin_v1beta4`.
  - File: [sqladmin_v1beta4.json:5](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/sqladmin_v1beta4.json#L5)
- Updated the API revision date for `storage_v1`.
  - File: [storage_v1.json:4](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/storage_v1.json#L4)
- Updated the API revision date for `toolresults_v1beta3`.
  - File: [toolresults_v1beta3.json:5](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/toolresults_v1beta3.json#L5)

### Other

- `MakeVmMaintenancePolicy` was modified to only configure `dailyMaintenanceWindow`, effectively removing `weeklyMaintenanceWindow` for VM maintenance policies.
  - File: [util.py:51](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/compute/resource_policies/util.py#L51)

### Hidden Feature

- Added full API definitions for `Firestore` (v1 and v1beta1), including new clients, messages, and resource definitions, indicating introduction of Firestore API support.
  - File: [firestore_v1_messages.py](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/firestore/v1/firestore_v1_messages.py)
- The `Action` message in Cloud Genomics `v2alpha1` API gained a `timeout` field to specify execution limits for pipeline actions.
  - File: [genomics_v2alpha1_messages.py:249](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics/v2alpha1/genomics_v2alpha1_messages.py#L249)
- Introduction of `Expr` message type and `condition` field in `google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v1.json` to support IAM policy conditions.
  - File: [genomics_v1.json:767](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v1.json#L767)
- Addition of `ContainerKilledEvent` message type in `google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v1.json`, `genomics_v1alpha2.json`, and `genomics_v2alpha1.json`.
  - File: [genomics_v1.json:2316](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v1.json#L2316)
- Addition of `timeout` field to `Action` message in `google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v2alpha1.json`.
  - File: [genomics_v2alpha1.json:338](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/genomics_v2alpha1.json#L338)
- New `LintPolicy` method added to `google-cloud-sdk/lib/googlecloudsdk/third_party/apis/iam/v1/iam_v1_client.py`.
  - File: [iam_v1_client.py:55](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/third_party/apis/iam/v1/iam_v1_client.py#L55)

### Other

- The `DEGRADED_WARNING` message in container commands was updated to be more specific, including `cluster_name` and `cluster_degraded_warning` placeholders.
  - File: [constants.py:18](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/constants.py#L18)
- The `AddEnableAutoRepairFlag` in container commands now includes more detailed help text for create operations, clarifying that node autorepair is enabled by default for node pools using COS as a base image.
  - File: [flags.py:619](https://github.com/twistedpair/google-cloud-sdk/blob/210.0.0/google-cloud-sdk/lib/googlecloudsdk/command_lib/container/flags.py#L619)

## Stats

- Files changed: {{< color "#fff" "#b45309" >}}155{{< /color >}}
- Inserted lines: {{< color "#fff" "#166534" >}}+20,417{{< /color >}}
- Deleted lines: {{< color "#fff" "#991b1b" >}}-10,929{{< /color >}}

---
*Generated by [Gemini](https://ai.google.dev/)*
*- [View full diff](https://github.com/twistedpair/google-cloud-sdk/compare/209.0.0...210.0.0)*

*Google, Google Cloud, and gcloud are trademarks of Google LLC. This analysis was automatically generated by an AI agent examining only public release artifacts, without access to internal or non-public information from Google Cloud.*