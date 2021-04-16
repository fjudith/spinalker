# Container 1 : Browser Container Images

### Dernier Build : Build OCI image: spinal-browser-admin

docker.io/fjudith/spinal-browser-admin:3c77aac5506abae0b0887d9182132732b9e1fb13 (alpine 3.11.9)
============================================================================================================

Total: 0 (HIGH: 0, CRITICAL: 0)

usr/share/spinal-browser-admin/package-lock.json
============================================================================================================

Total: 0 (HIGH: 0, CRITICAL: 1)

| LIBRARY | VULNERABILITY ID | SEVERITY | INSTALLED VERSION | FIXED VERSION |                 TITLE                 |
----------|------------------|----------|-------------------|---------------|---------------------------------------|
| extend  | CVE-2018-16492   | CRITICAL | 1.3.0             | 2.0.2, 3.0.2  | nodejs-extend: Prototype              |
|         |                  |          |                   |               | pollution can allow attackers         |
|         |                  |          |                   |               | to modify object properties           |
|         |                  |          |                   |               | -->avd.aquasec.com/nvd/cve-2018-16492 |

usr/share/spinal-core-system/package-lock.json
============================================================================================================

Total: 0 (HIGH: 0, CRITICAL: 0)

Conteneur                | HIGH | CRITICAL
------------------------ |------|-------
Browser Container Images | 0    | 1

# Container 2 : Container Images (dynamic submodules)

### Dernier Build : Build OCI image: spinal-core-connectorjs

docker.io/fjudith/spinal-core-connectorjs:c5a00cbeb11996831d90aadfab1e10f2afbd410d (alpine 3.11.10)
===================================================================================================

Total: 0 (HIGH: 0, CRITICAL: 0)

usr/share/spinal-core-connectorjs/package-lock.json
===================================================

Total: 0 (HIGH: 0, CRITICAL: 0)

Conteneur                             | HIGH | CRITICAL
------------------------------------- |------|-------
Container Images (dynamic submodules) | 0    | 1

---

# Container 3 : Container Images (static submodules)

### Dernier Build : Build OCI image: spinal-http-server

docker.io/fjudith/spinal-http-server:c5a00cbeb11996831d90aadfab1e10f2afbd410d (alpine 3.11.7)
=============================================================================================

Total: 6 (HIGH: 6, CRITICAL: 0)

|   LIBRARY    | VULNERABILITY ID | SEVERITY | INSTALLED VERSION | FIXED VERSION |                 TITLE                 |
---------------|------------------|----------|-------------------|---------------|---------------------------------------|
| busybox      | CVE-2021-28831   | HIGH     | 1.31.1-r9         | 1.31.1-r10    | busybox: invalid free or segmentation |
|              |                  |          |                   |               | fault via malformed gzip data         |
|              |                  |          |                   |               | -->avd.aquasec.com/nvd/cve-2021-28831 |
|--------------|------------------|          |-------------------|---------------|---------------------------------------|
| libcrypto1.1 | CVE-2021-23840   |          | 1.1.1i-r0         | 1.1.1j-r0     | openssl: integer                      |
|              |                  |          |                   |               | overflow in CipherUpdate              |
|              |                  |          |                   |               | -->avd.aquasec.com/nvd/cve-2021-23840 |
|              |------------------|          |                   |---------------|---------------------------------------|
|              | CVE-2021-3450    |          |                   | 1.1.1k-r0     | openssl: CA certificate check         |
|              |                  |          |                   |               | bypass with X509_V_FLAG_X509_STRICT   |
|              |                  |          |                   |               | -->avd.aquasec.com/nvd/cve-2021-3450  |
|--------------|------------------|          |                   |---------------|---------------------------------------|
| libssl1.1    | CVE-2021-23840   |          |                   | 1.1.1j-r0     | openssl: integer                      |
|              |                  |          |                   |               | overflow in CipherUpdate              |
|              |                  |          |                   |               | -->avd.aquasec.com/nvd/cve-2021-23840 |
|              |------------------|          |                   |---------------|---------------------------------------|
|              | CVE-2021-3450    |          |                   | 1.1.1k-r0     | openssl: CA certificate check         |
|              |                  |          |                   |               | bypass with X509_V_FLAG_X509_STRICT   |
|              |                  |          |                   |               | -->avd.aquasec.com/nvd/cve-2021-3450  |
|--------------|------------------|          |-------------------|---------------|---------------------------------------|
| ssl_client   | CVE-2021-28831   |          | 1.31.1-r9         | 1.31.1-r10    | busybox: invalid free or segmentation |
|              |                  |          |                   |               | fault via malformed gzip data         |
|              |                  |          |                   |               | -->avd.aquasec.com/nvd/cve-2021-28831 |
|--------------|------------------|----------|-------------------|---------------|---------------------------------------|

usr/share/spinal-http-server/html/graph/package-lock.json
=========================================================

Total: 1 (HIGH: 1, CRITICAL: 0)

| LIBRARY | VULNERABILITY ID | SEVERITY | INSTALLED VERSION | FIXED VERSION |                 TITLE                 |
|---------|------------------|----------|-------------------|---------------|---------------------------------------|
| is-svg  | CVE-2021-28092   | HIGH     | 3.0.0             | 4.2.2         | nodejs-is-svg: ReDoS                  |
|         |                  |          |                   |               | via malicious string                  |
|         |                  |          |                   |               | -->avd.aquasec.com/nvd/cve-2021-28092 |
|---------|------------------|----------|-------------------|---------------|---------------------------------------|

Conteneur                             | HIGH | CRITICAL
------------------------------------- |------|-------
Container Images (static submodules)  | 0    | 1

---

# Container 4 : Env-Admin Container Images

### Dernier Build : Build OCI image: spinal-env-admin-panel-hub-status

docker.io/fjudith/spinal-env-admin-panel-hub-status:e6b13561b922edc4510ac2a345fb784c0a3fb75b (alpine 3.11.8)
============================================================================================================

Total: 0 (HIGH: 0, CRITICAL: 0)

usr/share/spinal-env-admin-panel-hub-status/package-lock.json
=============================================================

Total: 0 (HIGH: 0, CRITICAL: 0)

usr/share/spinal-env-drive-core/package-lock.json
=================================================

Total: 0 (HIGH: 0, CRITICAL: 0)

---

# Container 5: Env Admin Container Images

### Dernier Build : Build OCI image: spinal-env-admin-panel-hub-status

Error: buildx call failed with: error: failed to solve: rpc error: code = Unknown desc = failed to solve with frontend dockerfile.v0: failed to create LLB definition: dockerfile parse error line 5: WORKDIR requires exactly one argument

"piste d'investigation: revision du Dockerfile: regarder les arguments du WORDIR"
---

# Container 6 : Env-Viewer Container Images

### 1. Job : Build OCI image: spinal-env-viewer-context-geographic-service

docker.io/fjudith/spinal-env-viewer-context-geographic-service:e6b13561b922edc4510ac2a345fb784c0a3fb75b (alpine 3.11.8)
=======================================================================================================================
Total: 0 (HIGH: 0, CRITICAL: 0)

usr/share/spinal-env-viewer-context-geographic-service/package-lock.json
========================================================================
Total: 0 (HIGH: 0, CRITICAL: 0)

### 2. Job : Build OCI image: spinal-env-viewer-context-geographic-service

[test](#container-5:-env-admin-container-images)
