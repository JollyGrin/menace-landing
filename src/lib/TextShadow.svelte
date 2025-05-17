<script lang="ts">
	export let shadowColor: string = 'black';
	export let as: string = 'span';
	export let className: string = '';
	export let text: string;

	if (typeof text !== 'string') {
		throw new Error('LineShadowText only accepts string content');
	}
</script>

<svelte:element
	this={as}
	style="--shadow-color: {shadowColor}"
	class={`after:animate-line-shadow animate-line-shadow relative z-0
    inline-flex after:absolute after:top-[0.04em] after:left-[0.04em]
    after:-z-10
    after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)] after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent
    after:content-[attr(data-text)]
    ${className}`}
	data-text={text}
>
	{text}
</svelte:element>

<style>
	.animate-line-shadow::after {
		animation: line-shadow 50s linear infinite;
	}

	@keyframes line-shadow {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 100% -100%;
		}
	}
</style>
