const path = require('path')
const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const { withContentlayer } = require('next-contentlayer')

/**
 * @type {import('next').NextConfig}
 */
const configs = (phase, { defaultConfig }) => 
{

  if(phase == PHASE_DEVELOPMENT_SERVER)
  {
    if(global.watch == undefined){

    }

  }

  return {
    output: 'export',
    trailingSlash: true,
    reactStrictMode: true, 
    swcMinify: true,
    
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      
    },
    
    onDemandEntries: {
      // period (in ms) where the server will keep pages in the buffer
      maxInactiveAge: 360 * 1000,
      // number of pages that should be kept simultaneously without being disposed
      pagesBufferLength: 10,
    },

    publicRuntimeConfig : {
      postCachePath: "./src/_cache/posts"
    },
    //experimental: {
    //  instrumentationHook: true,
    //},


    webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
      if(isServer){
        if(nextRuntime == 'nodejs'){
        }
      }
      else{
        if(dev){        
        }
      }
      
      return config
    },
  }
}

module.exports = withContentlayer(configs);