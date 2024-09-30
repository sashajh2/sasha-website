<script>
    export let info = {};
    export let hLevel = 2;

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

    .card {
        border: 1px solid #ccc; /* Card border */
        border-radius: 8px;     /* Rounded corners */
        padding: 16px;          /* Padding inside the card */
        margin: 16px;           /* Space around the card */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow for depth */
        transition: transform 0.2s; /* Smooth transition for hover */
        cursor: pointer; /* Show pointer cursor on hover */
    }

    .card:hover {
        transform: scale(1.05); /* Scale up on hover */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
    }

    article {
        grid-row: span 1;
        display: grid;
        grid-template-rows: auto auto auto;
    }
    h2 {
        color: var(--primary)
    }
    p{
        color: var(--text)
    }

</style>
<article class="card" on:click={handleClick}>
    <h2>{ info.title }</h2>
    <img src={info.image} alt="">
    <p>{info.description}</p>
</article>