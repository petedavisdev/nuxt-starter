<script setup lang="ts">
import { z } from 'zod';

const productSchema = z.object({
	id: z.number(),
	title: z.string(),
	thumbnail: z.string(),
});

const productsResponseSchema = z.object({
	products: z.array(productSchema),
});

const endpoint = 'https://dummyjson.com/products/search';

const route = useRoute();
const query = computed(() => route.query);

const { data, error, status } = useFetch(endpoint, { query });

const validData = computed(() => {
	const validation = productsResponseSchema.safeParse(data.value);
	console.log(validation.data.products[0]);
	return validation.success ? validation.data : null;
});
</script>

<template>
	<div>
		<h1>Home</h1>

		<ProductSearch />

		<section v-if="status === 'success'" class="grid">
			<article v-for="product in validData?.products" :key="product.id">
				<NuxtLink :to="`/product/${product.id}`">
					<h3>{{ product.title }}</h3>
					<img :src="product.thumbnail" :alt="product.title" />
				</NuxtLink>
			</article>
		</section>

		<pre v-if="status === 'success'">{{ data?.products }}</pre>
		<pre v-if="status === 'error'">{{ error }}</pre>
		<p v-if="status === 'pending'">Loading...</p>
	</div>
</template>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 20px;
}
</style>
