import { error } from '@sveltejs/kit';
import { getActor } from '$lib/actor';

export async function load({ params, request, platform }) {
	if (!params.rkey) error(404, 'Event URL missing rkey');

	const actor = await getActor({ request, paramActor: params.actor, platform });
	if (!actor) error(404, 'Could not resolve actor');

	return { actor, rkey: params.rkey };
}
