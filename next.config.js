const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: {
    plugins: [
      new Dotenv({
        path: path.join(__dirname, '.env')
      })
    ]
  }
};

module.exports = nextConfig;
