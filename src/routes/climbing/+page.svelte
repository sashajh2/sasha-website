<script>
    import Carousel from 'svelte-carousel';
    import { onMount } from 'svelte';

    let images = [];
    let carousel;
    let isBrowser = false;

    onMount(() => {
        isBrowser = true;
        images = [
            'images/personal/climbing/Image 2-8-24 at 10.19 PM (1).jpg',
            'images/personal/climbing/Image 2-8-24 at 10.20 PM.jpg',
            'images/personal/climbing/IMG_4961.jpeg',
        ];
    });

    const handleNextClick = () => {
        if (carousel) carousel.goToNext();
    };
</script>
<style>
    .carousel {
        width: 60%; /* Set the width to 60% of the page */
        max-width: 800px; /* Optional: Limit the maximum width */
        height: 200px; /* Set a specific height for the carousel */
        margin: 0 auto; /* Center the carousel horizontally */
        border: 10px solid #000;
        border-radius: 4px;
        overflow: hidden;
        background-color: black;
    }

    .img-container {
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        height: 100%; 
    }

    .carousel img {
        width: auto; /* Maintain aspect ratio */
        height: 100%; /* Fill height */
        object-fit: cover; /* Ensure the image covers the container */
    }
</style>

<div>
    <h1>Climbing</h1>
    {#if isBrowser}
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
    {/if}
    <div>
        <p>
            Here you can write a bit of text about climbing, your experiences, techniques, or anything else you'd like to share!
        </p>
    </div>
</div>
