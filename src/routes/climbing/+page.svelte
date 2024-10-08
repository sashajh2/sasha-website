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

    .button-wrapper {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }

    .button {
        display: flex;
        align-items: center;
        background-color: var(--button-bg-color, #f0f0f0); /* Default background color */
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s ease;
    }

    .button:hover {
        background-color: var(--button-hover-bg-color, #555); /* Button hover color */
    }

    .button img {
        width: 30px;
        height: 30px;
        margin-right: 10px;

    }
</style>

<div>
    <h1>Rock Climbing</h1>
    <div>
        <p>
            I started climbing in 2015, and it quickly became a passion. One of my favorite aspects of climbing is the mental focus it requires. Each movement demands attention to a mix of technical and physical details, and I love the process of refining and optimizing until everything flows perfectly.
        </p>
        <p>
            I also thrive on the sense of adventure that comes with climbing outdoors. There’s nothing quite like discovering a new route in nature and, after countless attempts, finally conquering it. Training is another part of climbing I really enjoy, especially when I have great partners who push me to my limits and help me grow by sharing different perspectives.
        </p>
        <p>
            My goal is to keep climbing for the rest of my life, share the experience with my future kids, and travel the world to explore different types of rock, climbing styles, and the natural beauty that comes with it.
        </p>
    </div>
    <div class="button-wrapper">
        <a class="button" href="https://www.instagram.com/momentum_millcreek_boulders/" target="_blank" style="--button-bg-color: #012161; --button-hover-bg-color: #c5beb0;">
            <img src="images/contact/Instagram-jpg copy.jpg" alt="Instagram" />
            Bouldering Instagram
        </a>
        <a class="button" href="https://www.8a.nu/user/sasha-jovanovic-hacon-60963/bouldering" target="_blank" style="--button-bg-color: #ec1e2f; --button-hover-bg-color: #c5beb0;">
            <img src="images/personal/climbing/8anu.png" alt="8a.nu" />
            My Climbs
        </a>
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
</div>
