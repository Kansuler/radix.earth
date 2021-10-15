<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { LineBasicMaterial, Mesh, MeshPhongMaterial, SphereBufferGeometry } from 'three';

	import { sceneKey } from '../Scene/scene';
	import { landMesh, particleSystem } from '$lib/helpers/map/map';
	import { TweaksContextParameters, tweaksKey } from '../Tweaks/tweaks';

	const { addToScene } = getContext(sceneKey);
	const { addTweakFolder } = getContext<TweaksContextParameters>(tweaksKey);

	onMount(async () => {
		const geometry = new SphereBufferGeometry(1, 50, 50);

		const palette = {
			globeColor: 0x842,
			globeSpecular: 0x110808,
			globeEmissive: 0x141560,
			lineColor: 0xa0cae4
		};

		const material = new MeshPhongMaterial({
			color: palette.globeColor,
			specular: palette.globeSpecular,
			emissive: palette.globeEmissive,
			shininess: 10,
			opacity: 0.9,
			transparent: true,
			fog: true
		});

		const mesh = new Mesh(geometry, material);
		addToScene(mesh);

		const lineMaterial = new LineBasicMaterial({
			color: palette.lineColor,
			linewidth: 0.005,
			transparent: true
		});
		const land = landMesh(lineMaterial);

		addToScene(land);

		addToScene(await particleSystem(80000));

		const folder = addTweakFolder('Globe');
		if (folder) {
			folder
				.addColor(palette, 'globeColor')
				.name('Globe color')
				.onChange(() => material.color.set(palette.globeColor));
			folder
				.addColor(palette, 'globeSpecular')
				.name('Globe specular')
				.onChange(() => material.specular.set(palette.globeSpecular));
			folder
				.addColor(palette, 'globeEmissive')
				.name('Globe emissive')
				.onChange(() => material.emissive.set(palette.globeEmissive));
			folder
				.addColor(palette, 'lineColor')
				.name('Line color')
				.onChange(() => lineMaterial.color.set(palette.lineColor));
		}
	});
</script>

<slot />
