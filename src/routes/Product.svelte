<script lang="ts">
	import Marquee from '$lib/Marquee.svelte';
	import TextShadow from '$lib/TextShadow.svelte';

	let {
		title,
		description,
		marqItems,
		imgSrc,
		imgClass = 'animate-float blue-tint absolute top-0 right-0 z-0 transition-all group-hover:translate-[-2rem]',
		children
	}: {
		title: string;
		description: string;
		marqItems: string[];
		imgSrc: string;
		imgClass?: string;
		children: any;
	} = $props();
</script>

<!-- SEEDPLEX -->
<div
	class="text-brand-primary group relative isolate container min-h-[400px] max-w-[600px] overflow-hidden bg-black px-[20px] py-10 text-xl md:rounded-4xl md:py-12"
>
	<div
		class="animate-float absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-blue-500/50 blur-3xl"
	></div>
	<div
		class="animate-float absolute right-30 bottom-24 h-32 w-32 rounded-full bg-purple-500/50 blur-3xl"
	></div>
	<img src={imgSrc} alt={title} class={imgClass} />
	<div class="relative z-10">
		<TextShadow
			text={title}
			className="text-brand-highlight text-[3.25rem] font-bold xl:text-7xl"
			shadowColor="var(--color-brand-highlight)"
		/>
		<p class="mb-4 min-h-[5.25rem] w-fit rounded-xl px-1 backdrop-blur-sm">
			{description}
		</p>

		<Marquee>
			{#each marqItems as item (item)}
				<span class="text-brand-highlight">{item}</span>
			{/each}
		</Marquee>

		{@render children()}
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
