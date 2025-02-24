export function debounce(fn: () => unknown) {
	const milliseconds = 1000;
	let timer: ReturnType<typeof setTimeout>;
	return function () {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn();
		}, milliseconds);
	};
}
