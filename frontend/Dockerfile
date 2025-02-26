# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package.json .

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose the correct Vite preview port
EXPOSE 4173

# Start the app using `serve`
CMD ["npm", "run", "dev"]
