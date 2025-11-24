import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses } from "@/lib/placeholder-data";
import { Filter, Search } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="container py-8">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">کاتالوگ دروس</h1>
        <p className="text-muted-foreground">
          دروس ارائه شده در این ترم را جستجو و بررسی کنید.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8 p-4 border rounded-lg bg-card">
        <div className="md:col-span-2">
          <label htmlFor="search" className="text-sm font-medium">جستجو</label>
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="search" placeholder="جستجو بر اساس نام درس یا کد..." className="ps-10" />
           </div>
        </div>
        <div>
          <label htmlFor="department" className="text-sm font-medium">دانشکده</label>
          <Select dir="rtl">
            <SelectTrigger id="department">
              <SelectValue placeholder="همه دانشکده‌ها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ce">مهندسی کامپیوتر</SelectItem>
              <SelectItem value="math">علوم ریاضی</SelectItem>
              <SelectItem value="physics">فیزیک</SelectItem>
              <SelectItem value="literature">ادبیات</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="instructor" className="text-sm font-medium">استاد</label>
          <Select dir="rtl">
            <SelectTrigger id="instructor">
              <SelectValue placeholder="همه اساتید" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="razavi">دکتر رضوی</SelectItem>
              <SelectItem value="karimi">دکتر کریمی</SelectItem>
              <SelectItem value="ahmadi">دکتر احمدی</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
