<script>
    import Carousel from 'svelte-carousel';
    import { onMount } from 'svelte';

    let images = [];
    let carousel;
    let isBrowser = false;

    onMount(() => {
        isBrowser = true;
        images = [
            'images/personal/rowing/647A2970.jpg',
            'images/personal/rowing/i-4xktP9T-X5.jpg',
            'images/personal/rowing/i-hz2TJpk-X5.jpg',
            'images/personal/rowing/IMG_5928 2.JPG'
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
    <h1>Rowing</h1>
    <div>
        <p>
            My introduction to rowing came through my older brother, who was on his high school rowing team. They recruited me to join as a coxswain since I was young and small. I agreed, but it didn’t take long before I wanted to row myself and prove my ability to the older teammates.
        </p>
        <p>
            As I got more involved, I became serious about my training. Soon, I was rowing upwards of 600 kilometers each month, training twice a day. I found a deep love for the long hours spent on the rowing machine, especially alongside friends, and the thrill of seeing our hard work translate to success on the water.
        </p>
        <p>
            One of my proudest achievements was setting a world record and going on to row for two years at MIT. Rowing gave me some of my most cherished memories and taught me invaluable lessons about perseverance, the importance of intention and striving for perfection, and the true challenge of developing mental fortitude and discipline.
       </p>
    </div>
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
</div>
