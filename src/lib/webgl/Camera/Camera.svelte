<script lang="ts">
	import type { GUI } from 'dat.gui';
	import { getContext, onMount } from 'svelte';
	import { rendererKey, RendererContextParameters } from '$lib/webgl/Renderer/renderer';
	import { Color, PerspectiveCamera, PointLight, SpotLight } from 'three';
	import { SceneContextParameters, sceneKey } from '$lib/webgl/Scene/scene';
	import { TweaksContextParameters, tweaksKey } from '../Tweaks/tweaks';

	const { setActiveCamera, addUpdateFunction } = getContext<RendererContextParameters>(rendererKey);
	const { addToScene } = getContext<SceneContextParameters>(sceneKey);
	const { addTweakFolder } = getContext<TweaksContextParameters>(tweaksKey);

	let folder: GUI;

	onMount(async () => {
		const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight);
		camera.position.z = 15;

		addToScene(camera);

		const light = new SpotLight(new Color(0xfff), 2, 20);
		addToScene(light);
		addUpdateFunction(() => {
			light.position.copy(camera.position);
		});

		setActiveCamera(camera);
		folder = addTweakFolder('Camera');
		if (folder) {
			folder.add(light, 'intensity').name('Light intensity');
			folder.add(light, 'distance').name('Light distance');
		}
	});
</script>
