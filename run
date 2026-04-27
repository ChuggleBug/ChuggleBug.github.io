#!/bin/bash

if [[ ! -d dist ]]; then
    echo "Run build first!"
    exit 1
fi

echo "Running on http://localhost:8080"
php -S localhost:8080 -t ./dist