import { useContext } from 'react';
import styled from 'styled-components';
import io from "socket.io-client";
import { CounterContext } from '../App';

const Container = styled.section`
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const Fields = styled.div`
    display: flex;
`;
const Buttons = styled.div`
    display: flex;
    padding: 20px;
`;
const SubmitButton = styled.div`
    flex: 0.5;
    text-align: end;
    padding: 20px;
`;

const ResetButton = styled.div`
    flex: 0.5;
    text-align: start;
    padding: 20px;
`;

const Button = styled.button`
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    width: 100px;
    cursor: pointer;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #fdba4e;
  background: #fdf6eb;
  border: 2px solid #fdba4e;
  border-radius: 3px;
  ::placeholder {
        color: #fdba4e;
        opacity: 0.5;
  }
`;


const FieldsSection = () => {
  const { state, dispatch } = useContext(CounterContext);
  const { word1, word2 } = state;

    const handleSubmit = (event) => {
        event.preventDefault();
        const socket = io("localhost:3002/");
        socket.emit("send_tracks", {word1, word2});
        dispatch({ type: 'update_submited', payload: true });
    }

    const handleReset = () => {
        dispatch({ type: "set_word1", payload: '' });
        dispatch({ type: "set_word2", payload: '' });
        const socket = io("localhost:3002/");
        socket.emit("destroy_streams");
        dispatch({ type: 'update_submited', payload: false });
    }

    const onChangeWord = (e) => {
        dispatch({ type: 'update_waiting' });
        dispatch({ type: `set_${e.target.name}`, payload: e.target.value });
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Fields>
                    <label style={{ flex: 0.5, textAlign: 'end', paddingRight: 20 }}>
                        <Input placeholder='word1' name="word1" value={word1} onChange={onChangeWord} />
                    </label>
                    <label style={{ flex: 0.5, textAlign: 'start', paddingLeft: 20 }}>
                        <Input placeholder='word2' name="word2" value={word2} onChange={onChangeWord} />
                    </label>
                </Fields>
                <Buttons>
                    <SubmitButton>
                        <Button type='submit' primary>Go</Button>
                    </SubmitButton>
                    <ResetButton>
                        <Button type='button' onClick={() => handleReset()}>Reset</Button>
                    </ResetButton>
                </Buttons>
            </Form>
        </Container>
    )
}
export default FieldsSection