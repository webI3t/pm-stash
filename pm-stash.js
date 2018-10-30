#!/usr/bin/env node

const program = require('commander');

program
  .command('list', 'show the list of all stashes')
  .command('save', 'create a new stash')
  .command('pop', 'apply the top stash and remove it from the list')
  .command('apply', 'apply a particular stash without removing it from the list')
  .parse(process.argv);