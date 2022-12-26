import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { engines } from '../utilities/engines';
import { updateState } from '../utilities/functions';

export default function Options(props) {
	let {
		game,
		setGame,
		future,
		setFuture,
		opponent,
		setOpponent,
		boardOrientation,
		setBoardOrientation,
	} = props;

	function undoMove() {
		if (boardOrientation.substring(0, 1) === game.turn()) {
			updateState(setGame, (game) => {
				setFuture(future.concat(game.undo(), game.undo()));
			});
		}
	}

	function redoMove() {
		updateState(setGame, (game) => {
			game.move(future.filter((_m, i) => i >= future.length - 2)[1]);
			game.move(future.filter((_m, i) => i >= future.length - 2)[0]);
			setFuture(future.filter((_m, i) => i < future.length - 2));
		});
	}

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
			<Button variant="secondary" disabled={game.history().length < 2} onClick={undoMove}>
				Undo
			</Button>
			<Button variant="secondary" disabled={!future.length} onClick={redoMove}>
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
