import { Chess } from 'chess.js';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Title from './Title';
import Board from './Board';
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

	// starts the game
	function handleStart() {
		setPlaying(true);

		// if player has black pieces, perform computer's turn
		if (playingAs === 'black') {
			setTimeout(() => {
				let engine = engines[difficulty];
				let chosenMove = engine(game, playingAs);
				game.move(chosenMove);
				setHistory([...history, game.fen()]);
			}, 500);
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
			<>
				{!playing ? (
					<Chessboard
						boardWidth="600"
						customBoardStyle={{
							border: '2px solid black',
							borderRadius: '4px',
						}}
						arePiecesDraggable={false}
					/>
				) : (
					<Board
						history={history}
						setHistory={setHistory}
						difficulty={difficulty}
						playingAs={playingAs}
						setCurrentTimeout={setCurrentTimeout}
					/>
				)}
			</>
			<div>
				{!playing ? (
					<Settings
						difficulty={difficulty}
						setDifficulty={setDifficulty}
						playingAs={playingAs}
						setPlayingAs={setPlayingAs}
						onStart={handleStart}
					/>
				) : (
					<Options
						setHistory={setHistory}
						difficulty={difficulty}
						playingAs={playingAs}
						currentTimeout={currentTimeout}
						setCurrentTimeout={setCurrentTimeout}
						onNewGame={handleNewGame}
					/>
				)}
			</div>
		</>
	);
}

export default App;
