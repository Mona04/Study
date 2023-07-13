const path = require('path')

/**
 * @type {import('next').NextConfig}
 */
module.exports = (phase, { defaultConfig }) => 
{
  if(phase == PHASE_DEVELOPMENT_SERVER)
  {

  }
  
  return {
    output: 'export',
    trailingSlash: true,
    webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {

      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      })

      return config
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      
    },
    //experimental: {
    //  instrumentationHook: true,
    //}
  }
}