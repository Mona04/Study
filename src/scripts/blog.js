const fs = require('fs-extra')
const path = require('path')

const base = path.resolve("");
const aaa = fs.readFileSync(`${base}/_content/blog/aaa/aaa.md`);
for(let i = 0; i < 1000; i++)
{
  fs.writeFileSync(`${base}/_content/blog/aaa/aaa${i}.md`, aaa);
}