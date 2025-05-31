import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Header from "@/components/header";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppBreadCrumb } from "@/components/breadcrumb/app-breadcrumb";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
const pretendard = localFont({
    src: "../fonts/Pretendard-1.3.9/woff2/PretendardVariable.woff2",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

export const metadata: Metadata = {
    title: "단순한 사람을 위한 메모장",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning className="overflow-y-hidden">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} ${pretendard.className} antialiased`}
            >
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <div>
                        <Header />
                        <SidebarProvider>
                            <AppSidebar />
                            <main>
                                {/* <AppBreadCrumb /> */}
                                {children}
                                <Toaster closeButton position="bottom-right" expand={false} richColors />
                            </main>
                        </SidebarProvider>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
