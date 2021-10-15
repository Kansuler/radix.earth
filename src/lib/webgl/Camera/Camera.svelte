<script lang="ts">
	import type { GUI } from 'dat.gui';
	import { getContext, onMount } from 'svelte';
	import { rendererKey, RendererContextParameters } from '$lib/webgl/Renderer/renderer';
	import { PerspectiveCamera } from 'three';
	import { SceneContextParameters, sceneKey } from '$lib/webgl/Scene/scene';
	import { TweaksContextParameters, tweaksKey } from '../Tweaks/tweaks';

	const { setActiveCamera } = getContext<RendererContextParameters>(rendererKey);
	const { addToScene } = getContext<SceneContextParameters>(sceneKey);
	const { addTweakFolder } = getContext<TweaksContextParameters>(tweaksKey);

	let folder: GUI;

	onMount(async () => {
		const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight);
		camera.position.z = 15;
		addToScene(camera);
		setActiveCamera(camera);
		folder = addTweakFolder('Camera');
		if (folder) {
			folder.add(camera.position, 'z').max(10).min(5).name('distance');
		}
	});
</script>
