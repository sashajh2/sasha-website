<script>
    import Carousel from 'svelte-carousel';
    import { onMount } from 'svelte';

    let images = [];
    let carousel;
    let isBrowser = false;

    onMount(() => {
        isBrowser = true;
        images = [
            'images/personal/serbia/bijeljina.webp',
            'images/personal/serbia/IMG_4729.JPG',
        ];
    });

    const handleNextClick = () => {
        if (carousel) carousel.goToNext();
    };
</script>
<style>
    @import url("$lib/global.css");
    .carousel-wrapper {
        width: 80%;
        max-width: 800px;
        margin: 0 auto; 
    }

    .carousel {
        height: 200px; 
        border: 10px solid #000; 
        overflow: hidden;
        background-color: black;
    }

    .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%; 
    }

    .carousel img {
        width: auto;
        height: 100%;
        object-fit: cover;
    }
</style>

<div>
    <h1>Serbian Culture</h1>
    {#if isBrowser}
        <div class="carousel-wrapper">
            <Carousel
                bind:this={carousel}
                let:loaded
                autoplay
                autoplayDuration={3000}
                autoplayProgressVisible
                class="carousel"
            >
            {#each images as src, imageIndex (src)}
                <div class="img-container">
                    {#if loaded.includes(imageIndex)}
                        <img src={src} />
                    {/if}
                </div>
            {/each}
            </Carousel>
        </div>
    {/if}
    <div>
        <p>
            Here you can write a bit of text about climbing, your experiences, techniques, or anything else you'd like to share!
        </p>
    </div>
</div>
