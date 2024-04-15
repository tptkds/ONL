'use server';
import { ZodIssue, z } from 'zod';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseAuthError } from '@/service/account/firebaseAuthError';
import { FirebaseError } from 'firebase/app';

const MIN_PASSWORD_LENGTH = 8;

const passwordSchema = z.string().min(MIN_PASSWORD_LENGTH, {
    message: `비밀번호 길이는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`,
});

const schema = z
    .object({
        nickname: z.string(),
        email: z
            .string()
            .email({ message: '유효하지 않은 이메일 형식입니다.' }),
        password: passwordSchema,
        checkPassword: z.string(),
    })
    .refine(data => data.password === data.checkPassword, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['checkPassword'],
    });

export const createUser = async (prevState: any, formData: FormData) => {
    const rawFormData = {
        nickname: formData.get('nickname'),
        email: formData.get('email'),
        password: formData.get('password'),
        checkPassword: formData.get('checkPassword'),
    };

    const validatedFields = schema.safeParse({
        nickname: rawFormData.nickname,
        email: rawFormData.email,
        password: rawFormData.password,
        checkPassword: rawFormData.checkPassword,
    });

    if (!validatedFields.success) {
        const errorMessages = validatedFields.error.issues.map(
            (issue: ZodIssue) => issue.message
        );
        const combinedMessage = errorMessages.join('\n');
        return { message: combinedMessage };
    }
    try {
        // 비동기 작업을 await로 처리
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            validatedFields.data.email,
            validatedFields.data.password
        );

        await updateProfile(userCredential.user, {
            displayName: validatedFields.data.nickname,
        });

        // 모든 작업이 성공적으로 완료된 후 메시지 반환
        return { message: '사용자 생성 성공!' };
    } catch (error) {
        if (error instanceof FirebaseError) {
            // error 객체가 FirebaseError 타입인 경우
            const firebaseAuthError = new FirebaseAuthError(
                error.code,
                error.message
            );
            return { message: firebaseAuthError.message };
        } else {
            // error 객체가 FirebaseError 타입이 아닌 경우의 처리
            console.error('Unexpected error:', error);
            return { message: '알 수 없는 오류가 발생했습니다.' };
        }
    }
};
