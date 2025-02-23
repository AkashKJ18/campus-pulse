# Use Node.js base image
FROM node:20-alpine

# Set up working directory
WORKDIR /backend

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose API Port
EXPOSE 8000

# Start the server
CMD ["node", "index.js"]