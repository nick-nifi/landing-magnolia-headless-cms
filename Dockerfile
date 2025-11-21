FROM eclipse-temurin:21-jdk

# Install Node.js (NodeSource) and other tools
RUN apt-get update && \
    apt-get install -y curl wget unzip && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "mgnl", "--", "start"]
