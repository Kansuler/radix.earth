<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const url = '/api/validators';

		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					validators: await res.json()
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
	import Renderer from '$lib/webgl/Renderer/Renderer.svelte';
	import Camera from '$lib/webgl/Camera/Camera.svelte';
	import Scene from '$lib/webgl/Scene/Scene.svelte';
	import Tweaks from '$lib/webgl/Tweaks/Tweaks.svelte';
	import Globe from '$lib/webgl/Globe/Globe.svelte';
	import Node from '$lib/webgl/Node/Node.svelte';

	type Validator = {
		Address: string;
		City: string;
		Country: string;
		ISP: string;
		InfoURL: string;
		IsExternalStakeAccepted: boolean;
		Latitude: number;
		Longitude: number;
		Name: string;
		NodeAddress: string;
		NodeMatchFound: boolean;
		Organisation: string;
		OwnerAddress: string;
		OwnerDelegation: string;
		ProposalsCompleted: number;
		ProposalsMissed: number;
		Registered: boolean;
		TotalDeligatedStake: string;
		UptimePercentage: string;
		ValidatorFee: string;
	};

	export let validators: Validator[];
</script>

<main class="main">
	<div class="bg-blue-600">
		<Renderer>
			<Tweaks>
				<Scene>
					<Camera />
					<Globe>
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
	test
</main>

<style lang="scss">
	:global(html, body) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
</style>
