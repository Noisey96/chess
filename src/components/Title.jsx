export default function Title(props) {
	let { playing } = props;
	return (
		<div className={playing ? 'hidden' : ''}>
			<div>Chess</div>
			<div>Play a game of chess against a computer!</div>
		</div>
	);
}
