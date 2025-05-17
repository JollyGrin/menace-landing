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
	class="text-brand-primary group relative isolate container min-h-[400px] max-w-[600px] overflow-hidden px-[20px] py-10 text-xl md:rounded-4xl md:py-12"
>
	<div class="relative z-10">
		<h1 class="text-brand-highlight text-[3.25rem] font-bold xl:text-7xl">
			{title}
		</h1>
		<p class="">
			{description}
		</p>
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
