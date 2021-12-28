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
`;
const SubmitButton = styled.div`
    flex: 0.5;
    text-align: end;
    padding: ${({ theme }) => theme.space[3]};
`;

const ResetButton = styled.div`
    flex: 0.5;
    text-align: start;
    padding: ${({ theme }) => theme.space[3]};
`;

const Button = styled.button`
    background: ${({ primary, theme }) => primary ? theme.colors.bg.primary : theme.colors.bg.secondary};
    color: ${({ primary, theme }) => primary ? theme.colors.bg.secondary : theme.colors.bg.primary};
    font-size: ${({ theme }) => theme.fontSizes.body};
    margin: ${({ theme }) => theme.space[1]};
    padding: 0.25em 1em;
    border: 2px solid ${({ theme }) => theme.colors.bg.primary};
    border-radius: 3px;
    width: 100px;
    cursor: pointer;
    :hover {
        color: ${({ primary, theme }) => primary ? theme.colors.bg.primary : theme.colors.bg.secondary};
        background: ${({ primary, theme }) => primary ? theme.colors.bg.secondary : theme.colors.bg.primary};
        opacity: 0.7;
    }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.space[2]};
  color: #fdba4e;
  font-size: ${({ theme }) => theme.fontSizes.body};
  background: #fdf6eb;
  border: 2px solid #fdba4e;
  border-radius: 3px;
  ::placeholder {
        color: #fdba4e;
        opacity: 0.5;
  }
`;


const FieldsSection = () => {
  const { state, dispatch, socket } = useContext(CounterContext);
  const { word1, word2 } = state;

    const handleSubmit = (event) => {
        event.preventDefault();
        socket.emit("send_tracks", {word1, word2});
        dispatch({ type: 'update_submited', payload: true });
    }

    const handleReset = () => {
        dispatch({ type: "set_word1", payload: '' });
        dispatch({ type: "set_word2", payload: '' });
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