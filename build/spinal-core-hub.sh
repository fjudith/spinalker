#!/bin/bash
docker image build \
-f ./containers/spinal-core-hub/Dockerfile \
-t "fjudith/spinal-core-hub" \
--progress="plain" \
./containers/spinal-core-hub