import { ModeToggle } from "@/components/theme/theme-toggler";
import Link from "next/link";
export default function Header() {
    return (
        <header
            className="sticky top-0 backdrop-blur py-2 z-50 bg-background/90 supports-[backdrop-filter]:bg-background/60 border-b border-b-muted-foreground"
            suppressHydrationWarning
        >
            <div className="flex items-center justify-between mx-4">
                <h1 className="font-semibold">
                    <Link href="/">단순한 사람을 위한 메모장</Link>
                </h1>
                <ModeToggle />
            </div>
        </header>
    );
}
