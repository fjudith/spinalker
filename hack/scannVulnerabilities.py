import subprocess
import time
from datetime import datetime
containerImage = ["spinal-browser-admin", "spinal-browser-appstore", "spinal-browser-drive", "spinal-browser-graph-inspector",
        "spinal-browser-spinaltwin", "spinal-browser-user_role_manager", "spinal-browser-viewer", "spinal-core-connectorjs", "spinal-core-hub",
        "spinal-organ-dump_manager", "spinal-organ-forge", "spinal-organ-network_sample", "spinal-http-server", "spinal-organ-api-gateway", "spinal-caddy-server",
        "spinal-env-admin-panel-hub-status", "spinal-env-admin-panel-user-manager", "spinal-env-drive-panel-logs", "spinal-env-drive-plugin-base",
        "spinal-env-drive-plugin-digital_twin", "spinal-env-drive-plugin-version_manager", "spinal-env-drive-plugin-visa",
        "spinal-env-viewer-context-geographic-service", "spinal-env-viewer-plugin-documentation-service", "spinal-env-viewer-plugin-forge",
        "spinal-env-viewer-plugin-generate-spatial-reference", "spinal-env-viewer-plugin-graph_viewer", "spinal-env-viewer-plugin-item_model_selector"]

date = datetime.now().strftime("%d_%m_%Y_%H_h_%M_m")
fichier = str(date + "_rapportRecencementVulnerabilite.txt")
traite=[]
print("[INFO] Début du recencement des vulnérabilités...\n")
start_time = time.time()
for i in containerImage:
    command = str( "fjudith/"+ i)
    try:
        print("traitement des vulnérabilités du container: ", i)
        traite.append(i)
        resultat = subprocess.check_output(["trivy", "image", command])
        with open(fichier, "a") as f:
            f.write(resultat.decode())
    except:
        pass
relica = []
for k in containerImage:
    if k not in traite:
        relica.append(k)
    else: 
        pass
print("\n[INFO] Fin du recencement et rapport de vulnérabilité généré.")
print("[INFO] recencement effectué en secondes: %s "%(time.time() - start_time))
print("le rapport est disponible dans le répertoire du script sous le nom de: ", fichier)
print("\nNombre total de container: ", len(containerImage))
print("Nombre de containers traités: ", len(traite))
if len(relica)!=0:
    print("Containers non traités:\n")
    for j in relica:
        print(j)
else:
    print("DONE !")
