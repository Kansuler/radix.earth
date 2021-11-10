import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import { sass } from 'svelte-preprocess-sass';
import glsl from 'vite-plugin-glsl';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({
        style: sass(),
        "postcss": true
    })],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),

		vite: () => ({
			plugins: [glsl.default()]
		})
	}
};

export default config;
