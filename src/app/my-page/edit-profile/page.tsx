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

export default function EditProfile() {
    return (
        <div className="mt-4 sm:mt-0 sm:ml-4 w-full">
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="nickname">닉네임 변경</TabsTrigger>
                    <TabsTrigger value="password">비밀번호 변경</TabsTrigger>
                </TabsList>
                <TabsContent value="nickname">
                    <Card>
                        <CardHeader>
                            <CardTitle>닉네임 변경</CardTitle>
                            <CardDescription>
                                새로운 닉네임으로 변경할 수 있어요.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">새 닉네임</Label>
                                <Input id="name" defaultValue="Pedro Duarte" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>변경하기</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>비밀번호 변경</CardTitle>
                            <CardDescription>
                                새로운 비밀번호로 변경할 수 있어요.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">현재 비밀번호</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">새 비밀번호</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>볌경하기</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
