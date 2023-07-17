const chokidar = require('chokidar');
const next = require('next')
const program = require('commander')

let _watcher = undefined;
module.exports = (dir) => {
  if(_watcher == undefined){
    console.log('Post Watch Start...');
    
    const shell = process.env.SHELL
    const port = parseInt(process.env.PORT, 10) || 3000
    const hostname = process.env.HOSTNAME || 'localhost'
    const app = next({
      dev: true,
      //dir: program.root || process.cwd(),
      // When using middlewares in NextJS 12, `hostname` and `port` must be provided
      // (https://nextjs.org/docs/advanced-features/custom-server)
      port,
      hostname,
    })
    const handle = app.getRequestHandler()
 //https://github.com/hashicorp/next-remote-watch/blob/master/bin/next-remote-watch
    app.prepare().then(() => {
      _watcher = chokidar.watch(dir)
      .on('change', async (dir, stats) => {
        console.log(dir);
        //console.log(event, path);
   
        //app.server.hotReloader.send('building')    
        //const tag = request.nextUrl.searchParams.get('tag')
        //console.log(tag)
        //cache.revalidatePath("http://localhost:4000/");
      });
    });

    
    //const app = next({
    //  dev: true,
    //  dir: program.root || process.cwd(),
    //  // When using middlewares in NextJS 12, `hostname` and `port` must be provided
    //  // (https://nextjs.org/docs/advanced-features/custom-server)
    //  port,
    //  hostname,
    //})
    //const config = require('next/config')
    //const fs = require('fs');
    //const { postCachePath } = config().publicRuntimeConfig;
    //if(fs.existsSync(postCachePath)){
    //  fs.unlinkSync(postCachePath);
    //}
  }
  return _watcher;
}

