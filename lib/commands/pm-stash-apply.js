#!/usr/bin/env node

let shell = require('shelljs');
const program = require('commander'),
      path = require('path'),
      fs = require('fs'),

      { logAllMethodCalls } = require('../util'),

      channelMap = {
        prod: '',
        stage: 'Stage',
        beta: 'Beta',
        canary: 'Canary'
      };

program
  .option('-c, --channel [name]', 'Select the channel', 'prod')
  .option('-v, --version [ID]', 'The version of the stash to apply')
  .option('--verbose', 'Log all the steps')
  .option('--simulate', 'Print all commands but do not execute them')
  .parse(process.argv);

let channel = program.channel.toLowerCase(),
    verbose = program.verbose,
    appSuffix = channelMap[channel] || '',
    stashId = program.version,
    appName = `Postman${appSuffix}`,
    stashedDir = `${appName}_stash_${stashId}`,
    basePath = path.resolve(process.env.HOME, 'Library', 'Application Support'),
    stashedDirPath = path.resolve(basePath, stashedDir),
    sourceDirContents = path.resolve(stashedDirPath, '*'),
    destDir = path.resolve(basePath, appName) + path.sep,
    stashedDirExists;

verbose && (shell.config.verbose = true);

if (program.simulate) {
  shell = logAllMethodCalls({});
}

stashedDirExists = fs.existsSync(stashedDirPath);

if (!stashedDirExists) {
  console.log('Could not find the stash', stashedDirPath);
  process.exit(-1);
}

shell.rm('-rf', destDir);
shell.mkdir(destDir);
shell.cp('-R', sourceDirContents, destDir);
shell.rm('-rf', stashedDirPath);