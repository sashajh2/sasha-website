<script>
    export let info = {};
    export let hLevel = 2;
</script>
<style>
    article {
    grid-template-rows: subgrid;
    grid-row: span 3;
    }
</style>
<article>
    <svelte:element this={"h" + hLevel}>{ info.title }</svelte:element>
    <img src={info.image} alt="">
    <p>{info.description}</p>
    <p>{info.year}</p>
</article>