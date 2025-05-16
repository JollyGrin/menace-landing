<script lang="ts">
	import BgGrid from '$lib/BG_Grid.svelte';
	import HeroTiltCard from '$lib/HeroTiltCard.svelte';
	import Quote from '$lib/Quote.svelte';
	import MarqueeSection from './MarqueeSection.svelte';
</script>

<div class="container mx-auto">
	<img src="/logo.png" alt="logo" class="mx-auto w-[150px] md:w-[200px]" />
	<Quote />
	<div class="h-4"></div>
	<MarqueeSection />
</div>

<div
	class="text-brand-primary relative isolate container mx-auto max-w-[600px] overflow-hidden px-[20px] py-10 text-2xl md:py-16"
>
	<div class="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"></div>
	<div class="absolute right-30 bottom-24 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"></div>
	<img src="/moneylego.png" alt="money lego" class="animate-float absolute top-0 right-0 z-0" />
	<div class="relative z-10">
		<h1 class="text-6xl font-thin">Seedplex</h1>
		<p class="w-fit rounded-full px-1 backdrop-blur-sm">
			Tokenizing the creation of private securities turns them into
			<span class="font-bold">“money legos”</span>
		</p>

		<p class="mt-6">Types of Securities:</p>
		<div class="mt-2 flex flex-wrap gap-2 text-lg">
			{#each ['pre seed', 'seed equity', 'tranched debt', 'convertible debt'] as seed (seed)}
				<div class="rounded-xl bg-black px-4 py-[4px]">{seed}</div>
			{/each}
		</div>
	</div>
</div>

<div
	class="text-brand-primary relative container mx-auto max-w-[600px] overflow-hidden px-[20px] py-10 text-2xl md:py-16"
>
	<div class="absolute top-1/4 right-1/4 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"></div>
	<div class="absolute bottom-24 left-30 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"></div>
	<img
		src="/case.png"
		alt="money lego"
		class="animate-float absolute top-20 right-0 z-0 w-[220px] md:w-[250px]"
	/>
	<div class="relative z-10">
		<h1 class="text-6xl font-thin">Blockmarkets</h1>

		<p class="w-fit rounded-full px-1 backdrop-blur-sm">Financial integrations for all tokens.</p>
		<p class="mt-6">Styles of trading available</p>
		<div class="mt-2 flex flex-wrap gap-2 text-lg">
			{#each ['OTC', 'DCA', 'Borrow/Lend', 'Proprietary Algorithmic'] as seed (seed)}
				<div class="rounded-xl bg-black px-4 py-[4px]">{seed}</div>
			{/each}
		</div>
	</div>
</div>

<div class="relative mt-10 min-h-[60vh]">
	<div
		class="text-brand-primary absolute left-1/4 z-10 container grid h-full w-fit place-items-center text-4xl font-bold"
	>
		<div class="flex h-fit w-fit flex-col gap-3">
			<h1>The Team</h1>
			<div class="flex gap-4 md:gap-10">
				<div class="text-lg font-normal">
					<HeroTiltCard src="/tregs.jpg" title="treggs" />
					<p>Treggs, CEO</p>
				</div>

				<div class="text-lg font-normal">
					<HeroTiltCard src="/spaceman.jpg" title="treggs" />
					<p>SpacemanDev, CTO</p>
				</div>
			</div>
		</div>
	</div>
	<BgGrid />
</div>

<style>
	@keyframes float {
		0% {
			transform: translateY(0) translateX(0);
		}
		25% {
			transform: translateY(-4px) translateX(1px);
		}
		50% {
			transform: translateY(0px) translateX(-2px);
		}
		75% {
			transform: translateY(2px) translateX(1px);
		}
		100% {
			transform: translateY(0) translateX(0);
		}
	}

	.animate-float {
		animation: float 5s ease-in-out infinite;
	}
</style>
