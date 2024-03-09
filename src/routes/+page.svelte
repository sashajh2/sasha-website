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
        grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));"
>
    {#each projects.slice(0,3) as p}
        <Project info={p} hLevel={3}/>
    {/each}
    {#await fetch("https://api.github.com/users/sashajh2") }
        <p>Loading...</p>
    {:then response}
        {#await response.json()}
            <p>Decoding...</p>
        {:then data}
            <h3>My Github Stats</h3>
            {console.log("JSON: ", JSON.stringify(data))}
            <dl>
                <dt>Followers</dt>
                <dd></dd>
                <dt>Following</dt>
                <dd></dd>
                <dt>Public Repos</dt>
                <dd></dd>
                <dt>Public Gists</dt>
                <dd></dd>
            </dl>
            <!-- <p>The data is { JSON.stringify(data) }</p> -->
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
