<script>
	import IconChevDown from '$lib/icon/IconChevDown.svelte';
	import IconContract from '$lib/icon/IconContract.svelte';
	import IconMoneyTransfer from '$lib/icon/IconMoneyTransfer.svelte';
	import IconShield from '$lib/icon/IconShield.svelte';
	import Marquee from '$lib/Marquee.svelte';
	import TextShadow from '$lib/TextShadow.svelte';
</script>

<!-- SEEDPLEX -->
<div
	class="text-brand-primary group relative isolate container mx-auto mt-6 max-w-[600px] overflow-hidden rounded-4xl bg-black px-[20px] py-10 text-xl md:py-16"
>
	<div class="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"></div>
	<div class="absolute right-30 bottom-24 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"></div>
	<img
		src="/moneylego.png"
		alt="money lego"
		class="animate-float blue-tint absolute top-0 right-0 z-0 transition-all group-hover:translate-[-2rem]"
	/>
	<div class="relative z-10">
		<TextShadow
			text="Seedplex"
			className="text-brand-highlight text-6xl font-bold"
			shadowColor="var(--color-brand-highlight)"
		/>
		<p class="mb-4 w-fit rounded-full px-1 backdrop-blur-sm">
			A launchpad that transforms securities into DeFi-compatible tokens, aligning founder
			fundraising with traditional capital investment.
		</p>

		<Marquee>
			{#each ['pre-seed', 'seed equity', 'tranched debt', 'convertible debt'] as item (item)}
				<span class="text-brand-highlight">{item}</span>
			{/each}
		</Marquee>

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
	</div>
</div>

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
