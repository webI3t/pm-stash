#!/usr/bin/env node

const program = require('commander'),
      path = require('path'),
      shell = require('shelljs'),
      channelMap = {
        prod: '',
        stage: 'Stage',
        beta: 'Beta',
        canary: 'Canary'
      };

program
  .option('-c, --channel [name]', 'Select the channel', 'prod')
  .option('-v, --version [ID]', 'Unique id for the stash (current postman version like 6.0.1)')
  .option('--verbose', 'Log all the steps')
  .parse(process.argv);

let channel = program.channel.toLowerCase(),
    verbose = program.verbose,
    appSuffix = channelMap[channel] || '',
    stashId = program.version,
    appName = `Postman${appSuffix}`,
    basePath = path.resolve(process.env.HOME, 'Library', 'Application Support'),
    sourceDir = path.resolve(basePath, `${appName}`),
    sourceDirContents = path.resolve(sourceDir, '*'),
    destDir = path.resolve(basePath, `${appName}_stash_${stashId}`) + path.sep;

verbose && (shell.config.verbose = true);

verbose && console.log(`Stashing ${appName} with id:`, stashId, '\n');

verbose && console.log('deleting', destDir, '...');
shell.rm('-rf', destDir);
verbose && console.log('deleted\n');

verbose && console.log('creating empty dir=ectory', destDir, '...');
shell.mkdir(destDir);
verbose && console.log('created\n');

verbose && console.log('copying data...');
shell.cp('-R', sourceDirContents, destDir);
verbose && console.log('copied\n');

verbose && console.log('deleting user data directory...');
shell.rm('-rf', sourceDir);
verbose && console.log('deleted\n');