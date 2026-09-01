#!/bin/bash 

# Clean up work dir
if [[ -d _work ]]; then
    rm -rf _work
fi
mkdir -p _work

# Generic load utility
load_repo() {
    git clone "$2" "_work/$1"
}

# Since blog is private, we need special permissions
if [[ -n "${GH_BLOG_ACCESS_PAT}" ]]; then
    blog_url="https://oauth2:${GH_BLOG_ACCESS_PAT}@github.com/ChuggleBug/Blog.git"
else
    blog_url=https://github.com/ChuggleBug/Blog.git
fi
load_repo "blog" "${blog_url}"

# Apps
load_repo "wikigraph" https://github.com/ChuggleBug/test_repo.git
