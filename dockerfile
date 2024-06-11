# Use a Node.js image
FROM node:20

# Copy the zimwriterfs executable into the container
COPY zimwriterfs /usr/local/bin/

# Copy your Node.js application into the container
WORKDIR /app
COPY . .

# Install your application's dependencies
RUN npm install

# Start your application
CMD ["npm", "start"]