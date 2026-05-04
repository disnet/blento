<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import AtmoEmbed from '$lib/embed/AtmoEmbed.svelte';

	let { data }: { data: { actor: string; rkey: string } } = $props();

	let ogImage = $derived(`https://atmo.rsvp/p/${data.actor}/e/${data.rkey}/og.png`);

	let created = $derived(page.url.searchParams.get('created') === 'true');

	let path = $derived.by(() => {
		const params = new SvelteURLSearchParams();
		if (browser) {
			const isCustomDomain = !!page.data?.customDomain;
			const eventPath = isCustomDomain
				? `/event/r/${data.rkey}`
				: `/${data.actor}/event/r/${data.rkey}`;
			params.set('share_url', `${window.location.origin}${eventPath}`);
		}
		if (created) params.set('created', 'true');
		const qs = params.toString();
		return `/embed/full/${data.actor}/${data.rkey}${qs ? `?${qs}` : ''}`;
	});

	onMount(() => {
		const url = new URL(window.location.href);
		if (url.searchParams.has('created')) {
			url.searchParams.delete('created');
			history.replaceState(history.state, '', url.toString());
		}
	});

	function handleNotify(name: string, payload: unknown) {
		console.debug('[event/r] notify', name, payload);
		if (name === 'close' || name === 'cancel') {
			history.back();
		}
	}
</script>

<svelte:head>
	<title>Event · Blento</title>
	<meta property="og:title" content="Event" />
	<meta property="og:type" content="article" />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<main class="fixed inset-0 flex flex-col">
	<AtmoEmbed
		origin="https://atmo.rsvp"
		{path}
		allowedCollectionPrefixes={['community.lexicon.calendar.', 'app.bsky.feed.post']}
		fill
		title="Event"
		class="flex-1"
		onnotify={handleNotify}
	/>
</main>
