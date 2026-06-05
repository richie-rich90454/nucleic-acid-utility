export function showToast(message: string){
    window.dispatchEvent(new CustomEvent("show-toast", {detail: message}));
}