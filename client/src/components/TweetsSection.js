import React, { useContext, useEffect, useReducer, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import io from "socket.io-client";
import styled from "styled-components";
import { CounterContext } from "../App";
import TweetsReducer from "../reducers/TweetsReducer";
import Spinner from "./Spinner";
import Tweet from "./Tweet";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LISTS = styled.div`
  display: flex;
  overflow-y: auto;
  height: 500px;
  margin-bottom: 50px;
`;
const UL = styled.ul`
  flex: 0.5;
  list-style: none;
`
const TweetsSection = () => {
  const initialState = {
    counter1: 0,
    counter2: 0,
    tweets1: [],
    tweets2: [],
    error: {},
    isWaiting: true,
  };

  const [state, dispatch] = useReducer(TweetsReducer, initialState);
  const { counter1, counter2, tweets1, tweets2, error, isWaiting } = state;
  const [word1, setWord1, word2] = useContext(CounterContext);

  const [rechartsData, setRechartsData] = useState([]);

  const streamTweets = () => {
    let socket = io("localhost:3002/");
    socket.on("tweets1", (tweet) => {
      if (tweet) {
        dispatch({ type: "inc_counter1" });
        dispatch({ type: "add_tweet1", payload: tweet });
      }
    });
    socket.on("tweets2", (tweet) => {
      if (tweet) {
        dispatch({ type: "inc_counter2"});
        dispatch({ type: "add_tweet2", payload: tweet });
      }
    });
    socket.on("error", (data) => {
      dispatch({ type: "show_error", payload: data });
    });
    socket.on("authError", (data) => {
      dispatch({ type: "add_errors", payload: [data] });
    });
  };

  useEffect(() => {
    if (word1 !== '' && word2 !== '') {
      streamTweets();
    }
    setRechartsData([]);
    dispatch({ type: "init_counter1" });
    dispatch({ type: "init_counter2"});
    dispatch({ type: "clear_tweet1" });
    dispatch({ type: "clear_tweet2" });
  }, [word1, word2]);

  useEffect(() => {
    setRechartsData(rechartsData.length > 6 ? [{
      [word1]: (counter1 * 100) / (counter1 + counter2),
      [word2]: (counter2 * 100) / (counter1 + counter2),
    },...rechartsData] : [{
      [word1]: (counter1 * 100) / (counter1 + counter2),
      [word2]: (counter2 * 100) / (counter1 + counter2),
    },...rechartsData].slice(0, 6))
  }, [counter1, counter2, word1, word2])

  const showTweets = () => {
    if (tweets1.length > 0 && tweets2.length > 0 && word1 !== '' && word2 !== '') {
      return (
        <Container>
          <LISTS>
            <UL>
              {tweets1.slice(0, 40).map((tweet, i) => (
                <Tweet key={i}>{tweet}</Tweet>
              ))}
            </UL>
            <UL>
                {tweets2.slice(0, 40).map((tweet, i) => (
                  <Tweet key={i}>{tweet}</Tweet>
                ))}
            </UL>
          </LISTS>
          <LineChart
              width={500}
              height={300}
              data={rechartsData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={word1} stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey={word2} stroke="#82ca9d" />
            </LineChart>
        </Container>
      );
    }
  };

  return (
    <div>
      {(tweets1.length === 0 || tweets2.length === 0)  &&  word1 !== '' && word2 !== '' ? <Spinner /> : showTweets()}
    </div>
  );
};

export default TweetsSection;
