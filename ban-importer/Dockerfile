FROM node:14.15.3

WORKDIR /usr/src/

# Copy shared libraries
COPY scbl-lib ./scbl-lib

# Copy the service across
COPY ban-importer ./ban-importer

# Copy main package.json
COPY package.json .

# Install dependencies
RUN yarn install --production

# Run servicce
CMD [ "node", "ban-importer/index.js" ]