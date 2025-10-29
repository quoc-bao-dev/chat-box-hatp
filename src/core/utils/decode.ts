// Hàm decode HTML entities về text bình thường
export const decodeHtmlEntities = (text: string): string => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
};

// Hàm decode HTML (loại bỏ thẻ và decode entities) về text thuần
export const decodeHtml = (html: string): string => {
    const container = document.createElement("div");
    container.innerHTML = html;
    return container.textContent || (container as HTMLElement).innerText || "";
};
