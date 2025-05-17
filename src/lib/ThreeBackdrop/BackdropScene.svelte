<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core';
  import * as THREE from 'three';
  import { OrbitControls } from '@threlte/extras';
  import { Fn, If, uniform, float, color, uv, vec2, vec3, hash, sin, time, instancedArray, instanceIndex } from 'three/tsl';

  // Props definition using Svelte 5 syntax
  let { children } = $props();

  const particleCount = 200_000;
  let computeParticles: any = $state(null);
  let renderer: THREE.WebGLRenderer | any = $state(null);
  let particleMaterial: any = $state(null);
  let particles: THREE.Sprite | null = $state(null);
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

      const time2 = float(1).sub(time).mul(5);

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
  }

  // Animation loop using useTask instead of useFrame
  useTask(() => {
    if (renderer && computeParticles) {
      // Return a promise that will be awaited by Threlte
      return renderer.computeAsync(computeParticles);
    }
    return null;
  });
</script>

<T.PerspectiveCamera 
  position={[0, 200, 500]} 
  fov={50} 
  near={10} 
  far={100000}
  makeDefault
>
  <OrbitControls enableDamping minDistance={5} target={[0, 0, 0]} />
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