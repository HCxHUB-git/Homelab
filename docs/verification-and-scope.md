# Verification and scope

## Discovery method

The source environment was inspected read-only from inside the homelab. The audit used:

- Proxmox API and CLI inventory;
- live Linux CPU, memory, block-device, mount and network state;
- per-LXC configuration and runtime probes;
- systemd service and listener state;
- Docker container state, health, images, published listeners and mount metadata;
- application health endpoints where available;
- Prometheus target health and Grafana health;
- Pi-hole configuration and read-only SQLite queries;
- WireGuard interface metadata without keys;
- backup job definitions, task outcomes and artifact listings;
- TrueNAS JSON-RPC queries authenticated with a read-only API key;
- OpenWrt SSH using a dedicated audit key and explicitly read-only commands.

The full running LXC set was enumerated from the management plane and reconciled one-for-one against guest evidence records. Stopped guests were not started or mounted for inspection.

## Verified directly

- Proxmox VE node count, guest inventory, resource assignments and runtime status
- Host CPU topology, memory, local NVMe, network controller and link speed
- LXC privilege/configuration flags and selected device/mount passthrough
- Docker workload inventory and health states
- NFS client mounts and capacities
- DNS/DHCP, VPN, reverse-proxy and application listeners
- Selected application health responses
- Monitoring target health
- Backup schedule, scope, retention, task status and stored artifacts
- TrueNAS system class, pool/vdev topology, pool health and scrub state
- Dataset properties, periodic snapshots, scrub and SMART-test schedules
- NFS/SMB service state, storage-network link aggregation and exporter applications
- Absence of configured replication, cloud-sync and rsync tasks at review time
- OpenWrt platform, physical link state, VLAN 100 and WAN/LAN interface architecture
- IPv4 default routing, inactive WAN IPv6 state and NAT/masquerading
- Firewall defaults, zones, forwarding relationships, traffic-rule shape and DNAT architecture
- Disabled OpenWrt LAN DHCP and Pi-hole DNS integration over IPv4 and IPv6
- Disabled OpenWrt Wi-Fi radios and absence of runtime wireless interfaces
- Dropbear, LuCI/uHTTPd, DNS listener scope, password-auth settings and UPnP state

## Inferred with supporting evidence

- The provider/optical handoff requires VLAN 100; the router verifies the tag and active SFP path but not provider-side equipment or policy.
- The media download client uses Gluetun as its VPN boundary based on container health, published listeners and workload layout; secret-bearing Compose configuration was not opened.
- Some services use NFS data through host bind mounts based on both Proxmox guest configuration and guest mount state.

## Not inspected or not verified

- Provider-side optical configuration
- Downstream switch forwarding, isolation and link-aggregation behavior
- External AP/controller SSIDs, VLANs and wireless policy
- External DNS records and public exposure from the internet
- Nginx Proxy Manager host rules and certificate inventory
- Secret-bearing Docker Compose files and environment variables
- WireGuard keys, peer endpoints and allowed-address policy
- Application user accounts, roles or MFA settings
- Database backup consistency
- End-to-end restore testing
- SMART self-test result history beyond the configured schedules
- Storage-network bond behavior at the upstream switch
- Power-loss recovery or UPS integration
- End-to-end internet-side exposure of router management and DNS listeners
- End-to-end WireGuard connectivity during the router-only phase
- Stopped guest operating systems

## Access needed to close the gaps

- Read-only access to any managed-switch or wireless-controller configuration
- Authenticated read-only access to Nginx Proxy Manager configuration
- Sanitized backup/restore run records, or authorization to execute a planned restore drill in an isolated target

No attempt was made to bypass authentication. The OpenWrt audit did not query SSIDs, Wi-Fi keys, WireGuard private/preshared/peer keys, endpoints, DHCP leases, credentials or secret-bearing network options. No guest, service, mount, router or infrastructure configuration was changed.
