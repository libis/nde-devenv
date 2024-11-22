FROM mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye

#RUN git clone https://github.com/ExLibrisGroup/customModule.git /app && chown -R $USERNAME:$USERNAME /app

USER node:node
WORKDIR /app  
 
RUN cd /app && npm install && npm install copy-webpack-plugin --save-dev

USER root
RUN chown -R node:node /app

USER node
ENV PATH=/app/node_modules/.bin:$PATH
ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 4201

#CMD ["npm","run","start:proxy"]
CMD ["bash"]
