#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const {get_movie} = require('./app');

program.version('1.0.1').description('video-spider');

// : generates random quote
program
  .command('imdbid <videoId>')
  .alias('id')
  .description(chalk.blue('gets the movie link '))
  .action(videoId => {
    get_movie(videoId);
  });

program.parse(process.argv);
