# Ansible-Sybase hack guidelines

This document describes how you can use the scripts from the `hack` directory and gives a brief introduction and explanation of these scripts.

## Overview

the `hack` directory contains many scripts that ensure continuous development of the project, enhance the robustness of the code, improve development efficiency, etc. The explanations and descriptions of the scripts are helpful for contributors. For details, refer to the following guidelines.

# Key scripts

* [`hack/report_vulnerability/report.sh`](./hack/report_vulnerability/report.sh): This script generates a markdown based vulnerability reports using [trivy](https://github.com/aquasecurity/trivy). Only HIGH and CRITICAL vulnerabilities are reported.