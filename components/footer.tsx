import Link from "next/link";

export default function Footer({ className }: { className: string }) {
    return (
        <footer
            className={`py-2 z-50 xl:text-xs text-[.65rem] text-muted-foreground text-center transition-opacity duration-100 ${className}`}
        >
            <p>
                Copyright © 2025{" "}
                <Link target="_blank" href="https://github.com/phthalos" className="underline">
                    Phthalos
                </Link>
                .
            </p>
            <p>All Rights Reserved.</p>
        </footer>
    );
}
