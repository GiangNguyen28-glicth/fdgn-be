FROM node:16.18.0-buster
USER root
WORKDIR /app
# ENV YARN_ENABLE_GLOBAL_CACHE=true \
#     YARN_ENABLE_IMMUTABLE_INSTALLS=false \
#     YARN_ENABLE_COLORS=true \
#     YARN_ENABLE_PROGRESS_BARS=true \
#     YARN_NODE_LINKER="node-modules" \
#     YARN_NPM_REGISTRY_SERVER="https://registry.npmjs.org" \
#     YARN_ENABLE_SCRIPTS=false
RUN apk add --no-cache build-base python3 vim && \
    npm install -g yarn --force && \
    yarn set version stable && \
    && rm -rf /var/cache/apk/*

# COPY package.json yarn.lock ./

# COPY . .

# RUN yarn install

# RUN yarn build

# RUN yarn lerna publish prerelease --preid=beta --ignore-scripts --exact --yes

ARG SERVICE_PACKAGE_NAME \
    SERVICE_PACKAGE_VERSION

COPY run-service.sh run-service.sh
RUN  node ./run-service.sh