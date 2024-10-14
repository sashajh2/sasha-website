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
            'images/personal/serbia/beograd.jpg',
            'images/personal/serbia/slobimir.jpg',
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
    <h1>Serbian Culture</h1>
    <div>
        <p>
            My mom immigrated from Bijeljina, Bosnia and Herzegovina, in 1990, just before the war broke out. Growing up in Utah, I always knew I was Serbian, but my exposure to the culture was limited. My grandparents visited us yearly, and from those visits, I learned the basics of the Serbian language—though I mostly understood it in the context of household conversations.
        </p>
        <p>
            During high school, I started visiting Serbia and Bosnia every summer, spending 1-2 weeks there each time. Each trip brought me closer to the language and the culture, and over time, I became more comfortable with it. About two years ago, I decided to take it a step further and enrolled in a language class. Now, I dedicate around 10 hours a week to improving my Serbian through assignments, conversations with relatives, and practice.
        </p>
        <p>
            My mom's journey has been a huge inspiration for me, and I feel deeply proud to reconnect with my Serbian roots. Learning the language, experiencing the culture firsthand, and growing closer to my grandparents have been a beautiful gift that I cherish every day.
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
