#!/bin/bash
docker image build \
-f ./containers/spinal-core-connectorjs/Dockerfile \
-t "fjudith/spinal-core-connectorjs" \
--progress="plain" \
./containers/spinal-core-connectorjs