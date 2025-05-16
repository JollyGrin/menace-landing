<script lang="ts">
	import IconChevDown from './icon/IconChevDown.svelte';

	let { children }: { children: any } = $props();
	let isOpen = $state(false);
</script>

<!-- <button onclick={() => (isOpen = !isOpen)}>expand</button> -->
<button
	onclick={() => (isOpen = !isOpen)}
	class="text-brand-highlight mx-auto w-fit cursor-pointer transition-all hover:scale-110"
	class:rotate-180={isOpen}
>
	<IconChevDown width="50px" height="50px" />
</button>
<div class="content overflow-hidden transition-all duration-500" class:expanded={isOpen}>
	{@render children()}
</div>

<style>
	.content {
		max-height: 0;
	}
	.expanded {
		max-height: 300px;
	}
</style>
