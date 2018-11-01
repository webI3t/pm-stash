#!/usr/bin/env node

let shell = require('shelljs');
const program = require('commander'),
      path = require('path'),

      { logAllMethodCalls } = require('../util'),

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
  .option('--simulate', 'Print all commands but do not execute them')
  .parse(process.argv);

let channel = program.channel.toLowerCase(),
    appSuffix = channelMap[channel] || '',
    stashId = program.version,
    appName = `Postman${appSuffix}`,
    basePath = path.resolve(process.env.HOME, 'Library', 'Application Support'),
    sourceDir = path.resolve(basePath, `${appName}`),
    sourceDirContents = path.resolve(sourceDir, '*'),
    destDir = path.resolve(basePath, `${appName}_stash_${stashId}`) + path.sep;

program.verbose && (shell.config.verbose = true);

if (program.simulate) {
  shell = logAllMethodCalls({});
}

shell.rm('-rf', destDir);
shell.mkdir(destDir);
shell.cp('-R', sourceDirContents, destDir);
shell.rm('-rf', sourceDir);