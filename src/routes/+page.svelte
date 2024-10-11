<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    import { slide } from 'svelte/transition';
</script>
<style>
    a {
        color: var(--primary)
    }
    .image-container {
        width: 50%;
        margin: 0 auto;
    }
</style>
<svelte:head>
	<title>About me</title>
</svelte:head>
<h1>Sasha Jovanovic-Hacon</h1>
<p>
    Hello! I'm Sasha, a senior at MIT studying 
    <a href="https://www.eecs.mit.edu/academics/undergraduate-programs/curriculum/6-4-artificial-intelligence-and-decision-making/" target="_blank">Artificial Intelligence and Decision Making</a>. 
    With a solid foundation in mathematics, software engineering, and machine learning, I have spent years honing my skills in full-stack development and data analysis. 
    I have a strong passion for statistical analysis, as it helps unravel complex relationships and enables informed decision-making. 
    Outside of my studies, I enjoy outdoor activities like climbing and running, and I'm currently learning Serbian.
</p>
<div class="image-container">
    <img src="images/IMG_4782.JPEG" alt="An image of the author in Bijeljina, Bosnia" />
</div>
<h2>Latest Projects</h2>
<div 
    class="projects" 
    style=
        "grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
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
    <!-- {#await fetch("https://api.github.com/users/sashajh2") }
        <p>Loading...</p>
    {:then response}
        {#await response.json()}
            <p>Decoding...</p>
        {:then data}
        <div style="display: grid; grid-template-columns: repeat(4, 1fr);">
            <h3 style="grid-column: 1 / span 4;">My Github Stats</h3>
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
    {/await} -->
</div>
