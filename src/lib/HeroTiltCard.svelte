<script lang="ts">
	import VanillaTilt from 'vanilla-tilt';
	import { onMount } from 'svelte';

	let {
		src = '/people/George_Washington.png',
		title = 'George Washington',
		hideTitle = false
	}: { src: string; title: string; hideTitle: boolean } = $props();

	let tiltRef: HTMLElement | null = $state(null);
	onMount(() => {
		if (tiltRef) {
			VanillaTilt.init(tiltRef, {
				max: 25,
				speed: 400,
				glare: true,
				transition: true,
				gyroscope: true,
				'max-glare': 0.5
			});
		}
	});
</script>

<img
	bind:this={tiltRef}
	alt={title}
	title={!hideTitle ? title : undefined}
	{src}
	class="my-3 w-24 rounded-xl shadow-md transition-all duration-500 select-none hover:scale-110 hover:shadow-amber-200/10 hover:saturate-150 active:scale-110 md:w-30"
/>
