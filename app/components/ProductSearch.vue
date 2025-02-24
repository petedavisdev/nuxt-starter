<script setup lang="ts">
const route = useRoute();
const q = ref(route.query.q ? route.query.q : '');

watchEffect(() => {
	q.value = route.query.q ? route.query.q : '';
});

const router = useRouter();

watch(
	q,
	debounce(() => router.push({ query: { q: q.value } }))
);
</script>

<template>
	<form>
		<input v-model="q" name="q" type="search" />
	</form>
</template>
