import { SERVER_URL } from "$env/static/private";
import api from "$lib/server/api";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

type Favorite = {
    id: number;
    created: string;
    updated: string;
    title: string;
    image: string;
};

export const load = (async () => {
    // You need to tell the ts what type the go_server_favorites is, because it can't infer it from the api function
    const go_server_favorites = await api<Favorite[]>(
        SERVER_URL + "/favorites",
    );
    if (!go_server_favorites.success) {
        // error is a special function that will redirect the user to the closest +error.svelte page
        throw error(500, "Failed to load favorites from server");
    }

    // You don't need else here, because if the request was unsuccessful, the function will stop at the throw
    // There is now a very good trend, to keep the code as flat as possible, to avoid nesting
    // So you first try to handle all errors, exceptions, and then you go to the main logic
    console.log("Loaded favorites from server", go_server_favorites.data);
    console.log("number of favs", go_server_favorites.data.length);
    return {
        favorites: go_server_favorites.data,
    };
}) satisfies LayoutServerLoad;
