#!/bin/sh
echo "PORT=$PORT"
git fetch && git reset --hard origin/main && git clean -f -d && cd ../staging && GATEWAY_PORT=$PORT BRANCH_NAME=staging docker-compose -f docker-compose.yml up --build -d
