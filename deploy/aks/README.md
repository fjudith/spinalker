# AKS Deployment

```bash
cd deploy/aks/ && \
kubectl apply -f ./
```

## Cert-Manager

`cert-manager` is a Kubernetes Cluster addon which enables operators to automatically provision TLS certificats to ingress resources.
It noticeably support the provisionning from the compatible with online certification authority supporting the ACME protocol, like [LetEncrypt](https://letsencrypt.org), [ZeroSSL](https://zerossl.com), [Buypass Go SSL](https://www.buypass.com/ssl/products/acme).

Follow the installation instructions published on the `cert-manager` website (<https://cert-manager.io/docs/installation/kubernetes/>).

### ClusterIssuer resource

The `ClusterIssuer` is a Kubernetes Custom Resource Definition that configures cert-manager to request certificats from a support SSL certificate issuer.

```bash
EMAIL="f.judith@groupeonepoint.com"
cat << EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    # You must replace this email address with your own.
    # Let's Encrypt will use this to contact you about expiring
    # certificates, and issues related to your account.
    email: ${EMAIL}
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      # Secret resource that will be used to store the account's private key.
      name: issuer-account-key-staging
    # Add a single challenge solver, HTTP01 using nginx
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

```bash
EMAIL="f.judith@groupeonepoint.com"
cat << EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    # You must replace this email address with your own.
    # Let's Encrypt will use this to contact you about expiring
    # certificates, and issues related to your account.
    email: ${EMAIL}
    server: https://acme-v02.api.letsencrypt.org/directory
    preferredChain: "ISRG Root X1"
    privateKeySecretRef:
      # Secret resource that will be used to store the account's private key.
      name: issuer-account-key-prod
    # Add a single challenge solver, HTTP01 using nginx
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

## Ingress configuration

```bash
helm repo add application-gateway-kubernetes-ingress https://appgwingress.blob.core.windows.net/ingress-azure-helm-package/
helm repo update
```

https://azure.github.io/application-gateway-kubernetes-ingress/
https://docs.microsoft.com/en-us/azure/application-gateway/ingress-controller-overview
https://docs.microsoft.com/en-us/azure/application-gateway/ingress-controller-expose-service-over-http-https