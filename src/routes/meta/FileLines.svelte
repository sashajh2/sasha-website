<script>
    export let lines;
    export let colors = d3.scaleOrdinal(d3.schemeTableau10);
    import * as d3 from "d3";
    import { scale } from 'svelte/transition'
    import { flip as originalFlip } from "svelte/animate";

    let files = [];
    $: {
        files = d3.groups(lines, d => d.file).map(([name, lines]) => {
            return {name, lines};
        });
        files = d3.sort(files, d => -d.lines.length);
    }

    function getFlip () {
        return originalFlip;
    }
    $: flip = getFlip(files);

</script>
<style>
    .files {
        display: grid;
        grid-template-columns: auto 1fr; /* Adjust column widths as needed */
        gap: 10px; /* Adjust gap between rows as needed */
    }

    .files > div {
        display: contents; /* This prevents the <div> from interfering with the grid */
    }

    .files dt {
        grid-column: 1;
    }

    .files dd {
        grid-column: 2;
    }

    .line {
        display: flex;
        width: .5em;
        aspect-ratio: 1;
        border-radius: 50%;
    }

    dd {
        grid-column: 2;
        display: flex;
        flex-wrap: wrap;
        align-items: start;
        align-content: start;
        gap: .15em;
        padding-top: .6em;
        margin-left: 0;
    }



</style>
<dl class="files">
	{#each files as file (file.name) }
		<div animate:flip={{}}>
			<dt>
				<code>{file.name}</code>
			</dt>
			<dd>
                {#each file.lines as line (line.line) }
                    <div class="line" in:scale={{}} style="background: { colors(line.type) }"></div>
                {/each}
            </dd>
		</div>
	{/each}
</dl>
