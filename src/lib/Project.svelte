<script>
    export let info = {};
    export let hLevel = 2;

    let isExpanded = false;
    let poster = !!info.poster;
    function toggleExpand() {
        isExpanded = !isExpanded
    }
    function handleClick() {
        if (info.file) {
            window.open(info.file, '_blank');
        } else if (info.url) {
            window.open(info.url, '_blank');
        }
    }
    function viewPoster() {
        window.open(info.poster, '_blank')
    }
</script>
<style>
    @import url("$lib/global.css");

    article {
        border: 1px solid #ccc; 
        border-radius: 4px;
        padding: 16px;
        margin: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        cursor: pointer;
    }

    .title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        gap: 10px;
    }

    .class-caret-container {
        display: flex;
        align-items: center;
    }

    h2 {
        color: var(--primary)
    }
    h3 {
        color: var(--secondary);
        white-space: nowrap;
    }
    p {
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
        color: var(--background-color);
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: var(--secondary);
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

    .skills-container {
        margin-top: 10px;
        display: flex;
        gap: 10px;
    }

    .skill {
        background-color: var(--secondary);
        border-radius: 4px; 
        padding: 4px 8px;
    }
    .skill:hover {
        background-color: var(--primary)
    }
    .class-name {
        color: var(--secondary)
    }

</style>
<article>
    <div class="title-container" on:click={toggleExpand}>
        <h2>{info.title}</h2>
        <div class="class-caret-container">
            <h3>{info.date}</h3>
            <span class="caret {isExpanded ? 'expanded' : ''}">▶</span>
        </div>
    </div>

    {#if isExpanded}
        <div class="description">
            <p class="class-name">{info.class}</p>
            <p>{info.description}</p>
        </div>

        <div class="button-container">
            <button on:click={handleClick}>View Project</button>
            
        </div>
        {#if poster}
            <div class="button-container">
                <button on:click={viewPoster}>View Poster</button>
            </div>
        {/if}
        <div class="skills-container">
            {#each info.skills as skill}
                <button class="skill">{skill}</button>
            {/each}
        </div>
    {/if}
</article>