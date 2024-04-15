import DOMPurify from 'dompurify';

export const createMarkup = (htmlContent: string) => {
    const safeHTML =
        typeof window === 'undefined'
            ? htmlContent
            : DOMPurify.sanitize(htmlContent);
    return {
        __html: safeHTML,
    };
};
