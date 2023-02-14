# pull base image
FROM node:alpine

# set working directory
WORKDIR /app

# add `/front-end/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install dependencies
COPY package*.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]