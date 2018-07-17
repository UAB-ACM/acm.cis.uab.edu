### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:8-alpine as builder

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /acm.cis.uab.edu && cp -R ./node_modules ./acm.cis.uab.edu

WORKDIR /acm.cis.uab.edu

COPY . .

### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
#COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /acm.cis.uab.edu /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]