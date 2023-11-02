const fs = require('fs-extra')
const path = require('path')

const base = path.resolve("");
const aaa = fs.readFileSync(`${base}/_content/blog/blogging/test/mdtest.md`);
for(let i = 0; i < 1000; i++)
{
  fs.writeFileSync(`${base}/_content/blog/blogging/samples/aaa${i}.md`, aaa);
}