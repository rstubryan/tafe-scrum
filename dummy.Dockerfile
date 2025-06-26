# Stage 1 - Build Package to Production
FROM node:20.16.0-alpine3.20 as build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN cp .env.dummy .env
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]