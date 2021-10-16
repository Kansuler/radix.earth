import type { RequestHandler, EndpointOutput } from '@sveltejs/kit';
import { db } from '$lib/database';
import coastlines from './_coastlines.json';
import land from './_land.json';

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
};

export type Meta = {
	coastlines: number[];
	land: number[][];
	validators: Validator[];
};

export const get: RequestHandler = async (): Promise<EndpointOutput<Meta>> => {
	const firestore = db.firestore();

	const validatorsCollection = firestore.collection('Validators');

	const snapshot = await validatorsCollection.get();

	return {
		body: {
			coastlines: coastlines as number[],
			land: land as number[][],
			validators: snapshot.docs.map((doc) => {
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
		}
	};
};
