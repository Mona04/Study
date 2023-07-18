//https://github.com/hashicorp/next-remote-watch/blob/master/bin/next-remote-watch

const next = require('next')
const program = require('commander')
const http = require('http')
const chokidar = require('chokidar');  // fs.watch() 는 중복되는 그런 처리가 많아서 관련 처리가 랩핑된 패키지
const { createServer } = require('http')
const { parse } = require('url')


program.version("0.0.1", '-v, --version')
program
  .option('-p, --port [port]', `port number`, 3000)
  .option('-d --directory [dir]', 'fs watch dir')
  .parse(process.argv);

let opts = program.opts();

const port = parseInt(process.env.PORT, 10) || opts.port
const hostname = process.env.HOSTNAME || 'localhost'

const app = next({
  dev: true,
  dir: program.root || process.cwd(),
  // When using middlewares in NextJS 12, `hostname` and `port` must be provided
  // (https://nextjs.org/docs/advanced-features/custom-server)
  port,
  hostname,
})

const handle = app.getRequestHandler()

app.prepare().then(() => {

  let server = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
 
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })

  console.log(`watch ${opts.directory}...`);
  watcher = chokidar.watch(opts.directory)
    .on('any', async (dir, stats) => {
    })
    .on('change', async (dir, stats) => {
      console.log(dir);
      console.log(app);
      console.log(server);
      console.log(handle);

      const options = {
        hostname: `http://${hostname}:`,
        port: opts.port,
        path: '/upload',
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength("asdf"),
        },
     };
     const req = http.request(options, (res) => {
       console.log(`STATUS: ${res.statusCode}`);
 
     });
     req.write("asdf");
     req.end();
      //app.re
      //app.server.hotReloader.send('reloadPage')
      //console.log(event, path);
  
      //app.server.hotReloader.send('building')    
      //const tag = request.nextUrl.searchParams.get('tag')
      //console.log(tag)
      //cache.revalidatePath("http://localhost:4000/");
    });


    /*
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
  
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
  
    // Write data to request body
    req.write(postData);
    req.end();
    */
});