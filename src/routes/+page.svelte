<script lang="ts">
	import IconShield from '$lib/icon/IconShield.svelte';
	import Quote from '$lib/Quote.svelte';
	import {
		BanknoteIcon,
		BeanIcon,
		CandlestickChartIcon,
		DoorOpenIcon,
		HandHelpingIcon,
		LandmarkIcon,
		RocketIcon,
		ScrollTextIcon,
		ShieldUserIcon,
		SproutIcon,
		TagsIcon,
		TelescopeIcon,
		ToyBrickIcon
	} from '@lucide/svelte';
	import Footer from './Footer.svelte';
</script>

<svelte:head>
	<title>Menace Finance</title>
</svelte:head>

{#snippet iconWrapper(Icon: any)}
	<div
		class="bg-brand-highlight border-brand-secondary absolute top-[-0.5rem] left-[-2.75rem] h-fit w-fit rounded-full border-b-3 p-2 md:left-[-3.35rem]"
	>
		<Icon />
	</div>
{/snippet}

<img src="/logo.png" alt="logo" class="relative z-20 mx-auto w-[125px] md:w-[150px]" />
<div class="border-brand-highlight border-t-3 border-b-3 bg-black py-4">
	<Quote />
</div>
<div class="mx-auto max-w-[600px]">
	<div
		class="border-brand-highlight text-brand-primary ml-6 flex min-h-[30vh] flex-col gap-16 border-l-3 px-6 py-10 md:pr-0 md:pl-8"
	>
		<!-- START: ASSEMBLY -->
		<div class="relative">
			{@render iconWrapper(TagsIcon)}
			<h1>Types of security offerings</h1>
			<ul class="mt-2 flex flex-col gap-2 md:mt-4">
				<li><BeanIcon /> Pre-Seed / Seed Equity</li>
				<li><HandHelpingIcon /> Debt Offerings</li>
				<li><TelescopeIcon /> Exotic Financial Products</li>
			</ul>
		</div>

		<div class="relative">
			{@render iconWrapper(RocketIcon)}

			<div class="relative flex w-fit items-center gap-2">
				<h1>Launch on Seedplex</h1>

				<img
					src="/seedplex-icon.png"
					alt="block markets icon"
					class="absolute top-[-0.75rem] right-[-2rem] h-10"
				/>
			</div>
			<ul class="mt-2 flex flex-col gap-2 md:mt-4">
				<li><ToyBrickIcon /> Turn private securities into “money legos”</li>
				<li><ScrollTextIcon /> Achieved using Reg D in the US</li>
			</ul>
		</div>

		<div class="relative">
			{@render iconWrapper(LandmarkIcon)}
			<h1>Superpowered Securities</h1>
			<div class="grid grid-cols-1 gap-4 md:mt-3 md:grid-cols-2">
				<!-- START: SUPERPOWERS -->
				<div class="superpower">
					<BanknoteIcon class="shrink-0" />
					<div>
						<h2>Securities as Collateral</h2>
						<span>Use STOs as "money legos" in DeFi</span>
					</div>
				</div>

				<div class="superpower">
					<SproutIcon class="shrink-0" />
					<div>
						<h2>Yield bearing assets</h2>
						<span
							>STOs earn dividends. No need to create sell pressure or go through loop holes of
							buybacks for ROI</span
						>
					</div>
				</div>

				<div class="superpower">
					<DoorOpenIcon class="shrink-0" />
					<div>
						<h2>Exit Potential</h2>
						<span>
							STOs have a 1 year lock up for US Investors then become tradable to all investors (vs
							waiting for IPO, acquisition, or liquidation for liquidity)
						</span>
					</div>
				</div>

				<div class="superpower">
					<ShieldUserIcon class="shrink-0" />
					<div>
						<h2>Investor Protection</h2>
						<span>
							Unlike traditional tokens, STOs represent a contractual obligation to future earnings
							of a company meaning they will track company performance
						</span>
					</div>
				</div>

				<!-- END: SUPERPOWERS -->
			</div>
		</div>

		<div class="relative">
			{@render iconWrapper(CandlestickChartIcon)}
			<div class="relative flex w-fit items-center gap-2">
				<h1>Trade on Block Markets</h1>
				<img
					src="/blockmarkets-icon.png"
					alt="block markets icon"
					class="absolute top-[-0.75rem] right-[-3rem] h-10"
				/>
			</div>
			<div class="customer-types mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<h2>Retail Sellers</h2>
					<span>
						Tapping OTC-style liquidity and open markets at the same time ensures optimal execution.
					</span>
				</div>

				<div>
					<h2>Professional Market Makers</h2>
					<span>
						Allows large buys into desired tokens at potential discounts with standard settlement
						practices.
					</span>
				</div>

				<div>
					<h2>Treasury Managers</h2>
					<span>
						Enables native vesting, whitelisting, and fixed-price settlements for streamlined
						treasury operations.
					</span>
				</div>

				<div>
					<h2>Privacy Minded Traders</h2>
					<span> Supports dark-pool style trading for spot tokens on Solana via Arcium. </span>
				</div>
			</div>
		</div>
		<!-- END: ASSEMBLY -->
	</div>
</div>

<div
	class="border-brand-highlight relative grid place-items-center border-t-3 border-b-3 bg-black py-4"
>
	<Footer />
</div>

<style>
	li {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	h1 {
		color: var(--color-brand-highlight);
		font-size: 1.25rem;
		line-height: 1.25rem;
	}

	.customer-types {
		> div {
			/* background-color: var(--color-brand-highlight); */
			border-radius: 0.25rem;
			padding: 0.25rem 0.25rem;

			& h2 {
				font-weight: 700;
			}
			& span {
				display: block;
				font-size: var(--text-xs);
				line-height: var(--text-md);
			}
		}
	}

	.superpower {
		display: flex;
		align-items: start;
		gap: 1rem;

		:global(& svg) {
			margin-top: 0.5rem;
		}

		& h2 {
			font-weight: 700;
		}
		& span {
			display: block;
			font-size: var(--text-xs);
			line-height: var(--text-md);
		}
	}
</style>
