<script>
    import Project from "$lib/Project.svelte";
    export let year = 0;
    export let projects = [];

</script>
<style>

</style>
<!-- HERE: map the year to  the div and for each project in projects map them to a Project with into={project})-->
<div>
    <h2>{year}</h2>
    <ul>
        {#each projects as project}
            <li>
                <Project info={project} />
            </li>
        {/each}
    </ul>
</div>