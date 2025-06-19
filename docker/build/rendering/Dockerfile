# escape=`

#
# Development-only image for running Next.js in a containerized environment.
# Assumes that the Next.js rendering host source is mounted to c:\app.
#

ARG PARENT_IMAGE
FROM ${PARENT_IMAGE} as debug

# Needed as crashing when rendering https://www.getfishtank.com/blog/increase-memory-and-performance-of-sitecore-xm-cloud-development-environments
ENV NODE_OPTIONS=--max-old-space-size=8192

ARG PROJECT_PATH
WORKDIR ${PROJECT_PATH}

EXPOSE 3000
#ENTRYPOINT "npm install && npm install next@canary && npm run start:connected"
ENTRYPOINT "npm i && npm run hcamain:copy:docker && npm run hcamain:start && npm run hcamain:copy:watch"