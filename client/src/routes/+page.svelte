<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import Anime from "./anime.svelte";
    import { ScrollTrigger } from "$lib/gsap";

    export let data: PageData;
    let loading = true;

    onMount(() => {
        ScrollTrigger.refresh();
        for (let i = 0; i < data.recommended.data.length; i++) {
            // gsap.from(`#anime-${i}`, {
            //     x: i % 2 === 0 ? 200 : -200,
            //     opacity: 0,
            //     duration: 3,
            //     ease: "power4.out",
            //     scrollTrigger: {
            //         trigger: `#anime-${i-1}`,
            //         start: "top 80%",
            //     },
            // });
        }
        loading = false;
    });

</script>

{#if loading}
    <div
        class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-red-900"
    >
        <svg
            class="mr-3 h-10 w-10 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
        </svg>
    </div>
{/if}

{#each data.recommended.data as recommendation, i}
    <div
        class="p-20 hover:bg-slate-100/10 flex flex-col gap-20 bg-slate-100/5 rounded-2xl snap-always snap-center"
        id={`anime-${i}`}
    >
        <h1 class=" text-justify text-2xl decoration-dashed  hover:underline hover:decoration-sky-400 transition duration-700">
            {recommendation.content}
        </h1>
        <div class="grid grid-cols-2 place-items-center ">
            {#each recommendation.entry as subRecommendation}
                <div class="">
                    <Anime
                        title={subRecommendation.title}
                        mal_id={subRecommendation.mal_id}
                        image={subRecommendation.images.webp.image_url}
                        favourite={false}
                    />
                </div>
            {/each}
        </div>
    </div>
{/each}
