#!/bin/sh
#

if [ ! -f ".initialized" ]; then
    touch .initialized
    npm run db:setup
fi

npm run db:migrate

npm run dev
