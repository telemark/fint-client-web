###########################################################
#
# Dockerfile for fint-get-token-web
#
###########################################################

# Setting the base to nodejs 9
FROM mhart/alpine-node:9@sha256:3c3f7e30beb78b26a602f12da483d4fa0132e6d2b625c3c1b752c8a8f0fbd359

# Maintainer
MAINTAINER Jonas Enge

#### Begin setup ####

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT npm start
