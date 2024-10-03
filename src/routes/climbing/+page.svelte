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
        object-fit: ;
    }
</style>

<div>
    <h1>Rock Climbing</h1>
    {#if isBrowser}
        <p> I have been climbing since 2015 </p>
        <div class="carousel-wrapper">
            <Carousel
                bind:this={carousel}
                let:loaded
                autoplay
                autoplayDuration={3000}
                autoplayProgressVisible
                class="carousel"
                let:showPrevPage
                let:showNextPage
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
