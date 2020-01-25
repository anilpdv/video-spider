# video-spider

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

video-spider is cli for generating movie links based on imdb ids.

```sh
$ video-spider -h
Usage: commands [options] [command]

video-spider

Options:
  -V, --version        output the version number
  -h, --help           output usage information

Commands:
  watch|w <watch>      get movies list by search, and generate movie link
  imdbid|id <videoId>  gets the movie link
```

## Usage

```sh
$ video-spider watch 'the irishman'
? Select a movie to watch (Use arrow keys)
> The Irishman : 2019
  Kill the Irishman : 2011
  The Irishman: In Conversation : 2019
  The Flying Irishman : 1939
  Danny Greene: The Rise and Fall of the Irishman : 2009
  The Irishman : 1978
  Hitler's Irishman: The Story of Lord Haw-Haw : 2005
```

```sh
$ video-spider id tt0120689
```
