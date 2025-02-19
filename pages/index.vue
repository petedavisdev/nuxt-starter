<script setup lang="ts">
type Product = {
	id: number;
	title: string;
	thumbnail: string;
};

type ProductsResponse = {
	products: Product[];
};

const endpoint = 'https://dummyjson.com/products/search';

const route = useRoute();
const query = computed(() => route.query);

const { data, error, status } = useFetch<ProductsResponse>(endpoint, { query });
</script>

<template>
	<div>
		<h1>Home</h1>

		<ProductSearch />

		<section v-if="status === 'success'" class="grid">
			<article v-for="product in data?.products" :key="product.id">
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
