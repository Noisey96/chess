import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Settings(props) {
	let startGame = props.startGame;

	return (
		<>
			Difficulty:
			<Form.Check type="radio" label="Easy" name="difficulty" inline />
			<Form.Check type="radio" label="Medium" name="difficulty" inline />
			<Form.Check type="radio" label="Hard" name="difficulty" inline />
			Play as:
			<Form.Check type="radio" label="Black" name="play-as" inline />
			<Form.Check type="radio" label="White" name="play-as" inline />
			<Form.Check type="radio" label="Random" name="play-as" inline />
			<Button onClick={startGame}>Start Game</Button>
		</>
	);
}
