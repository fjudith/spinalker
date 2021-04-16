Container 1 : Build OCI image: spinal-browser-admin
===============================================================================================

docker.io/fjudith/spinal-browser-admin:3c77aac5506abae0b0887d9182132732b9e1fb13 (alpine 3.11.9)
HIGH ISSUE: 0
CRITICAL ISSUE: 0
===============================================================================================

usr/share/spinal-browser-admin/package-lock.json
HIGH ISSUE: 0
CRITICAL ISSUE: 1


+---------+------------------+----------+-------------------+---------------+---------------------------------------+
| LIBRARY | VULNERABILITY ID | SEVERITY | INSTALLED VERSION | FIXED VERSION |                 TITLE                 |
+---------+------------------+----------+-------------------+---------------+---------------------------------------+
| extend  | CVE-2018-16492   | CRITICAL | 1.3.0             | 2.0.2, 3.0.2  | nodejs-extend: Prototype              |
|         |                  |          |                   |               | pollution can allow attackers         |
|         |                  |          |                   |               | to modify object properties           |
|         |                  |          |                   |               | -->avd.aquasec.com/nvd/cve-2018-16492 |
+---------+------------------+----------+-------------------+---------------+---------------------------------------+

===============================================================================================

usr/share/spinal-core-system/package-lock.json
HIGH ISSUE: 0
CRITICAL ISSUE: 0

