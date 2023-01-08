import { Chess } from 'chess.js';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Title from './Title';
import Settings from './Settings';
import Options from './Options';
import { engines } from '../utilities/engines';

let game = new Chess();

function App() {
	let [history, setHistory] = useState([game.fen()]);
	let [playing, setPlaying] = useState(false);
	let [difficulty, setDifficulty] = useState('easy');
	let [playingAs, setPlayingAs] = useState('black');
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
			const newTimeout = setTimeout(() => {
				let engine = engines[difficulty];
				let chosenMove = engine(game, playingAs);
				game.move(chosenMove);
				setHistory([...history, game.fen()]);
			}, 500);
			setCurrentTimeout(newTimeout);
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
		setHistory([...history, game.fen()]);
		const newTimeout = setTimeout(computerTurn, 500);
		setCurrentTimeout(newTimeout);
		return true;
	}

	// performs the computer's turn
	function computerTurn() {
		setHistory((history) => {
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
			return [...history, game.fen()];
		});
	}

	// undos the player's last move
	function handleUndo() {}

	// redos the player's last move
	function handleRedo() {}

	// restarts the game
	function handleRestart() {
		// goes back to the beginning
		clearTimeout(currentTimeout);
		game.reset();
		let newHistory = [game.fen()];

		// if player has black pieces, perform computer's turn
		if (playingAs === 'black') {
			const newTimeout = setTimeout(() => {
				let engine = engines[difficulty];
				let chosenMove = engine(game, playingAs);
				game.move(chosenMove);
				newHistory = [...newHistory, game.fen()];
				setHistory(newHistory);
			}, 250);
			setCurrentTimeout(newTimeout);
		} else {
			setHistory(newHistory);
		}
	}

	// ends the game
	function handleNewGame() {
		clearTimeout(currentTimeout);
		game.reset();
		setHistory([game.fen()]);
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
				position={history[history.length - 1]}
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
