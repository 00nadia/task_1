<script lang="ts">
    import { enhance } from "$app/forms";
    import { addToast } from "$lib/toast";
    import Anime from "../anime.svelte";
    import Toasts from "../toasts.svelte";
    import Modal from "../modal.svelte";
    import type { ActionData, PageData } from "./$types";

    export let data: PageData;
    export let form: ActionData;
    let modalIsOpen = false;

    $: if (form) {
        if (form.success) {
            addToast({ success: true, message: form.msg });
        } else {
            addToast({ success: false, message: form.msg });
        }
    }
    const openModal = () => {
        modalIsOpen = true;
    };
    const closeModal = () => {
        modalIsOpen = false;
    };
</script>

<Modal visible={modalIsOpen}>
    <form action="?/delete" method="post" use:enhance>
        <input type="hidden" name="mal_id" value={data.anime.mal_id} />
        <button
            class="relative m-8 rounded-3xl bg-neutral-100 p-4 px-5 font-bold text-sky-600 shadow-lg shadow-sky-600/50 ring-4 ring-sky-600/50 ring-offset-2 ring-offset-slate-900 transition duration-700 hover:bg-green-500 hover:text-neutral-100 hover:shadow-neutral-100 hover:ring-neutral-100"
            type="submit"
            on:click={closeModal}
        >
            Yes
        </button>
        <button
            class="relative m-8 rounded-3xl bg-neutral-100 p-4 px-5 font-bold text-sky-600 shadow-lg shadow-sky-600/50 ring-4 ring-sky-600/50 ring-offset-2 ring-offset-slate-900 transition duration-700 hover:bg-red-500 hover:text-neutral-100 hover:shadow-neutral-100 hover:ring-neutral-100"
            type="reset"
            on:click={closeModal}
        >
            No
        </button>
    </form>
</Modal>

<Toasts />

<div
    class="col-start-1 col-end-3 flex h-screen flex-col content-center items-center rounded-2xl bg-slate-100/5"
>
    <Anime
        favourite={false}
        title={data.anime.title}
        mal_id={data.anime.mal_id}
        image={data.anime.images.webp.image_url}
    />

    <p class="gap-12 sm:p-5 md:p-4 md:text-sm xl:text-xl">
        {data.anime.synopsis}
    </p>
    <div
        class="grid h-24 grid-cols-3 place-content-center place-items-center self-stretch p-1"
    >
        <form action="?/addToFavorites" method="post" use:enhance>
            <input type="hidden" name="mal_id" value={data.anime.mal_id} />
            <input type="hidden" name="title" value={data.anime.title} />
            <input
                type="hidden"
                name="image"
                value={data.anime.images.webp.image_url}
            />
            <button
                class="relative rounded-3xl bg-neutral-100 p-4 font-bold text-sky-600 shadow-lg shadow-sky-600/50 ring-4 ring-sky-600/50 ring-offset-2 ring-offset-slate-900 transition duration-700 hover:bg-sky-600 hover:text-neutral-100 hover:shadow-neutral-100 hover:ring-neutral-100"
                type="submit"
            >
                Add to favorites
            </button>
        </form>
        <button
            class="relative rounded-3xl bg-neutral-100 p-4 font-bold text-sky-600 shadow-lg shadow-sky-600/50 ring-4 ring-sky-600/50 ring-offset-2 ring-offset-slate-900 transition duration-700 hover:bg-sky-600 hover:text-neutral-100 hover:shadow-neutral-100 hover:ring-neutral-100"
            on:click={openModal}
        >
            Remove from favourites
        </button>
        <div>
            <a
                class="relative my-20 rounded-3xl bg-neutral-100 p-5 font-bold text-sky-600 shadow-lg shadow-sky-600/50 ring-4 ring-sky-600/50 ring-offset-2 ring-offset-slate-900 transition duration-700 hover:bg-sky-600 hover:text-neutral-100 hover:shadow-neutral-100 hover:ring-neutral-100"
                href="/"
            >
                Go back to list
            </a>
        </div>
    </div>
</div>
