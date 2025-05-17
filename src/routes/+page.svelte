<script lang="ts">
	import Quote from '$lib/Quote.svelte';
	import Footer from './Footer.svelte';
</script>

<div class=" relative mx-auto pt-10">
	<Quote />
	<img src="/logo.png" alt="logo" class="relative z-20 mx-auto w-[150px] md:w-[200px]" />
</div>

<div class="container mx-auto flex max-w-[600px] flex-col gap-2 px-2 text-xl text-white md:px-0">
	<h1 class="lowercase">Fundraising for founders</h1>
	<span> Most token launches fail founders: </span>
	<ul class="list-inside list-disc">
		<li>Utility tokens are clunky</li>
		<li>Governance tokens are niche</li>
		<li>Meme coins are off-limits for serious investors</li>
	</ul>
	<img
		src="/shitcoin.png"
		alt="shitcoin chart"
		class="h-30 w-full rounded-xl object-bottom-left invert"
	/>
	<div class="h-4"></div>
	<span>A better way: <span class="text-brand-highlight">tokenized securities</span></span>
	<ul class="list-inside list-disc">
		<li>Align fundraising with long-term growth, not speculative hype</li>
		<li>
			Launch compliant<sup class="text-brand-highlight">*</sup> security tokens tied to real fundamentals
		</li>
	</ul>
	<div class="bg-brand-highlight/60 mt-2 flex gap-3 rounded-xl p-2 font-mono text-xs">
		<sup class="text-xl font-bold">*</sup>
		<div>
			<span> Regulation Crowdfunding (Reg CF) allows eligible U.S.-based companies to: </span>
			<ul class="my-2 flex justify-between">
				<li>💵 Raise up to $5m</li>
				<li>📆 Over 12 months</li>
				<li>💼 No accrediation required</li>
			</ul>
			<span>
				through SEC-registered online crowdfunding platforms, subject to specific disclosure and
				compliance requirements.
			</span>
		</div>
	</div>

	<h1 class="mt-10 lowercase">Security Token Benefits</h1>
	<span> Everything you already love about securities, and: </span>
	<div class="grid grid-cols-2 gap-2">
		<div class="bg-brand-highlight/10 rounded-xl p-2">
			<h2>💰 Securities as collateral</h2>
			<span class="text-sm">Use STOs as "money legos" in DeFi</span>
		</div>

		<div class="bg-brand-highlight/10 rounded-xl p-2">
			<h2>🌱 Yield Bearing Assets</h2>
			<span class="text-sm">
				STOs earn dividends. No need to create sell pressure or go through loop holes of buybacks
				for ROI
			</span>
		</div>

		<div class="bg-brand-highlight/10 rounded-xl p-2">
			<h2>🪂 Exit Potential</h2>
			<span class="text-sm">
				STOs have a 1 year lock up for US Investors then become tradable to all investors (vs
				waiting for IPO, acquisition, or liquidation for liquidity)
			</span>
		</div>

		<div class="bg-brand-highlight/10 rounded-xl p-2">
			<h2>⛨ Investor Protection</h2>
			<span class="text-sm">
				Unlike traditional tokens, STOs represent a contractual obligation to future earnings of a
				company meaning they will track company performance
			</span>
		</div>
	</div>

	<h1 class="mt-10 lowercase">Upcoming products</h1>
	<div class="grid grid-cols-2 gap-2">
		<div>
			<h2>Seedplex</h2>
			<span>Launchpad for securitized token offerings (STOs)</span>
			<ul class="mt-2 text-xs">
				{#each ['✅ Tokenized Equity: Permissioned, tradable securities with built-in compliance', '🔐 Collateralized Lending: Borrow against startup equity with secured bonds or convertibles', '💰 Founder Liquidity: Offer long-tail call options to VCs to unlock personal liquidity', '🧾 Automated Compliance: Lower legal costs with programmable rules and smart contracts', '🧳 Private Carry Tokens: Tokenize carry for VC scouts and angel syndicates — keep it off-chain but provable via Arcium MPC'] as item (item)}
					{@const [title, desc] = item.split(':')}
					<li>
						{title}:<span class="opacity-50">{desc}</span>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h2>Block Markets</h2>
			<span>Decentralized and permissionless block trades on chain</span>
			<ul class="mt-2 text-xs">
				{#each ['🧱 One Home for All Token Types: Launch security tokens and standard tokens from a single, vertically integrated platform', '💧 Deep Liquidity Access: Tap into both OTC and open market liquidity — all from one interface', '📊 Smarter Execution Engine: Our proprietary algorithm outperforms basic DCA strategies by 2–3% on average', '⚙️ Flexible Settlement Terms: Build in vesting schedules, whitelisting, and other custom deal mechanics with ease'] as item (item)}
					{@const [title, desc] = item.split(':')}
					<li>
						{title}:<span class="opacity-50">{desc}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<h1 class="mt-10 lowercase">Talk to us about your raise</h1>
</div>

<div class="relative">
	<Footer />
</div>

<style>
	h1 {
		color: var(--color-brand-highlight);
		font-weight: 700;
		font-size: 3rem;
	}

	h2 {
		color: var(--color-brand-highlight);
		font-weight: 700;
		font-size: 1.25rem;
	}
</style>
