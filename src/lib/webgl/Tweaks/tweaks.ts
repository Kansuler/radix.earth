import type { GUI } from 'dat.gui';

// Used as a unique identifier for svelte context
const tweaksKey = {};

type TweaksContextParameters = {
	addTweakFolder(folderName: string): GUI | null;
	removeTweakFolder(folderName: GUI): void;
};

export type { TweaksContextParameters };
export { tweaksKey };
