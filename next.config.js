const path = require('path')
const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");


/**
 * @type {import('next').NextConfig}
 */
module.exports = (phase, { defaultConfig }) => 
{

  if(phase == PHASE_DEVELOPMENT_SERVER)
  {
    if(global.watch == undefined){
    
      //const chokidar = require('chokidar');
      //global.watch = chokidar.watch('_content', ).on('all', (event, path) => {
      //  console.log(event, path);
      //});
    }

  }

  return {
    output: 'export',
    trailingSlash: true,

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
          const watcher = require('./src/lib/mdpost/watcher');
          //watcher('_content');
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