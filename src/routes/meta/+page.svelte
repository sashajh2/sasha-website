<h1>Meta</h1>
<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Stats from "../../lib/Stats.svelte";
    import Pie from "../../lib/Pie.svelte";
    import Scatterplot from "./Scatterplot.svelte";
    import Scrolly from "svelte-scrolly";
    import FileLines from "./FileLines.svelte";
    import {
        computePosition,
        autoPlacement,
        offset,
    } from '@floating-ui/dom';

    let data = [];
    let commits = [];
    let numberOfFiles = 0;
    let maxFileLength = 0;
    let longestLineLength = 0;
    let mostFrequentDay = 1;
    let selectedCommits = [];
    let commitProgress = 100;
    let colors = d3.scaleOrdinal(d3.schemeTableau10);


    onMount(async () => {
        data = await d3.csv("loc.csv", row => ({
            ...row,
            line: Number(row.line), // or just +row.line
            depth: Number(row.depth),
            length: Number(row.length),
            date: new Date(row.date + "T00:00" + row.timezone),
            datetime: new Date(row.datetime)
        }));

        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
            let first = lines[0];
            let {author, date, time, timezone, datetime} = first;
            let ret = {
                id: commit,
                url: "https://github.com/vis-society/lab-7/commit/" + commit,
                author, date, time, timezone, datetime,
                hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                totalLines: lines.length
            };

            // Like ret.lines = lines
            // but non-enumerable so it doesn’t show up in JSON.stringify
            Object.defineProperty(ret, "lines", {
                value: lines,
                configurable: true,
                writable: true,
                enumerable: false,
            });

            return ret;
        });

        const filenames = data.map(d => d.file);
        const uniqueFilenames = [...new Set(filenames)];
        numberOfFiles = uniqueFilenames.length;

        maxFileLength = Math.max(...data.map(d => d.length));

        longestLineLength = Math.max(...data.map(d => d.line));

        const dayCounts = new Map();
        data.forEach(d => {
            const day = d.date.getDay(); // Get day of the week (0-6)
            dayCounts.set(day, (dayCounts.get(day) || 0) + 1);
        });

        mostFrequentDay = Array.from(dayCounts.entries()).reduce((maxDay, [day, count]) => count > dayCounts.get(maxDay) ? day : maxDay, 0);
    });

    $: workByPeriod = d3.rollups(filteredLines, v => v.length, d => d.datetime.toLocaleString("en", {dayPeriod: "short"}))
    $: maxPeriod = d3.greatest(workByPeriod, (d) => d[1])?.[0];

    $: dataValues = [
        data.length,
        commits.length,
        numberOfFiles,
        maxFileLength,
        longestLineLength,
        maxPeriod
    ];


    let width = 1000, height = 600;
    let margin = {top: 10, right: 10, bottom: 30, left: 20};
    let usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;

    $: yScale = d3.scaleLinear()
                   .domain([0, 24])
                   .range([usableArea.bottom, usableArea.top]);

    $: xScale = d3.scaleTime()
                   .domain(d3.extent(filteredCommits, d => d.datetime))
                   .nice()
                   .range([usableArea.left, usableArea.right]);

    $: timeScale = d3.scaleTime() // Create the time scale
                    .domain(d3.extent(commits, d => d.datetime))
                    .nice()
                    .range([0, 100]);
    // console.log("Time Scale Domain:", timeScale.domain());
    // console.log("Time Scale Range:", timeScale.range());

    
    let xAxis, yAxis;
    $: {
        d3.select(xAxis).call(d3.axisBottom(xScale));
        d3.select(yAxis).call(d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00"));
    }

    let yAxisGridlines;
    $: {
        d3.select(yAxisGridlines).call(
            d3.axisLeft(yScale)
            .tickFormat("")
            .tickSize(-usableArea.width)
        );
    }

    let hoveredIndex = -1;
    let hoveredCommit = {};
    $: hoveredCommit = filteredCommits[hoveredIndex] ?? {};

    //brushing
    let svg;
    $: {
        d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();
    }
    function brushed (evt) {
        let brushSelection = evt.selection;
        selectedCommits = !brushSelection ? [] : filteredCommits.filter(commit => {
            let min = {x: brushSelection[0][0], y: brushSelection[0][1]};
            let max = {x: brushSelection[1][0], y: brushSelection[1][1]};
            let x = xScale(commit.date);
            let y = yScale(commit.hourFrac);

            return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
        });
    }

    let commitTooltip;
    let tooltipPosition = {x: 0, y: 0};

    function isCommitSelected (commit) {
        return selectedCommits.includes(commit);
    }

    async function dotInteraction (index, evt) {
        let hoveredDot = evt.target;
        if (evt.type === "mouseenter" || evt.type === "focus") {
            tooltipPosition = await computePosition(hoveredDot, commitTooltip, {
                strategy: "fixed",
                middleware: [
                    offset(5),
                    autoPlacement()
                ],
            });
            hoveredIndex = index;
        }
        else if (evt.type === "mouseleave" || evt.type === "blur") {
            hoveredIndex = -1
        }
        else if (evt.type === "click" || (evt.type === "keyup" && evt.key === "Enter")) {
            selectedCommits = [commits[index]]
        }
    }

    $: hasSelection = selectedCommits.length > 0;
    $: selectedLines = (hasSelection ? selectedCommits : filteredCommits).flatMap(d => d.lines);
    $: languageBreakdown = d3.rollups(selectedLines, D => D.length, d => d.type);
    $: languageBreakdownArray = Array.from(languageBreakdown).map(([language, lines]) => ({label: language, value: lines}))

    $: commitMaxTime = timeScale.invert(commitProgress)
    $: filteredCommits = commits.filter(commit => commit.datetime <= commitMaxTime);
    $: filteredLines = data.filter(d => {
        const commit = commits.find(c => c.id === d.commit);
        return commit && commit.datetime <= commitMaxTime;
    });

    let commitProgress2 = 100;
    $: commitMaxTime2 = timeScale.invert(commitProgress2);
    $: filteredLines2 = data.filter(d => {
        const commit = commits.find(c => c.id === d.commit);
        return commit && commit.datetime <= commitMaxTime2;
    });

    let commitNarrative = [
        "Setting up Svelte by creating a basic template Svelte project.",
        "Carrying over all pages / basic formatting from my previous site.",
        "Getting things set up with Github Pages.",
        "Bug fix: home URL",
        "Creating and displaying a Projects component",
        "Creating a layout for UI shared across pages",
        "Theme picker fix, GitHub data on home page",
        "Bug fix: stop URL routing to Namecheap",
        "Create Pie component and use to visualize project year breakdown",
        "Bug fix: project search bar correctly filters when projects are already filtered using pie chart",
        "Create meta page with scatterplot of commits and pie chart",
        "Add BlueBike Map project and URLs to all projects",
        "Include scrollytelling in meta page"
    ]



</script>
<style>
    :global(body) {
        max-width: min(120ch, 80vw);
    }
	svg {
		overflow: visible;
	}

    .gridlines {
	    stroke-opacity: .2;
    }

    dl.info {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
        transition-duration: 500ms;
	    transition-property: opacity, visibility;

        &[hidden]:not(:hover, :focus-within) {
            opacity: 0;
            visibility: hidden;
        }
    }   

    dt.info {
        grid-column: 1;
        opacity: 50%;
    }

    dd.info {
        grid-column: 2;
        margin-left: 0;
    }

    .tooltip {
        position: fixed;
    }

    circle {
        transform-origin: center;
        transform-box: fill-box;
        transition: 200ms;

        &:hover {
            transform: scale(1.5);
        }
        @starting-style {
            r: 0;
        }
    }

    #commit-tooltip {
        background-color: oklch(85% 0.01 226 / 49.82%);
        box-shadow: 5px 5px 10px lightgray;
        border-radius: 5px;
        backdrop-filter: blur(10px);
        padding: 1em;
    }

    .filter {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
    }

    .filter-container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        margin-left: 10px;
    }

    .filter input[type="range"] {
        width: 100%;
    }

    .filter time {
        margin-top: 5px; 
        text-align: right;
    }

    p.narrative-yap {
        font-size: 150%;
        margin-top: 0;
    }

    p.narrative-stat {
        opacity: 50%;
        margin-bottom: 0;
    }

    #scrolly-1 {
        margin-bottom: 20em;
    }


