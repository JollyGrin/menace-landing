<script lang="ts">
	import * as THREE from 'three';
	import { Canvas, T, useTask, useThrelte } from '@threlte/core';
	import Scene from '../Scene.svelte';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js';

	// Halftone effect configuration
	let shape = $state(1); // 1: Dot, 2: Ellipse, 3: Line, 4: Square
	let radius = $state(4);
	let rotateR = $state(Math.PI / 12);
	let rotateG = $state((Math.PI / 12) * 2);
	let rotateB = $state((Math.PI / 12) * 3);
	let scatter = $state(0);
	let blending = $state(1.0);
	// mixColor is not used in HalftonePass
	let greyscale = $state(false);
	let background = $state('#000000');

	// Halftone component
	function HalftonePostprocessing() {
		const { scene, renderer, camera, size, autoRender, renderStage } = useThrelte();
		let composer: EffectComposer | undefined;
		let renderPass: RenderPass | undefined;
		let halftonePass: HalftonePass | undefined;

		// Create halftone options based on current state
		const halftoneOptions = $derived({
			shape, // Shape: 1 = Dot, 2 = Ellipse, 3 = Line, 4 = Square
			radius,
			rotateR,
			rotateG,
			rotateB,
			scatter,
			blending,
			blendingMode: 1, // 1 = Linear, 2 = Multiply, 3 = Add, 4 = Lighter, 5 = Darker
			greyscale,
			disable: false
		});

		// Setup the composer with the current camera
		function setupComposer() {
			// Clean up existing composer if present
			if (composer) {
				// Remove each pass individually
				while (composer.passes.length > 0) {
					composer.removePass(composer.passes[0]);
				}
				if (halftonePass) halftonePass.dispose();
				if (renderPass) renderPass.dispose();
				composer.dispose();
			}

			// Create new composer
			composer = new EffectComposer(renderer);
			// Extract camera value from the reactive reference
			const cameraValue = camera.current;
			renderPass = new RenderPass(scene, cameraValue);
			composer.addPass(renderPass);

			// Create halftone pass with just parameters - Three.js r153 API has changed
			// The constructor now accepts a single params object
			halftonePass = new HalftonePass({
				shape: halftoneOptions.shape,
				radius: halftoneOptions.radius,
				rotateR: halftoneOptions.rotateR,
				rotateG: halftoneOptions.rotateG,
				rotateB: halftoneOptions.rotateB,
				scatter: halftoneOptions.scatter,
				blending: halftoneOptions.blending,
				blendingMode: halftoneOptions.blendingMode,
				greyscale: halftoneOptions.greyscale,
				disable: halftoneOptions.disable
			});
			
			// Set individual uniform values
			halftonePass.uniforms['shape'].value = halftoneOptions.shape;
			halftonePass.uniforms['radius'].value = halftoneOptions.radius;
			halftonePass.uniforms['rotateR'].value = halftoneOptions.rotateR;
			halftonePass.uniforms['rotateG'].value = halftoneOptions.rotateG;
			halftonePass.uniforms['rotateB'].value = halftoneOptions.rotateB;
			halftonePass.uniforms['scatter'].value = halftoneOptions.scatter;
			halftonePass.uniforms['blending'].value = halftoneOptions.blending;
			halftonePass.uniforms['blendingMode'].value = halftoneOptions.blendingMode;
			halftonePass.uniforms['greyscale'].value = halftoneOptions.greyscale;
			halftonePass.uniforms['disable'].value = halftoneOptions.disable;
			composer.addPass(halftonePass);

			// Set initial size - access dimensions correctly from size
			composer.setSize(window.innerWidth, window.innerHeight);
		}

		// Handle size changes using resize event listener
		const handleResize = () => {
			if (composer) {
				composer.setSize(window.innerWidth, window.innerHeight);
			}
		};

		// Set up resize listener
		window.addEventListener('resize', handleResize);

		// Clean up resize listener
		$effect(() => {
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		});

		// Handle effect parameter changes
		$effect(() => {
			// Update the HalftonePass uniforms directly when parameters change
			if (halftonePass && halftonePass.uniforms) {
				halftonePass.uniforms['radius'].value = halftoneOptions.radius;
				halftonePass.uniforms['shape'].value = halftoneOptions.shape;
				halftonePass.uniforms['rotateR'].value = halftoneOptions.rotateR;
				halftonePass.uniforms['rotateG'].value = halftoneOptions.rotateG;
				halftonePass.uniforms['rotateB'].value = halftoneOptions.rotateB;
				halftonePass.uniforms['scatter'].value = halftoneOptions.scatter;
				halftonePass.uniforms['blending'].value = halftoneOptions.blending;
				halftonePass.uniforms['blendingMode'].value = halftoneOptions.blendingMode;
				halftonePass.uniforms['greyscale'].value = halftoneOptions.greyscale;
				halftonePass.uniforms['disable'].value = halftoneOptions.disable;
			}
		});

		// Initial setup
		setupComposer();

		// Disable Threlte's auto render
		$effect(() => {
			const previousAutoRender = autoRender.current;
			autoRender.set(false);

			return () => {
				autoRender.set(previousAutoRender);
			};
		});

		// Clean up on unmount
		$effect(() => {
			return () => {
				if (composer) {
					// Remove each pass individually
					while (composer.passes.length > 0) {
						composer.removePass(composer.passes[0]);
					}
					if (halftonePass) halftonePass.dispose();
					if (renderPass) renderPass.dispose();
					composer.dispose();
				}
			};
		});

		// Render the scene using the composer
		useTask(
			(delta) => {
				if (composer) {
					composer.render(delta);
				}
			},
			{ stage: renderStage, autoInvalidate: false }
		);
	}
