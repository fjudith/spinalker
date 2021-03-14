cp -vr ./containers/spinal-organ-api-gateway/templates ./src/spinal-organ-api-gateway/ && \
cp -vr ./containers/spinal-organ-api-gateway/scripts ./src/spinal-organ-api-gateway/ && \
docker build \
-f ./containers/spinal-organ-api-gateway/Dockerfile \
-t fjudith/spinal-organ-api-gateway \
./src/spinal-organ-api-gateway/ && \
rm -vrf ./src/spinal-organ-api-gateway/templates
rm -vrf ./src/spinal-organ-api-gateway/scripts