</style>
<Stats 
    tableTitle="Summary"
    dataTitles={["Lines of Code", "Commits", "Files", "Max File Length", "Max Line Length", "Favorite Time of Day to Work"]}
    {dataValues}
/>
<br>

{#if false}
<Pie data={languageBreakdownArray} colors={colors}/>
<FileLines lines={filteredLines} colors={colors}/>
<label class="filter">
    Show commits until: 
    <div class="filter-container">
        <input type="range" min="0" max="100" bind:value={commitProgress} />
        <time>{commitMaxTime.toLocaleString()}</time>
    </div>
</label>
{/if}

<div id="scrolly-1">
    <h2>Commits and Language Breakdown</h2>
    <Scrolly bind:progress={ commitProgress }  --scrolly-viz-width="1.5fr" throttle=150>
        {#each commits as commit, index }
            <p class="narrative-stat">
                <a href="{commit.url}" target="_blank">Commit #{ index  }</a><br>
                {commit.datetime.toLocaleString("en", {dateStyle: "full", timeStyle: "short"})}<br>
                {commit.totalLines} lines across { d3.rollups(commit.lines, D => D.length, d => d.file).length } files<br>
            </p>
            <p class="narrative-yap">
                {commitNarrative[index] ?? "And then I once again wrote some code, for which I have not yet hard-coded a narrative."}
            </p>
        {/each}
        <svelte:fragment slot="viz">
            <h2>Commits by Time of Day</h2>
            <svg viewBox="0 0 {width} {height}" bind:this={svg}>
                <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
                <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
                <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
                <g class="dots">
                    {#each filteredCommits as commit, index (commit.id) }
                        <circle
                            cx={ xScale(commit.datetime) }
                            cy={ yScale(commit.hourFrac) }
                            r="5"
                            fill={isCommitSelected(commit) ? "red" : "steelblue"}
                            tabindex="0"
                            aria-describedby="commit-tooltip"
                            aria-haspopup="true"
                            on:focus={evt => dotInteraction(index, evt)}
                            on:blur={evt => dotInteraction(index, evt)}
                            on:mouseenter={evt => dotInteraction(index, evt)}
                            on:mouseleave={evt => dotInteraction(index, evt)}
                            on:click={evt => dotInteraction(index, evt)}
                            on:keyup={evt => dotInteraction(index, evt)}
                        />
                    {/each}
                </g>
            </svg>
            <p>{hasSelection ? (selectedCommits.length === 1 ? "1 commit selected" : `${selectedCommits.length} commits selected`) : "No commits selected"}</p>
            
            <Pie data={languageBreakdownArray} colors={colors}/>
        </svelte:fragment>
    </Scrolly>
</div>

<h2>File Lengths and Language Breakdown</h2>
<Scrolly bind:progress={ commitProgress2 } --scrolly-layout="viz-first" --scrolly-viz-width="1.5fr" throttle=150>
    <svelte:fragment slot="viz">
		<FileLines lines={filteredLines2} colors={colors}/>
	</svelte:fragment>
    {#each commits as commit, index }
        <p class="narrative-stat">
            <a href="{commit.url}" target="_blank">Commit #{ index  }</a><br>
            {commit.datetime.toLocaleString("en", {dateStyle: "full", timeStyle: "short"})}<br>
            {commit.totalLines} lines across { d3.rollups(commit.lines, D => D.length, d => d.file).length } files<br>
        </p>
        <p class="narrative-yap">
            {commitNarrative[index] ?? "And then I once again wrote some code, for which I have not yet hard-coded a narrative."}
        </p>
    {/each}
</Scrolly>


<dl id="commit-tooltip" role="tooltip" class="info tooltip" hidden={hoveredIndex === -1} style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px" bind:this={commitTooltip}>
	<dt class="info">Commit</dt>
	<dd class="info"><a href="{ hoveredCommit.url }" target="_blank">{ hoveredCommit.id }</a></dd>

	<dt class="info">Date</dt>
	<dd class="info">{ hoveredCommit.datetime?.toLocaleString("en", {weekday: "long", year: "numeric", month: "long", day: "numeric"}) }</dd>

    <dt class="info">Time</dt>
    <dd class="info">{ hoveredCommit.datetime?.toLocaleString("en", {hour: "numeric", minute: "numeric"}) }</dd>

    <dt class="info">Author</dt>
    <dd class="info">{ hoveredCommit.author }</dd>

    <dt class="info">Lines Edited</dt>
    <dd class="info">{ hoveredCommit.totalLines }</dd>
</dl>

