# Magnolia CMS Setup Instructions

Since Magnolia DX Core requires credentials and automated downloads are restricted, follow these steps:

## Option 1: Manual Download (Recommended)

1. Visit https://www.magnolia-cms.com/download.html
2. Sign up for a free account if you don't have one
3. Download **Magnolia Community Edition** (or **DX Core** if you have credentials)
4. Extract the downloaded bundle
5. Move the `apache-tomcat` folder to `.magnolia/apache-tomcat` in this project:
   ```bash
   mkdir -p .magnolia
   mv /path/to/extracted/apache-tomcat .magnolia/
   ```

## Option 2: Use Docker with Pre-built Image

Alternatively, you can use an official Magnolia Docker image. Update `docker-compose.yml` to use:

```yaml
version: "3.9"

services:
  magnolia:
    image: docker.magnolia-cms.com/magnolia/magnolia-community:6.2
    ports:
      - "8080:8080"
    volumes:
      - ./light-modules:/light-modules
    environment:
      - CATALINA_OPTS=-Xms1024M -Xmx2048M
```

Note: You may need to authenticate with Magnolia's Docker registry.

## Option 3: Download via CLI (if you have Magnolia account)

Run the following to download with proper authentication:
```bash
npm install -g @magnolia/cli
mgnl jumpstart
```

## After Setup

Once `.magnolia/apache-tomcat` exists, run:

```bash
docker-compose up
```

Or run locally:
```bash
npm run mgnl -- start
```
