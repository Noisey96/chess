import { Chessboard } from 'react-chessboard';

import { engines } from '../utilities/engines';
import { updateState } from '../utilities/functions';

export default function Board(props) {
	let { game, setGame, setFuture, opponent, boardOrientation } = props;

	function onDrop(start, end) {
		const possibleMoves = game.moves();
		if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return false;
		}

		const gameCopy = { ...game };
		const move = gameCopy.move({
			from: start,
			to: end,
		});
		setGame(gameCopy);

		if (move === null) return false;

		setFuture([]);
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
			boardWidth="600"
			customBoardStyle={{
				border: '2px solid black',
				borderRadius: '4px',
			}}
			onPieceDrop={onDrop}
			position={game.fen()}
		/>
	);
}
