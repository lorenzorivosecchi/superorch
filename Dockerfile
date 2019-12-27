FROM node:8-alpine

# Create home directory.
WORKDIR /usr/src/app

# Install yarn and other dependencies via apk.
RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*

# Install node dependencies.
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Bundle app source.
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
