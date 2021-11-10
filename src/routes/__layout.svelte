<script lang="ts">
	import type { Application, Graphics, Container } from 'pixi.js';
	import type { GodrayFilter } from '$lib/filter/GodrayFilter';
	import { browser } from '$app/env';
	import { onDestroy, onMount } from 'svelte';
	import '../app.postcss';

	let view: HTMLDivElement;

	if (browser) {
		let resize: () => void;

		onMount(async () => {
			const { Application, Container, Graphics } = await import('pixi.js');
			const { GodrayFilter } = await import('$lib/filter/GodrayFilter');

			let app: Application;
			let rect: Graphics;
			let container: Container;
			let godrayFilter: GodrayFilter;

			resize = () => {
				app.renderer.resize(view.clientWidth, view.clientHeight);

				if (rect) {
					container.removeChild(rect);
					rect.destroy();
				}

				if (container) {
					app.stage.removeChild(container);
					container.destroy();
				}

				container = new Container();
				container.width = app.screen.width;
				container.height = app.screen.height;
				container.x = 0;
				container.y = 0;

				godrayFilter = new GodrayFilter({
					gain: 0.5,
					lacunarity: 2.6,
					alpha: 0.6,
					angle: -30
				});

				container.filters = [godrayFilter];
				app.stage.addChild(container);

				// Draw a green rectangle
				rect = new Graphics().drawRect(0, 0, app.screen.width, app.screen.height);

				container.addChild(rect);
			};
			app = new Application({
				resizeTo: view,
				backgroundAlpha: 0
			});

			view.appendChild(app.view);

			let elapsed = 0;
			app.ticker.add((delta) => {
				elapsed += delta;
				godrayFilter.time = (elapsed / 100.0) * 0.8;
			});

			resize();
			window.addEventListener('resize', resize);
		});

		onDestroy(() => {
			window.removeEventListener('resize', resize);
		});
	}
</script>

<div bind:this={view} class="absolute h-5/6 w-full overflow-x-hidden" />

<main class="relative h-full">
	<slot />
</main>

<style lang="scss">
	:global(html, body, #svelte) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
</style>
