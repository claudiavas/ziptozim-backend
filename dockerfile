# Use a Node.js image
FROM node:20

# Copy the zimwriterfs executable into the container
COPY zimwriterfs /usr/local/bin/

# Set the working directory
WORKDIR /app
ENV TEMP_DIR=/app/temp
ENV UPLOAD_DIR=/app/upload


# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install your application's dependencies
RUN npm install

# Copy your Node.js application into the container
COPY . .

# Start your application
CMD ["npm", "run", "prod"]