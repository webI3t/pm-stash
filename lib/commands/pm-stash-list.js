#!/usr/bin/env node

const program = require('commander'),
      path = require('path'),
      fs = require('fs');

program
  .option('-c, --channel [name]', 'Select the channel to filter the list')
  .parse(process.argv);

let channelToFilter = program.channel && program.channel.toLowerCase(),
    basePath = path.resolve(process.env.HOME, 'Library', 'Application Support'),
    listDir = fs.readdirSync(basePath)
      .filter(dirName => dirName.match(/Postman.*_stash_/))
      .map(dirName => {
        let [appName, version] = dirName.split('_stash_'),
            channel = appName.split('Postman')[1] || 'Prod';

        return {
          channel,
          version
        };
      });

channelToFilter && (listDir = listDir.filter(item => item.channel.toLowerCase() === channelToFilter));

console.log('List of available Postman stashes\n');
console.log('CHANNEL\t\tVERSION');
listDir.forEach(item => console.log(item.channel, '\t\t', item.version));