# Use an official Node runtime as a parent image for building the frontend
FROM node:14 as build

# Set the working directory for the frontend build
WORKDIR /frontend_portfolio

# Copy the frontend package.json and yarn.lock files
COPY frontend_portfolio/package.json frontend_portfolio/yarn.lock ./

# Install frontend dependencies
RUN yarn install

# Copy the rest of the frontend source files
COPY frontend_portfolio/ ./

# Build the frontend
RUN yarn build

# Use an official Python runtime as a parent image for the backend
FROM python:3.9-slim

# Set the working directory for the backend
WORKDIR /backend_portfolio

# Copy the backend files
COPY backend_portfolio ./backend_portfolio

# Copy the built frontend files from the previous stage to the backend
COPY --from=build /frontend_portfolio/build ./frontend_portfolio/build

# Install backend dependencies
RUN pip install --no-cache-dir -r backend_portfolio/requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the uvicorn server for the FastAPI app
CMD ["uvicorn", "backend_portfolio.main:app", "--host", "0.0.0.0", "--port", "8000"]
