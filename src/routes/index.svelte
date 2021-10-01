<script lang="ts">
	import Renderer from '$lib/webgl/Renderer/Renderer.svelte';
	import Camera from '$lib/webgl/Camera/Camera.svelte';
	import Scene from '$lib/webgl/Scene/Scene.svelte';
	import Tweaks from '$lib/webgl/Tweaks/Tweaks.svelte';
	import Globe from '$lib/webgl/Globe/Globe.svelte';
	import Node from '$lib/webgl/Node/Node.svelte';
</script>

<main class="main">
	<Renderer>
		<Tweaks>
			<Scene>
				<Camera />
				<Globe>
					<Node lat={0} lng={0} />
				</Globe>
			</Scene>
		</Tweaks>
	</Renderer>
</main>

<style lang="scss">
	:global(html, body) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
</style>
