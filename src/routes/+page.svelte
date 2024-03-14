<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    import { slide } from 'svelte/transition';
</script>
<svelte:head>
	<title>About me</title>
</svelte:head>
<h1>Sasha Jovanovic-Hacon</h1>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio officia in explicabo velit unde ipsa vel quaerat voluptatum eligendi, consequuntur quibusdam perferendis recusandae harum, expedita, a quia aliquam maiores dolores.</p>
<img src="images/IMG_4782.JPEG" alt="An image of the author in Bijeljina, Bosnia" />
<h2>Latest Projects</h2>
<div 
    class="projects" 
    style=
        "display: grid; 
        grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
        gap: 20px;"
>
    {#each projects.slice(0,3) as p}
        <Project info={p} hLevel={3}/>
    {/each}
    <style>
        .github-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
        }

        .github-stats dt {
            grid-row: 1;
        }

        .github-stats dd {
            grid-row: 2;
        }
    </style>
    {#await fetch("https://api.github.com/users/sashajh2") }
        <p>Loading...</p>
    {:then response}
        {#await response.json()}
            <p>Decoding...</p>
        {:then data}
        <div style="display: grid; grid-template-columns: repeat(4, 1fr);">
            <h3 style="grid-column: 1 / span 4;">My Github Stats</h3>
            {console.log("JSON: ", JSON.stringify(data))}
            <dl style="display: grid; grid-template-columns: repeat(4, 1fr); border-collapse: collapse;">
                <dt style="grid-row: 1; grid-column: 1; text-align: left; border: 1px solid black; padding: 5px;">Followers</dt>
                <dd style="grid-row: 2; grid-column: 1; text-align: left; border: 1px solid black; padding: 5px;">{data.followers}</dd>
                <dt style="grid-row: 1; grid-column: 2; text-align: left; border: 1px solid black; padding: 5px;">Following</dt>
                <dd style="grid-row: 2; grid-column: 2; text-align: left; border: 1px solid black; padding: 5px;">{data.following}</dd>
                <dt style="grid-row: 1; grid-column: 3; text-align: left; border: 1px solid black; padding: 5px;">Public Repos</dt>
                <dd style="grid-row: 2; grid-column: 3; text-align: left; border: 1px solid black; padding: 5px;">{data.public_repos}</dd>
                <dt style="grid-row: 1; grid-column: 4; text-align: left; border: 1px solid black; padding: 5px;">Public Gists</dt>
                <dd style="grid-row: 2; grid-column: 4; text-align: left; border: 1px solid black; padding: 5px;">{data.public_gists}</dd>
            </dl>
        </div>
        {:catch error}
            <p class="error">
                Something went wrong: {error.message}
            </p>
        {/await}
    {:catch error}
        <p class="error">
            Something went wrong: {error.message}
        </p>
    {/await}
</div>
