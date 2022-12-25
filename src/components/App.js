import { useState } from 'react';

import Board from './boards/Board';
import Settings from './Settings';
import Options from './Options';

function App() {
	let [opponent, setOpponent] = useState(null);
	let [boardOrientation, setBoardOrientation] = useState(null);

	function startGame() {
		setOpponent(true);
		setBoardOrientation('black');
	}

	function endGame() {
		setOpponent(null);
		setBoardOrientation('white');
	}

	return (
		<>
			<Board opponent={opponent} boardOrientation={boardOrientation} />
			<>{!opponent ? <Settings startGame={startGame} /> : <Options endGame={endGame} />}</>
		</>
	);
}

export default App;
