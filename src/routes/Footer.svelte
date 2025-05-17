<script>
	import BgGrid from '$lib/BG_Grid.svelte';
	import ButtonRainbow from '$lib/ButtonRainbow.svelte';

	import HeroTiltCard from '$lib/HeroTiltCard.svelte';
	import IconMail from '$lib/icon/IconMail.svelte';
</script>

<div class=" relative z-10 mx-auto mt-16 flex min-h-[60vh] justify-center">
	<div
		class="absolute bottom-0 z-20 font-black text-white opacity-25 transition-all hover:scale-110 hover:opacity-100"
	>
		<a href="https://x.com/MenaceFinance">
			<span>@menace.finance</span>
		</a>
	</div>
	<div
		class="text-brand-primary absolute z-10 container grid h-full w-fit place-items-center text-4xl font-bold"
	>
		<div class="flex h-fit w-fit flex-col gap-3">
			<div class="flex flex-col gap-2">
				<h1>The Team</h1>
			</div>
			<div class="flex gap-4 md:gap-10">
				<div class="flex flex-col items-center justify-center text-center text-lg font-normal">
					<HeroTiltCard src="/tregs.jpg" title="treggs" hideTitle />
					<p>Treggs, CEO</p>
				</div>

				<div class="flex flex-col items-center justify-center text-center text-lg font-normal">
					<HeroTiltCard src="/spaceman.jpg" title="treggs" hideTitle />
					<p>SpacemanDev, CTO</p>
				</div>
			</div>

			<ButtonRainbow className="md:py-2 py-6 rounded-xl flex group">
				<IconMail className="group-hover:animate-pulse" />
				<span> Get in touch </span>
			</ButtonRainbow>
		</div>
	</div>
	<BgGrid />
</div>
