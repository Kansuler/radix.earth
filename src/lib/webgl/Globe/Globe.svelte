<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import {
		BufferGeometry,
		Color,
		Float32BufferAttribute,
		LineBasicMaterial,
		LineSegments,
		Mesh,
		MeshPhongMaterial,
		PointLight,
		SphereBufferGeometry
	} from 'three';

	import { sceneKey } from '../Scene/scene';
	import { landMesh, particleSystem } from '$lib/helpers/map/map';
	import { TweaksContextParameters, tweaksKey } from '../Tweaks/tweaks';

	export let coastlines: number[] = [];
	export let land: number[][] = [];

	const { addToScene } = getContext(sceneKey);
	const { addTweakFolder } = getContext<TweaksContextParameters>(tweaksKey);

	onMount(async () => {
		const geometry = new SphereBufferGeometry(1, 50, 50);

		const palette = {
			globeColor: 0x6b6b6b,
			globeSpecular: 0x0,
			globeEmissive: 0x63368,
			lineColor: 0xe93
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

		// Add coastlines to earth
		const coastlinesGeometry = new BufferGeometry();
		coastlinesGeometry.setAttribute('position', new Float32BufferAttribute(coastlines, 3));
		const coastlinesSegments = new LineSegments(coastlinesGeometry, lineMaterial);
		addToScene(coastlinesSegments);

		addToScene(await particleSystem(land));

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
