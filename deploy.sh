#!/bin/bash

docker-compose build
docker-compose stop
docker-compose up -d
