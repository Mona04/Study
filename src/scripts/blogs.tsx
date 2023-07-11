import fs from 'fs'
import * as Blog from './../lib/blog-api.js'

(async () => {
  console.log("asdfsadfasdfasdfs")
  for await (const a of Blog.getDirentsRecursive("_content"))
  {

    //console.log(a.name);
    //console.log(a.name + " " + fs.statSync(a.path).mtime)
  }
})();
