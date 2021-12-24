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

var _stream1 = null;
var _stream2 = null;

const reconnect = async (socket, term, isTheFirstTerm) => {
  timeout++;
  await sleep(2 ** timeout * 1000);
  if (isTheFirstTerm) {
    streamTweets1(socket, term, true);
  } else {
    streamTweets2(socket, term, false);
  }
};
const streamTweets1 = (socket, term, isTheFirstTerm) => {
  if (_stream1) {
    _stream1.destroy();
  }
  client.stream("statuses/filter", { track: term }, stream => {
    _stream1 = stream;
    try {
      _stream1
        .on("data", (data) => {
          try {
              if (data.text) {
                socket.emit("tweets1", data.text);
              } else {
                socket.emit("authError", data.text);
              }
            } catch (e) {
            socket.emit("heartbeat");
          }
        })
        .on("error", (error) => {
          reconnect(socket, term, isTheFirstTerm);
        });
    } catch (e) {
      socket.emit("authError", "authMessage");
    }
  });
  
};
const streamTweets2 = (socket, term, isTheFirstTerm) => {
  if (_stream2) {
    _stream2.destroy();
  }
  client.stream("statuses/filter", { track: term }, stream => {
    _stream2 = stream;
    try {
      _stream2
        .on("data", (data) => {
          try {
              if (data.text) {
                socket.emit("tweets2", data.text);
              } else {
                socket.emit("authError", data.text);
              }
            } catch (e) {
            socket.emit("heartbeat");
          }
        })
        .on("error", (error) => {
          reconnect(socket, term, isTheFirstTerm);
        });
    } catch (e) {
      socket.emit("authError", "authMessage");
    }
  });
};

io.on("connection", (socket) => {
  socket.on("send_tracks", async ({word1, word2}) => {
    console.log(word1)
    const w1 = await streamTweets1(io, word1, true);
    const w2 = await streamTweets2(io, word2);
  });

  socket.on("destroy_streams", () => {
    _stream1.destroy();
    _stream2.destroy();
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    socket.disconnect();
  });
});
