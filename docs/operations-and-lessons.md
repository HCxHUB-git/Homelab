# Operations and lessons

## Operating method

The lab is managed with an evidence-first loop:

1. Observe the management plane and establish the full inventory.
2. Inspect the affected guest, service, mount and dependency chain.
3. Form a narrow hypothesis.
4. Test without changing unrelated components.
5. Make the smallest reversible correction.
6. Verify service state and an application-level response.

This prevents a running container or green systemd unit from being mistaken for a healthy application.

## Case note: GPU availability after reboot

**Problem:** Jellyfin needs the Intel render device, and device ownership can differ after a host restart.

**Decision:** Pass only the required render device into the service LXC and run an idempotent pre-start ownership hook.

**Why:** The service remains isolated from the hypervisor while hardware transcoding avoids avoidable CPU load.

**Lesson:** The boot path is part of infrastructure correctness. A manual post-reboot fix is an undocumented dependency.

## Case note: application state on NFS

**Problem:** Media, cloud and photo datasets grow faster than small guest root disks and need a consistent storage owner.

**Decision:** Keep application runtimes in dedicated LXCs while mounting durable datasets from TrueNAS.

**Why:** Compute can be rebuilt or upgraded independently, and large data does not inflate every guest backup.

**Lesson:** External mounts must appear in the health model and the recovery plan. A guest archive does not automatically protect data outside its root filesystem.

## Case note: DNS database bloat

**Problem:** The Pi-hole root filesystem reached 80% usage. Logs and package caches were not large enough to explain it.

**Evidence:** The long-term query database was approximately 2.3 GiB. SQLite page accounting showed roughly 91% of its pages on the freelist: reusable internally, but not returned to the filesystem.

**Decision:** Do not delete history or run an unsafe in-place vacuum with insufficient temporary space. First identify a safe maintenance path: add temporary headroom, back up the database, stop the writer, compact, restart and verify DNS.

**Lesson:** Logical retention and physical compaction are separate controls. Maintenance operations themselves need capacity planning.

## Case note: backup confidence

**Problem:** A schedule in a UI proves intent, not recovery.

**Decision:** Verify the configured scope, recent task status, artifact presence and retention independently.

**Evidence:** The active Linux service guests were in scope, seven generations were present for sampled guests, and the recent task history showed successful completion.

**Lesson:** Recovery confidence still requires an application-aware restore drill and a copy outside the storage failure domain.

## Case note: separating integrity, history and recovery

**Problem:** RAID, snapshots and backups are often treated as interchangeable even though they address different failures.

**Evidence:** The storage pool was healthy RAIDZ1 with a clean completed scrub. Daily recursive snapshots, scheduled SMART tests and Proxmox guest archives were present, but no replication or cloud-sync task was configured.

**Decision:** Document each protection layer separately: RAIDZ1 for disk-failure tolerance, scrubs and SMART tests for media-health evidence, snapshots for local history, and guest archives for service recovery.

**Lesson:** None of those layers creates an independent disaster-recovery copy by itself. Recovery still needs restore testing, a separate failure domain and reviewed power protection.

## Current operations backlog

- Reclaim or expand constrained guest filesystems after attributing their consumers.
- Formalize a repeatable restore drill and record recovery time.
- Add an independent/off-site backup copy.
- Validate the storage load-balancing bond against upstream switch behavior and failure tests.
- Review dataset encryption and storage power protection.
- Define and test policy-enforced network segmentation.
- Review compatibility exceptions that require privileged or unconfined LXC settings.
