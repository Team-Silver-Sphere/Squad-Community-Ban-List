FROM node:14.15.3

WORKDIR /usr/src/

# Copy shared libraries
COPY scbl-lib ./scbl-lib

# Copy the service across
COPY client ./client
COPY web-server ./web-server

# Copy main package.json
COPY package.json .

# Install dependencies
RUN yarn install --production
RUN yarn build-web-server

# Run servicce
CMD [ "node", "web-server/index.js" ]