<script>
	import IconMail from '$lib/icon/IconMail.svelte';
</script>

<div
	class="text-brand-primary relative z-10 container mx-auto flex max-w-[600px] flex-col justify-center gap-6 text-4xl"
>
	<div class="flex gap-4 md:gap-10">
		<div class="flex flex-col items-center justify-center text-center text-lg font-normal">
			<img src="/logo.png" title="treggs" width={120} alt="ceo" class="rounded-xl" />
		</div>

		<div class="flex flex-col items-center justify-center text-center text-lg font-normal">
			<img src="/tregs.jpg" title="treggs" width={100} alt="ceo" class="rounded-xl" />
			<p>Treggs, CEO</p>
		</div>

		<div class="flex flex-col items-center justify-center text-center text-lg font-normal">
			<img src="/spaceman.jpg" title="spaceman" width={100} alt="cto" class="rounded-xl" />
			<p>SpacemanDev, CTO</p>
		</div>
	</div>

	<button
		class="group flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-black px-2 py-1 text-sm transition-all hover:scale-110"
	>
		<IconMail className="group-hover:animate-pulse" width="25px" height="25px" />
		<span> Get in touch </span>
	</button>

	<a href="https://x.com/MenaceFinance">
		<span>@menace.finance</span>
	</a>
</div>
