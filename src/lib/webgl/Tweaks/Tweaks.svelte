<script lang="ts">
	import type { GUI } from 'dat.gui';
	import { browser, dev } from '$app/env';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { TweaksContextParameters, tweaksKey } from './tweaks';

	let gui: GUI;

	setContext<TweaksContextParameters>(tweaksKey, {
		addTweakFolder: (propName: string) => {
			if (gui) {
				return gui.addFolder(propName);
			}

			return null;
		},
		removeTweakFolder: (folder: GUI) => {
			gui && gui.removeFolder(folder);
		}
	});

	let mounted = false;

	onMount(async () => {
		if (browser && dev) {
			const dat = await import('dat.gui');
			gui = new dat.GUI();
		}

		mounted = true;
	});

	onDestroy(() => {
		if (gui) {
			gui.destroy();
		}
	});
</script>

{#if mounted}
	<slot />
{/if}
