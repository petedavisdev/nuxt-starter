export function useGet<T>(url: string) {
	const data = ref<T | null>(null);
	const error = ref<string>();
	const pending = ref(false);

	async function execute() {
		try {
			pending.value = true;
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			data.value = (await res.json()) as T;
		} catch (err) {
			error.value = (err as Error).toString();
		} finally {
			pending.value = false;
		}
	}

	execute();

	return { data, error, pending, execute };
}
