<script lang="ts">
	import { findFlagUrlByCountryName } from 'country-flags-svg';
	import { slide } from 'svelte/transition';
	import ServerSVG from './server.svg';
	import PercentSVG from './percent.svg';
	import FeeSVG from './fee.svg';
	import HandSVG from './hand.svg';
	import HealthSVG from './health.svg';
	import BottleSVG from './bottle.svg';
	import OwnerDelegationSVG from './ownerDelegation.svg';
	import ArrowSVG from './arrow.svg';
	import WebSVG from './web.svg';
	import AddressSVG from './address.svg';

	type IValidator = {
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
		CountryStake: number;
		HostStake: number;
	};

	export let validator: IValidator;
	export let index: number;

	const country = findFlagUrlByCountryName(validator.Country ?? '');

	let expand = false;
</script>

<div class="p-2 md:py-8">
	<div class="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg">
		<div>
			<div class="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2 font-centuria">
				#{index}
				<h1 class="ml-2 uppercase font-bold text-gray-800">{validator.Name}</h1>
			</div>
		</div>

		<div class="mt-2 flex justify-around  md:justify-start md:px-4  bg-white p-2">
			<div class="flex px-2 flex-row justify-center items-center rounded-full bg-gray-100 p-1">
				{#if validator.Country !== ''}
					<img src={country} alt={validator.Country} class="h-5 w-5" />
				{/if}
				<p class="pl-2 font-normal text-sm ml-1 text-gray-500">
					{validator.Country !== ''
						? `${validator.Country} (${(validator.CountryStake * 100).toFixed(3)}%)`
						: 'Unknown Country'}
				</p>
			</div>
			<div
				class="flex px-2 md:ml-6 flex-row justify-center items-center rounded-full bg-gray-100 p-1"
			>
				<img src={ServerSVG} alt="Server" class="w-5 h-5" />
				<p class="pl-2 font-normal text-sm ml-1 text-gray-500 whitespace-nowrap">
					{validator.ISP !== ''
						? `${validator.ISP} (${(validator.HostStake * 100).toFixed(3)}%)`
						: 'Unknown Host'}
				</p>
			</div>
		</div>
		<div class="mt-2 grid gap-4 grid-cols-2 md:grid-cols-3">
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<img src={PercentSVG} alt="Percent of stake" class="w-8 h-8" />
				</div>
				<div>
					<div class="text-sm italic leading-tight">Percentage of stake</div>
					<div class="font-bold">{(validator.PercentageStake * 100).toFixed(3)} %</div>
				</div>
			</div>
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<img src={FeeSVG} alt="Validator fee" class="w-8 h-8" />
				</div>
				<div>
					<div class="text-sm italic leading-tight">Validator Fee</div>
					<div class="font-bold">{validator.ValidatorFee} %</div>
				</div>
			</div>
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<img src={HandSVG} alt="Validator fee" class="w-8 h-8" />
				</div>
				<div>
					<div class="text-sm italic leading-tight">Accepting stake</div>
					<div class="font-bold">{validator.IsExternalStakeAccepted ? 'Yes' : 'No'}</div>
				</div>
			</div>
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<img src={HealthSVG} alt="Uptime" class="w-8 h-8" />
				</div>
				<div>
					<div class="text-sm italic leading-tight">Uptime</div>
					<div class="font-bold">{validator.UptimePercentage} %</div>
				</div>
			</div>
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<img src={BottleSVG} alt="Proposals missed" class="w-8 h-8" />
				</div>
				<div>
					<div class="text-sm italic leading-tight">Proposals Missed</div>
					<div class="font-bold">{validator.ProposalsMissed}</div>
				</div>
			</div>
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<img src={OwnerDelegationSVG} alt="Owner delegation" class="w-8 h-8" />
				</div>
				<div>
					<div class="text-sm italic leading-tight">Owner Delegation (XRD)</div>
					<div class="font-bold">
						{#if validator.OwnerDelegation === '0'}
							0
						{:else}
							{validator.OwnerDelegation.substr(0, validator.OwnerDelegation.length - 19)}
						{/if}
					</div>
				</div>
			</div>
		</div>
		<div
			class="mt-4 bg-gray-100 px-4 py-2"
			class:bg-red-200={validator.PercentageStake * 100 > 2.5}
		>
			<div class="flex justify-between">
				<div />
				{#if validator.PercentageStake * 100 > 2.5}
					<div class="flex justify-center items-center flex-col">
						<h2 class="text-center font-bold px-4">Avoid to stake with this validator</h2>
						<span class="text-xs">It has over 2.5% of total stake</span>
					</div>
				{/if}
				<div>
					<img
						src={ArrowSVG}
						alt="arrow"
						class="w-8 h-8 cursor-pointer"
						on:click={() => (expand = !expand)}
					/>
				</div>
			</div>
			{#if expand}
				<div class="slider" transition:slide>
					<div class="px-4 py-2 flex">
						<div class="pr-4">
							<img src={WebSVG} alt="website" class="w-8 h-8" />
						</div>
						<div>
							<div class="text-sm italic leading-tight">Website</div>
							<a href={validator.InfoURL} target="_blank" class="underline">{validator.InfoURL}</a>
						</div>
					</div>
					<div class="px-4 py-2 flex">
						<div class="pr-4">
							<img src={AddressSVG} alt="Address" class="w-8 h-8" />
						</div>
						<div>
							<div class="text-sm italic leading-tight">Staking Address</div>
							<div class="whitespace-normal break-all">
								{validator.Address}
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
