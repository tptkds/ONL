import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const schema = z.object({
    email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
    password: z.string(),
});

const useSignInUser = () => {
    const [status, setStatus] = useState<string>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const signInUser = async (email: string, password: string) => {
        setStatus('loading');

        const validatedFields = schema.safeParse({
            email: email,
            password: password,
        });

        if (!validatedFields.success) {
            const errorMessages = validatedFields.error.issues.map(
                issue => issue.message
            );
            const combinedMessage = errorMessages.join('\n');
            setStatus('error');
            setErrorMessage(combinedMessage);
            return;
        }

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.ok) {
            setStatus('success');
        } else {
            setStatus('error');
            if (result?.error) setErrorMessage(result?.error);
        }
    };

    return { status, signInUser, errorMessage };
};
export default useSignInUser;
