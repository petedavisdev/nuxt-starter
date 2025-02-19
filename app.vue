<template>
	<header class="container">
		<nav>
			<ul>
				<li><NuxtLink to="/">Home</NuxtLink></li>
			</ul>
			<ul>
				<li><NuxtLink to="/page1">Page 1</NuxtLink></li>
				<li><NuxtLink to="/page2">Page 2</NuxtLink></li>
			</ul>
		</nav>
	</header>

	<main class="container">
		<NuxtPage />
	</main>

	<NuxtRouteAnnouncer />
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css');
</style>
