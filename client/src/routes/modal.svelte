<script>
    import { fade } from "svelte/transition";
    export let visible = false;
</script>

{#if visible}
    <div
        class="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-slate-950/80"
        transition:fade
    >
        <div
            class="flex h-1/3 w-1/4 flex-col place-content-center place-items-center rounded-xl bg-slate-800"
        >
            <h1 class="p-8 text-2xl">
                Are you sure you want to remove this from favorites?
            </h1>
            <slot />
        </div>
    </div>
{/if}
