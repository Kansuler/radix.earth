<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { Mesh, MeshBasicMaterial, SphereBufferGeometry, TextureLoader } from 'three';
	import { sceneKey } from '../Scene/scene';
	import texture from './texture_4k.png';

	const { addToScene } = getContext(sceneKey);

	onMount(() => {
		const geometry = new SphereBufferGeometry(1, 50, 50);

		const material = new MeshBasicMaterial({
			map: new TextureLoader().load(texture),
			transparent: true
		});

		const mesh = new Mesh(geometry, material);
		addToScene(mesh);
	});
</script>

<slot />
