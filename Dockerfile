# Start from a slim Ubuntu image
FROM ubuntu:latest

# Update the package list and install clang, lld, python3, and build-essential
RUN apt clean
RUN rm -rf /var/lib/apt/lists/*
RUN apt-get update
RUN apt-get install python3 clang lld build-essential -y

# Set the working directory
WORKDIR /data

# Command to keep the container running
CMD ["/bin/bash"]