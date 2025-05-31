"use client";
import { NotebookPen } from "lucide-react";
import Footer from "@/components/footer";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";

// Menu items.
const items = [
    {
        title: "메모",
        url: "/",
        icon: NotebookPen,
    },
    // {
    //     title: "Inbox",
    //     url: "#",
    //     icon: Inbox,
    // },
    // {
    //     title: "Calendar",
    //     url: "/calendar",
    //     icon: Calendar,
    // },
    // {
    //     title: "Search",
    //     url: "#",
    //     icon: Search,
    // },
    // {
    //     title: "Settings",
    //     url: "#",
    //     icon: Settings,
    // },
];

export default function AppSidebar() {
    const [open, setOpen] = useState(true);
    return (
        <SidebarProvider open={open} onOpenChange={setOpen} className="w-fit">
            <Sidebar className="pt-14" variant="floating" collapsible="icon">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>메뉴</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarTrigger className="ml-0.5" />
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarFooter className="mt-auto">
                        <Footer className={open ? "" : "opacity-0"} />
                    </SidebarFooter>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}
