#!/bin/bash

# Java 17 download URLs (update if needed)
X64_URL="https://download.oracle.com/java/17/archive/jdk-17.0.7_osx-x64_bin.tar.gz"
ARM_URL="https://download.oracle.com/java/17/archive/jdk-17.0.7_osx-aarch64_bin.tar.gz"

# Detect CPU architecture
ARCH=$(uname -m)
echo "Detected architecture: $ARCH"

# Select download URL based on architecture
if [ "$ARCH" == "arm64" ]; then
  JDK_URL=$ARM_URL
  echo "Using ARM64 JDK"
else
  JDK_URL=$X64_URL
  echo "Using x64 JDK"
fi

# Create jdk directory in project folder
mkdir -p jdk
cd jdk || exit

# Download the JDK archive
curl -LO $JDK_URL

# Extract the archive
tar -xzf $(basename $JDK_URL)

# Remove the archive file
rm $(basename $JDK_URL)

echo "JDK installed in $(pwd)"

cd ..
