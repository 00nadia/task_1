<script>
    import { fade } from "svelte/transition";
    export let success;
    $: artclass = success === true ? "bg-green-500 rounded-md" : "bg-red-500 rounded-md";
</script>

<article class={artclass} role="alert" transition:fade>
    <div>
        <slot />
    </div>
</article>
