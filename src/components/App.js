import { useState } from 'react';

import Board from './Board';
import Settings from './Settings';
import Options from './Options';

function App() {
	let [opponent, setOpponent] = useState(null);
	let [boardOrientation, setBoardOrientation] = useState(null);
	let [difficulty, setDifficulty] = useState('easy');
	let [playAs, setPlayAs] = useState('black');

	function startGame() {
		setOpponent(difficulty);
		if (playAs !== 'random') setBoardOrientation(playAs);
		else setBoardOrientation(Math.random() < 0.5 ? 'black' : 'white');
	}

	function endGame() {
		setOpponent(null);
		setBoardOrientation('white');
	}

	return (
		<>
			<Board opponent={opponent} boardOrientation={boardOrientation} />
			<>
				{!opponent ? (
					<Settings
						difficulty={difficulty}
						setDifficulty={setDifficulty}
						playAs={playAs}
						setPlayAs={setPlayAs}
						startGame={startGame}
					/>
				) : (
					<Options endGame={endGame} />
				)}
			</>
		</>
	);
}

export default App;
