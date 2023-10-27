# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Clone the Git repository
RUN git clone git@github.com:PRODYNA-TECH/tech-20220811-futuredays-chat-frontend.git .

# Install dependencies
RUN npm install

# Start the React application
CMD ["npm", "start"]
