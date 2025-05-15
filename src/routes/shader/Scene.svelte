<script lang="ts">
	import fragmentShader from '$lib/shaders/ditherFragment.glsl?raw';
	import vertexShader from '$lib/shaders/ditherVertex.glsl?raw';
	import { OrbitControls } from '@threlte/extras';
	import { PlaneGeometry, Vector3, ShaderMaterial, Uniform } from 'three';
	import { SimplexNoise } from 'three/examples/jsm/Addons.js';
	import { T, useTask, useThrelte } from '@threlte/core';
	import { Tween } from 'svelte/motion';
	import { interactivity } from '@threlte/extras';
	import { quadOut } from 'svelte/easing';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	// Import postprocessing components
	import { EffectComposer, RenderPass, EffectPass, Effect, BlendFunction } from 'postprocessing';

	// Terrain setup
	const terrainSize = 30;
	const geometry = new PlaneGeometry(terrainSize, terrainSize, 100, 100);
	const noise = new SimplexNoise();
	const vertices = geometry.getAttribute('position');
	for (let i = 0; i < vertices.count; i += 1) {
		const x = vertices.getX(i);
		const y = vertices.getY(i);
		vertices.setZ(i, noise.noise(x / 5, y / 5) * 2 + noise.noise(x / 40, y / 40) * 3);
	}
	geometry.computeVertexNormals();

	// Interactivity and shader variables
	interactivity();
	const pulsePosition = new Vector3();
	const pulseTimer = new Tween(0, {
		easing: quadOut
	});

	// Get Threlte context
	const { scene, renderer, camera, size, autoRender, renderStage } = useThrelte();

	// Define and setup dither effect
	const setupPostprocessing = () => {
		// Create effect composer and passes
		const composer = new EffectComposer(renderer);
		const renderPass = new RenderPass(scene, $camera);
		composer.addPass(renderPass);
		
		// Create the dither effect
		const ditherEffect = new Effect(
			'DitherEffect',
			fragmentShader,
			{
				blendFunction: BlendFunction.NORMAL,
				// Using any type to avoid TypeScript issues with Effect's uniform typing
				uniforms: new Map([
					['colorNum', new Uniform(8.0)] as [string, any],
					['pixelSize', new Uniform(2.0)] as [string, any],
					['resolution', new Uniform(new Vector3($size.width, $size.height, 0))] as [string, any]
				]) as any
			}
		);
		
		// Create effect pass and add it to composer
		const effectPass = new EffectPass($camera, ditherEffect);
		composer.addPass(effectPass);
		
		// Update resolution when window size changes
		$effect(() => {
			composer.setSize($size.width, $size.height);
			// Update resolution uniform
			const resolutionUniform = ditherEffect.uniforms.get('resolution');
			if (resolutionUniform) {
				resolutionUniform.value.set($size.width, $size.height, 0);
			}
		});
		
		// Update camera references when camera changes
		$effect(() => {
			renderPass.mainCamera = $camera;
			effectPass.mainCamera = $camera;
		});
		
		// Cleanup when component is destroyed
		$effect(() => {
			return () => {
				composer.removeAllPasses();
				effectPass.dispose();
				renderPass.dispose();
				composer.dispose();
			};
		});
		
		return { composer };
	};
	
	// Create the post-processing setup
	const { composer } = setupPostprocessing();
	
	// Disable auto render from Threlte
	$effect(() => {
		const last = autoRender.current;
		autoRender.set(false);
		return () => {
			autoRender.set(last);
		};
	});
	
	// Manually render the scene using the effect composer
	useTask(
		(delta) => {
			composer.render(delta);
		},
		{ stage: renderStage, autoInvalidate: false }
	);
</script>

<T.PerspectiveCamera makeDefault position={[-70, 50, 10]} fov={15}>
	<OrbitControls target.y={1.5} autoRotateSpeed={0.2} />
</T.PerspectiveCamera>
<T.Mesh
	{geometry}
	rotation.x={DEG2RAD * -90}
	onclick={({ point }: { point: Vector3 }) => {
		pulsePosition.copy(point);
		pulseTimer
			.set(0, {
				duration: 0
			})
			.then(() => {
				pulseTimer.set(1, { duration: 2000 });
			});
	}}
>
	<T.MeshStandardMaterial
		color="#446688"
		metalness={0.2}
		roughness={0.8}
	/>
</T.Mesh>
