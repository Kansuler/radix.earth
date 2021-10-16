import { convertPositionToGPSCoordinates } from './../../../../lib/helpers/coordinates';
import { convertSphericalCoordinatesToPosition } from '$lib/helpers/coordinates';
import type { RequestHandler, EndpointOutput } from '@sveltejs/kit';

import GeoJsonGeometriesLookup from 'geojson-geometries-lookup';
import map from '../_continents.json';

const lookup = new GeoJsonGeometriesLookup(map);

export const get: RequestHandler = async ({ params }): Promise<EndpointOutput<number[][]>> => {
	const amount = parseInt(params.amount);

	const positions: number[][] = [];
	for (let i = 0; i <= amount; i++) {
		// sunflower phyllotaxis pattern
		const phi = Math.acos(-1 + (2 * i) / amount);
		const theta = Math.sqrt(amount * Math.PI) * phi;

		const { x, y, z } = convertSphericalCoordinatesToPosition(phi, theta);
		const { latitude, longitude } = convertPositionToGPSCoordinates(x, y, z);

		// Check if geographical coordinates matches land
		if (!lookup.hasContainers({ type: 'Point', coordinates: [longitude, latitude] })) {
			continue;
		}

		positions.push([x, y, z]);
	}

	return {
		body: positions
	};
};
