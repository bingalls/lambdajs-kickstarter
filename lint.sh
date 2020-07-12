#!/bin/bash
# Check that all files are ready for release

cd server
npm run format
npm run lint

echo "ToDo: prettier & lint for (S)CSS"

cd ../client
npm run format
npm run lint
