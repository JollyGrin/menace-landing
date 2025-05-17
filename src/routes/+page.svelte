<script lang="ts">
	import Quote from '$lib/Quote.svelte';
	import Footer from './Footer.svelte';
</script>

<div class=" relative mx-auto pt-10">
	<Quote />
	<img src="/logo.png" alt="logo" class="relative z-20 mx-auto w-[150px] md:w-[200px]" />
</div>

<div class="container mx-auto flex max-w-[600px] flex-col px-2 text-xl text-white md:px-0">
	<div class="flex flex-col gap-2">
		<h1>Fundraising for founders</h1>
		<span> Most token launches fail founders: </span>
		<ul class="list-inside list-disc">
			<li>Utility tokens are clunky.</li>
			<li>Governance tokens are niche.</li>
			<li>Meme coins are off-limits for serious investors.</li>
		</ul>
		<img
			src="/shitcoin.png"
			alt="shitcoin chart"
			class="h-30 w-full rounded-xl object-bottom-left invert"
		/>
	</div>
</div>

<div class="relative py-6">
	<Footer />
</div>

<style>
	h1 {
		color: var(--color-brand-highlight);
		font-weight: 700;
		font-size: 3rem;
	}
</style>
