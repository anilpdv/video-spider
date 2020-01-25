#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const { prompt } = require("inquirer");
var Spinner = require("cli-spinner").Spinner;

var spinner = new Spinner(chalk.green("processing.. "));
spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");

const { get_movie, get_movie_list, getMovieById } = require("./app");

program.version("2.0.0").description("video-spider");

if (!process.argv.includes("watch" || "w" || "id" || "imdbid" || "--help")) {
  console.log(chalk.red(" 😥 please provide required option"));
  console.log(`
  Usage: commands [options] [command]
  
  video-spider
  
  Options:
    -V, --version        output the version number
    -h, --help           output usage information
  
  Commands:
    watch|w <watch>      get movies list by search, and generate movie link
    imdbid|id <videoId>  gets the movie link
    `);
}

// : get list of movies
program
  .command("watch <watch>")
  .alias("w")
  .description(chalk.blue("get movies list by search, and generate movie link"))
  .action(async watch => {
    try {
      spinner.start();
      const { questions, movies } = await get_movie_list(watch);
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
