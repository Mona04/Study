const path = require('path')
const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const { withContentlayer } = require('next-contentlayer')

/**
 * @type {import('next').NextConfig}
 */
const configs = (phase, { defaultConfig }) => 
{
  const graymatter = require('gray-matter')
  const fs = require('fs')
  const yaml = require('yaml')

  let str = fs.readFileSync("_content/end-with-quote.md", {encoding: 'utf-8', flag: 'r'});   
  //console.log(yaml.parse(str));
  const file = graymatter(
    str,
    {
        engines: {
            // Provide custom YAML engine to avoid parsing of date values https://github.com/jonschlinkert/gray-matter/issues/62)
            yaml: (str) => {
              console.log(str)
              if(str != undefined && str.length > 0 && str[str.length-1] == '\r'){
                str = str.slice(0, str.length-1);
              }
              return yaml.parse(str)
            }
        },
    })
  console.log(file.matter);

  return ({
    output: 'export',
    distDir: 'out',
    basePath: phase == PHASE_PRODUCTION_BUILD ? process.env.BASE_PATH : "",

    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      
    },    

    reactStrictMode: true, 
    swcMinify: true,
    trailingSlash: false,
    //onDemandEntries: {
    //  // period (in ms) where the server will keep pages in the buffer
    //  maxInactiveAge: 36000 * 1000,
    //  // number of pages that should be kept simultaneously without being disposed
    //  pagesBufferLength: 10,
    //},

    //experimental: {
    //  instrumentationHook: true,
    //},

    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
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
  });
}

module.exports = configs;