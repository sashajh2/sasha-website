<nav>
    {#each pages as p}
    <a href={ p.url } class:current={ "." + $page.route.id === p.url } target={ p.url.startsWith("http") ? "_blank" : null }>{ p.title }</a>
    {/each}
</nav> 
<label class="color-scheme", style="position: absolute; top: 1rem; right: 1rem; font-size: 80%;">
    Theme:
    <select bind:value={ colorScheme }>
        <option value="automatic">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
</label>
<slot />
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
    {url: "./meta", title: "Meta"},
    {url: "https://github.com/sashajh2", title: "Github"},
];

    let localStorage = globalThis.localStorage ?? {};
    let colorScheme = localStorage.colorScheme ?? "light dark";
    let root = globalThis?.document?.documentElement;
    root?.style.setProperty("color-scheme", colorScheme);
    $: root?.style.setProperty("color-scheme", colorScheme);
    $: localStorage.colorScheme = colorScheme;

    // console.log(document);

    // const select = document.querySelector('select');

    // select.addEventListener('input', function(event) {
    //     document.documentElement.style.setProperty("color-scheme", event.target.value);
    //     localStorage.colorScheme = event.target.value
    // });

    // if (localStorage.getItem("colorScheme")) {
    //     const storedColorScheme = localStorage.getItem("colorScheme");
    //     document.documentElement.style.setProperty("color-scheme", storedColorScheme);
    //     select.value = storedColorScheme;
    // }

</script>
