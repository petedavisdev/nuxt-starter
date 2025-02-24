export function debounce(fn: () => unknown, milliseconds = 500) {
	let timer: ReturnType<typeof setTimeout>;
	return function () {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn();
		}, milliseconds);
	};
}
