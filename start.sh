#!/bin/bash

until cd /usr/src/app && npm install && npm install -g gulp bower && bower install --allow-root
do
    echo "Retrying installs"
done

npm prodGulp
npm setupSchools
gulp devrun
