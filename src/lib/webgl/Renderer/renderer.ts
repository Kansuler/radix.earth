import type { PerspectiveCamera, Scene } from 'three';

// Used as a unique identifier for svelte context
const rendererKey = {};

type RendererContextParameters = {
	setActiveScene: (scene: Scene) => void;
	setActiveCamera: (camera: PerspectiveCamera) => void;
};

export type { RendererContextParameters };
export { rendererKey };
