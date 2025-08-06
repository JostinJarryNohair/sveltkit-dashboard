<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- {@render children?.()}: Svelte 5's way to render child content (equivalent to
   <slot /> in Svelte 4) -->
{@render children?.()}
