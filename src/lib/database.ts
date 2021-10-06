import { dev } from '$app/env';
import admin from 'firebase-admin';
import { variables } from '$lib/variables';

const credential = dev
	? admin.credential.cert(variables.firestore.serviceAccount)
	: admin.credential.cert(JSON.stringify(variables.firestore.serviceAccount));

const db = admin.initializeApp({
	credential,
	projectId: variables.firestore.projectId
});

export { db };
