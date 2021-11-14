import type { RequestHandler, EndpointOutput } from '@sveltejs/kit';
import { db } from '$lib/database';

export type Validator = {
	Address: string;
	City: string;
	Country: string;
	ISP: string;
	InfoURL: string;
	IsExternalStakeAccepted: boolean;
	Latitude: number;
	Longitude: number;
	Name: string;
	NodeAddress: string;
	NodeMatchFound: boolean;
	Organisation: string;
	OwnerAddress: string;
	OwnerDelegation: string;
	ProposalsCompleted: number;
	ProposalsMissed: number;
	Registered: boolean;
	TotalDeligatedStake: string;
	UptimePercentage: string;
	ValidatorFee: string;
	PercentageStake: number;
	ManualLocationData: boolean;
};

export const get: RequestHandler = async (): Promise<EndpointOutput<Validator[]>> => {
	const firestore = db.firestore();

	const validatorsCollection = firestore.collection('Validators');

	const snapshot = await validatorsCollection.where('UptimePercentage', '!=', '0.00').get();
	let delegatedStake = 0;
	const result = snapshot.docs.map<Validator>((doc) => {
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
			ValidatorFee,
			ManualLocationData
		} = doc.data();

		delegatedStake += parseInt(TotalDeligatedStake);

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
			ValidatorFee,
			PercentageStake: 0,
			ManualLocationData
		};
	});

	for (let index = 0; index < result.length; ++index) {
		result[index].PercentageStake = parseInt(result[index].TotalDeligatedStake) / delegatedStake;
	}

	return {
		body: result
	};
};
