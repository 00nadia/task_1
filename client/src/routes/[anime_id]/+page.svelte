<script lang="ts">
    import { enhance } from "$app/forms";
    import Anime from "../anime.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>
<div class="flex flex-col h-screen col-start-1 col-end-3 content-center items-center bg-slate-100/5 rounded-2xl">
<Anime
    favourite={false}
    title={data.anime.title}
    mal_id={data.anime.mal_id}
    image={data.anime.images.webp.image_url}
/>

<p class="md:p-10 gap-12 xl:text-xl md:text-base sm:text-sm sm:p-5 ">{data.anime.synopsis}</p>
<div class="p-5 grid grid-cols-3 self-stretch place-content-center place-items-center h-24">
<form action="?/addToFavorites" method="post" use:enhance>
    <input type="hidden" name="mal_id" value={data.anime.mal_id} />
    <input type="hidden" name="title" value={data.anime.title} />
    <input
        type="hidden"
        name="image"
        value={data.anime.images.webp.image_url}
    />
    <button class="bg-neutral-100 text-sky-600 shadow-lg shadow-sky-600/50 font-bold rounded-3xl ring-offset-2 ring-offset-slate-900 ring-4 ring-sky-600/50 p-4  relative hover:bg-sky-600 hover:text-neutral-100 hover:shadow-neutral-100 hover:ring-neutral-100 transition duration-700" type="submit">
       Add to favorites
    </button>
</form>
<form action="?/delete" method="post" use:enhance>
    <input type="hidden" name="mal_id" value={data.anime.mal_id} />
    <button class="bg-neutral-100 text-sky-600 shadow-lg shadow-sky-600/50 font-bold rounded-3xl ring-offset-2 ring-offset-slate-900 ring-4 ring-sky-600/50 p-4  relative hover:bg-sky-600 hover:text-neutral-100 hover:shadow-neutral-100 hover:ring-neutral-100 transition duration-700" type="submit">
        Remove from favourites
    </button>
</form>

<div>
    <a class="bg-neutral-100 my-20 text-sky-600 shadow-lg shadow-sky-600/50 font-bold rounded-3xl ring-offset-2 ring-offset-slate-900 ring-4 ring-sky-600/50 p-5 relative hover:bg-sky-600 hover:text-neutral-100 hover:shadow-neutral-100 hover:ring-neutral-100 transition duration-700" href="/">Go back to list</a>
</div>
</div>
</div>