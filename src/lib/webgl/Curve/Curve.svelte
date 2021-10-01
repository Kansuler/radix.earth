<script lang="ts">
	import { convertCoordinatesToVector3 } from '$lib/helpers/coordinates';

	import { getContext, onMount } from 'svelte';

	import { CatmullRomCurve3, Mesh, MeshBasicMaterial, TubeGeometry, Vector3 } from 'three';
	import { SceneContextParameters, sceneKey } from '../Scene/scene';

	export let coordinates1: { lat: number; lng: number };
	export let coordinates2: { lat: number; lng: number };

	const { addToScene } = getContext<SceneContextParameters>(sceneKey);

	onMount(() => {
		const v1 = convertCoordinatesToVector3(coordinates1.lat, coordinates1.lng);
		const v2 = convertCoordinatesToVector3(coordinates2.lat, coordinates2.lng);

		let points = [];
		for (let i = 0; i <= 20; i++) {
			let p = new Vector3().lerpVectors(v1, v2, i / 20);
			p.normalize();
			p.multiplyScalar(1 + 0.1 * Math.sin((Math.PI * i) / 20));
			points.push(p);
		}

		let path = new CatmullRomCurve3(points);

		const geometry = new TubeGeometry(path, 20, 0.002, 8, false);
		const material = new MeshBasicMaterial({
			color: 0x0000ff
		});
		const mesh = new Mesh(geometry, material);

		addToScene(mesh);
	});
</script>
