<script>
    import { fade } from "svelte/transition";
    import { trapFocus } from "$lib/focus";
    export let visible = false;
</script>

{#if visible}
    <div
        class="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-slate-950/80"
        transition:fade
        use:trapFocus
    >
        <div
            class="flex h-1/3 w-1/4 flex-col place-content-center place-items-center rounded-xl bg-slate-800"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog_label"
            aria-describedby="dialog_desc"
        >
            <p id="dialog_label" class="text-2xl">Confirmation</p>
            <p id="dialog_desc" class="p-8 text-xl">
                Are you sure you want to remove this from favorites?
            </p>
            <slot />
        </div>
    </div>
{/if}
