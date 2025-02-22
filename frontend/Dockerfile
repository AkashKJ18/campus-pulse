# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Build the Vite app
RUN npm run build

# Install serve globally to serve the built files
RUN npm install -g serve

# Expose the correct Vite preview port
EXPOSE 4173

# Start the app using `serve`
CMD ["npm", "run", "dev"]
