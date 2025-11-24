"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Course } from '@/lib/placeholder-data';
import { Clock, GraduationCap, PlusCircle, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    const { toast } = useToast();

    const handleAddCourse = () => {
        toast({
            title: "درس اضافه شد",
            description: `${course.title} به برنامه شما اضافه شد.`,
        });
    }
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            <Image
                src={course.image}
                alt={`تصویر درس ${course.title}`}
                fill
                className="object-cover rounded-t-lg"
                data-ai-hint={course.imageHint}
            />
        </div>
        <div className="p-4">
             <CardTitle className="text-lg">{course.title}</CardTitle>
             <p className="text-sm text-muted-foreground">{course.code}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow grid gap-2 text-sm">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{course.instructor}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
           <div>
            {course.schedule.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(' - ')}
          </div>
        </div>
         <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span>{course.units} واحد</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddCourse}>
          <PlusCircle className="ms-2 h-4 w-4" />
          افزودن به برنامه
        </Button>
      </CardFooter>
    </Card>
  );
}
