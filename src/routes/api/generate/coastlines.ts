import type { RequestHandler, EndpointOutput } from '@sveltejs/kit';
import * as topojson from 'topojson-client';
import * as topojsonServer from 'topojson-server';
import { convertGPSCoordinatesToPosition } from '$lib/helpers/coordinates';

import map from './_continents.json';

export const get: RequestHandler = async ({ params }): Promise<EndpointOutput<number[]>> => {
	const topology = topojsonServer.topology({ land: map });
	const multiLineString = topojson.mesh(topology, topology.objects.land);
	const positionsArray: number[] = [];

	for (const P of multiLineString.coordinates) {
		for (
			let p0: { x: number; y: number; z: number },
				p1 = convertGPSCoordinatesToPosition(P[0][1], P[0][0]),
				i = 1;
			i < P.length;
			++i
		) {
			p0 = p1;
			p1 = convertGPSCoordinatesToPosition(P[i][1], P[i][0]);
			positionsArray.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
		}
	}

	return {
		body: positionsArray
	};
};
