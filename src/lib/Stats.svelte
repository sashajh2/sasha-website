<script>
    export let tableTitle = "";
    export let dataTitles = [];
    export let dataValues = [];
</script>
<style>
    dl {
        border: 2px solid rgba(128, 128, 128, 0.5);
    }
    .pairs-container {
        display: flex; /* Display pairs horizontally */
    }
    .pair {
        margin-right: 20px; /* Add space between pairs */
    }
    dt {
        font-weight: bold;
        color: #333; /* Dark font color */
    }
    dd {
        margin-left: 10px; /* Add spacing between dt and dd */
    }
</style>
<h2>{tableTitle}</h2>

<dl>
    <div class="pairs-container">
        {#each dataTitles as title, index}
            <div class="pair">
                <dt>{title}</dt>
                <dd>{dataValues[index]}</dd>
            </div>
        {/each}
    </div>
</dl>
