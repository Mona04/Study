/** @type {import('next-sitemap').IConfig} */
const configs = 
{
  siteUrl: process.env.SITE_URL || 'https://mona04.github.io/study-log/',
  generateRobotsTxt: true, // (optional)
  exclude: "/private/*"
  // ...other options
}

export default configs;