<script lang="ts">
    import type { PageData } from "./$types";
    import Anime from "./anime.svelte";

    export let data: PageData;
</script>

{#each data.recommended.data as recommendation, i}
    <div
        class="flex snap-center snap-always flex-col gap-20 rounded-2xl bg-slate-100/5 p-20 hover:bg-slate-100/10"
        id={`anime-${i}`}
    >
        <h1
            class=" text-justify text-2xl decoration-dashed transition duration-700 hover:underline hover:decoration-sky-400"
        >
            {recommendation.content}
        </h1>
        <div class="grid grid-cols-2 place-items-center">
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
