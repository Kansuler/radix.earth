import { db } from '$lib/database';

export async function get(): Promise<unknown> {
	const firestore = db.firestore();

	const validatorsCollection = firestore.collection('Validators');

	const snapshot = await validatorsCollection.get();

	return {
		body: snapshot.docs.map((doc) => {
			const {
				Address,
				City,
				Country,
				ISP,
				InfoURL,
				IsExternalStakeAccepted,
				Latitude,
				Longitude,
				Name,
				NodeAddress,
				NodeMatchFound,
				Organisation,
				OwnerAddress,
				OwnerDelegation,
				ProposalsCompleted,
				ProposalsMissed,
				Registered,
				TotalDeligatedStake,
				UptimePercentage,
				ValidatorFee
			} = doc.data();

			return {
				Address,
				City,
				Country,
				ISP,
				InfoURL,
				IsExternalStakeAccepted,
				Latitude,
				Longitude,
				Name,
				NodeAddress,
				NodeMatchFound,
				Organisation,
				OwnerAddress,
				OwnerDelegation,
				ProposalsCompleted,
				ProposalsMissed,
				Registered,
				TotalDeligatedStake,
				UptimePercentage,
				ValidatorFee
			};
		})
	};
}
