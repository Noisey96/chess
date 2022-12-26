import { useState } from 'react';
import { Chess } from 'chess.js';

import Board from './Board';
import Settings from './Settings';
import Options from './Options';

function App() {
	let [game, setGame] = useState(new Chess());
	let [opponent, setOpponent] = useState(null);
	let [boardOrientation, setBoardOrientation] = useState(null);
	let [difficulty, setDifficulty] = useState('easy');
	let [playAs, setPlayAs] = useState('black');

	return (
		<>
			<Board
				game={game}
				setGame={setGame}
				opponent={opponent}
				boardOrientation={boardOrientation}
			/>
			<>
				{!opponent ? (
					<Settings
						game={game}
						setGame={setGame}
						setOpponent={setOpponent}
						setBoardOrientation={setBoardOrientation}
						difficulty={difficulty}
						setDifficulty={setDifficulty}
						playAs={playAs}
						setPlayAs={setPlayAs}
					/>
				) : (
					<Options
						game={game}
						setGame={setGame}
						opponent={opponent}
						setOpponent={setOpponent}
						boardOrientation={boardOrientation}
						setBoardOrientation={setBoardOrientation}
					/>
				)}
			</>
		</>
	);
}

export default App;
