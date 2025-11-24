import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Trash2 } from "lucide-react";

const selectedCourses = [
  { id: 1, title: 'مهندسی نرم‌افزار', code: 'کامپ ۴۲۴', time: 'ش-د 10-12', conflict: true },
  { id: 2, title: 'مبانی هنرهای تجسمی', code: 'هنر ۱۱۰', time: 'چ 10-12', conflict: true },
  { id: 3, title: 'ریاضیات گسسته', code: 'ریاضی ۲۱۲', time: 'ی-س 08-10', conflict: false },
];

const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'];
const timeSlots = ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'];


export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content: Schedule */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">برنامه هفتگی شما</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ساعت</TableHead>
                      {days.map(day => <TableHead key={day}>{day}</TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeSlots.map(slot => (
                      <TableRow key={slot}>
                        <TableCell className="font-medium">{slot}</TableCell>
                        {days.map(day => (
                            <TableCell key={day} className="p-1">
                                {day === 'یکشنبه' && slot === '08:00 - 10:00' && <CourseCell title="ریاضیات گسسته" code="ریاضی ۲۱۲" />}
                                {day === 'سه‌شنبه' && slot === '08:00 - 10:00' && <CourseCell title="ریاضیات گسسته" code="ریاضی ۲۱۲" />}
                                {day === 'شنبه' && slot === '10:00 - 12:00' && <CourseCell title="مهندسی نرم‌افزار" code="کامپ ۴۲۴" conflict />}
                                {day === 'دوشنبه' && slot === '10:00 - 12:00' && <CourseCell title="مهندسی نرم‌افزار" code="کامپ ۴۲۴" conflict />}
                                {day === 'چهارشنبه' && slot === '10:00 - 12:00' && <CourseCell title="مبانی هنرهای تجسمی" code="هنر ۱۱۰" conflict />}
                            </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Selected Courses & Conflicts */}
        <aside className="w-full lg:w-80">
          <Card>
            <CardHeader>
              <CardTitle>دروس انتخاب شده</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedCourses.map(course => (
                <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-muted-foreground">{course.code} - {course.time}</p>
                    {course.conflict && (
                       <Badge variant="destructive" className="mt-2">
                           <AlertTriangle className="h-3 w-3 ms-1" />
                           تداخل زمانی
                       </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
               <Button className="w-full">نهایی کردن انتخاب واحد</Button>
            </CardContent>
          </Card>
        </aside>

      </div>
    </div>
  )
}

function CourseCell({ title, code, conflict }: { title: string; code: string; conflict?: boolean }) {
    return (
        <div className={`h-full w-full rounded-md p-2 text-xs ${conflict ? 'bg-destructive/20 text-destructive-foreground border border-destructive' : 'bg-primary/10 text-primary-foreground'}`}>
            <p className="font-bold">{title}</p>
            <p>{code}</p>
        </div>
    )
}
