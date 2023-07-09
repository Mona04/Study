const path = require('path')

/**
 * @type {import('next').NextConfig}
 */
module.exports = (phase, { defaultConfig }) => ({
  output: 'export',
  trailingSlash: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    
  },
})