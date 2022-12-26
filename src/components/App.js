import { useState } from 'react';
import { Chess } from 'chess.js';

import Title from './Title';
import Board from './Board';
import Settings from './Settings';
import Options from './Options';

function App() {
	let [game, setGame] = useState(new Chess());
	let [future, setFuture] = useState([]);
	let [opponent, setOpponent] = useState(null);
	let [boardOrientation, setBoardOrientation] = useState(null);
	let [difficulty, setDifficulty] = useState('easy');
	let [playAs, setPlayAs] = useState('black');

	return (
		<>
			<Title opponent={opponent} />
			<Board
				game={game}
				setGame={setGame}
				setFuture={setFuture}
				opponent={opponent}
				boardOrientation={boardOrientation}
			/>
			<div>
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
						future={future}
						setFuture={setFuture}
						opponent={opponent}
						setOpponent={setOpponent}
						boardOrientation={boardOrientation}
						setBoardOrientation={setBoardOrientation}
					/>
				)}
			</div>
		</>
	);
}

export default App;
