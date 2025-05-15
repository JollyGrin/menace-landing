<script lang="ts">
	import VanillaTilt from 'vanilla-tilt';
	import Marquee from '$lib/Marquee.svelte';
	import { onMount } from 'svelte';
	import HeroTiltCard from '$lib/HeroTiltCard.svelte';

	let tiltRef: HTMLElement | null = $state(null);
	onMount(() => {
		if (tiltRef) {
			VanillaTilt.init(tiltRef, {
				max: 25,
				speed: 400,
				glare: true,
				transition: true,
				'max-glare': 0.5
			});
		}
	});
</script>

<Marquee numberOfCopies={10} pauseOnHover>
	<HeroTiltCard src="/people/George_Washington.png" title="George Washington" />
	<HeroTiltCard src="/people/Emmeline_Pankhurst.png" title="Emmeline Pankhurst" />
</Marquee>
<Marquee numberOfCopies={10} pauseOnHover reverse>
	<HeroTiltCard />
</Marquee>
