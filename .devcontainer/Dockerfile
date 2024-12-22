FROM mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye

USER node:node
WORKDIR /app  
 
ENV PATH=/app/node_modules/.bin:$PATH
ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 4201

#CMD ["npm","run","start:proxy"]
CMD ["bash"]
