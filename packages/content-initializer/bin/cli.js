#!/usr/bin/env node

import {Command} from 'commander'
import {Startup, Build} from 'archivelayer'
import fs from 'fs'
// base directory 가 아닌 현 모듈에 archivelayer.config.js 를 넣어뒀기 때문.
const dirname = process.cwd() + '/packages/content-initializer/';
const program = new Command();

program.command("dev")
  .action(()=>Startup(dirname));
program.command("build")
  .action(()=>Build({baseFolder:dirname, clearCache:true}));
program
  .version("0.0.0", "-v, --version")
  .name("content-manager")
  .parse(process.argv)