/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || 'http://localhost:3003/',
  generateRobotsTxt: true // (optional)
  // ...other options
};
