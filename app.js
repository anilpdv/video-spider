const axios = require("axios");
const publicIp = require("public-ip");
const chalk = require("chalk");
const open = require("open");
var Spinner = require("cli-spinner").Spinner;
var spinner = new Spinner(chalk.green("processing.. "));
spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
const { key, secret_key } = require("./.config.js");

exports.get_movie = async videoId => {
  const ipaddress = await publicIp.v4();
  // console.log(chalk.bold.green(`ipaddress : ${ipaddress}`));

  const ticketUrl = `https://videospider.in/getticket.php?key=${key}&secret_key=${secret_key}&video_id=${videoId}&ip=${ipaddress}`;

  try {
    spinner.start();
    const res = await axios.get(ticketUrl);
    await spinner.stop(true);
    console.log(chalk.italic.blue(`ticket : ${res.data}`));
    const url = `https://videospider.stream/getvideo?key=${key}&video_id=${videoId}&ticket=${res.data}`;
    console.log(chalk.yellowBright(`${url}`));
    await open(url);
  } catch (err) {
    console.log("error", err.response.data);
  }
};

exports.get_movie_list = async query => {
  if (!query) {
    return "title is required";
  }
  try {
    const res = await axios.get(
      `http://www.omdbapi.com/?apikey=e7e8f46&s=${query}`
    );

    if (res.data.Error) {
      spinner.stop(true);
      console.log(
        chalk.red(
          `${res.data.Error}, please use quotes to search movies eg: 'the irishman'`
        )
      );
      return null;
    }

    if (res.data.Search) {
      const movies = res.data.Search;
      const questions = transformToQuestions(movies);
      return { questions, movies };
    }

    return null;
  } catch (err) {
    spinner.stop(true);
    console.log(chalk.red("😥 movie not found"));
    return err;
  }
};

const transformToQuestions = moviesData => {
  if (!moviesData) {
    return "moviesData is needed";
  }
  const questions = [];
  const question = {
    type: "list",
    name: "moviename",
    message: chalk.white("Select a movie to watch")
  };
  question.choices = moviesData.map(movie => `${movie.Title} : ${movie.Year}`);
  questions.push(question);
  return questions;
};

exports.getMovieById = (moviename, movieslist) => {
  try {
    const selectedMovie = movieslist.filter(
      movie =>
        `${movie.Title} : ${movie.Year}`.trim() === moviename.moviename.trim()
    );
    const id = selectedMovie[0].imdbID;
    this.get_movie(id);
  } catch (err) {
    console.log(err);
  }
};
