FROM node:18.15.0
RUN npm install -g npm@9.6.3
WORKDIR /usr/src/app
EXPOSE 3001
# CMD ["npm", "run", "dev"]
