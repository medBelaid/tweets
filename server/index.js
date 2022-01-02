const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");
let Twitter = require("twitter");
require('dotenv').config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`Server Running on ${port} ...`);
});

let timeout = 0;

io = socket(server);

let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_ACCESS_SECRET
});

const sleep = async (delay) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), delay));
};

var _stream = null;

const reconnect = async (socket, term1, term2) => {
  timeout++;
  await sleep(2 ** timeout * 1000);
  streamTweets(socket, term1, term2);
};
const streamTweets = (socket, term1, term2) => {
  if (_stream) {
    _stream.destroy();
  }
  client.stream("statuses/filter", { track: `${term1},${term2}` }, stream => {
    _stream = stream;
    try {
      _stream
        .on("data", (data) => {
          try {
              if (data.text) {
                if (data.text.includes(term1)) {
                  socket.emit("tweets1", data.text);
                } else if (data.text.includes(term2)) {
                  socket.emit("tweets2", data.text);
                }
              } else {
                socket.emit("authError", data.text);
              }
            } catch (e) {
            socket.emit("heartbeat");
          }
        })
        .on("error", (error) => {
          socket.emit("error", error);
          reconnect(socket, term1, term2);
        });
    } catch (authMessage) {
      socket.emit("authError", authMessage);
    }
  });
};

io.on("connection", (socket) => {
  socket.on("send_tracks", ({word1, word2}) => {
  streamTweets(io, word1, word2);
  });

  socket.on("destroy_streams", () => {
    _stream.destroy();
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    socket.disconnect();
  });
});
