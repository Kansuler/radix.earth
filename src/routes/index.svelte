<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const url = '/api/meta';

		const res = await fetch(url);

		if (res.ok) {
			const { validators, coastlines, land } = await res.json();
			return {
				props: {
					validators,
					coastlines,
					land
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`could not load ${url}`)
		};
	};
</script>

<script lang="ts">
	import type { Validator } from './api/validators';
	import Renderer from '$lib/webgl/Renderer/Renderer.svelte';
	import Camera from '$lib/webgl/Camera/Camera.svelte';
	import Scene from '$lib/webgl/Scene/Scene.svelte';
	import Tweaks from '$lib/webgl/Tweaks/Tweaks.svelte';
	import Globe from '$lib/webgl/Globe/Globe.svelte';
	import Node from '$lib/webgl/Node/Node.svelte';

	export let validators: Validator[];
	export let coastlines: number[];
	export let land: number[][];
</script>

<main class="main">
	<div class="bg-blue-600">
		<Renderer>
			<Tweaks>
				<Scene>
					<Camera />
					<Globe {coastlines} {land}>
						{#each validators as validator}
							{#if validator.NodeMatchFound}
								<Node lat={validator.Latitude} lng={validator.Longitude} />
							{/if}
						{/each}
					</Globe>
				</Scene>
			</Tweaks>
		</Renderer>
	</div>
</main>

<style lang="scss">
	:global(html, body) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
</style>
