import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { CounterContext } from "../App";
import Spinner from "./Spinner";
import Tweet from "./Tweet";

const LISTS = styled.div`
  display: flex;
  overflow-y: auto;
  height: 500px;
  margin-bottom: ${({ theme }) => theme.space[5]};
`;
const UL = styled.ul`
  flex: 0.5;
  list-style: none;
`
const ERROR = styled.p`
  padding: 20px;
  margin: 0 20%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.ui.error};
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: white;
  text-align: center;
`;
const TweetsSection = () => {
  const { state, dispatch } = useContext(CounterContext);
  const { word1, word2, tweets1, tweets2, error, isSubmitted } = state;

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
    if (isSubmitted) {
      streamTweets();
    }
    dispatch({ type: 'set_chart_data', payload: [] });
    dispatch({ type: "init_counter1" });
    dispatch({ type: "init_counter2"});
    dispatch({ type: "clear_tweet1" });
    dispatch({ type: "clear_tweet2" });
  }, [word1, word2, isSubmitted]);

  // display tweets lists
  const showTweets = () => {
      return (
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
      );
  };

  return (
    <>
      { (error && Object.keys(error).length !== 0 && isSubmitted ) && <ERROR>{error.source || error.code}</ERROR> }
      {(isSubmitted && (tweets1.length === 0 || tweets2.length === 0)) && <Spinner />}
      {(isSubmitted && tweets1.length > 0 && tweets2.length > 0) && showTweets()}
    </>
  );
};

export default TweetsSection;
