import { Chessboard } from 'react-chessboard';
import { engines } from '../utilities/engines';
import { updateState } from '../utilities/functions';

export default function Board(props) {
	let { game, setGame, opponent, boardOrientation, setCurrentTimeout, setFuture } = props;

	// player's turn
	function onDrop(start, end) {
		// check for endgame scenarios
		const possibleMoves = game.moves();
		if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return false;
		}

		// perform move
		const gameCopy = { ...game };
		const move = gameCopy.move({
			from: start,
			to: end,
		});
		setGame(gameCopy);

		// move failed
		if (move === null) return false;

		// move succeeded
		setFuture([]);
		const newTimeout = setTimeout(computerTurn, 500);
		setCurrentTimeout(newTimeout);
		return true;
	}

	function computerTurn() {
		// check for endgame scenarios
		const possibleMoves = game.moves();
		if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return;
		}

		// perform move
		let engine = engines[opponent];
		let chosenMove = engine(game, boardOrientation);
		updateState(setGame, (game) => {
			game.move(chosenMove);
		});
	}

	return (
		<Chessboard
			boardWidth="600"
			customBoardStyle={{
				border: '2px solid black',
				borderRadius: '4px',
			}}
			arePiecesDraggable={opponent}
			boardOrientation={boardOrientation}
			position={game.fen()}
			onPieceDrop={onDrop}
		/>
	);
}
