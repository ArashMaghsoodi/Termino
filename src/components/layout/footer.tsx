import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-right">
                        © 1404 ترمینو - تمام حقوق محفوظ است.
                    </p>
                </div>
                 <div className="flex items-center gap-4 md:gap-2">
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                        درباره ما
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                        تماس با ما
                    </Link>
                </div>
            </div>
        </footer>
    );
}
