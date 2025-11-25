---
title: "Building a Home Lab Kubernetes Cluster: K3s Over Tailscale with n8n as the First Workload"
date: 2025-11-24
---

# Building a Home Lab Kubernetes Cluster: K3s Over Tailscale with n8n as the First Workload

I've been meaning to get a proper Kubernetes cluster running in my home lab for a while. Not for resume padding—I wanted something real running on real hardware that I could access from anywhere. This article details how I set up a two-node K3s cluster communicating over Tailscale, with n8n as the first production workload.

## The Challenge of Home Lab Networking

Running Kubernetes at home comes with networking headaches that cloud providers abstract away:

- Nodes on a home network with dynamic IPs
- No easy way to access services remotely without exposing ports
- VPNs that require manual configuration and maintenance
- The classic "works on my local network but not from my laptop at a coffee shop" problem

I wanted a cluster I could manage from my MacBook whether I was at home, at work, or traveling—without poking holes in my firewall or dealing with dynamic DNS.

## Enter K3s and Tailscale

K3s is a lightweight Kubernetes distribution that runs well on low-power hardware. Tailscale creates a mesh VPN that assigns stable IPs to every device. Combined, they solve the networking problem elegantly:

- Each node gets a static Tailscale IP
- Nodes communicate over the encrypted Tailscale network
- I can access the cluster from any device on my tailnet
- No firewall rules, no port forwarding, no dynamic DNS

For the workload, I chose n8n—an open-source workflow automation platform. It's useful (I'm building a job search automation agent), and it exercises enough of the cluster to validate the setup.

## Setting Up the Cluster

The hardware: two Intel NUCs (neko and neko2), each with 16GB DDR5, running Ubuntu Server 24.04 LTS.

### Step 1: Installing Tailscale on Both Nodes

Both NUCs already had Tailscale installed and connected to my tailnet. I grabbed their Tailscale IPs:

```bash
# On neko
tailscale ip -4
# 100.77.170.18

# On neko2
tailscale ip -4
# 100.106.35.14
```

### Step 2: Installing K3s Server on the Control Plane

On neko, I installed K3s configured to use the Tailscale interface:

```bash
curl -sfL https://get.k3s.io | sh -s - server \
  --node-ip=100.77.170.18 \
  --advertise-address=100.77.170.18 \
  --flannel-iface=tailscale0 \
  --tls-san=100.77.170.18 \
  --tls-san=neko
```

Key flags:
- `--node-ip` and `--advertise-address`: Tell K3s to use the Tailscale IP
- `--flannel-iface=tailscale0`: Route pod network traffic over Tailscale
- `--tls-san`: Add the Tailscale IP to the API server certificate

After about 30 seconds:

```bash
sudo kubectl get nodes
# NAME   STATUS   ROLES                  AGE   VERSION
# neko   Ready    control-plane,master   1m    v1.33.6+k3s1
```

### Step 3: Joining the Worker Node

I grabbed the join token from neko:

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

Then on neko2:

```bash
curl -sfL https://get.k3s.io | sh -s - agent \
  --server=https://100.77.170.18:6443 \
  --token=<TOKEN> \
  --node-ip=100.106.35.14 \
  --flannel-iface=tailscale0
```

Within seconds:

```bash
sudo kubectl get nodes
# NAME    STATUS   ROLES                  AGE   VERSION
# neko    Ready    control-plane,master   2m    v1.33.6+k3s1
# neko2   Ready    <none>                 30s   v1.33.6+k3s1
```

Two-node cluster, communicating entirely over Tailscale.

### Step 4: Deploying n8n

I created a manifest for n8n with persistent storage:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: n8n
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: n8n-data
  namespace: n8n
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: n8n
  namespace: n8n
