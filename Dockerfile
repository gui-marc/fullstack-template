FROM node:18

WORKDIR /usr/src/app

# Copy root package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Copy apps package.json
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json

RUN npm install --production

# Copy the source code

COPY . .

EXPOSE 3000

RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]

# TODO: add pruning https://turbo.build/repo/docs/handbook/deploying-with-docker