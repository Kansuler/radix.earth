<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { SceneContextParameters, sceneKey } from '$lib/webgl/Scene/scene';
	import { CylinderBufferGeometry, Matrix4, Mesh, MeshBasicMaterial, Vector3 } from 'three';
	import { convertGPSCoordinatesToPosition } from '$lib/helpers/coordinates';

	export let lat: number;
	export let lng: number;
	export let percentage: number;

	const { addToScene } = getContext<SceneContextParameters>(sceneKey);

	onMount(() => {
		const geometry = new CylinderBufferGeometry(0.0025, 0.0025, 0.02 + percentage * 10, 15);
		geometry.applyMatrix4(new Matrix4().makeTranslation(0, length / 2, 0));
		geometry.applyMatrix4(new Matrix4().makeRotationX(Math.PI / 2));
		const mesh = new Mesh(
			geometry,
			new MeshBasicMaterial({
				color: 0xdb3a34
			})
		);

		const { x, y, z } = convertGPSCoordinatesToPosition(lat, lng);
		const vector = new Vector3();
		mesh.position.set(0, 0, 0);
		mesh.lookAt(vector.set(x, y, z));
		mesh.position.set(x, y, z);
		addToScene(mesh);
	});
</script>