</script>

<div class="h-screen w-screen" style="background-color: {background};">
	<Canvas>
		<Scene />
		<T is={HalftonePostprocessing} />
	</Canvas>

	<!-- Controls panel -->
	<div class="bg-opacity-80 absolute top-4 right-4 w-64 rounded bg-gray-800 p-4 text-white">
		<h2 class="mb-2 text-lg font-bold">Halftone Controls</h2>

		<div class="mb-2">
			<label for="shape-select" class="block text-sm">Shape</label>
			<select
				id="shape-select"
				bind:value={shape}
				class="w-full rounded bg-gray-700 px-2 py-1 text-white"
			>
				<option value={1}>Dot</option>
				<option value={2}>Ellipse</option>
				<option value={3}>Line</option>
				<option value={4}>Square</option>
			</select>
		</div>

		<div class="mb-2">
			<label for="radius-slider" class="block text-sm">Radius: {radius.toFixed(1)}</label>
			<input
				id="radius-slider"
				type="range"
				bind:value={radius}
				min="1"
				max="10"
				step="0.1"
				class="w-full"
			/>
		</div>

		<div class="mb-2">
			<label for="rotateR-slider" class="block text-sm"
				>Rotate R: {(rotateR / Math.PI).toFixed(2)}π</label
			>
			<input
				id="rotateR-slider"
				type="range"
				bind:value={rotateR}
				min="0"
				max={Math.PI * 2}
				step="0.05"
				class="w-full"
			/>
		</div>

		<div class="mb-2">
			<label for="rotateG-slider" class="block text-sm"
				>Rotate G: {(rotateG / Math.PI).toFixed(2)}π</label
			>
			<input
				id="rotateG-slider"
				type="range"
				bind:value={rotateG}
				min="0"
				max={Math.PI * 2}
				step="0.05"
				class="w-full"
			/>
		</div>

		<div class="mb-2">
			<label for="rotateB-slider" class="block text-sm"
				>Rotate B: {(rotateB / Math.PI).toFixed(2)}π</label
			>
			<input
				id="rotateB-slider"
				type="range"
				bind:value={rotateB}
				min="0"
				max={Math.PI * 2}
				step="0.05"
				class="w-full"
			/>
		</div>

		<div class="mb-2">
			<label for="scatter-slider" class="block text-sm">Scatter: {scatter.toFixed(2)}</label>
			<input
				id="scatter-slider"
				type="range"
				bind:value={scatter}
				min="0"
				max="1"
				step="0.01"
				class="w-full"
			/>
		</div>

		<div class="mb-2">
			<label for="blending-slider" class="block text-sm">Blending: {blending.toFixed(2)}</label>
			<input
				id="blending-slider"
				type="range"
				bind:value={blending}
				min="0"
				max="1"
				step="0.01"
				class="w-full"
			/>
		</div>

		<div class="mb-2">
			<label for="background-color" class="block text-sm">Background</label>
			<input id="background-color" type="color" bind:value={background} class="w-full" />
		</div>

		<div class="flex space-x-2">

			<label class="flex items-center">
				<input id="greyscale-check" type="checkbox" bind:checked={greyscale} class="mr-1" />
				<span class="text-sm">Greyscale</span>
			</label>
		</div>
	</div>
</div>
