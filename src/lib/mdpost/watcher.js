const chokidar = require('chokidar');

let _watcher = undefined;
module.exports = (path) => {
  if(_watcher == undefined){
    console.log('Post Watch Start...');
    
    _watcher = chokidar.watch(path)
    .on('change', async (path, stats) => {
      console.log(path);
      //console.log(event, path);
      const cache = require('next/cache');    
      //const tag = request.nextUrl.searchParams.get('tag')
      //console.log(tag)
      //cache.revalidatePath("http://localhost:4000/");
    });
  
    //const config = require('next/config')
    //const fs = require('fs');
    //const { postCachePath } = config().publicRuntimeConfig;
    //if(fs.existsSync(postCachePath)){
    //  fs.unlinkSync(postCachePath);
    //}
  }
  return _watcher;
}

