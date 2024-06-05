# Use an official Node runtime as a parent image for building the frontend
FROM node:14 as build

# Set the working directory
WORKDIR /app/frontend_portfolio

# Copy the frontend package.json and yarn.lock files
COPY frontend_portfolio/package.json frontend_portfolio/yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the frontend source files
COPY frontend_portfolio/ ./

# Build the frontend
RUN yarn build

# Use an official Python runtime as a parent image for the backend
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the backend files
COPY backend_portfolio ./backend_portfolio

# Copy the built frontend files from the previous stage
COPY --from=build /app/frontend_portfolio/build ./frontend_portfolio/build

# Install backend dependencies
RUN pip install --no-cache-dir -r backend_portfolio/requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run uvicorn server
CMD ["uvicorn", "backend_portfolio.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
