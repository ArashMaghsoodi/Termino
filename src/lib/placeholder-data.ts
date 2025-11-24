import { placeholderImages } from './placeholder-images';

export type Course = {
  id: string;
  code: string;
  title: string;
  instructor: string;
  schedule: {
    day: 'شنبه' | 'یکشنبه' | 'دوشنبه' | 'سه‌شنبه' | 'چهارشنبه';
    startTime: string;
    endTime: string;
  }[];
  units: number;
  capacity: number;
  description: string;
  image: string;
  imageHint: string;
};

export const courses: Course[] = [
  {
    id: '1',
    code: 'کامپ ۴۲۴',
    title: 'مهندسی نرم‌افزار',
    instructor: 'دکتر رضوی',
    schedule: [
      { day: 'شنبه', startTime: '10:00', endTime: '12:00' },
      { day: 'دوشنبه', startTime: '10:00', endTime: '12:00' },
    ],
    units: 3,
    capacity: 40,
    description: 'آشنایی با اصول و مبانی مهندسی نرم‌افزار و چرخه‌های تولید نرم‌افزار.',
    image: placeholderImages.find(p => p.id === 'course-1')?.imageUrl || 'https://picsum.photos/seed/cs101/600/400',
    imageHint: placeholderImages.find(p => p.id === 'course-1')?.imageHint || 'computer science',
  },
  {
    id: '2',
    code: 'ریاضی ۲۱۲',
    title: 'ریاضیات گسسته',
    instructor: 'دکتر کریمی',
    schedule: [
      { day: 'یکشنبه', startTime: '08:00', endTime: '10:00' },
      { day: 'سه‌شنبه', startTime: '08:00', endTime: '10:00' },
    ],
    units: 3,
    capacity: 50,
    description: 'مباحثی در منطق، نظریه مجموعه‌ها، ترکیبیات و گراف‌ها.',
    image: placeholderImages.find(p => p.id === 'course-2')?.imageUrl || 'https://picsum.photos/seed/math202/600/400',
    imageHint: placeholderImages.find(p => p.id === 'course-2')?.imageHint || 'mathematics blackboard',
  },
  {
    id: '3',
    code: 'فیزیک ۳۰۱',
    title: 'فیزیک مدرن',
    instructor: 'دکتر احمدی',
    schedule: [
        { day: 'شنبه', startTime: '14:00', endTime: '16:00' },
        { day: 'دوشنبه', startTime: '14:00', endTime: '16:00' },
    ],
    units: 3,
    capacity: 35,
    description: 'مروری بر نسبیت خاص، مکانیک کوانتومی و فیزیک هسته‌ای.',
    image: placeholderImages.find(p => p.id === 'course-3')?.imageUrl || 'https://picsum.photos/seed/phy301/600/400',
    imageHint: placeholderImages.find(p => p.id === 'course-3')?.imageHint || 'physics atom',
  },
  {
    id: '4',
    code: 'ادبیات ۱۰۱',
    title: 'ادبیات معاصر فارسی',
    instructor: 'دکتر شفیعی',
    schedule: [
      { day: 'چهارشنبه', startTime: '13:00', endTime: '15:00' },
    ],
    units: 2,
    capacity: 60,
    description: 'بررسی آثار برجسته شعر و نثر فارسی در دوره معاصر.',
    image: placeholderImages.find(p => p.id === 'course-4')?.imageUrl || 'https://picsum.photos/seed/lit100/600/400',
    imageHint: placeholderImages.find(p => p.id === 'course-4')?.imageHint || 'literature books',
  },
    {
    id: '5',
    code: 'شیمی ۲۰۱',
    title: 'شیمی آلی',
    instructor: 'دکتر نادری',
    schedule: [
      { day: 'یکشنبه', startTime: '13:00', endTime: '15:00' },
      { day: 'سه‌شنبه', startTime: '13:00', endTime: '15:00' },
    ],
    units: 3,
    capacity: 45,
    description: 'ساختار، خواص، ترکیبات، واکنش‌ها و سنتز ترکیبات آلی.',
    image: placeholderImages.find(p => p.id === 'course-5')?.imageUrl || 'https://picsum.photos/seed/chem201/600/400',
    imageHint: placeholderImages.find(p => p.id === 'course-5')?.imageHint || 'chemistry lab',
  },
  {
    id: '6',
    code: 'هنر ۱۱۰',
    title: 'مبانی هنرهای تجسمی',
    instructor: 'استاد پاکباز',
    schedule: [
        { day: 'چهارشنبه', startTime: '10:00', endTime: '12:00' },
    ],
    units: 2,
    capacity: 25,
    description: 'آشنایی با عناصر و اصول اولیه در هنرهای تجسمی مانند نقطه، خط، سطح و رنگ.',
    image: placeholderImages.find(p => p.id === 'course-6')?.imageUrl || 'https://picsum.photos/seed/art110/600/400',
    imageHint: placeholderImages.find(p => p.id === 'course-6')?.imageHint || 'art studio',
  }
];
