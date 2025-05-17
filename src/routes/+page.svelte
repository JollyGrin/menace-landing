<script lang="ts">
	import IconContract from '$lib/icon/IconContract.svelte';
	import IconMoneyTransfer from '$lib/icon/IconMoneyTransfer.svelte';
	import IconShield from '$lib/icon/IconShield.svelte';
	import Quote from '$lib/Quote.svelte';
	import BackdropCanvas from '$lib/ThreeBackdrop/BackdropCanvas.svelte';
	import Footer from './Footer.svelte';
	import Product from './Product.svelte';
</script>

<div class="to-brand-secondary relative mx-auto bg-gradient-to-b from-black via-black pb-10">
	<img src="/logo.png" alt="logo" class="mx-auto w-[150px] md:w-[200px]" />
	<Quote />

	<div class="absolute bottom-0 h-[65vh] w-full">
		<BackdropCanvas />
	</div>
</div>

<div class="to-brand-secondary h-20 bg-gradient-to-t from-black md:hidden"></div>

<div
	class="container mx-auto flex flex-col flex-wrap items-center justify-center md:gap-10 md:px-0 md:pb-10 xl:flex-row"
>
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

	<Product
		title="BlockMarkets"
		description="Decentralized, permissionless block trades on-chain."
		imgSrc="/case.png"
		imgClass="animate-float blue-tint absolute top-20 right-0 z-0 w-[220px] transition-all group-hover:translate-[-2rem] md:w-[250px]"
		marqItems={['OTC', 'DCA', 'Borrow/Lend', 'Proprietary Algorithmic']}
	>
		<div class="group mt-4 flex w-fit flex-col gap-2 rounded pr-2 backdrop-blur-sm">
			<span class="inline-flex items-center">
				{@render numberDot(1)}
				Sellers list a block → buyers place bids while sale is live
			</span>

			<span class="inline-flex items-center">
				{@render numberDot(2)}
				Settlement price = time-weighted average during sale
			</span>

			<span class="inline-flex items-center">
				{@render numberDot(3)}
				Tokens distributed pro-rata to contributors
			</span>
		</div>
	</Product>
</div>

<div class="to-brand-secondary h-20 bg-gradient-to-b from-black md:hidden"></div>

<div class="relative">
	<Footer />

	<div
		class="to-brand-secondary absolute bottom-[-10rem] z-0 h-[54vh] w-full bg-gradient-to-t from-black"
	></div>
</div>

<!-- <div class="h-4"></div> -->
<!-- <MarqueeSection /> -->

{#snippet numberDot(value: string | number)}
	<div
		class="bg-brand-highlight relative mx-2 grid h-5 w-5 place-items-center rounded-full border-2 border-white/20 text-xs font-bold"
	>
		<span class="absolute">{value}</span>
	</div>
{/snippet}

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
