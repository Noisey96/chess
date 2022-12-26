export function updateState(setState, update) {
	setState((state) => {
		const copy = { ...state };
		update(copy);
		return copy;
	});
}
