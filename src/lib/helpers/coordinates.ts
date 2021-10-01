import { Vector3 } from 'three';

export const convertCoordinatesToPosition = (
	lat: number,
	lng: number
): { x: number; y: number; z: number } => {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lng + 180) * (Math.PI / 180);

	const x = -(Math.sin(phi) * Math.cos(theta));
	const y = Math.cos(phi);
	const z = Math.sin(phi) * Math.sin(theta);

	return { x, y, z };
};

export const convertCoordinatesToVector3 = (lat: number, lng: number): Vector3 => {
	const { x, y, z } = convertCoordinatesToPosition(lat, lng);
	return new Vector3(x, y, z);
};
