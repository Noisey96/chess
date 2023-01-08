import { Chess } from 'chess.js';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Title from './Title';
import Board from './Board';
import Settings from './Settings';
import Options from './Options';

function App() {
	let [history, setHistory] = useState([new Chess().fen()]);
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
						history={history}
						setHistory={setHistory}
						setPlaying={setPlaying}
						difficulty={difficulty}
						setDifficulty={setDifficulty}
						playingAs={playingAs}
						setPlayingAs={setPlayingAs}
					/>
				) : (
					<Options
						history={history}
						setHistory={setHistory}
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
