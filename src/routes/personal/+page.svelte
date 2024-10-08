<script>
    import personalData from '$lib/personal.json';
    import { goto } from '$app/navigation';
</script>

<style>
    @import url("$lib/global.css");
    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 0 -1em;
    }
    .card {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0em;
        margin: 1em;
        text-align: left;
        width: calc(33.33% - 2em);
        box-sizing: border-box;
    }
    img {
        max-width: 100%;
    }
    button {
        background-color: var(--primary);
        color: var(--background-color);
        border: none;
        padding: 0.5em 1em;
        border-radius: 2px;
        cursor: pointer;
    }
    button:hover {
        opacity: 0.8;
        background-color: var(--secondary)
    }
    h1 {
        color: var(--primary)
    }
    h2 {
        color: var(--secondary)
    }
    p {

    }
    .card-text-container {
        padding: 10px;
    }
    
    @media (max-width: 750px) {
        .card {
            width: 100%;   
            margin: 0.5em 0;           
        }
    }
</style>

<div>
    <h1>Personal</h1>
    <div class="card-container">
        {#each personalData as item}
            <div class="card">
                {#if item.image}
                    <img src={item.image} />
                {/if}
                <div class="card-text-container">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <button on:click={() => goto(item['button-route'])}>
                        {item['button-text']}
                    </button>
                </div>
            </div>
        {/each}
    </div>
</div>
