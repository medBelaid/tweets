import { useContext, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
import { CounterContext } from "../App";

const Container = styled.section`
  display: flex;
  justify-content: center;
`;

const ChartSection = () => {
    const { state, dispatch } = useContext(CounterContext);
    const { chartData, word1, word2, counter1, counter2, tweets1, tweets2, isSubmitted } = state;

    useEffect(() => {
      const c1 = (counter1 * 100) / (counter1 + counter2);
      const c2 = (counter2 * 100) / (counter1 + counter2);
        dispatch({
          type: 'set_chart_data',
          payload: chartData.length > 20 ? [{
          [word1]: c1, [word2]: c2
        },...chartData] : [{
          [word1]: c1, [word2]: c2
        },...chartData].slice(0, 20) });
      }, [counter1, counter2, word1, word2])

    return (
        (isSubmitted && tweets1.length > 0 && tweets2.length > 0) && <Container>
            <LineChart
                width={500}
                height={300}
                data={chartData}
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
    )
}
export default ChartSection;