<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { AsciiRenderer } from '@threlte/extras';
	import { type AsciiEffectOptions } from 'three/examples/jsm/Addons.js';

	let fgColor = $state('#3cdbd3');
	let bgColor = $state('#000000');
	const defaultCharacters = ' .:-+*=%@#';
	let characters = $state(defaultCharacters);
	let alpha = $state(1);
	let block = $state(false);
	let color = $state(false);
	let invert = $state(false);
	let resolution = $state(0.2);
	let scale = $state(1);
	const options: AsciiEffectOptions = $derived({
		alpha,
		block,
		color,
		invert,
		resolution,
		scale
	});
</script>

<div class="h-screen w-screen bg-black">
	<Canvas>
		<Scene />
		<AsciiRenderer {bgColor} {characters} {fgColor} {options} />
	</Canvas>
</div>
