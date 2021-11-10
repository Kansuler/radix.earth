<script lang="ts">
	import type { PerspectiveCamera, Scene } from 'three';
	import { browser } from '$app/env';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { WebGLRenderer } from 'three';
	import { RendererContextParameters, rendererKey } from './renderer';
	import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	type RendererParameters = {
		activeCamera?: PerspectiveCamera;
		activeScene?: Scene;
	};

	let canvas: HTMLCanvasElement;
	let renderer: WebGLRenderer;
	let functions: { (): void }[] = [];

	const parameters: RendererParameters = {};

	let controls: OrbitControls;

	const sizes = {
		width: browser && window.innerWidth,
		height: browser && window.innerHeight
	};

	// Set methods to update active scene and camera through context
	setContext<RendererContextParameters>(rendererKey, {
		setActiveScene: (scene: Scene) => (parameters.activeScene = scene),
		setActiveCamera: (camera: PerspectiveCamera) => {
			parameters.activeCamera = camera;
			parameters.activeCamera.aspect = sizes.width / sizes.height;
			parameters.activeCamera.updateProjectionMatrix();
			let zoom = 4;
			if (browser) {
				if (
					/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
				) {
					zoom = 3;
				}
			}

			import('three/examples/jsm/controls/OrbitControls').then(({ OrbitControls }) => {
				controls = new OrbitControls(parameters.activeCamera, canvas);
				controls.enableDamping = true;
				controls.autoRotate = true;
				controls.autoRotateSpeed = 0.5;
				controls.enablePan = false;
				controls.enableZoom = false;
				controls.maxDistance = zoom;
				controls.minZoom = zoom;

				controls.addEventListener('end', (event) => {
					controls.rotateSpeed = controls.getDistance() * 0.1;
				});
			});
		},
		addUpdateFunction: (fn) => {
			functions.push(fn);
		}
	});

	if (browser) {
		// Set correct aspect ratio
		const setCameraAspect = () => {
			if (parameters.activeCamera) {
				parameters.activeCamera.aspect = sizes.width / sizes.height;
				parameters.activeCamera.updateProjectionMatrix();
			}
		};

		const setRendererSize = () => {
			// Update renderer with size and pixel ratio
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		};

		// Event handler for resize event
		const resizeEvent = () => {
			setCameraAspect();
			setRendererSize();
		};

		let animationTick: number;

		onMount(() => {
			renderer = new WebGLRenderer({
				canvas,
				alpha: true
			});

			window.addEventListener('resize', resizeEvent);

			new ResizeObserver(() => {
				sizes.width = canvas.parentElement.clientWidth;
				sizes.height = canvas.parentElement.clientHeight;
				resizeEvent();
			}).observe(canvas.parentElement);
			const tick = () => {
				sizes.width = canvas.parentElement.clientWidth;
				sizes.height = canvas.parentElement.clientHeight;

				// If active scene and camera exist, render the image.
				if (parameters.activeScene && parameters.activeCamera) {
					renderer.render(parameters.activeScene, parameters.activeCamera);
				}

				if (controls) {
					controls.update();
				}

				let i = 0;
				const length = functions.length;

				while (i < length) {
					functions[i]();
					i++;
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

<div class={$$props.class}>
	<canvas bind:this={canvas} />
	<slot />
</div>
