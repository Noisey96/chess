import Board from './Board';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
	return (
		<>
			<Board />
			<Form>
				<Form.Group>
					<Form.Label>Difficulty:</Form.Label>
					<Form.Check type="radio" label="Easy" name="difficulty" inline />
					<Form.Check type="radio" label="Medium" name="difficulty" inline />
					<Form.Check type="radio" label="Hard" name="difficulty" inline />
				</Form.Group>
				<Form.Group>
					<Form.Label>Play as:</Form.Label>
					<Form.Check type="radio" label="Black" name="play-as" inline />
					<Form.Check type="radio" label="White" name="play-as" inline />
					<Form.Check type="radio" label="Random" name="play-as" inline />
				</Form.Group>
				<Button>Start Game</Button>
			</Form>
		</>
	);
}

export default App;
