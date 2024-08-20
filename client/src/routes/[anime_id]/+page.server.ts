import api from "$lib/server/api";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
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
    id: number;
    title: string;
    image: string;
};
export type DeleteData = {
    id: number;
}

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
        // Instead, create a schema and use it to validate the form
        const schema = z.object({
            id: z.string().transform((v) => parseInt(v)),
            title: z.string(),
            image: z.string(),
        });
        const data = schema.safeParse({
            id: form.get("mal_id"),
            title: form.get("title"),
            image: form.get("image"),
        });
        if (!data.success) {
            console.error("failed to validate form", data.error);
            return { success: false };
        }
        const addAnime = await api<AddData>( SERVER_URL + "/add", {
            method: "POST",
            // So now after parsing schema, the data.data have a proper type
            // Here is a bug, but i will not tell you what it is :D
            body: data.data,
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

        const schema = z.object({
            id: z.string().transform((v) => parseInt(v)),
        });
        const data = schema.safeParse({
            id: form.get("mal_id"),
        });
        if (!data.success) {
            console.error("failed to validate form", data.error);
            return { success: false };
        }
        const deleteAnime = await api <DeleteData>(SERVER_URL + "/delete", {
            method: "DELETE",
            body: data.data,
        });
        if (!deleteAnime.success) {
            console.error("failed to add new data", deleteAnime.error);
        } else {
            console.log("added data to favorites");
        }
        return { success: true };
    },
} satisfies Actions;
