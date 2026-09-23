# Hardware and specifications

This page answers one question: *what physical equipment implements the HC x Hub architecture?* The architecture pages describe how the system works; brands and models live here.

All entries below come from the read-only audit (management-plane inventory, live Linux state, TrueNAS API, OpenWrt platform data) or from owner-supplied identification where noted. Missing specifications are left out rather than guessed.

## Edge router

- **Device:** Banana Pi BPI-R4 (ARM64, Mediatek Filogic target), owner-identified as the ISP-router replacement.
- **Software:** OpenWrt (snapshot release channel at review time), kernel 6.6.x.
- **Role:** routing, NAT, nftables firewall policy, WireGuard inbound DNAT.
- **Verified interfaces:** 10 GbE SFP WAN (subscriber VLAN 100, DHCP IPv4) and a separate 10 GbE SFP LAN uplink; three copper LAN ports present with no carrier at review time.
- **Wi-Fi:** radio profiles configured but all disabled — wireless is provided by the external access point below.

## Virtualization host

- **Device:** GEEKOM mini PC (owner-supplied model family); DMI/manufacturer strings were empty in the audit, so the chassis model is owner-identified.
- **CPU:** 13th Gen Intel Core i9-13900HK — 14 cores / 20 threads, up to 5.4 GHz, with Intel integrated graphics used for hardware-accelerated transcoding (Quick Sync).
- **Memory:** 32 GiB class (33,327,656,960 bytes reported by the host).
- **System storage:** 1 TB Kingston NVMe (OM8PGP41024N-A0) holding the Proxmox system filesystem, swap and an LVM-thin pool for guest disks.
- **Network:** one copper Ethernet interface bridged (vmbr0) for management and guest traffic; the audit recorded interface state but not a negotiated link speed for the host port.
- **Platform:** Proxmox VE 8.4 (single node), Linux kernel 6.8.x-pve.

## Storage server

- **Device:** TrueNAS SCALE appliance on TianBei "WTR PRO" hardware (owner-supplied chassis identification corroborated by system DMI data).
- **CPU / memory:** Intel N150, 4 cores; ~16 GiB RAM; non-ECC.
- **System device:** 512 GB ASint NVMe SSD (boot/system).
- **Data disks (RAIDZ1 vdev):** 4 × 8 TB 7200 RPM HDDs — 2 × WD Ultrastar-class (WD8003FFBX / WD8005FFBX) and 2 × Seagate IronWolf-class (ST8000VN004).
- **Network:** 2 × 2.5 GbE copper interfaces in a TrueNAS `LOADBALANCE` software bond (host-side configuration; no switch-side aggregation).
- **Software:** TrueNAS SCALE 25.04.x.

## Ethernet switch

- **Device:** UGREEN CM753 unmanaged switch (owner-supplied).
- **Role:** single downstream switching layer between the OpenWrt 10 GbE LAN uplink and the compute host, storage server, access point and other LAN clients.
- **Note:** unmanaged — no telemetry, VLAN or aggregation capability is available or claimed.

## Wireless access point

- **Device:** TP-Link Omada access point (owner-supplied), connected downstream of the switch.
- **Role:** all Wi-Fi client connectivity; the OpenWrt router's own radios are disabled.
- **Not verified:** SSIDs, radio policy, VLAN assignment and client isolation on the AP/controller.

## Specification summary

| Role | Device | Key verified capability |
|---|---|---|
| Edge router | Banana Pi BPI-R4 | OpenWrt · 10 GbE SFP WAN + LAN · VLAN 100 |
| Virtualization host | GEEKOM mini PC | i9-13900HK 14C/20T · 32 GiB · 1 TB NVMe · Intel iGPU |
| Storage server | TrueNAS (TianBei WTR PRO) | N150 · 4 × 8 TB RAIDZ1 · 2 × 2.5 GbE bond |
| Switch | UGREEN CM753 | unmanaged downstream switching |
| Access point | TP-Link Omada | all Wi-Fi clients |
