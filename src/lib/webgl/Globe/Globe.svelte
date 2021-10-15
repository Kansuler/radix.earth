<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { LineBasicMaterial, Mesh, MeshBasicMaterial, SphereBufferGeometry } from 'three';

	import { sceneKey } from '../Scene/scene';
	import { landMesh, particleSystem } from '$lib/helpers/map/land';

	const { addToScene } = getContext(sceneKey);

	onMount(async () => {
		const geometry = new SphereBufferGeometry(1, 50, 50);

		const material = new MeshBasicMaterial({
			color: 0x9dd1f1,
			// map: new SVGLoader().load(texture, (data) => {}),
			transparent: true
		});

		const mesh = new Mesh(geometry, material);
		addToScene(mesh);

		const land = landMesh(
			new LineBasicMaterial({
				color: 0xeeffaa,
				linewidth: 0.02,
				transparent: true
			})
		);

		addToScene(land);

		addToScene(await particleSystem(80000));
	});
</script>

<slot />
