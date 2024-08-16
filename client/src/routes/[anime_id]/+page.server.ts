import api from "$lib/server/api";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import favorites from "$lib/data";
import { z } from 'zod';
import { SERVER_URL } from "$env/static/private";

export type Anime = {
    data: {
        mal_id: number;
        title: string;
        url: string;
        synopsis: string;
        images: {
            webp: {
                image_url: string;
                small_image_url: string;
                large_image_url: string;
            };
        };
    };
};
export type AddData = {
    mal_id:number;
    title: string;
    image: string;
};

export const load = (async ({ params }) => {
    const id = params.anime_id;
    const anime = await api<Anime>(
        `https://api.jikan.moe/v4/anime/${id}`,
    );
    if (!anime.success) {
        console.error("Failed to fetch anime", anime.error);
        throw error(500, "Failed to fetch anime");
    }
    console.debug("anime", anime.data);
    return {
        anime: anime.data.data,
    };
}) satisfies PageServerLoad;

export const actions = {
    addToFavorites: async ({ request }) => {
        const form = await request.formData();


        const data: AddData = {
            mal_id : z.string().transform(v => parseInt(v)).parse(form.get("mal_id")),
            title : z.string().parse(form.get("title")),
            image : z.string().parse(form.get("image")),
        }

        console.log(data)
        const addData = await api(SERVER_URL + "/add",{method: "POST", body: JSON.stringify(data)})

        if(!addData.success){
            console.error(
                "failed to add new data",
                addData.error,
            );
        }else{
            console.log("added data to favorites")
        }

        //favorites.set(mal_id, { title: title, image: image });

        return { success: true };
    },

    // addToFavorites: async ({ request }) => {
    //     const form = await request.formData();

    //     // validate form
    //     const mal_id = z.string().transform(v => parseInt(v)).parse(form.get("mal_id"));
    //     const title = z.string().parse(form.get("title"));
    //     const image = z.string().parse(form.get("image"));

    //     favorites.set(mal_id, { title: title, image: image });

    //     return { success: true };
    // },


    delete: async ({ request }) => {
        const form = await request.formData();
        
        const mal_id = z.string().transform(v => parseInt(v)).parse(form.get("mal_id"));
        favorites.delete(mal_id);

        return { success: true };
    }
} satisfies Actions;
