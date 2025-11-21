#!/bin/bash

# Script to download and setup Magnolia CMS

MAGNOLIA_VERSION="6.2.42"
DOWNLOAD_DIR=".magnolia"
TOMCAT_DIR="$DOWNLOAD_DIR/apache-tomcat"

echo "Setting up Magnolia CMS Community Edition ${MAGNOLIA_VERSION}..."

# Create directory
mkdir -p "$DOWNLOAD_DIR"
cd "$DOWNLOAD_DIR"

# Try different bundle URLs (using 6.2.x for Community Edition)
URLS=(
    "https://nexus.magnolia-cms.com/repository/magnolia.public.releases/info/magnolia/bundle/magnolia-community-demo-bundle/${MAGNOLIA_VERSION}/magnolia-community-demo-bundle-${MAGNOLIA_VERSION}.zip"
    "https://files.magnolia-cms.com/magnolia-community-demo-bundle-${MAGNOLIA_VERSION}.zip"
)

for URL in "${URLS[@]}"; do
    echo "Trying to download from: $URL"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
    if [ "$HTTP_CODE" = "200" ]; then
        echo "Found! Downloading..."
        curl -L "$URL" -o magnolia.zip
        if [ $? -eq 0 ]; then
            echo "Download successful, extracting..."
            unzip -q magnolia.zip
            rm magnolia.zip

            # Find and rename the apache-tomcat directory
            TOMCAT_FOLDER=$(find . -maxdepth 1 -type d -name "apache-tomcat*" | head -n 1)
            if [ -n "$TOMCAT_FOLDER" ]; then
                mv "$TOMCAT_FOLDER" apache-tomcat
                echo "Magnolia setup complete!"
                echo "apache-tomcat is located at: $TOMCAT_DIR"
                exit 0
            else
                echo "Error: apache-tomcat directory not found in the archive"
                exit 1
            fi
        fi
    else
        echo "Not found (HTTP $HTTP_CODE)"
    fi
done

echo "Error: Could not download Magnolia from any URL"
echo "Please download manually from https://www.magnolia-cms.com/download.html"
exit 1
