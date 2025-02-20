export function debounce(callback: () => void, milliSeconds: number = 300) {
	let timeout: ReturnType<typeof setTimeout>;

	return () => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(callback, milliSeconds);
	};
}
