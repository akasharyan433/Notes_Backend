# Node js base image
FROM node:18-alpine

# working directory 
WORKDIR /usr/src/app

# Copy  package files
COPY package*.json ./

# production dependencies
RUN npm install --production

# Copy remaining code
COPY . .

# expected port
EXPOSE 8080

# dynamic port for Cloud Run
ENV PORT=8080
ENV NODE_ENV=production

# CMD command
CMD ["node", "server.js"]