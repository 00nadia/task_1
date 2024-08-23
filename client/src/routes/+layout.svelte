<script lang="ts">
    import "../app.css";
    import type { LayoutData } from "./$types";
    import Anime from "./anime.svelte";
    import { trapFocus } from "$lib/focus";
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
        class="absolute right-6 top-2 rounded-full bg-sky-400 p-2 font-bold text-slate-900"
        on:click={openDrawer}
    >
        Show favorites
    </button>
    {#if isDrawerOpen}
        <div
            class="absolute z-10"
            role="dialog"
            aria-modal="true"
            use:trapFocus
        >
            <div
                class="fixed inset-0 bg-slate-950/60 transition-opacity"
                on:click={closeDrawer}
                aria-hidden="true"
            ></div>
            <button
                class="fixed right-6 top-2 z-20 rounded-full bg-sky-400 p-2 font-bold text-slate-900"
                on:click={closeDrawer}
            >
                Close favorites
            </button>
            <div
                class="scrollbar-hide fixed inset-y-0 right-0 z-10 grid h-screen w-80 snap-y snap-mandatory grid-cols-1 content-start justify-items-center gap-1 gap-y-20 overflow-y-scroll rounded-2xl bg-slate-700 pt-7"
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
    {/if}
</div>
