<script lang="ts">
	import { goto } from '$app/navigation';
	import AtmoEmbed from '$lib/embed/AtmoEmbed.svelte';

	function handleNotify(name: string, payload: unknown) {
		console.debug('[event/create] notify', name, payload);
		if (name === 'event-created') {
			const uri = (payload as { uri?: string } | undefined)?.uri;
			if (typeof uri === 'string') {
				const match = uri.match(/^at:\/\/([^/]+)\/[^/]+\/([^/?#]+)$/);
				if (match) {
					const [, repo, rkey] = match;
					goto(`/${repo}/event/r/${rkey}?created=true`);
					return;
				}
			}
			goto('/');
			return;
		}
		if (name === 'cancel') {
			history.back();
		}
	}
</script>

<svelte:head>
	<title>Create event · Blento</title>
</svelte:head>

<main class="fixed inset-0 flex flex-col">
	<AtmoEmbed
		origin="https://atmo.rsvp"
		path="/embed/create"
		allowedCollectionPrefixes={['community.lexicon.calendar.', 'app.bsky.feed.post']}
		fill
		title="Create event"
		class="flex-1"
		onnotify={handleNotify}
	/>
</main>
