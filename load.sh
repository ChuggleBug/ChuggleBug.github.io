#!/bin/bash 



# Clean up work dir
if [[ -d _work ]]; then
    rm -rf _work
fi
mkdir -p _work


load_repo() {
    echo "Loading $2 to $1"
    git clone "$2" "_work/$1"
}

load_repo "blog" https://github.com/ChuggleBug/Blog.git
load_repo "wikigraph" https://github.com/ChuggleBug/test_repo.git
