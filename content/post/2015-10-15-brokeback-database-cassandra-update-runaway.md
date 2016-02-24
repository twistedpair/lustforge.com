---
draft: true
title: "Brokeback Database: Cassandra and Update Runaway"
author: Joe
layout: post
date: 2015-10-15
url: /2015/10/15/brokeback-database-cassandra-update-runaway/
tags:
  - Cassandra
  - Scala
---

use lyrics: love to you, on a red light overload...

Positive feedback (rapid insert, slow down, timeout (but async so continues), repeat attempt at insert leads to tombstone hotspots, slower still, all connections conumed, database essentially offline.
