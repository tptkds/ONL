export const displayToast = (
    toastTextRef: React.RefObject<HTMLSpanElement>,
    toastRef: React.RefObject<HTMLDivElement>,
    text: string
) => {
    if (toastTextRef?.current && toastRef?.current) {
        toastTextRef.current.innerText = text;
        toastRef.current.classList.remove('hidden');
        toastRef.current.classList.remove('opacity-0');
        toastRef.current.classList.add(
            'opacity-100',
            'transition-opacity',
            'duration-300'
        );

        setTimeout(() => {
            if (toastRef?.current) {
                toastRef.current.classList.replace('opacity-100', 'opacity-0');
                setTimeout(() => {
                    if (toastRef?.current) {
                        toastRef.current.classList.add('hidden');
                    }
                }, 300);
            }
        }, 3000);
    }
};
