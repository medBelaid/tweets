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


const FieldsSection = () => {
    const [word1, setWord1, word2, setWord2] = useContext(CounterContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const socket = io("localhost:3002/");
        socket.emit("send_tracks", {word1, word2});
    }

    const handleReset = () => {
        setWord1('');
        setWord2('');
        const socket = io("localhost:3002/");
        socket.emit("destroy_streams");
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Fields>
                    <label style={{ flex: 0.5, textAlign: 'end', paddingRight: 20 }}>
                        <input placeholder='word1' name="word1" value={word1} onChange={(e) => setWord1(e.target.value)} />
                    </label>
                    <label style={{ flex: 0.5, textAlign: 'start', paddingLeft: 20 }}>
                        <input placeholder='word2' name="word2" value={word2} onChange={(e) => setWord2(e.target.value)} />
                    </label>
                </Fields>
                <Buttons>
                    <SubmitButton>
                        <button type='submit' style={{ width: 100 }}>Go</button>
                    </SubmitButton>
                    <ResetButton>
                        <button type='button' style={{ width: 100 }} onClick={() => handleReset()}>Reset</button>
                    </ResetButton>
                </Buttons>
            </Form>
        </Container>
    )
}
export default FieldsSection