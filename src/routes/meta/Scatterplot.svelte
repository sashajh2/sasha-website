<script>
    export let commits = [];
    export let selectedCimmits = [];

    import * as d3 from "d3";
    import {
        computePosition,
        autoPlacement,
        offset,
    } from '@floating-ui/dom';

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
        else if (evt.type === "click" || (evt.type === "keyup" && evt.key === "Enter")) {
            selectedCommits = [commits[index]]
        }
    }

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
        @starting-style {
            r: 0;
        }
    }

</style>
<svg viewBox="0 0 {width} {height}" bind:this={svg}>
    <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
    <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
    <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
	<g class="dots">
        {#each commits as commit, index (commit.id) }
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