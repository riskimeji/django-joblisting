# Gunakan node sebagai base image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode ke dalam image
COPY . .

# Expose port yang digunakan oleh aplikasi Node.js
EXPOSE 5000

# Command untuk menjalankan aplikasi Node.js
CMD ["node", "index"]
