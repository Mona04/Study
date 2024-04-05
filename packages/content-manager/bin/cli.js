#!/usr/bin/env node

import {Command} from 'commander'
import {Startup, Build} from 'archivelayer'

const program = new Command();

program.command("dev")
  .action(Startup);
program.command("build")
  .action(Build);
program
  .version("0.0.0", "-v, --version")
  .name("content-manager")
  .parse(process.argv)