<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import * as THREE from 'three';
	import { OrbitControls } from '@threlte/extras';
	import {
		Fn,
		If,
		uniform,
		float,
		color,
		uv,
		vec2,
		vec3,
		hash,
		sin,
		time,
		instancedArray,
		instanceIndex
	} from 'three/tsl';

	// Props definition using Svelte 5 syntax
	let { children } = $props();

	const particleCount = 100;
	// Animation speed multiplier - lower values = slower animation
	const animationSpeed = 0.2;
	let computeParticles: any = $state(null);
	let renderer: THREE.WebGLRenderer | any = $state(null);
	let particleMaterial: any = $state(null);
	let particles: THREE.Object3D | null = $state(null);
	let rendererReady = $state(false);

	// Get threlte context to access the renderer
	const { renderer: threlteRenderer } = useThrelte();

	// Use $effect instead of $: reactive statement
	$effect(() => {
		if (threlteRenderer && !renderer) {
			renderer = threlteRenderer as any; // Cast to any as it might be WebGPURenderer which isn't in the type definitions
			rendererReady = true;
			initComputations();
		}
	});

	function initComputations() {
		// Skip if renderer not available yet
		if (!renderer) return;

		// Check if computeAsync is available (WebGPU feature)
		const supportsWebGPU = typeof renderer.computeAsync === 'function';

		if (!supportsWebGPU) {
			console.warn(
				'WebGPU compute capabilities not available. Falling back to simpler implementation.'
			);
			createSimpleParticles();
			return;
		}

		try {
			const positions = instancedArray(particleCount, 'vec3');
			const sizes = instancedArray(particleCount, 'vec3');

			// compute
			const separation = 100;
			const amount = Math.sqrt(particleCount);
			const offset = float(amount / 2);

			const computeInit = Fn(() => {
				const position = positions.element(instanceIndex);
				const size = sizes.element(instanceIndex);

				const x = instanceIndex.mod(amount);
				const z = instanceIndex.div(amount);

				position.x = offset.sub(x).mul(separation);
				position.z = offset.sub(z).mul(separation);

				size.assign(vec3(1.0));
			})().compute(particleCount);

			// Update compute function
			const computeUpdate = Fn(() => {
				const x = float(instanceIndex.mod(amount)).mul(0.5);
				const z = float(instanceIndex.div(amount)).mul(0.5);

				// Use animation speed constant
				const time2 = float(1).sub(time).mul(animationSpeed);

				const position = positions.element(instanceIndex);

				const sinX = sin(x.add(time2).mul(0.7)).mul(50);
				const sinZ = sin(z.add(time2).mul(0.5)).mul(50);

				position.y = sinX.add(sinZ);

				const size = sizes.element(instanceIndex);

				const sinSX = sin(x.add(time2).mul(0.7)).add(1).mul(5);
				const sinSZ = sin(z.add(time2).mul(0.5)).add(1).mul(5);

				size.assign(sinSX.add(sinSZ));
			});

			computeParticles = computeUpdate().compute(particleCount);

			// Initialize with computeInit
			renderer.computeAsync(computeInit);

			// Create particle material - using regular SpriteMaterial as a fallback
			// since SpriteNodeMaterial might not be in the type definitions
			const material = new THREE.SpriteMaterial({ color: 0xffffff });
			// Extending with custom properties that might not be in type definition
			const nodeMatProps = {
				colorNode: color(1, 1, 1),
				positionNode: positions.toAttribute(),
				scaleNode: sizes.toAttribute(),
				alphaTestNode: uv().mul(2).distance(vec2(1)),
				transparent: false
			};

			// Assign all custom properties
			particleMaterial = Object.assign(material, nodeMatProps);

			// Create particle instance when material is ready
			particles = new THREE.Sprite(particleMaterial);
			particles.count = particleCount;
			particles.frustumCulled = false;
		} catch (error) {
			console.error('Error initializing WebGPU compute:', error);
			createSimpleParticles();
		}
	}

	// Fallback to a simpler implementation without compute shaders
	function createSimpleParticles() {
		// Create a simpler particle system that doesn't use compute shaders
		const reducedParticleCount = 1000; // Use fewer particles for better performance

		// Create a points material
		const material = new THREE.PointsMaterial({
			color: 0xffffff,
			size: 5,
			sizeAttenuation: true,
			transparent: true,
			opacity: 0.8
		});

		// Create particle geometry with positions
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(reducedParticleCount * 3);

		const separation = 100;
		const amount = Math.sqrt(reducedParticleCount);
		const offset = amount / 2;

		for (let i = 0; i < reducedParticleCount; i++) {
			const x = (i % amount) * separation - offset * separation;
			const z = Math.floor(i / amount) * separation - offset * separation;
			const y = 0;

			positions[i * 3] = x;
			positions[i * 3 + 1] = y;
			positions[i * 3 + 2] = z;
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

		// Create a points system instead of sprites
		particles = new THREE.Points(geometry, material);

		// Store the initial positions for animation
		particles.userData = {
			positions: positions,
			amount: amount,
			time: 0
		};
	}

	// Animation loop using useTask instead of useFrame
	useTask((task: any) => {
		const delta = typeof task === 'object' && task.delta ? task.delta : 0.016; // Default to 16ms if delta is not available
		// Handle WebGPU compute shader animation
		if (renderer && computeParticles && typeof renderer.computeAsync === 'function') {
			// Return a promise that will be awaited by Threlte
			return renderer.computeAsync(computeParticles);
		}

		// Handle fallback animation for non-WebGPU
		if (particles && particles instanceof THREE.Points && particles.userData) {
			const userData = particles.userData;
			userData.time += delta;

			const positions = userData.positions;
			const amount = userData.amount;

			// Update positions based on time for wave effect
			for (let i = 0; i < positions.length / 3; i++) {
				const x = i % amount;
				const z = Math.floor(i / amount);

				const xPos = positions[i * 3];
				const zPos = positions[i * 3 + 2];

				// Create wave effect using the animation speed constant
				const sinX = Math.sin((x * 0.5 + userData.time * animationSpeed) * 0.7) * 50;
				const sinZ = Math.sin((z * 0.5 + userData.time * animationSpeed) * 0.5) * 50;

				positions[i * 3 + 1] = sinX + sinZ; // Update Y position
			}

			// Update the buffer attribute
			particles.geometry.attributes.position.needsUpdate = true;
		}

		return null;
	});
</script>

<T.PerspectiveCamera position={[0, 200, 500]} fov={50} near={10} far={100000} makeDefault>
	<OrbitControls
		enableDamping
		enableRotate={false}
		enableZoom={false}
		minDistance={5}
		target={[0, 0, 0]}
	/>
</T.PerspectiveCamera>

<T.Scene>
	{#if particles}
		<T is={particles} />
	{/if}
</T.Scene>

{@render children()}

<style>
	:global(canvas) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
