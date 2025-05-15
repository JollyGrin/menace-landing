<script lang="ts">
	import { cn } from './utils.js';
	type Direction = 'left' | 'up';
	export let direction: Direction = 'left';
	export let pauseOnHover: boolean = false;
	export let reverse: boolean = false;
	export let fade: boolean = true;
	export let innerClassName: string = '';
	export let numberOfCopies: number = 6;
</script>

<div
	class={cn(`marq-group group flex gap-[1rem] overflow-hidden ${$$restProps.class}`, {
		'flex-row': direction === 'left',
		'flex-col': direction !== 'left'
	})}
	style={`mask-image: ${
		fade
			? `linear-gradient(${
					direction === 'left' ? 'to right' : 'to bottom'
				}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
			: 'none'
	};
	  -webkit-mask-image: ${
			fade
				? `linear-gradient(${
						direction === 'left' ? 'to right' : 'to bottom'
					}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
				: 'none'
		};
	  `}
>
	{#each Array(numberOfCopies).fill(0) as _, i (i)}
		<div
			class={cn(
				'flex shrink-0 justify-around gap-[1rem] [--gap:1rem]',
				direction === 'left' ? 'css-marquee-left flex-row' : 'css-marquee-up flex-col',
				pauseOnHover && 'group-hover-paused',
				reverse && 'reverse-direction',
				innerClassName
			)}
		>
			<slot />
		</div>
	{/each}
</div>

<style>
	:global(.css-marquee-left) {
		animation: marquee-left var(--duration, 10s) linear infinite;
	}
	:global(.css-marquee-up) {
		animation: marquee-up var(--duration, 10s) linear infinite;
	}

	:global(.group-hover-paused) {
		animation-play-state: running;
	}
	:global(.group:hover .group-hover-paused) {
		animation-play-state: paused;
	}

	:global(.reverse-direction) {
		animation-direction: reverse;
	}

	@keyframes marquee-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	@keyframes marquee-up {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(calc(-100% - var(--gap)));
		}
	}
</style>