spec:
  replicas: 1
  selector:
    matchLabels:
      app: n8n
  template:
    metadata:
      labels:
        app: n8n
    spec:
      containers:
        - name: n8n
          image: n8nio/n8n
          ports:
            - containerPort: 5678
          env:
            - name: N8N_HOST
              value: "neko.tailac415d.ts.net"
            - name: N8N_PORT
              value: "5678"
            - name: N8N_PROTOCOL
              value: "https"
            - name: WEBHOOK_URL
              value: "https://neko.tailac415d.ts.net/"
            - name: N8N_SECURE_COOKIE
              value: "false"
            - name: GENERIC_TIMEZONE
              value: "America/New_York"
            - name: N8N_RUNNERS_ENABLED
              value: "true"
            - name: DB_SQLITE_POOL_SIZE
              value: "2"
          volumeMounts:
            - name: data
              mountPath: /home/node/.n8n
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: n8n-data
---
apiVersion: v1
kind: Service
metadata:
  name: n8n-web
  namespace: n8n
spec:
  type: NodePort
  selector:
    app: n8n
  ports:
    - port: 5678
      targetPort: 5678
      nodePort: 30678
```

One gotcha: I originally named the service `n8n`, but Kubernetes automatically creates environment variables for services (like `N8N_PORT`). This collided with n8n's own config, causing it to fail with `Invalid number value for N8N_PORT: tcp://10.43.x.x:5678`. Renaming the service to `n8n-web` fixed it.

### Step 5: Exposing via Tailscale Serve

Rather than dealing with HTTP and browser security warnings, I used Tailscale Serve to get automatic HTTPS:

```bash
tailscale serve --bg 30678
```

This exposes the NodePort service at `https://neko.tailac415d.ts.net` with a valid certificate, accessible from any device on my tailnet.

## The Result

n8n is now running on my home lab cluster, accessible from my MacBook, phone, or any other device on my Tailscale network. The URL `https://neko.tailac415d.ts.net` just works—no VPN client to connect, no firewall rules to maintain.

From my laptop at a coffee shop, I can:

```bash
# Check cluster status
ssh jasen@neko sudo kubectl get pods -n n8n

# Or just open the n8n UI
open https://neko.tailac415d.ts.net
```

## Benefits Realized

- **Zero Network Configuration**: No port forwarding, no dynamic DNS, no firewall rules
- **Secure by Default**: All traffic encrypted via Tailscale; HTTPS via Tailscale Serve
- **Access From Anywhere**: Same experience whether I'm home or remote
- **Real Kubernetes**: Not a local dev cluster—actual multi-node scheduling and networking
- **Low Power**: Two NUCs sip power compared to enterprise hardware

## Challenges and Solutions

**Flannel Interface Selection**: K3s defaults to using the primary network interface. Without `--flannel-iface=tailscale0`, pod networking broke across nodes.

*Solution*: Explicitly specify the Tailscale interface during installation.

**Service Name Collision**: Kubernetes service environment variables collided with n8n's expected config.

*Solution*: Don't name services the same as the app's env var prefix. `n8n-web` instead of `n8n`.

**HTTP vs HTTPS**: n8n's frontend makes API calls that fail when served over HTTP from a non-localhost origin.

*Solution*: Tailscale Serve provides automatic HTTPS with valid certificates.

**Env Var Propagation**: Changed environment variables weren't picked up by running pods.

*Solution*: Delete the pod (not just restart the deployment) to ensure fresh environment variable injection.

## What's Next

With the cluster running and n8n deployed, I'm building a job search automation agent:

- Scheduled scraping of job boards
- LLM-powered scoring against my profile
- Approval queue before applying
- Status tracking through the pipeline

The n8n workflow will orchestrate this, with Claude API calls for the intelligent bits. But that's a post for another day.

## Conclusion

K3s over Tailscale turned out to be an excellent combination for home lab Kubernetes. The networking just works, access from anywhere is built in, and the resource footprint is minimal.

If you've been putting off setting up a home cluster because of networking complexity, this approach removes most of the friction. Two commands to install K3s, one command for Tailscale Serve, and you have a production-ready cluster accessible from anywhere.

The NUCs are humming quietly in my closet, running real workloads, and I can manage them from anywhere in the world. That's exactly what I wanted.