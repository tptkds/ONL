'use client';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signOut, useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import changeNickname from '@/service/account/changeNickname';
import {
    getAuth,
    signInWithEmailAndPassword,
    updatePassword,
    updateProfile,
    User,
} from 'firebase/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getUserNickname from '@/service/account/getUserNickname';
import { auth } from '@/app/firebase';
import { FirebaseError } from 'firebase/app';
import { FirebaseAuthError } from '@/service/account/firebaseAuthError';

export default function EditProfile() {
    const queryClient = useQueryClient();
    const { data: sessionData } = useSession();

    const { data: nickname } = useQuery({
        queryKey: ['nickname', sessionData?.user.uid],
        queryFn: () => getUserNickname(sessionData?.user.uid as string),
        enabled: !!sessionData?.user.uid,
    });

    const { mutate } = useMutation({
        mutationFn: () =>
            changeNickname(sessionData?.user.uid as string, newNickname),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['nickname', sessionData?.user.uid],
                exact: true,
            });
            resetState();
            alert('닉네임 변경을 완료했습니다.');
        },
    });

    const [newNickname, setNewNickname] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const resetState = () => {
        setErrorMessage('');
        setCurrentPassword('');
        setNewNickname('');
        setNewPassword('');
    };
    return (
        <div className="mt-4 sm:mt-0 sm:ml-4 w-full">
            <Tabs defaultValue="nickname" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                        value="nickname"
                        onClick={() => {
                            resetState();
                        }}
                    >
                        닉네임 변경
                    </TabsTrigger>
                    <TabsTrigger
                        value="password"
                        onClick={() => {
                            resetState();
                        }}
                    >
                        비밀번호 변경
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="nickname">
                    <Card>
                        <CardHeader>
                            <CardTitle>닉네임 변경</CardTitle>
                            <CardDescription>
                                {sessionData?.user.isGoogleAccount ? (
                                    <p className="text-red-600 mt-2">
                                        구글 계정은 닉네임을 변경할 수 없어요.
                                    </p>
                                ) : (
                                    '새로운 닉네임으로 변경할 수 있어요.'
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                {errorMessage != '' ? (
                                    <p className="text-xs text-red-600 mb-2">
                                        {errorMessage}
                                    </p>
                                ) : (
                                    ''
                                )}
                                <Label htmlFor="name">새 닉네임</Label>
                                <Input
                                    id="name"
                                    onChange={e =>
                                        setNewNickname(e.target.value)
                                    }
                                    disabled={sessionData?.user.isGoogleAccount}
                                    className="disabled:bg-gray-100"
                                    aria-disabled={
                                        sessionData?.user.isGoogleAccount
                                    }
                                    placeholder={
                                        sessionData?.user.isGoogleAccount
                                            ? (sessionData.user.name as string)
                                            : nickname
                                    }
                                    value={newNickname}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => {
                                    if (nickname == newNickname) {
                                        setErrorMessage(
                                            '현재 닉네임과 동일한 닉네임으로 변경할 수 없습니다.'
                                        );
                                        return;
                                    } else {
                                        mutate();
                                    }
                                }}
                                disabled={sessionData?.user.isGoogleAccount}
                                aria-disabled={
                                    sessionData?.user.isGoogleAccount
                                }
                            >
                                변경하기
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>비밀번호 변경</CardTitle>

                            <CardDescription>
                                {sessionData?.user.isGoogleAccount ? (
                                    <p className="text-red-600 mt-2">
                                        구글 계정은 패스워드를 변경할 수 없어요.
                                    </p>
                                ) : (
                                    '새로운 비밀번호로 변경할 수 있어요.'
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                {errorMessage != '' ? (
                                    <p className="text-xs text-red-600 mb-2">
                                        {errorMessage}
                                    </p>
                                ) : (
                                    ''
                                )}
                                <Label htmlFor="current">현재 비밀번호</Label>
                                <Input
                                    id="current"
                                    type="password"
                                    disabled={sessionData?.user.isGoogleAccount}
                                    className="disabled:bg-gray-100"
                                    aria-disabled={
                                        sessionData?.user.isGoogleAccount
                                    }
                                    onChange={e =>
                                        setCurrentPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">새 비밀번호</Label>
                                <Input
                                    id="new"
                                    type="password"
                                    disabled={sessionData?.user.isGoogleAccount}
                                    className="disabled:bg-gray-100"
                                    aria-disabled={
                                        sessionData?.user.isGoogleAccount
                                    }
                                    onChange={e =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                disabled={
                                    sessionData?.user.isGoogleAccount ||
                                    currentPassword == '' ||
                                    newPassword == ''
                                }
                                aria-disabled={
                                    sessionData?.user.isGoogleAccount ||
                                    currentPassword == '' ||
                                    newPassword == ''
                                }
                                onClick={async () => {
                                    if (newPassword.length < 8) {
                                        setErrorMessage(
                                            '새 비밀번호는 8자 이상이어야 합니다.'
                                        );
                                        return;
                                    }
                                    try {
                                        const userCredential =
                                            await signInWithEmailAndPassword(
                                                auth,
                                                sessionData?.user
                                                    .email as string,
                                                currentPassword
                                            );
                                        const user = userCredential.user;
                                        await updatePassword(user, newPassword);
                                        alert('패스워드 변경을 성공했습니다.');
                                        signOut();
                                    } catch (error) {
                                        if (
                                            error ==
                                            'FirebaseError: Firebase: Error (auth/invalid-credential).'
                                        ) {
                                            setErrorMessage(
                                                '현재 비밀번호가 올바르지 않습니다.'
                                            );
                                        }
                                    }
                                }}
                            >
                                변경하기
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
