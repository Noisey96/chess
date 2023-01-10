export default function Title(props) {
	let { playing } = props;
	return (
		<div className={playing ? 'hidden' : undefined}>
			<div id="title">Chess</div>
			<div id="description">Play a game of chess against a computer!</div>
		</div>
	);
}
