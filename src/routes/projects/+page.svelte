<script>
    import * as d3 from 'd3';
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    import Pie from '$lib/Pie.svelte';
    export let hLevel = 2;

    let query = "";

    let pieData;

    $: filteredProjects = projects.filter((project) => {
        let values = Object.values(project).join("\n").toLowerCase();
        return values.includes(query.toLowerCase());
    });

    $: {
    pieData = {};

    let rolledData = d3.rollups(
        filteredProjects,
        (v) => v.length,
        (d) => d.year
    );
    pieData = rolledData.map(([year, count]) => {
        return { value: count, label: year };
    });
    }

    let selectedYearIndex = -1;

    let selectedYear;
    $: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

    let filteredProjectsByYear;
    $: filteredProjectsByYear = filteredProjects.filter((project) => {
        if (selectedYear) {
            return project.year === selectedYear;
        }
        return true;
    });

</script>
<svelte:head>
	<title>Projects</title>
</svelte:head>
<h1>Projects ({projects.length} in Total)</h1>

<Pie data={pieData} bind:selectedIndex={selectedYearIndex} />
<input 
    type="search" 
    bind:value={query}
    aria-label="Search projects"
    placeholder="🔍 Search projects…" />

<div 
    class="projects" 
    style=
        "display: grid; 
        grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
        gap: 20px;"
>
{#each filteredProjectsByYear as p}
    <article>
        <Project info={p} />
    </article>
{/each}
</div>
    