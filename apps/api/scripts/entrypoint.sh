#!/bin/sh

npm install

if [ ! -f "dist/.initialized" ]; then
    touch dist/.initialized
    npm run db:setup
fi

npm run db:migrate

npm run build

npm run start
