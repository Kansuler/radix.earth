import admin from 'firebase-admin';
import { variables } from '$lib/variables';

const db = admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(variables.firestore.serviceAccount)),
	projectId: variables.firestore.projectId
});

export { db };
