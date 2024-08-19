import api from "$lib/server/api";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import favorites from "$lib/data";
import { z } from "zod";
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
    mal_id: number;
    title: string;
    image: string;
};

export const load = (async ({ params }) => {
    const id = params.anime_id;
    const anime = await api<Anime>(`https://api.jikan.moe/v4/anime/${id}`);
    if (!anime.success) {
        console.error("Failed to fetch anime", anime.error);
        throw error(500, "Failed to fetch anime");
    }
    return {
        anime: anime.data.data,
    };
}) satisfies PageServerLoad;

export const actions = {
    addToFavorites: async ({ request }) => {
        const form = await request.formData();

        // That is a working way of validting, but very inefficient
        // const data: AddData = {
        //     mal_id: z
        //         .string()
        //         .transform((v) => parseInt(v))
        //         .parse(form.get("mal_id")),
        //     title: z.string().parse(form.get("title")),
        //     image: z.string().parse(form.get("image")),
        // };
        //
        // Instead, create a schema and use it to validate the form
        const schema = z.object({
            mal_id: z.string().transform((v) => parseInt(v)),
            title: z.string(),
            image: z.string(),
        });
        const data = schema.safeParse({
            mal_id: form.get("mal_id"),
            title: form.get("title"),
            image: form.get("image"),
        });
        if (!data.success) {
            console.error("failed to validate form", data.error);
            return { success: false };
        }

        const addAnime = await api(SERVER_URL + "/add", {
            method: "POST",
            // So now after parsing schema, the data.data have a proper type
            // Here is a bug, but i will not tell you what it is :D
            body: JSON.stringify(data.data),
        });

        if (!addAnime.success) {
            console.error("failed to add new data", addAnime.error);
        } else {
            console.log("added data to favorites");
        }
        return { success: true };
    },
    delete: async ({ request }) => {
        const form = await request.formData();

        const mal_id = z
            .string()
            .transform((v) => parseInt(v))
            .parse(form.get("mal_id"));
        favorites.delete(mal_id);

        return { success: true };
    },
} satisfies Actions;
