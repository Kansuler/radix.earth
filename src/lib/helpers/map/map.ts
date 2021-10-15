import {
	BufferGeometry,
	CircleBufferGeometry,
	Color,
	DoubleSide,
	Float32BufferAttribute,
	InstancedMesh,
	LineSegments,
	Material,
	MeshBasicMaterial,
	Object3D,
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
import map from './seas.json';

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

export const particleSystem = async (dotCount: number): Promise<InstancedMesh> => {
	const positions: number[][] = [];
	for (let i = 0; i <= dotCount; i++) {
		// sunflower phyllotaxis pattern
		const phi = Math.acos(-1 + (2 * i) / dotCount);
		const theta = Math.sqrt(dotCount * Math.PI) * phi;

		const { x, y, z } = convertSphericalCoordinatesToPosition(phi, theta);
		const { latitude, longitude } = convertPositionToGPSCoordinates(x, y, z);

		// Check if geographical coordinates matches land
		if (lookup.hasContainers({ type: 'Point', coordinates: [longitude, latitude] })) {
			continue;
		}

		positions.push([x, y, z]);
	}

	const baseGeometry = new CircleBufferGeometry(0.003, 5);
	const material = new MeshBasicMaterial({
		color: 0xeebbaa,
		side: DoubleSide
	});

	const cluster = new InstancedMesh(baseGeometry, material, positions.length);

	const obj = new Object3D();
	const vector = new Vector3();
	for (let i = 0; i < cluster.count; i++) {
		obj.position.set(0, 0, 0);
		obj.lookAt(vector.set(positions[i][0], positions[i][1], positions[i][2]));
		obj.position.set(positions[i][0], positions[i][1], positions[i][2]);
		obj.updateMatrix();
		cluster.setMatrixAt(i, obj.matrix);
		cluster.setColorAt(i, new Color(0x6eacd8));
	}

	cluster.instanceMatrix.needsUpdate = true;

	return cluster;
};
