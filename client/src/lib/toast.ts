import { writable } from "svelte/store";

type Toast = {
    id: number;
    message: string;
    success: boolean;
};

export const toasts = writable<Toast[]>([]);

export const addToast = (toast: { success: boolean; message: string }) => {
    const id = Math.floor(Math.random() * 100);

    const defaults = {
        id,
        success: false,
    };

    toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

    setTimeout(() => dismissToast(id), 2000);
};

export const dismissToast = (id: number) => {
    toasts.update((all) => all.filter((t) => t.id !== id));
};
