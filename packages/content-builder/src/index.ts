import path from 'path'

var configPath = path.join(process.cwd(), 'content-builder.config.js')
configPath = "/content-builder.config.js";
await import(configPath);
//import(configPath).then((a)=>{
//    console.log(a);
//})

const aaa = "AAA";
export let AAA = aaa;