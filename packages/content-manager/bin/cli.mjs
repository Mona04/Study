#!/usr/bin/env node

import {Command} from 'commander'
import {createSearchIndex} from '../dist/search-helper.js'
import fs from 'fs'

const program = new Command();

program.command("dev")
  .action(()=>{});
  program.command("build")
  .action(async ()=>{
    const idx = await createSearchIndex();
    fs.writeFile("./public/search-index.json", JSON.stringify(idx, null, ' '), ()=>{});
  });
program
  .version("0.0.0", "-v, --version")
  .name("content-manager")
  .parse(process.argv)