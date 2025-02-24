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

const { data, status } = useFetch(endpoint, { query });

const productsData = computed(() => {
	return productsResponseSchema.safeParse(data.value);
});
</script>

<template>
	<section class="grid">
		<article v-for="product in productsData.data?.products" :key="product.id">
			<NuxtLink :to="`/product/${product.id}`">
				<div
					:style="{ opacity: status === 'pending' ? 0.2 : 1 }"
					class="loader"
				>
					<h3>{{ product.title }}</h3>
					<img :src="product.thumbnail" :alt="product.title" />
				</div>
			</NuxtLink>
		</article>

		<article v-if="!productsData.data?.products.length">
			<h3>No products found</h3>
		</article>
		<pre v-if="productsData.error">{{ productsData.error }}</pre>
	</section>
</template>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 0 20px;
}

article {
	min-height: 350px;
}

.loader {
	transition: opacity 0.3s ease-out;
}
</style>
