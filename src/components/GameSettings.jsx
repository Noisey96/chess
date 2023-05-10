export default function GameSettings(props) {
	let { onStart } = props;

	function handleSubmit(e) {
		e.preventDefault();
		const settings = Object.fromEntries(new FormData(e.target).entries());
		onStart(settings);
	}

	return (
		<form className="m-2 flex w-4/6 max-w-2xl items-end gap-3" method="post" onSubmit={handleSubmit}>
			<div className="form-control w-full max-w-xs">
				<label className="label" htmlFor="difficulty">
					<span className="label-text">Difficulty:</span>
				</label>
				<select className="select-secondary select" name="difficulty">
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label" htmlFor="playingAs">
					<span className="label-text">Playing As:</span>
				</label>
				<select className="select-secondary select" name="playingAs">
					<option value="black">Black</option>
					<option value="white">White</option>
				</select>
			</div>
			<button className="btn-primary btn-lg btn gap-1 text-2xl" type="submit">
				Start
				<ion-icon name="play-circle-sharp" aria-hidden="true"></ion-icon>
			</button>
		</form>
	);
}
