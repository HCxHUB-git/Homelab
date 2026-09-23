# Homelab

A public, security-sanitized technical record of a homelab built around Proxmox VE, Linux containers, Docker, TrueNAS-backed NFS storage, private remote access, DNS, reverse proxying, monitoring and scheduled backups.

This repository documents the architecture, design decisions, operations, and lessons learned. It distinguishes verified evidence from assumptions. It is not a website repository.

The website is [temporarily hosted on GitHub Pages](https://hcxhub-git.github.io/homelab-website/) until a separate host is ready. Its source is maintained in a separate repository.

## Highlights

- Compact Proxmox VE host with an Intel hybrid-core CPU, 32 GiB memory class and NVMe storage
- Multiple Linux service containers and multi-container application stacks
- Dedicated service boundaries for DNS/DHCP, VPN access, reverse proxying, media, private cloud, photo management and observability
- Banana Pi R4/OpenWrt edge with a verified 10 GbE SFP WAN path, subscriber VLAN 100, DHCP IPv4, NAT and a 10 GbE LAN uplink
- Pi-hole as the verified LAN DNS/DHCP authority; OpenWrt Wi-Fi disabled in favor of an external managed AP
- Owner-supplied physical map: UGREEN CM753 unmanaged switch downstream of OpenWrt, with Proxmox/GEEKOM, TrueNAS, a TP-Link Omada AP and other clients attached
- External TrueNAS appliance with a verified four-disk RAIDZ1 pool, NFS/SMB sharing, recursive snapshots, scrubs and scheduled SMART tests
- TrueNAS uses two verified 2.5 GbE interfaces in a host-side `LOADBALANCE` software bond; no 5 Gb/s single-client or switch-side aggregation claim is made
- Prometheus and Grafana with verified healthy storage and disk-health telemetry targets
- Daily compressed guest snapshots with a seven-generation retention policy
- Intel graphics passthrough for hardware-accelerated media transcoding

## Documentation

- [Architecture](docs/architecture.md)
- [Compute and services](docs/compute-and-services.md)
- [Storage and backup](docs/storage-and-backup.md)
- [Networking and security](docs/networking-and-security.md)
- [Operations and lessons](docs/operations-and-lessons.md)
- [Hardware and specifications](docs/hardware.md)
- [Verification and scope](docs/verification-and-scope.md)

## Publication policy

This public version excludes credentials, keys, cookies, tokens, internal addresses, MAC addresses, host identifiers, exact routes, certificate material, storage export paths and secret-bearing configuration. Private read-only audit material is not included in this repository.

## Current limitations

- This documentation does not claim policy-enforced LAN segmentation.
- The current router policy has a flat LAN without service VLANs; management listeners and password-based root SSH remain broader than necessary even though WAN input is now reject-by-default.
- Backup artifacts and recent job success were verified; a restore drill was not.
- No independent replication, cloud-sync or off-site recovery copy was configured at review time.
- The TrueNAS storage-network bond is verified on the appliance, but upstream switch behavior is not.
- TrueNAS dataset encryption and active UPS integration were not present at review time.
- Internet-side router exposure, downstream switch behavior and external AP/controller policy were not tested.

No infrastructure was changed during discovery.
