<script lang="ts">
    export let title: string;
    export let mal_id: number;
    export let image: string;
    export let favourite: boolean;
    let src ='src/pin.svg';
</script>
<div class="p-4 flow grid-flow-col place-items-center text-center snap-always snap-start">
    {#if favourite!==true}
    <h1 class="p-4 text-xl text-start text-balance hover:animate-pulse hover:text-sky-400 ">{title}</h1>
    {/if}
    <a class="" href="/{mal_id}">
        {#if favourite===true}
            <div class="hover:scale-110 transition duration-700 "><img class="h-10 mx-24 rotate-90 -my-2 grayscale animate-pulse" {src} alt="pin"/>
            <img
            class="rounded-md rotate-6 hover:cursor-pointer hover:outline-dashed outline-offset-2 hover:outline-sky-400 shadow-xl shadow-sky-400/5"
            src={image}
            alt={title}
            height="200px"
            width="200px"
            /></div>
            
        {:else}
        <img
            class="rounded-md transition duration-700 hover:scale-110 hover:cursor-pointer hover:outline-dashed outline-offset-2 hover:outline-sky-400 shadow-xl shadow-sky-400/5"
            src={image}
            alt={title}
            height="200px"
            width="200px"
        />
        {/if}
    </a>
</div>