<script lang="ts">
	import type { PerspectiveCamera, Scene } from 'three';
	import { browser } from '$app/env';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { WebGLRenderer } from 'three';
	import { RendererContextParameters, rendererKey } from './renderer';

	type RendererParameters = {
		activeCamera?: PerspectiveCamera;
		activeScene?: Scene;
	};

	let canvas: HTMLCanvasElement;
	let renderer: WebGLRenderer;

	const parameters: RendererParameters = {};

	// Set methods to update active scene and camera through context
	setContext<RendererContextParameters>(rendererKey, {
		setActiveScene: (scene: Scene) => (parameters.activeScene = scene),
		setActiveCamera: (camera: PerspectiveCamera) => (parameters.activeCamera = camera)
	});

	if (browser) {
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		// Set correct aspect ratio
		const setCameraAspect = () => {
			parameters.activeCamera.aspect = sizes.width / sizes.height;
			parameters.activeCamera.updateProjectionMatrix();
		};

		const setRendererSize = () => {
			// Update renderer with size and pixel ratio
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		};

		// Event handler for resize event
		const resizeEvent = () => {
			sizes.width = window.innerWidth;
			sizes.height = window.innerHeight;

			setCameraAspect();
			setRendererSize();
		};

		let animationTick: number;

		onMount(() => {
			renderer = new WebGLRenderer({
				canvas
			});

			window.addEventListener('resize', resizeEvent);
			setRendererSize();

			const tick = () => {
				// If active scene and camera exist, render the image.
				if (parameters.activeScene && parameters.activeCamera) {
					renderer.render(parameters.activeScene, parameters.activeCamera);
				}

				// Call tick again on the next frame
				animationTick = window.requestAnimationFrame(tick);
			};

			tick();
		});

		onDestroy(() => {
			window.cancelAnimationFrame(animationTick);
			window.removeEventListener('resize', resizeEvent);
		});
	}
</script>

<canvas bind:this={canvas} />
<slot />
