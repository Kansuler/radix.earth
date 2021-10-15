import admin, { app } from 'firebase-admin';
import { variables } from '$lib/variables';

let db: app.App;

if (!db) {
	db = admin.initializeApp({
		credential: admin.credential.cert(JSON.parse(variables.firestore.serviceAccount)),
		projectId: variables.firestore.projectId
	});
}

export { db };
