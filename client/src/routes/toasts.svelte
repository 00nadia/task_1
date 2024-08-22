<script>
    import Toast from "./toast.svelte";
    import { dismissToast, toasts } from "../lib/toast";
</script>

{#if $toasts}
    <section class="fixed w-96 p-24 text-center font-bold">
        {#each $toasts as toast (toast.id)}
            <Toast
                success={toast.success}
                on:dismiss={() => dismissToast(toast.id)}
            >
                {toast.message}
            </Toast>
        {/each}
    </section>
{/if}
