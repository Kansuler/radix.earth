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
	PercentageStake: number;
	ManualLocationData: boolean;
	HostStake: number;
	CountryStake: number;
};

export type Meta = {
	coastlines: number[];
	land: number[][];
	validators: Validator[];
};

export const get: RequestHandler = async (): Promise<EndpointOutput<Meta>> => {
	const HostName = (name: string): string => {
		return name.split(/[^A-Za-z]/)[0].toLowerCase();
	};

	const firestore = db.firestore();

	const validatorsCollection = firestore.collection('Validators');

	const snapshot = await validatorsCollection.where('UptimePercentage', '!=', '0.00').get();
	let delegatedStake = 0;
	const countryStake: Record<string, number> = {};
	const hostStake: Record<string, number> = {};
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
		if (!countryStake.hasOwnProperty(Country)) {
			countryStake[Country] = 0;
		}
		countryStake[Country] += parseInt(TotalDeligatedStake);
		const host = HostName(ISP);
		if (!hostStake.hasOwnProperty(host)) {
			hostStake[host] = 0;
		}
		hostStake[host] += parseInt(TotalDeligatedStake);

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
		result[index].HostStake = hostStake[HostName(result[index].ISP)] / delegatedStake;
		result[index].CountryStake = countryStake[result[index].Country] / delegatedStake;
	}

	result.sort((a, b) => b.PercentageStake - a.PercentageStake);

	return {
		body: {
			coastlines: coastlines as number[],
			land: land as number[][],
			validators: result
		}
	};
};
