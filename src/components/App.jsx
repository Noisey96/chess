import { useState } from 'react';
import { Chess } from 'chess.js';
import Title from './Title';
import Board from './Board';
import Settings from './Settings';
import Options from './Options';

function App() {
	// state for settings
	let [difficulty, setDifficulty] = useState('easy');
	let [playAs, setPlayAs] = useState('black');

	// state for game
	let [game, setGame] = useState(new Chess());
	let [opponent, setOpponent] = useState(null);
	let [boardOrientation, setBoardOrientation] = useState(null);
	let [currentTimeout, setCurrentTimeout] = useState(null);

	return (
		<>
			<Title opponent={opponent} />
			<Board
				game={game}
				setGame={setGame}
				opponent={opponent}
				boardOrientation={boardOrientation}
				setCurrentTimeout={setCurrentTimeout}
			/>
			<div>
				{!opponent ? (
					<Settings
						difficulty={difficulty}
						setDifficulty={setDifficulty}
						playAs={playAs}
						setPlayAs={setPlayAs}
						game={game}
						setGame={setGame}
						setOpponent={setOpponent}
						setBoardOrientation={setBoardOrientation}
					/>
				) : (
					<Options
						setGame={setGame}
						opponent={opponent}
						setOpponent={setOpponent}
						boardOrientation={boardOrientation}
						setBoardOrientation={setBoardOrientation}
						currentTimeout={currentTimeout}
						setCurrentTimeout={setCurrentTimeout}
					/>
				)}
			</div>
		</>
	);
}

export default App;
