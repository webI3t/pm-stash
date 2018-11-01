#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.2')
  .description('Postman command line helper')
  .command('stash', 'stash user data directory')
  .parse(process.argv);

// here .command() is invoked with a description,
// and no .action(callback) calls to handle sub-commands.
// this tells commander that you're going to use separate
// executables for sub-commands, much like git(1) and other
// popular tools.
// for 'stash' it will look for 'pm-stash' file