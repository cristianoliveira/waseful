FROM node:18-alpine3.16

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY prisma .
COPY tsconfig.json .
COPY scripts/entrypoint.sh ./scripts/entrypoint.sh
COPY src ./src

EXPOSE 3000 

ENTRYPOINT [ "sh", "./scripts/entrypoint.sh" ]
