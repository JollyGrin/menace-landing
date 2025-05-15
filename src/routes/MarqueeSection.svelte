<script lang="ts">
	import Marquee from '$lib/Marquee.svelte';
</script>

<Marquee pauseOnHover>
	<img alt="hero" src="/people/George_Washington.png" />
	<img alt="hero" src="/people/Joan_of_Arc.png" />
</Marquee>

<style>
	:global(.marq-group) {
		& img {
			width: 5rem;
			border-radius: 0.75rem;
		}
	}
</style>
