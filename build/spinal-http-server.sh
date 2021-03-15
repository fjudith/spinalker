cp -vr ./containers/spinal-http-server/templates ./src/spinal-http-server/ && \
cp -vr ./containers/spinal-http-server/scripts ./src/spinal-http-server/ && \
cp -vr ./containers/spinal-http-server/files ./src/spinal-http-server/ && \
docker build \
-f ./containers/spinal-http-server/Dockerfile \
-t fjudith/spinal-http-server \
./src/spinal-http-server/ && \
rm -vrf ./src/spinal-http-server/templates && \
rm -vrf ./src/spinal-http-server/scripts && \
rm -vrf ./src/spinal-http-server/files