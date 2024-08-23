export function trapFocus(node: HTMLDivElement) {
    const previous = document.activeElement;

    function focusable() {
        return Array.from(
            node.querySelectorAll(
                'button, [href], [tabindex]:not([tabindex="-1"])',
            ),
        );
    }

    function handleKeydown(event: { key: string; shiftKey: boolean; preventDefault: () => void; }) {
        if (event.key !== "Tab") return;
        const current = document.activeElement;
        const elements = focusable();
        const first = elements.at(0);
        const last = elements.at(-1);
        if (event.shiftKey && current === first) {
            (last as HTMLElement)?.focus();
            event.preventDefault();
        }
        if (!event.shiftKey && current === last) {
            (first as HTMLElement)?.focus();
            event.preventDefault();
        }
    }
    (focusable()[0] as HTMLElement)?.focus();

    node.addEventListener("keydown", handleKeydown);

    return {
        destroy() {
            node.removeEventListener("keydown", handleKeydown);
            (previous as HTMLElement)?.focus();
        },
    };
}
