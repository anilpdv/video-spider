#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const { prompt } = require("inquirer");
var Spinner = require("cli-spinner").Spinner;

var spinner = new Spinner(chalk.green("processing.. "));
spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");

const { get_movie, get_movie_list, getMovieById } = require("./app");

const commands = [
  "watch",
  "w",
  "id",
  "imdbid",
  "--help",
  "-V",
  "--version",
  "-h"
];

program.version("2.0.3").description("video-spider");

if (!commands.includes(process.argv[2])) {
  console.log(chalk.red(" 😥 please provide required option"));
  console.log(`
  Usage: commands [options] [command]
  
  video-spider
  
  Options:
    -V, --version        output the version number
    -h, --help           output usage information
  
  Commands:
    watch|w <title>      get movies list by search, and generate movie link
    imdbid|id <videoId>  gets the movie link
    `);
}

// : get list of movies
program
  .command("watch <title>")
  .alias("w")
  .description(chalk.blue("get movies list by search, and generate movie link"))
  .action(async title => {
    try {
      spinner.start();
      const { questions, movies } = await get_movie_list(title);
      spinner.stop(true);

      prompt(questions)
        .then(answer => getMovieById(answer, movies))
        .catch(err => console.log(chalk("please provide answer")));
    } catch (err) {
      spinner.stop(true);
      console.log(chalk.red("😥" + " " + "error occured, please try again!"));
    }
  });

// : generates link for the imdb id
program
  .command("imdbid <videoId>")
  .alias("id")
  .description(chalk.blue("gets the movie link "))
  .action(videoId => {
    get_movie(videoId);
  });

program.parse(process.argv);
