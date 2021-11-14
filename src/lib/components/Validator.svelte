<script lang="ts">
	import { findFlagUrlByCountryName } from 'country-flags-svg';
	import { slide } from 'svelte/transition';

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
					{validator.Country !== '' ? validator.Country : 'Unknown Country'}
				</p>
			</div>
			<div
				class="flex px-2 md:ml-6 flex-row justify-center items-center rounded-full bg-gray-100 p-1"
			>
				<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
					<path d="M37 3H9L1 11V47H45V11L37 3Z" fill="white" />
					<path d="M1 18H45V23H1V18ZM1 30H45V35H1V30ZM1 42H45V47H1V42Z" fill="#BBD8FF" />
					<path
						d="M31 39V43M1 11H45V23H1V11ZM37 3H9L1 11H45L37 3ZM39 15V19V15ZM35 15V19V15ZM31 15V19V15ZM1 23H45V35H1V23ZM39 27V31V27ZM35 27V31V27ZM31 27V31V27ZM1 35H45V47H1V35ZM39 39V43V39ZM35 39V43V39Z"
						stroke="#092F63"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M7 17L9.5 14.5L12 17L9.5 19.5L7 17ZM7 29L9.5 26.5L12 29L9.5 31.5L7 29ZM7 41L9.5 38.5L12 41L9.5 43.5L7 41Z"
						stroke="#092F63"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<p class="pl-2 font-normal text-sm ml-1 text-gray-500 whitespace-nowrap">
					{validator.ISP !== '' ? validator.ISP : 'Unknown Host'}
				</p>
			</div>
		</div>
		<div class="mt-2 grid gap-4 grid-cols-2 md:grid-cols-3">
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8">
						<path
							d="M28.75 36L34.75 30L40.75 36L34.75 42L28.75 36ZM6 14L12.002 8L18.002 14L12.002 20L6 14Z"
							fill="white"
						/>
						<path d="M34.75 30L40.75 36L34.75 42V30ZM12 8L18 14L12 20V8Z" fill="#5CEDC2" />
						<path
							d="M7 41L39 9"
							stroke="#003057"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M28.75 36L34.75 30L40.75 36L34.75 42L28.75 36ZM6 14L12.002 8L18.002 14L12.002 20L6 14Z"
							stroke="#003057"
							stroke-width="2"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div>
					<div class="text-sm italic leading-tight">Percentage of stake</div>
					<div class="font-bold">{(validator.PercentageStake * 100).toFixed(3)} %</div>
				</div>
			</div>
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8">
						<path
							d="M33 3L21 10V21.666L13 17L1 24V38L13 45L25 38V26.334L33 31L45 24V10L33 3Z"
							fill="white"
						/>
						<path
							d="M13 45L25 38L22 36L13 41L4 36L1 38L13 45ZM33 31L45 24L42 22L33 27L24 22L21 24L33 31Z"
							fill="#5CEDC2"
						/>
						<path
							d="M25 31V38L13 45L1 38V24L13 17L17 19M45 24L33 31L21 24V10L33 3L45 10V24Z"
							stroke="#003057"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M37 11H30L28 14L30 17H33H36L38 20L36 23H29M33 11V9M33 25V23M17 25H10L8 28L10 31H16L18 34L16 37H9M13 25V23M13 39V37"
							stroke="#003057"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div>
					<div class="text-sm italic leading-tight">Validator Fee</div>
					<div class="font-bold">{validator.ValidatorFee} %</div>
				</div>
			</div>
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8">
						<path
							d="M19 36V9L23 7L27 9V26L31.6 24L36 26L40.6 24L45 26V47H16L11 36L14 27H19"
							fill="white"
						/>
						<path
							d="M19 36V9L23 7L27 9V26L31.6 24L36 26L40.6 24L45 26V47H16L11 36L14 27H19"
							fill="white"
						/>
						<path d="M19 36V27H14L11 36L16 47H45V36H19Z" fill="#5CEDC2" />
						<path
							d="M1 1L13 13M13 1L1 13M32 6L38 14L47 1M19 36V9L23 7L27 9V26L31.6 24L36 26L40.6 24L45 26V47H16L11 36L14 27H19"
							stroke="#003057"
							stroke-width="2"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M19 36V9L23 7L27 9V26L31.6 24L36 26L40.6 24L45 26V47H16L11 36L14 27H19"
							stroke="#003057"
							stroke-width="2"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div>
					<div class="text-sm italic leading-tight">Accepting stake</div>
					<div class="font-bold">{validator.IsExternalStakeAccepted ? 'Yes' : 'No'}</div>
				</div>
			</div>
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8">
						<path d="M5 31L20 39L35 31V13L20 5L5 13V31Z" fill="white" />
						<path d="M5 31L20 39L35 31V13L5 31Z" fill="#5CEDC2" />
						<path
							d="M1 23H10L14 16L18 29L23 19L27 25L31 20M47 38L35 31"
							stroke="#003057"
							stroke-width="2"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M5 27V31L20 39L35 31V13L20 5L5 13V19"
							stroke="#003057"
							stroke-width="2"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div>
					<div class="text-sm italic leading-tight">Uptime</div>
					<div class="font-bold">{validator.UptimePercentage} %</div>
				</div>
			</div>
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8">
						<path
							d="M12.368 33L18.356 20.81L31.268 12.668L37 1L43.282 4.086L37.552 15.754L39 30.95L37.992 33H12.368Z"
							fill="white"
						/>
						<path
							d="M47 37L42 40L38 37L34 40L30 37L26 40L22 37L18 40L14 37L10 40L6 37L1 40V47L6 44L10 47L14 44L18 47L22 44L26 47L30 44L34 47L38 44L42 47L47 44V37ZM19.052 33L24.182 22.558L34.48 24.274L30.194 33H19.052ZM34.354 6.386L37 1.002L43.284 4.088L40.638 9.474L34.354 6.386Z"
							fill="#5CEDC2"
						/>
						<path
							d="M1 47L6 44L10 47L14 44L18 47L22 44L26 47L30 44L34 47L38 44L42 47L47 44M1 40L6 37L10 40L14 37L18 40L22 37L26 40L30 37L34 40L38 37L42 40L47 37M40.638 9.472L34.354 6.386M12.368 33L18.356 20.81L31.268 12.668L37 1L43.282 4.086L37.552 15.754L39 30.95L37.992 33"
							stroke="#003057"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M29.332 23.416L24.624 33M19.052 33L24.182 22.558L34.48 24.274L30.194 33H19.052Z"
							stroke="#003057"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div>
					<div class="text-sm italic leading-tight">Proposals Missed</div>
					<div class="font-bold">{validator.ProposalsMissed}</div>
				</div>
			</div>
			<div class="px-4 py-2 flex">
				<div class="pr-4">
					<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8">
						<path
							d="M13 27L16 20L11 22L6 20L9 27L1 39L4 47H18L21 39L13 27ZM37 11L33 13L29 11V5L33 3L37 5V11ZM41 18L33 15L25 18L19 31L27 26V47L33 35L39 47V26L47 31L41 18Z"
							fill="white"
						/>
						<path
							d="M18 47L20.04 41.56L13 30.998H9.00001L1.96001 41.56L4.00001 47H18ZM33 3L29 5V6L37 8V5L33 3ZM27 31H39V34H27V31ZM13 27L14.966 22.412L11 23.998L7.03401 22.412L9.00001 27H13Z"
							fill="#5CEDC2"
						/>
						<path
							d="M4 47H18L21 39L13 27H9L1 39L4 47Z"
							stroke="#092F63"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M11 43V41M13 33H9L8 35L9 37H13L14 39L13 41H9L13 33ZM11 33V31V33Z"
							stroke="#092F63"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M37 11L33 13L29 11V5L33 3L37 5V11Z"
							stroke="#092F63"
							stroke-width="2"
							stroke-linejoin="round"
						/>
						<path
							d="M27 23V47L33 35L39 47V23M29 6L37 8L29 6ZM33 19V25V19ZM27 31H39H27Z"
							stroke="#092F63"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M39 26L47 31L41 18L33 15L25 18L19 31L27 26H39ZM13 27L16 20L11 22L6 20L9 27H13Z"
							stroke="#092F63"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div>
					<div class="text-sm italic leading-tight">Owner Delegation</div>
					<div class="font-bold">
						{validator.OwnerDelegation.substr(0, validator.OwnerDelegation.length - 19)}
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
					<svg
						viewBox="0 0 48 48"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="w-8 h-8 cursor-pointer"
						on:click={() => (expand = !expand)}
					>
						<path d="M43 36L23 47L3 36V14L23 3L43 14V36Z" fill="white" />
						<path d="M3 36L23 47L43 36L38.8 33.4L23 42L7.2 33.4L3 36Z" fill="#5CEDC2" />
						<path
							d="M31 27L23 35M23 35L15 27M23 35V15"
							stroke="#003057"
							stroke-width="2"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M43 36L23 47L3 36V14L23 3L43 14V36Z"
							stroke="#003057"
							stroke-width="2"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			</div>
			{#if expand}
				<div class="slider" transition:slide>
					<div class="px-4 py-2 flex">
						<div class="pr-4">
							<svg
								viewBox="0 0 48 48"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="w-8 h-8"
							>
								<path d="M1 7H47V43H1V7Z" fill="white" />
								<path d="M47 15V43H1L47 15Z" fill="#5CEDC2" />
								<path
									d="M17 11H19M5 11H7H5ZM11 11H13H11Z"
									stroke="#003057"
									stroke-width="2"
									stroke-miterlimit="10"
									stroke-linecap="round"
								/>
								<path
									d="M1 15H47M1 7H47V43H1V7Z"
									stroke="#003057"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M33 25H37V29L33 31M19 35V25V35ZM17 25H21H17ZM27 35V25V35ZM25 25H29H25ZM9 35V25V35ZM13 35V25V35ZM9 31H13H9ZM33 35V25V35Z"
									stroke="#003057"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<div>
							<div class="text-sm italic leading-tight">Website</div>
							<a href={validator.InfoURL} target="_blank" class="underline">{validator.InfoURL}</a>
						</div>
					</div>
					<div class="px-4 py-2 flex">
						<div class="pr-4">
							<svg
								viewBox="0 0 48 48"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="w-8 h-8"
							>
								<path d="M9 9L5 5V43L9 47H43V9H9Z" fill="white" />
								<path
									d="M9 47L5 43V5L9 9V47ZM23 31H27V37H23V31ZM17 28L25 22L33 28.002V23.002L25 17L17 23V28Z"
									fill="#5CEDC2"
								/>
								<path
									d="M43 1H9L5 5M5 5L9 9H43V47H9L5 43V5ZM12 5H41M3 15H7M3 21H7M3 27H7M3 33H7M3 39H7"
									stroke="#003057"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M17 23L16.998 37H33V23.002L25 17L17 23V23Z"
									stroke="#003057"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12.998 26L25 17L37 26H12.998ZM23 31H27V37H23V31Z"
									stroke="#003057"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
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
