/**
 * Created by zachs on 11.07.2017.
 */

const request = require('request');
const nchan = process.env.PUBLISHER;

function broadcastEvent(eventName, data) {
  // Gets url from environment variable
  let urljoin = "";
  if (!nchan.includes("http")) urljoin = "http://";
  urljoin = urljoin + nchan;
  if (!nchan.includes(":")) urljoin = urljoin + ":1080";
  if (!nchan.includes("/pub")) urljoin = urljoin + "/pub";

  // post message to nchan
  request.post({
    headers: {'content-type': 'application/json'},
    url: urljoin,
    body: JSON.stringify({type: eventName, data: data})
  }, function (error, response, body) {
  });
}

module.exports = broadcastEvent;


