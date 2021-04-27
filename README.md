# spinalker

This project aims to contenairize the Spinalcom Building operating system to improve the appliation portability and security.

* [Overview of Cloud Native Security](https://kubernetes.io/docs/concepts/security/overview/)
* [Pod security policy standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
* [CIS Kubernetes Security Benchmark](https://www.cisecurity.org/benchmark/kubernetes/)
* [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
* [Building a trusted software supply chain](https://cd.foundation/blog/2020/07/07/devsecops-building-a-trusted-software-supply-chain/)

## About Git submodules

Git submodules are only referenced to track the various [SpinalCom repository](https://github.com/spinalcom), they are not actively used in container builds.

## Guidelines

### AKS Deployment

The following guide describes the steps to acheive the Spinal-Core deployment in Azure Kubernetes Service.

* Run the following commands to create the Kubernetes namespace and populate shared persitent volumes with the example dataset.

```bash
# Namespace
kubectl apply -f deploy/aks/00_spinalcom-ns.yaml
# Persistent volumes
kubectl apply -f deploy/aks/01_azurefile-csi-nfs-sc.yaml
kubectl apply -f deploy/aks/01_azurefile-csi-smb-sc.yaml
kubectl apply -f deploy/aks/02_spinal-core-hub-pvc.yaml
# Dataset provisionner
kubectl apply -f deploy/aks/dataset-provisioner-sec.yaml
kubectl apply -f deploy/aks/dataset-provisioner-job.yaml
kubectl -n spinalcom wait --for=condition=complete --timeout=5m job/dataset-provisioner
```

* One the dataset provisioning completed, run the following command to deploy Spinal-Core's application services.

```bash
kubectl apply -f deploy/aks/
```

### Dataset restore

In certain failure conditions, the `memory/dump.db` file can get deleted by the `core-hub` pod.
Run the following command to restart the `dataset-provisioner` job.

```bash
kubectl -n spinalcom get job "dataset-provisioner" -o json | jq 'del(.spec.selector)' | jq 'del(.spec.template.metadata.labels)' | kubectl replace --force -f -
```

## Remove submodules

To remove a submodule you need to:

1. Remove the relevant section from the `.gitmodules` file.
2. Stage the `.gitmodules` changes `git add .gitmodules`
3. Delete the relevant section from `.git/config`.
4. Run `git rm --cached path_to_submodule` (no trailing slash).
5. Run `rm -rf .git/modules/path_to_submodule` (no trailing slash).
6. Commit `git commit -m "Removed submodule"`
7. Delete the now untracked submodule files `rm -rf path_to_submodule`
