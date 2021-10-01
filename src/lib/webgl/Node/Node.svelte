<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { SceneContextParameters, sceneKey } from '$lib/webgl/Scene/scene';
	import { Mesh, MeshBasicMaterial, SphereBufferGeometry } from 'three';

	export let lat: number;
	export let lng: number;

	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lng + 180) * (Math.PI / 180);

	const x = -(Math.sin(phi) * Math.cos(theta));
	const z = Math.sin(phi) * Math.sin(theta);
	const y = Math.cos(phi);

	const { addToScene } = getContext<SceneContextParameters>(sceneKey);

	onMount(() => {
		const mesh = new Mesh(
			new SphereBufferGeometry(0.0025, 20, 20),
			new MeshBasicMaterial({
				color: 0xff0000
			})
		);

		mesh.position.set(x, y, z);
		addToScene(mesh);
	});
</script>
