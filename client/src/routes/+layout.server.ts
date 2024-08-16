import { SERVER_URL } from "$env/static/private";
//import favorites from "$lib/data";
import api from "$lib/server/api";
import type { LayoutServerLoad } from "./$types";
//import { json } from '@sveltejs/kit';

export const load = (async () => {
    const go_server_favorites = await api(SERVER_URL + "/favorites");
    if (!go_server_favorites.success) {
        console.error(
            "Failed to load favorites from server",
            go_server_favorites.error,
        );
        return null;
    } else {
        console.log("Loaded favorites from server", go_server_favorites.data);
        return {
            favorites: go_server_favorites.data,
        };
    }

   

}) satisfies LayoutServerLoad;