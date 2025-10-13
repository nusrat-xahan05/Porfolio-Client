export const handleQuillLists = (html: string): string => {
    if (!html) return "";

    let clean = html
        // HANDLE Quill UI spans
        .replace(/<span class="ql-ui"[^>]*><\/span>/g, "")
        .replace(/<p><br><\/p>/g, "")
        .replace(/<p>\s*<\/p>/g, "");

    // HANDLE BULLET LIST
    clean = clean.replace(
        /((<li[^>]*data-list="bullet"[^>]*>.*?<\/li>\s*)+)/g,
        (match) => {
            const items = match.replace(/ data-list="bullet"/g, "");
            return `<ul>${items}</ul>`;
        }
    );

    // HANDLE ORDERED LISTS
    clean = clean.replace(
        /((<li[^>]*data-list="ordered"[^>]*>.*?<\/li>\s*)+)/g,
        (match) => {
            const items = match.replace(/ data-list="ordered"/g, "");
            return `<ol>${items}</ol>`;
        }
    );

    return clean.trim();
};
