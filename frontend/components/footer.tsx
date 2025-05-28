import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-2 z-50 mt-auto">
            <p className="text-xs text-muted-foreground text-center">
                Copyright © 2025{" "}
                <Link target="_blank" href="https://github.com/phthalos" className="underline">
                    Phthalos
                </Link>
                . All Rights Reserved.
            </p>
        </footer>
    );
}
