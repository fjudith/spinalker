# spinalker

This project aims to contenairize the Spinalcom Building operating system to improve the appliation portability and security.

* [Overview of Cloud Native Security](https://kubernetes.io/docs/concepts/security/overview/)
* [Pod security policy standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
* [CIS Kubernetes Security Benchmark](https://www.cisecurity.org/benchmark/kubernetes/)
* [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
* [Building a trusted software supply chain](https://cd.foundation/blog/2020/07/07/devsecops-building-a-trusted-software-supply-chain/)

## Remove submodule

To remove a submodule you need to:

1. Remove the relevant section from the `.gitmodules` file.
2. Stage the `.gitmodules` changes `git add .gitmodules`
3. Delete the relevant section from `.git/config`.
4. Run `git rm --cached path_to_submodule` (no trailing slash).
5. Run `rm -rf .git/modules/path_to_submodule` (no trailing slash).
6. Commit `git commit -m "Removed submodule"`
7. Delete the now untracked submodule files `rm -rf path_to_submodule`
