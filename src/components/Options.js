import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function Options(props) {
	let endGame = props.endGame;

	return (
		<Stack direction="horizontal">
			<Button variant="secondary" disabled>
				Undo
			</Button>
			<Button variant="secondary" disabled>
				Redo
			</Button>
			<Button variant="warning">Restart</Button>
			<Button variant="danger" onClick={endGame}>
				New Game
			</Button>
		</Stack>
	);
}
