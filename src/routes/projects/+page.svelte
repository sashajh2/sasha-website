<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
</script>
<svelte:head>
	<title>Projects</title>
</svelte:head>
<h1>Projects ({projects.length} in Total)</h1>
<div 
    class="projects" 
    style=
        "display: grid; 
        grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
        gap: 20px;"
>
    {#each projects as p}
        <Project info={p} hLevel={2} />
    {/each}
</div>
    