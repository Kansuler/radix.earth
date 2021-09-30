import type { Object3D } from 'three';

// Used as a unique identifier for svelte context
const sceneKey = {};

type SceneContextParameters = {
	addToScene: (...object: Object3D[]) => void;
};

export type { SceneContextParameters };
export { sceneKey };
