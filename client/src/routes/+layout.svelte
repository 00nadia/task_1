<script lang="ts">
    import "../app.css";
    import type { LayoutData } from "./$types";
    import Anime from "./anime.svelte";

    export let data: LayoutData;
</script>

<div class="grid grid-cols-5 gap-4 bg-slate-900 font-['Garamond'] text-white">
    <div
        class="col-start-1 col-end-5 grid h-screen snap-y snap-mandatory gap-x-12 gap-y-96 overflow-y-scroll p-4 scrollbar-hide sm:grid-cols-1 2xl:grid-cols-2"
    >
        <h1>Anime list</h1>
        <slot />
    </div>
    <div
        class="grid h-screen snap-y snap-mandatory grid-cols-1 content-start justify-items-center gap-1 gap-y-20 overflow-y-scroll rounded-2xl bg-slate-100/5 scrollbar-hide hover:bg-slate-100/10"
    >
        {#each data.favorites as fav}
            <Anime
                title={fav.title}
                mal_id={fav.id}
                image={fav.image}
                favourite={true}
            />
        {/each}
    </div>
</div>
