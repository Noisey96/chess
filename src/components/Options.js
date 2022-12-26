import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { engines } from '../utilities/engines';
import { updateState } from '../utilities/functions';

export default function Options(props) {
	let { game, setGame, opponent, setOpponent, boardOrientation, setBoardOrientation } = props;

	function restartGame() {
		updateState(setGame, (game) => {
			game.reset();
		});
		if (boardOrientation === 'black') {
			setTimeout(() => {
				let engine = engines[opponent];
				let chosenMove = engine(game, boardOrientation);
				updateState(setGame, (game) => {
					game.move(chosenMove);
				});
			}, 500);
		}
	}

	function endGame() {
		updateState(setGame, (game) => {
			game.reset();
		});
		setOpponent(null);
		setBoardOrientation('white');
	}

	return (
		<Stack direction="horizontal">
			<Button variant="secondary" disabled>
				Undo
			</Button>
			<Button variant="secondary" disabled>
				Redo
			</Button>
			<Button variant="warning" onClick={restartGame}>
				Restart
			</Button>
			<Button variant="danger" onClick={endGame}>
				New Game
			</Button>
		</Stack>
	);
}
