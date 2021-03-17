cp -vr ./containers/spinal-caddy-server/templates ./src/spinal-caddy-server/ && \
cp -vr ./containers/spinal-caddy-server/scripts ./src/spinal-caddy-server/ && \
docker build \
-f ./containers/spinal-caddy-server/Dockerfile \
-t fjudith/spinal-caddy-server \
./src/spinal-caddy-server/ && \
rm -vrf ./src/spinal-caddy-server/templates && \
rm -vrf ./src/spinal-caddy-server/scripts