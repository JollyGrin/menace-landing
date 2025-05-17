<script>
	import BgGrid from '$lib/BG_Grid.svelte';
	import ButtonRainbow from '$lib/ButtonRainbow.svelte';

	import HeroTiltCard from '$lib/HeroTiltCard.svelte';
</script>

<div class=" relative mx-auto mt-16 flex min-h-[54vh] justify-center">
	<div class="to-brand-secondary absolute top-22 h-[54vh] w-full bg-gradient-to-t from-black"></div>
	<div
		class="text-brand-primary absolute z-10 container grid h-full w-fit place-items-center text-4xl font-bold"
	>
		<div class="flex h-fit w-fit flex-col gap-3">
			<div class="flex flex-col gap-2">
				<h1>The Team</h1>
			</div>
			<div class="flex gap-4 md:gap-10">
				<div class="text-lg font-normal">
					<HeroTiltCard src="/tregs.jpg" title="treggs" hideTitle />
					<p>Treggs, CEO</p>
				</div>

				<div class="text-lg font-normal">
					<HeroTiltCard src="/spaceman.jpg" title="treggs" hideTitle />
					<p>SpacemanDev, CTO</p>
				</div>
			</div>

			<ButtonRainbow className="md:py-2 py-6 rounded-xl">
				<span> Get in touch </span>
			</ButtonRainbow>
		</div>
	</div>
	<BgGrid />
</div>
