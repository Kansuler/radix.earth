import {
	BufferGeometry,
	CircleGeometry,
	Float32BufferAttribute,
	LineSegments,
	Material,
	Mesh,
	MeshBasicMaterial,
	Vector3
} from 'three';
import * as topojson from 'topojson-client';
import * as topojsonServer from 'topojson-server';

import GeoJsonGeometriesLookup from 'geojson-geometries-lookup';
import {
	convertSphericalCoordinatesToPosition,
	convertPositionToGPSCoordinates,
	convertGPSCoordinatesToVector
} from '$lib/helpers/coordinates';
import getEarthLandsMap from '@geo-maps/earth-lands-10km';

const map = getEarthLandsMap();
const lookup = new GeoJsonGeometriesLookup(map);

export const landMesh = (material: Material): LineSegments<BufferGeometry, Material> => {
	const topology = topojsonServer.topology({ land: map });
	const multiLineString = topojson.mesh(topology, topology.objects.land);
	const positionsArray: number[] = [];
	for (const P of multiLineString.coordinates) {
		for (let p0: Vector3, p1 = convertGPSCoordinatesToVector(P[0]), i = 1; i < P.length; ++i) {
			p0 = p1;
			p1 = convertGPSCoordinatesToVector(P[i]);
			positionsArray.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
		}
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute('position', new Float32BufferAttribute(positionsArray, 3));
	return new LineSegments(geometry, material);
};

export const particleSystem = async (dotCount: number): Promise<Mesh> => {
	// Start to build a particle system
	const particleSystem = [];
	const particleSystemMaterial = new MeshBasicMaterial({
		color: 0x4361ee
	});

	for (let i = 0; i <= dotCount; i++) {
		// sunflower phyllotaxis pattern
		const phi = Math.acos(-1 + (2 * i) / dotCount);
		const theta = Math.sqrt(dotCount * Math.PI) * phi;

		const { x, y, z } = convertSphericalCoordinatesToPosition(phi, theta);
		const { latitude, longitude } = convertPositionToGPSCoordinates(x, y, z);

		// console.log({ latitude})
		// Check if geographical coordinates matches land
		if (!lookup.hasContainers({ type: 'Point', coordinates: [latitude, longitude] })) {
			continue;
		}

		const particle = new CircleGeometry(0.003, 5);
		particle.lookAt(new Vector3(x, y, z));
		particle.translate(x, y, z);
		particleSystem.push(particle);
	}

	const { mergeBufferGeometries } = await import('three/examples/jsm/utils/BufferGeometryUtils');
	const geometries = mergeBufferGeometries(particleSystem, false);
	return new Mesh(geometries, particleSystemMaterial);
};
