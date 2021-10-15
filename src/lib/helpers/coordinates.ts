import { Vector3 } from 'three';

export const convertGPSCoordinatesToPosition = (
	latitude: number,
	longitude: number
): { x: number; y: number; z: number } => {
	const { phi, theta } = convertGPSCoordinatesToSphericalCoordinates(latitude, longitude);
	return convertSphericalCoordinatesToPosition(phi, theta);
};

export const convertGPSCoordinatesToSphericalCoordinates = (
	latitude: number,
	longitude: number
): { phi: number; theta: number } => {
	return {
		phi: (90 - latitude) * (Math.PI / 180),
		theta: (longitude + 180) * (Math.PI / 180)
	};
};

export const convertGPSCoordinatesToVector = ([longitude, latitude]: number[]): Vector3 => {
	const { x, y, z } = convertGPSCoordinatesToPosition(latitude, longitude);
	return new Vector3(x, y, z);
};

export const convertSphericalCoordinatesToPosition = (
	phi: number,
	theta: number
): { x: number; y: number; z: number } => {
	const x = Math.sin(phi) * Math.sin(theta);
	const y = Math.cos(phi);
	const z = Math.sin(phi) * Math.cos(theta);

	return { x, y, z };
};

export const convertCoordinatesToVector3 = (latitude: number, longitude: number): Vector3 => {
	const { x, y, z } = convertGPSCoordinatesToPosition(latitude, longitude);
	return new Vector3(x, y, z);
};

export const convertPositionToGPSCoordinates = (
	x: number,
	y: number,
	z: number
): { latitude: number; longitude: number } => {
	const longitude = -((Math.atan2(x, -z) * 180) / Math.PI);
	const length = Math.sqrt(x * x + z * z);
	const latitude = (Math.atan2(y, length) * 180) / Math.PI;

	return { latitude, longitude };
};
