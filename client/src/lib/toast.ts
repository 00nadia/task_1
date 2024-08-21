import { writable } from "svelte/store";

export const toasts = writable([]);

export const addToast = (toast) => {
    const id = Math.floor(Math.random() * 100);

    const defaults = {
        id,
        success: false,
    };

    toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

    setTimeout(() => dismissToast(id), 2000);
};

export const dismissToast = (id) => {
    toasts.update((all) => all.filter((t) => t.id !== id));
};
