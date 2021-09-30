<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { rendererKey, RendererContextParameters } from '$lib/webgl/Renderer/renderer';
	import { PerspectiveCamera } from 'three';
	import { SceneContextParameters, sceneKey } from '$lib/webgl/Scene/scene';

	const { setActiveCamera } = getContext<RendererContextParameters>(rendererKey);
	const { addToScene } = getContext<SceneContextParameters>(sceneKey);

	onMount(() => {
		const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight);
		camera.position.z = 3;
		addToScene(camera);
		setActiveCamera(camera);
	});
</script>
