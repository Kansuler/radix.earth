export const variables = {
	firestore: {
		serviceAccount: import.meta.env.VITE_FIRESTORE_SERVICE_ACCOUNT.toString(),
		projectId: import.meta.env.VITE_FIRESTORE_PROJECT_ID.toString()
	}
};
