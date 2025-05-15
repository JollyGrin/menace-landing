<script lang="ts">
	import BenFranklin from '$lib/BenFranklin.svelte';
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
</script>

<T.PerspectiveCamera makeDefault position={[8, 1, 0]}>
	<OrbitControls enableRotate={false} enableZoom={false} autoRotate={true} autoRotateSpeed={4} />
</T.PerspectiveCamera>

<!-- <T.PointLight position={[0, 8, 5]} intensity={500} scale={1} castShadow /> -->
<T.SpotLight position={[0, 8, 2]} intensity={500} scale={1} castShadow />

<!-- <T.Mesh receiveShadow castShadow> -->
<!-- 	<T.BoxGeometry /> -->
<!-- 	<T.MeshBasicMaterial /> -->
<!-- </T.Mesh> -->

<BenFranklin />
