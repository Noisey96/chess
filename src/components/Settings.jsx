import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import './Settings.css';

export default function Settings(props) {
	let { difficulty, setDifficulty, playingAs, setPlayingAs, onStart } = props;

	// handle change to the difficulty form group
	function handleDifficultyChange(event) {
		setDifficulty(event.target.id);
	}

	// handle change to the playAs form group
	function handlePlayingAsChange(event) {
		let choice = event.target.id;
		if (choice === 'random') choice = Math.random() < 0.5 ? 'black' : 'white';
		setPlayingAs(choice);
	}

	function handleStartClick() {
		onStart();
	}

	return (
		<Stack id="settings" direction="horizontal" gap="5">
			<Form.Group controlId="difficulty">
				<Form.Label>Difficulty:</Form.Label>
				<Form.Check
					type="radio"
					name="difficulty"
					id="easy"
					label="Easy"
					checked={difficulty === 'easy'}
					onChange={handleDifficultyChange}
				/>
				<Form.Check
					type="radio"
					name="difficulty"
					id="medium"
					label="Medium"
					checked={difficulty === 'medium'}
					onChange={handleDifficultyChange}
				/>
				<Form.Check
					type="radio"
					name="difficulty"
					id="hard"
					label="Hard"
					checked={difficulty === 'hard'}
					onChange={handleDifficultyChange}
				/>
			</Form.Group>
			<Form.Group controlId="playAs">
				<Form.Label>Play As:</Form.Label>
				<Form.Check
					type="radio"
					name="play-as"
					id="black"
					label="Black"
					checked={playingAs === 'black'}
					onChange={handlePlayingAsChange}
				/>
				<Form.Check
					type="radio"
					name="play-as"
					id="white"
					label="White"
					checked={playingAs === 'white'}
					onChange={handlePlayingAsChange}
				/>
				<Form.Check
					type="radio"
					name="play-as"
					id="random"
					label="Random"
					checked={playingAs === 'random'}
					onChange={handlePlayingAsChange}
				/>
			</Form.Group>
			<Button size="lg" onClick={handleStartClick}>
				Start
			</Button>
		</Stack>
	);
}
