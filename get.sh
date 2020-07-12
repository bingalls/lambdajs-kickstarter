#!/bin/bash
# https://github.com/lambci/docker-lambda
# arg 1: local *.js; defaults to example.js

docker run --rm -v "$PWD":/var/task:ro,delegated \
  lambci/lambda:nodejs12.x ${1:-'example'}.handler \
  '{"http": {"method": "get"}}' \
  -p 9001:9001 \


#  -e DOCKER_LAMBDA_STAY_OPEN=1 \
# uncomment above to run continuously
