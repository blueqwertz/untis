# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the client directory to the container
COPY client ./client

# Change the working directory to /app/client
WORKDIR /app/client

# Build the React app
RUN npm run build

# Change the working directory back to /app
WORKDIR /app

# Copy the server directory to the container
COPY server ./server

# Expose port 3000 for the server
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
