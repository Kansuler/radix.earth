import {
	CircleBufferGeometry,
	Color,
	DoubleSide,
	InstancedMesh,
	MeshBasicMaterial,
	Object3D,
	Vector3
} from 'three';

export const particleSystem = async (positions: number[][]): Promise<InstancedMesh> => {
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
