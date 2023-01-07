import { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Title from './Title';
import Board from './Board';
import Settings from './Settings';
import Options from './Options';

function App() {
	let [game, setGame] = useState(new Chess());
	let [playing, setPlaying] = useState(false);
	let [difficulty, setDifficulty] = useState('easy');
	let [playingAs, setPlayingAs] = useState('black');
	let [currentTimeout, setCurrentTimeout] = useState(null);

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
						game={game}
						setGame={setGame}
						difficulty={difficulty}
						playingAs={playingAs}
						setCurrentTimeout={setCurrentTimeout}
					/>
				)}
			</>
			<div>
				{!playing ? (
					<Settings
						game={game}
						setGame={setGame}
						setPlaying={setPlaying}
						difficulty={difficulty}
						setDifficulty={setDifficulty}
						playingAs={playingAs}
						setPlayingAs={setPlayingAs}
					/>
				) : (
					<Options
						setGame={setGame}
						setPlaying={setPlaying}
						difficulty={difficulty}
						playingAs={playingAs}
						currentTimeout={currentTimeout}
						setCurrentTimeout={setCurrentTimeout}
					/>
				)}
			</div>
		</>
	);
}

export default App;
