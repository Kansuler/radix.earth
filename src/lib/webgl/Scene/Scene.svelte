<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte';
	import { Scene } from 'three';
	import { SceneContextParameters, sceneKey } from './scene';
	import { rendererKey, RendererContextParameters } from '$lib/webgl/Renderer/renderer';

	let scene: Scene;
	scene = new Scene();

	const { setActiveScene } = getContext<RendererContextParameters>(rendererKey);
	setContext<SceneContextParameters>(sceneKey, {
		addToScene: (...object) => scene.add(...object)
	});

	onMount(() => {
		setActiveScene(scene);
	});
</script>

<slot />
