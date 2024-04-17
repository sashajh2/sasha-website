<h1>Meta</h1>
<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Stats from "../../lib/Stats.svelte";
    import Pie from "../../lib/Pie.svelte";
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

    $: workByPeriod = d3.rollups(data, v => v.length, d => d.datetime.toLocaleString("en", {dayPeriod: "short"}))
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
                   .domain(d3.extent(commits, d => d.datetime))
                   .nice()
                   .range([usableArea.left, usableArea.right]);

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
    $: hoveredCommit = commits[hoveredIndex] ?? {};

    //brushing
    let svg;
    $: {
        d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();
    }
    function brushed (evt) {
        let brushSelection = evt.selection;
        selectedCommits = !brushSelection ? [] : commits.filter(commit => {
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
    }

    let selectedCommits = [];
    $: hasSelection = selectedCommits.length > 0;
    $: selectedLines = (hasSelection ? selectedCommits : commits).flatMap(d => d.lines);
    $: languageBreakdown = d3.rollups(selectedLines, D => D.length, d => d.type);
    $: languageBreakdownArray = Array.from(languageBreakdown).map(([language, lines]) => ({label: language, value: lines}))

</script>
<style>
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
    }

    #commit-tooltip {
        background-color: oklch(85% 0.01 226 / 49.82%);
        box-shadow: 5px 5px 10px lightgray;
        border-radius: 5px;
        backdrop-filter: blur(10px);
        padding: 1em;
    }

    .selected {
        fill: red !important;
    }
</style>
<Stats 
    tableTitle="Summary"
    dataTitles={["Lines of Code", "Commits", "Files", "Max File Length", "Max Line Length", "Favorite Time of Day to Work"]}
    {dataValues}
/>
<br>

<h2>Commits by Time of Day</h2>
<svg viewBox="0 0 {width} {height}" bind:this={svg}>
    <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
    <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
    <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
	<g class="dots">
        {#each commits as commit, index }
            <circle
                cx={ xScale(commit.datetime) }
                cy={ yScale(commit.hourFrac) }
                r="5"
                fill="steelblue"
                tabindex="0"
                aria-describedby="commit-tooltip"
                aria-haspopup="true"
                on:focus={evt => dotInteraction(index, evt)}
                on:blur={evt => dotInteraction(index, evt)}
                on:mouseenter={evt => dotInteraction(index, evt)}
	            on:mouseleave={evt => dotInteraction(index, evt)}
                class:selected={isCommitSelected(commit)}
            />
        {/each}
    </g>
</svg>
<p>{hasSelection ? selectedCommits.length: "No"} commits selected</p>


<Pie data={languageBreakdownArray} />

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

