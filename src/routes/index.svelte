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
	import type { Validator as IValidator } from './api/validators';
	import Renderer from '$lib/webgl/Renderer/Renderer.svelte';
	import Camera from '$lib/webgl/Camera/Camera.svelte';
	import Scene from '$lib/webgl/Scene/Scene.svelte';
	import Tweaks from '$lib/webgl/Tweaks/Tweaks.svelte';
	import Globe from '$lib/webgl/Globe/Globe.svelte';
	import Node from '$lib/webgl/Node/Node.svelte';
	import Validator from '$lib/components/Validator.svelte';

	export let validators: IValidator[];
	export let coastlines: number[];
	export let land: number[][];
</script>

<svelte:head>
	<title>Radix Earth | Make an informed staking decision.</title>
</svelte:head>

<div class="absolute py-4 px-8">
	<div class="">By Kansuler</div>
	<div class="text-xs font-italic">Support Radix Earth</div>
	<div class="text-xs whitespace-normal break-all font-bold">
		rdx1qsphn8fyzwuee0w7h7r8lt9zx70hteayj60jszxqja9gsvvfh0pq8gccuvv27
	</div>
</div>
<div class="w-full flex justify-center lg:h-5/6">
	<div class="lg:grid gap-4 grid-cols-2 max-w-screen-2xl w-full">
		<div class="h-48 lg:h-full flex justify-center flex-col items-center mt-24 lg:mt-0">
			<h1 class="text-6xl lg:text-8xl font-centuria text-gray-800 font-bold text-center">
				Radix Earth
			</h1>
			<h2 class="text-2xl font-centuria text-gray-800 text-center">
				Make an informed staking decision
			</h2>
		</div>
		<Renderer class="h-80 lg:h-full">
			<Tweaks>
				<Scene>
					<Camera />
					<Globe {coastlines} {land}>
						{#each validators as validator}
							{#if validator.NodeMatchFound || validator.ManualLocationData}
								<Node
									lat={validator.Latitude}
									lng={validator.Longitude}
									percentage={validator.PercentageStake}
								/>
							{/if}
						{/each}
					</Globe>
				</Scene>
			</Tweaks>
		</Renderer>
	</div>
</div>
<div class="mb-4">
	<h1 class="text-4xl lg:text-6xl font-centuria text-gray-800 text-center">Explore validators</h1>
</div>
<div class="flex justify-center w-full">
	<div class="max-w-screen-md w-full">
		{#each validators as validator, index}
			<Validator {validator} index={index + 1} />
		{/each}
	</div>
</div>
