<script lang="ts">
    import "../app.css";
    import type { LayoutData } from "./$types";
    import Anime from "./anime.svelte";
    let isDrawerOpen = false;
    const openDrawer = () => {
        isDrawerOpen = true;
    };
    const closeDrawer = () => {
        isDrawerOpen = false;
    };

    export let data: LayoutData;
</script>

<div class="grid gap-4 bg-slate-900 font-['Garamond'] text-white">
    <div
        class="scrollbar-hide grid h-screen snap-y snap-mandatory gap-x-12 gap-y-96 overflow-y-scroll p-4 sm:grid-cols-1 2xl:grid-cols-2"
    >
        <h1>Anime list</h1>
        <slot />
    </div>
    <button
        class="absolute right-2 top-2 rounded-full bg-sky-400 p-2 font-bold text-slate-900"
        on:click={openDrawer}
    >
        Show favorites
    </button>
    {#if isDrawerOpen}
        <button
            class="absolute z-20 right-2 top-2 rounded-full bg-sky-400 p-2 font-bold text-slate-900"
            on:click={closeDrawer}
        >
            close
        </button>
        <div
            class="scrollbar-hide absolute right-0 top-0 z-10 grid h-screen w-80 snap-y snap-mandatory grid-cols-1 content-start justify-items-center gap-1 gap-y-20 overflow-y-scroll rounded-2xl bg-slate-700"
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
    {/if}
</div>
