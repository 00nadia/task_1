<script lang="ts">
    export let title: string;
    export let mal_id: number;
    export let image: string;
    export let favourite: boolean;
    let src = "src/pin.svg";

    // You were missing format here
</script>

<div
    class="flow snap-start snap-always grid-flow-col place-items-center p-4 text-center"
>
    {#if favourite !== true}
        <h1
            class="text-balance p-4 text-start text-xl hover:animate-pulse hover:text-sky-400"
        >
            {title}
        </h1>
    {/if}
    <a class="" href="/{mal_id}">
        {#if favourite === true}
            <div class="transition duration-700 hover:scale-110">
                <img
                    class="-my-2 mx-24 h-10 rotate-90 animate-pulse grayscale"
                    {src}
                    alt="pin"
                />
                <img
                    class="rotate-6 rounded-md shadow-xl shadow-sky-400/5 outline-offset-2 hover:cursor-pointer hover:outline-dashed hover:outline-sky-400 md:h-[200px] xl:h-[250px]"
                    src={image}
                    alt={title}
                />
            </div>
        {:else}
            <img
                class="rounded-md shadow-xl shadow-sky-400/5 outline-offset-2 transition duration-700 hover:scale-110 hover:cursor-pointer hover:outline-dashed hover:outline-sky-400 md:h-[200px] xl:h-[250px]"
                src={image}
                alt={title}
            />
        {/if}
    </a>
</div>
