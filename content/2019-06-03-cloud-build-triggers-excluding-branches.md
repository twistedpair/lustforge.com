---
draft: true
title: "High Performance GCS Access Log BigQuery Loader"
author: Joseph Lust
layout: post
date: 2019-06-03
url: /2019/06/03/cloud-build-triggers-excluding-branches/
summary: "Load millions of GCS Access Log entries into BigQuery for $0"
tags:
  - google-cloud-platform
  - serverless
  - cloud-build
  - cloud-functions
  - bigquery
---

TODO: track the slug

GCS[1] is a snap to use, so you store tons of files there. How then do you track what's in it, and who is accessing those files? GCS Access Logs are helpful, but you still need to load an grep through them, so it's best to place them somewhere that's easy to query.

# The Simple Way

One typical design is to:

1. Setup a logging policy on __every__ bucket
2. Point these logs to a common logging bucket
3. Setup a script for moving these to BigQuery[^101]

You can follow the [BigQuery log import docs][2] for a happy path example.

# The Production Way

Running CLI commands, or pulling files to your local machine and grepping them[^102] doesn't scale well, so we better automate this process. Salmaan Rashid has a [great example][3] of this using Python and [Cloud Functions][4].

However, this has it's limits when operating at scale.

# GCS Access Log Ingestion at Scale

What's _at scale_? At my [day job][5], we have ~5K GCS buckets. We make so many buckets that we run into the bucket creation limit[^104]. We also read and write _millions_ of objects per hour, so each hour we might have to load millions of log lines into BigQuery. This raises even more limitations you wouldn't normally encounter, like:

- [1K BigQuery load jobs][10] allowed per table/day
- [10K row load][11] limit per streaming insert/table

Since [BigQuery Streaming Inserts][12], and file loading have limitations, we need a hybrid approach:

- Stream smaller change sets, chunked to under 10K rows/request
- Use the file load API for large files (e.g. 100s of MiB)

That's exactly what this approach does:


# Configuring Logging @ Scale

To configure logging at scale, you need to do it automatically.

Unfortunately, the GCS [Java][6] and [NodeJs][9] SDKs don't have Logging Policy support[^103], so you can't easily enable logging from the same code that created the bucket. We _could_ use the [JSON API support][7], from a GCF, but we'd need a new bucket or infrastructure change notification, which isn't presently available.

As they say, "If you can't be event driven, write a cron job" 😔

# Link to Repo

# Show arch diagram

  [^101]: or ELK or [Cloud Logging](https://cloud.google.com/logging/docs/)
  [^102]: `grep` has it's limits, so try `ag`, the [silver searcher](https://github.com/ggreer/the_silver_searcher)
  [^103]: But [Python](https://googleapis.dev/python/storage/latest/buckets.html#google.cloud.storage.bucket.Bucket.enable_logging) does, and _gcloud_ is Python 🤔
  [^104]: Only 1 bucket may be created every 2 seconds [source](https://cloud.google.com/storage/quotas#buckets)

  [1]: https://cloud.google.com/storage/
  [2]: https://cloud.google.com/storage/docs/access-logs#loadBigQuery
  [3]: https://medium.com/google-cloud/google-container-registry-statistics-from-gcs-access-logs-3be705abc413
  [4]: https://cloud.google.com/functions/
  [5]: https://mabl.com
  [6]: https://cloud.google.com/storage/docs/reference/libraries
  [7]: https://cloud.google.com/functions/
  [8]: https://github.com/googleapis/google-cloud-python/tree/master/storage
  [9]: https://googleapis.dev/nodejs/storage/latest/Bucket.html
  [10]: https://cloud.google.com/bigquery/quotas#load_jobs
  [11]: https://cloud.google.com/bigquery/quotas#streaming_inserts
  [12]: https://cloud.google.com/bigquery/streaming-data-into-bigquery
