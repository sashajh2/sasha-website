<script>
    export let info = {};
    export let hLevel = 2;

    let isExpanded = false;
    function toggleExpand() {
        isExpanded = !isExpanded
    }
    function handleClick() {
        if (info.file) {
            window.open(info.file, '_blank'); // Open the file in a new tab
        } else if (info.url) {
            window.open(info.url, '_blank'); // Open the URL in a new tab
        }
    }
</script>
<style>
    @import url("$lib/global.css");

    article {
        border: 1px solid #ccc; /* Thin border outline */
        border-radius: 8px;     /* Rounded corners */
        padding: 16px;          /* Padding inside the card */
        margin: 16px;           /* Space around the card */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow for depth */
        transition: transform 0.2s; /* Smooth transition for hover */
        cursor: pointer; /* Show pointer cursor on hover */
    }

    .title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .class-caret-container {
        display: flex;
        align-items: center;
    }

    h2 {
        color: var(--primary)
    }
    h3 {
        color: var(--secondary)
    }
    p{
        color: var(--text)
    }
    .description {
        margin-top: 10px;
    }

    .button-container {
        margin-top: 10px;
    }

    button {
        background-color: var(--primary);
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: var(--primary-dark);
    }

    .caret {
        display: inline-block;
        margin-left: 10px;
        transition: transform 0.2s ease-in-out;
        color: var(--secondary)
    }

    .caret.expanded {
        transform: rotate(90deg);
    }

</style>
<article>
    <div class="title-container" on:click={toggleExpand}>
        <h2>{info.title}</h2>
        <!-- HERE: put the class and caret side by side -->
        <div class="class-caret-container">
            <h3>{info.class}</h3>
            <span class="caret {isExpanded ? 'expanded' : ''}">▶</span>
        </div>
    </div>

    {#if isExpanded}
        <div class="description">
            <p>{info.description}</p>
        </div>

        <div class="button-container">
            <button on:click={handleClick}>View Project</button>
        </div>
    {/if}
</article>