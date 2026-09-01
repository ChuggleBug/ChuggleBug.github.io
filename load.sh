#!/bin/bash 



# Clean up work dir
if [[ -d _work ]]; then
    rm -rf _work
fi
mkdir -p _work


load_repo() {
    local name="$1"
    local repo_url="$2"
    local url="$repo_url"

    if [[ -n "$GH_LOAD_TOKEN" ]]; then
        url="https://x-access-token:${GH_LOAD_TOKEN}@${repo_url#https://}"
    fi

    echo "Loading $name from $repo_url"
    git clone "$url" "_work/$name"
}

load_repo "blog" https://github.com/ChuggleBug/Blog.git
load_repo "wikigraph" https://github.com/ChuggleBug/test_repo.git
