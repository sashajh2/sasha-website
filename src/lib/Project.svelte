<script>
    export let info = {};
    export let hLevel = 2;
</script>
<style>
    article {
        grid-row: span 1;
        display: grid;
        grid-template-rows: auto auto auto;
    }
</style>
<article>
    <svelte:element this={"h" + hLevel}>{ info.title }</svelte:element>
    <img src={info.image} alt="">
    <p>{info.description}</p>
    <p>{info.year}</p>
    {#if info.url}
        <p><a href={info.url}>LINK</a></p>
    {/if}
</article>