export default function Settings(props) {
	let { difficulty, playingAs, onSettingsChange, onStart } = props;

	function handleDifficultyChange(event) {
		onSettingsChange(event);
	}

	function handlePlayingAsChange(event) {
		onSettingsChange(event);
	}

	function handleStartClick() {
		onStart();
	}

	return (
		<>
			<div className="form-control w-full max-w-xs">
				<label className="label" htmlFor="difficulty">
					<span className="label-text">Difficulty:</span>
				</label>
				<select
					className="select-info select"
					name="difficulty"
					onChange={handleDifficultyChange}
				>
					<option value="easy" selected={difficulty === 'easy'}>
						Easy
					</option>
					<option value="medium" selected={difficulty === 'medium'}>
						Medium
					</option>
					<option value="hard" selected={difficulty === 'hard'}>
						Hard
					</option>
				</select>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label" htmlFor="playingAs">
					<span className="label-text">Playing As:</span>
				</label>
				<select
					className="select-info select"
					name="playingAs"
					onChange={handlePlayingAsChange}
				>
					<option value="black" selected={playingAs === 'black'}>
						Black
					</option>
					<option value="white" selected={playingAs === 'white'}>
						White
					</option>
				</select>
			</div>
			<button className="btn-primary btn-lg btn" onClick={handleStartClick}>
				Start
			</button>
		</>
	);
}
