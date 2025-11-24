import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">ثبت نام</CardTitle>
          <CardDescription>
            برای ساخت حساب کاربری جدید اطلاعات خود را وارد کنید.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">نام کامل</Label>
            <Input id="name" placeholder="مثلا: علی محمدی" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">رمز عبور</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full">ساخت حساب</Button>
           <p className="mt-4 text-xs text-center text-muted-foreground">
            قبلا ثبت‌نام کرده‌اید؟{" "}
            <Link href="/login" className="underline">
              ورود
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
