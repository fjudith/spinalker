#!/bin/bash
docker image build \
-f ./containers/spinal-hub/Dockerfile \
-t "fjudith/spinal-hub" \
--progress="plain" \
./containers/spinal-hub