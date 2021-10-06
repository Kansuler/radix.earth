const buffer = new Buffer(import.meta.env.VITE_FIRESTORE_SERVICE_ACCOUNT.toString(), 'base64');

export const variables = {
	firestore: {
		serviceAccount: buffer.toString('ascii'),
		projectId: import.meta.env.VITE_FIRESTORE_PROJECT_ID.toString()
	}
};
