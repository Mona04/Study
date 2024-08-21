#!/usr/bin/env node

import {Command} from 'commander'
import {createSearchIndex, createSlugIndex} from '../dist/search-helper.js'
import chalk from 'chalk'
import fs from 'fs'

const program = new Command();

program.command("dev")
  .action(()=>{});
  program.command("build")
  .action(async ()=>
  {
    console.log("Construct Search Database...");
    const st = performance.now();  

    const idx = await createSearchIndex();
    fs.writeFile("./public/search-index.json", JSON.stringify(idx, null, ' '), ()=>{});
    const slugidx = await createSlugIndex();
    fs.writeFile("./public/slug-index.json", JSON.stringify(slugidx, null, ' '), ()=>{});

    var ed = performance.now();
    console.log(chalk.green(`Constructing Search DataBase takes ${(ed-st)} ms`));    
  });
program
  .version("0.0.0", "-v, --version")
  .name("content-manager")
  .parse(process.argv)