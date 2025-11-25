---
title: "Building a Home Lab Kubernetes Cluster: K3s Over Tailscale with n8n as the First Workload"
date: 2025-11-24
---

# Reviving a Realtek RTL8125 on Ubuntu: Keeping a MAAS Node Always Provisionable

During the rebuild of my MAAS lab node, I hit an unexpected blocker: Ubuntu installed cleanly, but the onboard Realtek RTL8125 2.5GbE NIC simply refused to come online. This article details how I diagnosed the issue end-to-end and built a repeatable process for ensuring the NIC would be fully functional and “always provisionable” in future installs.

---

## The Challenge of Invisible Hardware

When installing Ubuntu on this node, I had to rely on a USB-to-Ethernet adapter just to get the installer online. After boot, Ubuntu technically *saw* the Realtek NIC in `lspci`, but it didn’t behave like a working network device:

* No IPv4
* No link detected
* No autonegotiation
* Not present in any Netplan configuration
* And marked **DISABLED** by the OS

It was the hardware equivalent of a feature branch that “compiles” but crashes immediately — present in the tree, but not integrated.

Traditional debugging steps might involve:

1. Swapping cables
2. Checking switch ports
3. Removing and reinstalling Ubuntu
4. Hoping the kernel auto-detects the NIC on the next boot

This workflow leads to wasted time and no reliable method for the next install. I wanted a better approach.

---

## Enter the DKMS Driver and Declarative Networking

Bringing this NIC online required a true “full pipeline” approach:

1. Install the correct Realtek driver (r8125), not the generic r8169
2. Blacklist the wrong driver
3. Ensure Secure Boot doesn’t reject the module
4. Detect the active interface
5. Generate a Netplan configuration
6. Make the NIC usable on every reboot

This approach provided several immediate benefits:

* **Instant Feedback:** Once the right driver loaded, link status and speed became visible immediately
* **Always Provisionable:** The NIC became a persistent, MAAS-ready interface
* **Real Environment Testing:** I could test link training, DHCP, and PXE behavior on the actual hardware
* **Confidence Building:** Each reboot validated that the pipeline was correct and repeatable

---

## Setting Up the Pipeline

The process of enabling the RTL8125 ended up being surprisingly systematic once the steps were known.

### Step 1: Identifying the NIC

```bash
sudo lspci -nnk | grep -A3 -i eth
```

This confirmed the hardware was a Realtek RTL8125 using the wrong driver (`r8169`), making proper autonegotiation impossible.

### Step 2: Installing the Correct Driver

To fix this cleanly, I used the better-maintained DKMS package:

```bash
git clone https://github.com/awesometic/realtek-r8125-dkms
cd realtek-r8125-dkms
sudo ./dkms-install.sh
```

This installed, built, and signed the correct `r8125` module.

### Step 3: Handling Secure Boot

Because Secure Boot rejects unsigned modules, I enrolled the generated MOK:

```bash
sudo mokutil --import /var/lib/shim-signed/mok/MOK.der
```

After rebooting into the MOK manager and approving the key, the kernel trusted the driver.

### **Step 4: Blacklisting the Wrong Module**

```bash
echo "blacklist r8169" | sudo tee /etc/modprobe.d/blacklist-r8169.conf
sudo update-initramfs -u
```

This ensures Ubuntu never loads the generic driver again.

### Step 5: Creating a Persistent Netplan Configuration

Once the NIC could negotiate link, I created:

`/etc/netplan/01-enp1s0.yaml`

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp1s0:
      dhcp4: true
      dhcp6: true
```

Then:

```bash
sudo netplan generate
sudo netplan apply
```

With that, the NIC immediately pulled IPv4 via DHCP and became fully routable.

---

## The Debugging Workflow

Once the core pipeline was defined, the workflow became reliable:

1. Confirm Realtek RTL8125 is present in PCI
2. Install r8125 DKMS
3. Address Secure Boot
4. Blacklist r8169
5. Reload modules and verify link
6. Apply Netplan
7. Validate IPv4
8. Reboot and confirm persistence

This eliminated the “is this cable bad or is this driver bad?” guessing game.

---

## Benefits Realized

This layered approach paid off through the debugging process:

* **Eliminated PHY guesswork:** Once the right driver was loaded, link training behaved predictably
* **Shortened feedback loops:** Each change gave immediate visibility via `ethtool`
* **Consistent state across installs:** Future rebuilds could be automated using a script
* **Simplified MAAS integration:** PXE, DHCP, and commissioning worked immediately
* **Repeatable documentation:** The pipeline doubles as written evidence for future setups

---

## Challenges and Solutions

Like any infrastructure work, this process came with hurdles:

### Secure Boot Rejection

* *Challenge:* The kernel refused to load the driver
* *Solution:* Enroll DKMS-generated MOK using `mokutil`

### Incorrect Kernel Module

* *Challenge:* Ubuntu kept loading the wrong Realtek driver
* *Solution:* Blacklist `r8169` and regenerate initramfs

### Interface Not Managed by Netplan

* *Challenge:* Ubuntu Server didn’t auto-configure the NIC
* *Solution:* Create a declarative Netplan file for DHCP

### Reprovisioning in MAAS

* *Challenge:* MAAS wants a stable, predictable NIC
* *Solution:* The pipeline guarantees the interface comes up reliably on each boot

---

## Conclusion

Restoring the Realtek RTL8125 on Ubuntu turned out to be a miniature infrastructure pipeline: driver selection, module signing, kernel integration, networking configuration, and boot persistence all had to work in concert.

By treating the debugging journey as a repeatable system — much like a continuous delivery workflow — I ended up with a deterministic, scriptable method for keeping this MAAS node “always provisionable.”

And the next time I rebuild this machine, or buy a back-up node:

It’s just:

```bash
sudo ./fix-rtl8125.sh
```

Same confidence. Same reproducibility. Way less pain.
