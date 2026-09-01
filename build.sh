#!/bin/bash

if [[ ! -d _work ]]; then
    echo "Run load first!"
    exit 1
fi

if [[ -d dist ]]; then
    rm -rf dist
fi

PROJ_ROOT=`realpath .`

##############################
# Personal website project
##############################
cd src/homepage
npm run build
mv dist ${PROJ_ROOT}
cd ${PROJ_ROOT}

###############
# Blog site
###############
cd _work/blog
bundle exec jekyll build
mv _site "${PROJ_ROOT}/dist/blog"
cd ${PROJ_ROOT}

###############
# Applications
###############
APP_ROOT="${PROJ_ROOT}/dist/app"
mkdir -p ${APP_ROOT}

# Wikigraph (test)
cd _work/wikigraph
cp -r . "${APP_ROOT}/wikigraph"
cd ${PROJ_ROOT}
