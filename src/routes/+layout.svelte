<nav>
    {#each pages as p}
    <a href={ p.url } class:current={ "." + $page.route.id === p.url } target={ p.url.startsWith("http") ? "_blank" : null }>{ p.title }</a>
    {/each}
</nav> <slot />
<style>
    a.current {
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: oklch(80% 3% 200);
    padding-bottom: 0.25em;
    }

    a:hover {
    color: var(--color-accent);
    }

    nav {
    --border-color: oklch(50% 10% 200 / 40%);
    display: flex;
    margin-bottom: 0.5em;
    margin-right: 0.5em;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--border-color);
    }
</style>
<script>
    import {page} from '$app/stores';
    let pages = [
	{url: "./", title: "Home"},
	{url: "./projects", title: "Projects"},
	{url: "./resume", title: "Resume"},
    {url: "./contact", title: "Contact"},
    {url: "https://github.com/sashajh2", title: "Github"}
];
</script>
