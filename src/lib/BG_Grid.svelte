<script lang="ts">
	export let width: number = 40;
	export let height: number = 40;
	export let squares: [number, number] = [24, 24];
	export let className: string = '';
	export let squaresClassName: string = '';

	let hoveredSquare: number | null = null;
	const [horizontal, vertical] = squares;

	// Utility function similar to cn from clsx or classnames
	function cn(...classes: (string | false | null | undefined)[]) {
		return classes.filter(Boolean).join(' ');
	}
	const restProps = cn(
		'[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
		'inset-x-0 inset-y-[-30%] h-[200%] skew-y-8'
	);
</script>

<svg
	width={width * horizontal}
	height={height * vertical}
	class={cn('absolute inset-0 h-full w-full border border-gray-400/30', restProps, className)}
>
	{#each Array(horizontal * vertical) as _, index}
		{@const x = (index % horizontal) * width}
		{@const y = Math.floor(index / horizontal) * height}
		<rect
			{x}
			{y}
			{width}
			{height}
			class={cn(
				'stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000',
				hoveredSquare === index ? 'fill-gray-300/30' : 'fill-transparent',
				squaresClassName
			)}
			on:mouseenter={() => (hoveredSquare = index)}
			on:mouseleave={() => (hoveredSquare = null)}
		/>
	{/each}
</svg>

<style>
	/* Ensure the container is positioned correctly */
	svg.absolute {
		position: absolute;
		inset: 0;
	}
</style>
