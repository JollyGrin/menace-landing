<script lang="ts">
	import AudioPlayer from '$lib/AudioPlayer.svelte';
	import IconContract from '$lib/icon/IconContract.svelte';
	import IconMoneyTransfer from '$lib/icon/IconMoneyTransfer.svelte';
	import IconShield from '$lib/icon/IconShield.svelte';
	import Quote from '$lib/Quote.svelte';
	import BackdropCanvas from '$lib/ThreeBackdrop/BackdropCanvas.svelte';
	import Footer from './Footer.svelte';
	import Product from './Product.svelte';
</script>

<div
	class="to-brand-secondary via-brand-secondary relative mx-auto bg-gradient-to-t from-black pt-10 md:bg-gradient-to-b md:via-black"
>
	<Quote />
	<img src="/logo.png" alt="logo" class="relative z-20 mx-auto w-[150px] md:w-[200px]" />

	<div class="absolute bottom-0 z-0 h-[65vh] w-full opacity-50">
		<BackdropCanvas />
	</div>
</div>

<!-- <div class="to-brand-secondary h-5 bg-gradient-to-t from-black md:hidden"></div> -->

<div
	class="container mx-auto flex flex-col flex-wrap items-center justify-center md:mt-0 md:gap-10 md:px-0 md:pb-10 xl:flex-row"
>
	<!-- SEEDPLEX -->
	<Product
		title="Seedplex"
		imgSrc="/moneylego.png"
		description="A launchpad that transforms securities into DeFi-compatible tokens, aligning founder fundraising with traditional capital investment."
		marqItems={['pre-seed', 'seed equity', 'tranched debt', 'convertible debt']}
	>
		<div class="group mt-4 flex flex-col gap-2">
			<span class="inline-flex items-start md:items-center">
				<IconShield
					width="20px"
					height="20px"
					className="bg-brand-highlight/80 mt-1 md:mt-0 mx-2 rounded border-brand-highlight/30 border-2 group-hover:bg-brand-highlight transition-all"
				/> Investor protections with DeFi compatibility
			</span>
			<span class="inline-flex items-start md:items-center">
				<IconMoneyTransfer
					width="20px"
					height="20px"
					className="bg-brand-highlight/80 mt-1 md:mt-0 mx-2 rounded border-brand-highlight/30 border-2 group-hover:bg-brand-highlight transition-all"
				/> Reduced friction for private securities transfers
			</span>

			<span class="inline-flex items-start md:items-center">
				<IconContract
					width="20px"
					height="20px"
					className="bg-brand-highlight/80 mt-1 md:mt-0 mx-2 rounded border-brand-highlight/30 border-2 group-hover:bg-brand-highlight transition-all"
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
			<span class="inline-flex items-start md:items-center">
				{@render numberDot(1)}
				Sellers list a block → buyers place bids while sale is live
			</span>

			<span class="inline-flex items-start md:items-center">
				{@render numberDot(2)}
				Settlement price = time-weighted average during sale
			</span>

			<span class="inline-flex items-start md:items-center">
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
		class="bg-brand-highlight/80 group-hover:bg-brand-highlight border-brand-highlight/20 relative mx-2 mt-1 grid h-5 w-10 place-items-center rounded-full border-2 text-xs font-bold md:mt-0 md:w-5"
	>
		<span class="absolute top-0">{value}</span>
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
