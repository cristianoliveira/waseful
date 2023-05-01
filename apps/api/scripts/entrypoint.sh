#!/bin/sh
#

if [ ! -f "dist/.initialized" ]; then
    touch dist/.initialized
    npm run db:setup
fi

npm run db:migrate

npm start
