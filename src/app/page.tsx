import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calendar, Search, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center bg-card">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              به ترمینو خوش آمدید
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              انتخاب دروس و ساخت برنامه هفتگی، ساده‌تر از همیشه.
            </p>
            <div className="space-x-4 space-x-reverse">
              <Button asChild size="lg">
                <Link href="/signup">شروع کنید</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/dashboard">مشاهده داشبورد</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                ویژگی‌های کلیدی
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                ابزاری قدرتمند برای برنامه‌ریزی
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ترمینو با امکانات پیشرفته خود، شما را در انتخاب واحد و مدیریت
                برنامه تحصیلی یاری می‌کند.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>کاتالوگ دروس</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  جستجو و فیلتر پیشرفته در میان تمام دروس ارائه شده در دانشگاه.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>برنامه‌ساز هوشمند</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  برنامه‌های هفتگی مختلف بسازید و بهترین گزینه را انتخاب کنید.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                   <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>تشخیص تداخل</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  سیستم به صورت خودکار تداخل‌های زمانی بین دروس انتخابی را
                  شناسایی می‌کند.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
