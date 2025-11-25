---
layout: home

hero:
  name: "Resume"
  text: Jasen Carroll
  tagline: Philadelphia, PA
  actions:
  - theme: brand
    text: Contact Me
    link: /contact
---

## Summary

Senior Quality Engineer with 10+ years in regulated environments, now specializing in backend systems, infrastructure automation, and production applications. I build scalable web platforms, self-hosted infrastructure, and resilient applications using modern tooling. I combine software engineering, data modeling, and systems thinking to deliver reliable solutions while maintaining quality standards.

## Education

### Degrees

* **M.S. Software Engineering** — *Quantic University* — *Anticipated 2026*
* **Executive M.B.A.** — *Quantic University* — *Oct 2023*
* **B.S. Mechanical Engineering** — *Drexel University* — *Jun 2012*

### Certificates

* **Data Science Foundations** — *Quantic University* — *Mar 2025*
* **Intermediate JavaScript** — *Udacity* — *Nov 2024*
* **Full Stack Nanodegree** — *Udacity* — *Nov 2015, re-cert Oct 2024*
* **Certified Software Quality Engineer** — *ASQ* — *Dec 2020 - Dec 2023*
* **Developing and Validating Software** — *AAMI* — *May 2019*

## Experience

### **Full-Stack Engineer** — *jasenc.dev* — Sep 2024 – Present

**Infrastructure & DevOps:**

* Deployed two-node K3s Kubernetes cluster on Intel NUCs over Tailscale mesh VPN, enabling secure remote access to self-hosted services from anywhere without exposing ports or configuring firewalls.
* Configured n8n workflow automation platform as first cluster workload with persistent storage, NodePort services, and HTTPS via Tailscale Serve.
* Architected and deployed local-first LLM infrastructure using Open WebUI + Ollama on bare metal Ubuntu. Self-hosted Microsoft Phi-4 with custom APIs for inference, reducing cloud AI costs by over 60%.
* Secured self-hosted infrastructure using Tailscale VPN with end-to-end encryption for private network deployment.

**Full-Stack Development:**

* Built [**Bun Stack**](https://bun-stack.jasenc.dev): a production-grade fullstack framework using Bun, React, and TypeScript with Drizzle ORM. Implemented SQLite fallback mechanism when PostgreSQL connections fail, ensuring zero downtime data access.
* Architected modern portfolio site using VitePress/Vue frontend with Go/Gin backend, featuring server-side rendering, automated CI/CD, and multi-platform deployment.
* Developed production-ready Flask microblogging platform with PostgreSQL backend, implementing database migrations, user authentication, and social features with comprehensive data modeling.
* Implemented full-text search capabilities using Elasticsearch for content discovery, relevance-based ranking, and fuzzy matching across large datasets.

**Machine Learning & Data:**

* Designed and deployed a K-means clustering-based recipe recommendation engine using Python, scikit-learn, and Streamlit. Optimized clustering using silhouette scoring and feature selection.
* Built full ML pipeline: data preprocessing, model training, containerized deployment with Docker to Railway. Achieved <1s latency under production load.
* Integrated PostgreSQL as backend for Open WebUI production environments, improving stability and scalability through optimized permissions and proper database configuration.

**Platform & CI/CD:**

* Implemented continuous delivery pipeline using Railway for feature branch deployments, maintaining always-deployable code and eliminating integration surprises.
* Migrated applications from Heroku to Railway, achieving 40% cost reduction while improving performance through usage-based pricing and faster container spin-up times.

### **Senior Quality Engineer** — *PCI* — Sep 2023 – Present

**Statistical Analysis & Data Validation:**

* Lead Quality Engineer for auto-injector sustainment and new product introduction for pharmaceutical accounts (Eli Lilly, Merck, GSK).
* Developed standard operating procedures for performing statistical techniques in calculating capability of critical-to-quality attributes.
* Implemented change controls for software solutions in dose accuracy calculation, including validation of computational models and oversight of automated scale solutions.

### **Quality Engineering & Validation** — *Various Companies* — 2012 – 2023

**Change Control & Corrective / Preventive Actions:**

* Managed cross-functional change control processes for manufacturing and quality systems, ensuring traceability and regulatory compliance.
* Led root cause analysis investigations using 8D methodology, reducing repeat deviations by 30% through systematic corrective action implementation.
* Coordinated CAPA activities across multiple product lines, maintaining FDA audit readiness and ensuring timely closure of quality events.

**Systems & Process Validation:**

* Managed validation of measurement systems and statistical tools for decision-making regarding sampling sizes and acceptance criteria.
* Led data gathering and analysis for various KPIs, reducing CAPA load from 150+ to 75 active items through systematic data-driven approaches.
* Performed risk-based validation planning for processes and software systems, ensuring data integrity and regulatory compliance.
* Specialized in parsing dense technical/regulatory documentation (FDA CFRs, ISO standards) and translating into validation procedures and SOPs.