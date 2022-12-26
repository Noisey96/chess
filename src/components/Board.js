import { Chessboard } from 'react-chessboard';

import { engines } from '../utilities/engines';
import { updateState } from '../utilities/functions';

export default function Board(props) {
	let { game, setGame, opponent, boardOrientation } = props;

	function onDrop(start, end) {
		const gameCopy = { ...game };
		const move = gameCopy.move({
			from: start,
			to: end,
		});
		setGame(gameCopy);

		if (move === null) return false;

		setTimeout(computerTurn, 500);
		return true;
	}

	function computerTurn() {
		const possibleMoves = game.moves();
		if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return;
		}
		let engine = engines[opponent];
		let chosenMove = engine(game, boardOrientation);
		updateState(setGame, (game) => {
			game.move(chosenMove);
		});
	}

	return (
		<Chessboard
			arePiecesDraggable={opponent}
			boardOrientation={boardOrientation}
			onPieceDrop={onDrop}
			position={game.fen()}
		/>
	);
}
