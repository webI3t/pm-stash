#!/usr/bin/env node

const program = require('commander'),
      path = require('path'),
      fs = require('fs'),
      shell = require('shelljs'),
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

verbose && console.log(`Applying the stash ${stashedDir}`, '\n');

verbose && console.log('checking whether stash exists');
stashedDirExists = fs.existsSync(stashedDirPath);
if (!stashedDirExists) {
  verbose && console.log('Could not find the stash', stashedDirPath);
  process.exit(-1);
}
verbose && console.log('found stash\n');

verbose && console.log('deleting the destination', destDir, '...');
shell.rm('-rf', destDir);
verbose && console.log('deleted\n');

verbose && console.log('creating empty directory', destDir, '...');
shell.mkdir(destDir);
verbose && console.log('created\n');

verbose && console.log('copying data...');
shell.cp('-R', sourceDirContents, destDir);
verbose && console.log('copied\n');

verbose && console.log('deleting source directory...');
shell.rm('-rf', stashedDirPath);
verbose && console.log('deleted\n');