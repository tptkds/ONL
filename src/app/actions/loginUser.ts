'use server';
import { ZodIssue, z } from 'zod';
import { signIn } from 'next-auth/react';
const schema = z.object({
    email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
    password: z.string(),
});

export const loginUser = async (prevState: any, formData: FormData) => {
    const rawFormData = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    const validatedFields = schema.safeParse({
        email: rawFormData.email,
        password: rawFormData.password,
    });

    if (!validatedFields.success) {
        console.dir(validatedFields);
        const errorMessages = validatedFields.error.issues.map(
            (issue: ZodIssue) => issue.message
        );
        const combinedMessage = errorMessages.join('\n');
        return { message: combinedMessage };
    }

    const result = await signIn('credentials', {
        redirect: false,
        email: rawFormData.email,
        password: rawFormData.password,
    })
        .then(() => {
            console.log('!!!');
            return { message: '로그인을 성공했습니다.' };
        })
        .catch(error => {
            console.log('!!!!!');
            console.error(error);
            return { message: error };
        });
};
