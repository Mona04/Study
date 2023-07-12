import fs from 'fs'
import * as Blog from './../lib/blog-api.js'

interface MDPosts {
  [id: string] : any;
}
(async () => {
  let posts : MDPosts  = {};
  for await (const dirent of Blog.getDirentsRecursive("_content"))
  {    
    posts[dirent.path] = fs.statSync(dirent.path);
  }

  fs.writeFileSync("posts", JSON.stringify(posts));
  //let stream = fs.createWriteStream("posts", );
  //stream.once('open', (fd)=>{
  //  stream.write(JSON.stringify(posts));
  //});
  let readStream = fs.readFileSync("posts");
  let posts2 : MDPosts = JSON.parse(readStream.toString());
  Object.entries(posts2).map( ([k, v])=> {
    console.log("k" + ' ' + v);
  });
  //https://stackoverflow.com/questions/13698043/observe-file-changes-with-node-js

})();

fs.watch('_content', {"recursive": true}, function (event, filename) {
  console.log('event is: ' + event);
  if (filename) {
      console.log('filename provided: ' + filename);
  } else {
      console.log('filename not provided');
  }
});

function formatDate(date : Date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  var hour = '' + d.getHours(),
      minute = '' + d.getMinutes();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day, [hour, minute].join(':')].join('-');
}