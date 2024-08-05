<script lang="ts">
    import "../app.css";
    import type { LayoutData } from "./$types";
    import Anime from "./anime.svelte";

    export let data: LayoutData;
</script>

<div class="grid grid-cols-5 gap-4 bg-slate-900 font-['Garamond'] text-white">
    <div
        class="scrollbar-hide col-start-1 col-end-5 grid h-screen snap-y snap-mandatory gap-x-12 gap-y-96 overflow-y-scroll p-4 sm:grid-cols-1 2xl:grid-cols-2"
    >
        <slot />
    </div>
    <div
        class="scrollbar-hide grid h-screen snap-y snap-mandatory grid-cols-1 content-start justify-items-center gap-1 gap-y-20 overflow-y-scroll rounded-2xl bg-slate-100/5 hover:bg-slate-100/10"
    >
        {#each [...data.favorites] as [key, value]}
            <Anime
                title={value.title}
                mal_id={key}
                image={value.image}
                favourite={true}
            />
        {/each}
    </div>
</div>
