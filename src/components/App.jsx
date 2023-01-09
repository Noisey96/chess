import { Chess } from 'chess.js';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Title from './Title';
import Settings from './Settings';
import Options from './Options';
import { engines } from '../utilities/engines';

let game = new Chess();

function App() {
	let [difficulty, setDifficulty] = useState('easy');
	let [playingAs, setPlayingAs] = useState('black');
	let [playing, setPlaying] = useState(false);
	let [gameState, setGameState] = useState({ position: game.fen(), history: game.history() });
	let [future, setFuture] = useState([]);
	let [currentTimeout, setCurrentTimeout] = useState(null);

	// changes the changed setting
	function handleSettingsChange(event) {
		let setting = event.target.name;
		if (setting === 'difficulty') setDifficulty(event.target.id);
		else if (setting === 'playingAs') setPlayingAs(event.target.id);
	}

	// starts the game
	function handleStart() {
		setPlaying(true);

		// if player has black pieces, perform computer's turn
		if (playingAs === 'black') {
			const engine = engines[difficulty];
			const chosenMove = engine(game, playingAs);
			game.move(chosenMove);
			setGameState({ position: game.fen(), history: game.history() });
		}
	}

	// performs the player's turn
	function handlePieceDrop(start, end) {
		// check for endgame scenarios
		const possibleMoves = game.moves();
		if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return false;
		}

		// perform move
		const move = game.move({
			from: start,
			to: end,
		});

		// move failed
		if (move === null) return false;

		// move succeeded
		setGameState({ position: game.fen(), history: game.history() });
		setFuture([]);
		const newTimeout = setTimeout(computerTurn, 500);
		setCurrentTimeout(newTimeout);
		return true;
	}

	// performs the computer's turn
	function computerTurn() {
		// check for endgame scenarios
		const possibleMoves = game.moves();
		if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return;
		}

		// perform move
		let engine = engines[difficulty];
		let chosenMove = engine(game, playingAs);
		game.move(chosenMove);
		setGameState({ position: game.fen(), history: game.history() });
	}

	// undos the player's last move
	function handleUndo() {
		clearTimeout(currentTimeout);
		setFuture([game.undo(), ...future]);
		if (playingAs.substring(0, 1) !== game.turn())
			setFuture((future) => [game.undo(), ...future]);
		setGameState({ position: game.fen(), history: game.history() });
	}

	// redos the player's last move
	function handleRedo() {
		// with at least two moves in future, redo both moves
		if (future.length > 1) {
			game.move(future[0]);
			game.move(future[1]);
			setFuture([...future.slice(2)]);
		}
		// with only one move in future, redo one move and perform computer'sturn
		else {
			game.move(future[0]);
			setFuture([]);

			let engine = engines[difficulty];
			let chosenMove = engine(game, playingAs);
			game.move(chosenMove);
		}
		setGameState({ position: game.fen(), history: game.history() });
	}

	// restarts the game
	function handleRestart() {
		// goes back to the beginning
		clearTimeout(currentTimeout);
		game.reset();

		// if player has black pieces, perform computer's turn
		if (playingAs === 'black') {
			let engine = engines[difficulty];
			let chosenMove = engine(game, playingAs);
			game.move(chosenMove);
		}
		setGameState({ position: game.fen(), history: game.history() });
		setFuture([]);
	}

	// ends the game
	function handleNewGame() {
		clearTimeout(currentTimeout);
		game.reset();
		setGameState({ position: game.fen(), history: game.history() });
		setFuture([]);
		setPlaying(false);
	}

	return (
		<>
			<Title playing={playing} />
			<Chessboard
				boardWidth="600"
				customBoardStyle={{
					border: '2px solid black',
					borderRadius: '4px',
				}}
				arePiecesDraggable={playing}
				boardOrientation={!playing ? 'white' : playingAs}
				position={gameState.position}
				onPieceDrop={handlePieceDrop}
			/>
			<div>
				{!playing ? (
					<Settings
						difficulty={difficulty}
						playingAs={playingAs}
						onSettingsChange={handleSettingsChange}
						onStart={handleStart}
					/>
				) : (
					<Options
						history={gameState.history}
						future={future}
						onUndo={handleUndo}
						onRedo={handleRedo}
						onRestart={handleRestart}
						onNewGame={handleNewGame}
					/>
				)}
			</div>
		</>
	);
}

export default App;
