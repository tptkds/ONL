export default function SignInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="h-full flex items-center justify-center">
                {children}
            </div>
        </>
    );
}
