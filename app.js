const axios = require('axios');
const publicIp = require('public-ip');
const open = require('open');
const {key, secret_key} = require('./.config.js');

exports.get_movie = async videoId => {
  const ipaddress = await publicIp.v4();
  console.log('ipaddressp', ipaddress);

  const ticketUrl = `https://videospider.in/getticket.php?key=${key}&secret_key=${secret_key}&video_id=${videoId}&ip=${ipaddress}`;
  const res = await axios.get(ticketUrl);
  console.log('ticket', res.data);
  const url = `https://videospider.stream/getvideo?key=${key}&video_id=${videoId}&ticket=${
    res.data
  }`;
  console.log(url);
  await open(url);
};
