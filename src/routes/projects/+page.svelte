<script>
    import * as d3 from 'd3';
    import projects from '$lib/projects.json';
    import ProjectSection from "$lib/ProjectSection.svelte";
    import Pie from '$lib/Pie.svelte';
    export let hLevel = 2;

    let query = "";

    let pieData;

    $: filteredProjects = projects.filter((project) => {
        let values = Object.values(project).join("\n").toLowerCase();
        return values.includes(query.toLowerCase());
    });
    
    let groupedProjectsByYear;
    $: groupedProjectsByYear = d3.group(filteredProjects, d => d.year);

    let groupedProjectsObject;
    $: groupedProjectsObject = Array.from(groupedProjectsByYear).reduce((acc, [year, projects]) => {
        acc[year] = projects;
        return acc;
    }, {});
    //Sort this by year (largest year first)

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
    
    let projectsByYear;

</script>
<style>
    h1 {
        color: var(--primary)
    }
</style>
<svelte:head>
	<title>Projects</title>
</svelte:head>
<h1>Projects</h1>
<input 
    type="search" 
    bind:value={query}
    aria-label="Search projects"
    placeholder="🔍 Search projects…" />

<div style="margin-top: 20px;">
    {#each Object.entries(groupedProjectsObject) as [year, projects]}
        <ProjectSection year={year} projects={projects}/>
    {/each}
</div>

    