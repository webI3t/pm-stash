#!/usr/bin/env node

const program = require('commander'),
      channelMap = {
        prod: '',
        stage: 'Stage',
        beta: 'Beta',
        canary: 'Canary'
      };

program
  .option('-c, --channel [name]', 'Select the channel', 'prod')
  .option('-m, --message [text]', 'Message for the stash')
  .parse(process.argv);

let channel = program.channel.toLowerCase(),
    appSuffix = channelMap[channel] || '',
    appName = `Postman${appSuffix}`


console.log(`TODO: Stash ${appName} with message:`, program.message || 'default message')