<script>
	import NavBar from '../components/nav-bar.svelte';
</script>

<div>
	<NavBar />
	<slot />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
	* {
		font-family: 'Raleway', sans-serif;
	}
</style>
