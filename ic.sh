#!/usr/bin/env bash

set -x
dir=/opt/docker/Revivarq

# build web
cd $dir/web
pwd
nvm use 10.16.2
rm -rf /opt/docker/Revivarq/api/web


npm install
npm run-script build
ls $dir/api/web/
mv -f $dir/web/build $dir/api/web/
cd $dir/api
ls -la $dir/api/web/




