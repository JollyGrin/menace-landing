<script lang="ts">
	import IconContract from '$lib/icon/IconContract.svelte';
	import IconMoneyTransfer from '$lib/icon/IconMoneyTransfer.svelte';
	import IconShield from '$lib/icon/IconShield.svelte';
	import Quote from '$lib/Quote.svelte';
	import TextShadow from '$lib/TextShadow.svelte';
	import Footer from './Footer.svelte';
	import Product from './Product.svelte';
</script>

<div class="to-brand-secondary relative mx-auto bg-gradient-to-t from-black via-black pb-0">
	<img src="/logo.png" alt="logo" class="mx-auto w-[150px] md:w-[200px]" />
	<Quote />
</div>

<div class="flex flex-col xl:flex-row">
	<!-- SEEDPLEX -->
	<Product
		title="Seedplex"
		imgSrc="/moneylego.png"
		description="A launchpad that transforms securities into DeFi-compatible tokens, aligning founder fundraising with traditional capital investment."
		marqItems={['pre-seed', 'seed equity', 'tranched debt', 'convertible debt']}
	>
		<div class="group mt-4 flex flex-col gap-2">
			<span class="inline-flex items-center">
				<IconShield
					width="20px"
					height="20px"
					className="bg-brand-highlight/80 mx-2 rounded border-white/10 border-2 group-hover:bg-brand-highlight transition-all"
				/> Investor protections with DeFi compatibility
			</span>
			<span class="inline-flex items-center">
				<IconMoneyTransfer
					width="20px"
					height="20px"
					className="bg-brand-highlight/80 mx-2 rounded border-white/10 border-2 group-hover:bg-brand-highlight transition-all"
				/> Reduced friction for private securities transfers
			</span>

			<span class="inline-flex items-center">
				<IconContract
					width="20px"
					height="20px"
					className="bg-brand-highlight/80 mx-2 rounded border-white/10 border-2 group-hover:bg-brand-highlight transition-all"
				/> Startup equity as collateral for bond offerings
			</span>
		</div>
	</Product>

	<!-- BLOCK MARKETS -->
	<div
		class="text-brand-primary group relative isolate container mx-auto max-w-[600px] overflow-hidden px-[20px] py-10 text-xl md:py-16"
	>
		<div class="absolute top-1/4 right-1/4 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"></div>
		<div class="absolute bottom-24 left-30 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"></div>
		<img
			src="/case.png"
			alt="money lego"
			class="animate-float blue-tint absolute top-20 right-0 z-0 w-[220px] transition-all group-hover:translate-[-2rem] md:w-[250px]"
		/>
		<div class="relative z-10">
			<TextShadow
				text="Blockmarkets"
				className="text-brand-highlight text-6xl font-bold"
				shadowColor="var(--color-brand-highlight)"
			/>

			<p class="w-fit rounded-full px-1 backdrop-blur-sm">Financial integrations for all tokens.</p>
			<p class="mt-6">Styles of trading available</p>
			<div class="mt-2 flex flex-wrap gap-2">
				{#each ['OTC', 'DCA', 'Borrow/Lend', 'Proprietary Algorithmic'] as seed (seed)}
					<div class="rounded-xl bg-black px-4 py-[4px]">{seed}</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<Footer />

<!-- <div class="h-4"></div> -->
<!-- <MarqueeSection /> -->

<style>
	img.blue-tint {
		filter: grayscale(100%) sepia(100%) hue-rotate(200deg) saturate(150%);
	}
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
