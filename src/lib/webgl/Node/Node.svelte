<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { SceneContextParameters, sceneKey } from '$lib/webgl/Scene/scene';
	import { Mesh, MeshBasicMaterial, SphereBufferGeometry } from 'three';
	import { convertCoordinatesToPosition } from '$lib/helpers/coordinates';

	export let lat: number;
	export let lng: number;

	const { addToScene } = getContext<SceneContextParameters>(sceneKey);

	onMount(() => {
		const mesh = new Mesh(
			new SphereBufferGeometry(0.0025, 20, 20),
			new MeshBasicMaterial({
				color: 0xff0000
			})
		);

		const { x, y, z } = convertCoordinatesToPosition(lat, lng);

		mesh.position.set(x, y, z);
		addToScene(mesh);
	});
</script>
