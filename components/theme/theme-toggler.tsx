"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    function toggleTheme() {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                setTheme(theme === "dark" ? "light" : "dark");
            });
        } else {
            setTheme(theme === "dark" ? "light" : "dark");
        }
    }

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>
                    <div>
                        <Button variant="ghost" size="icon" onClick={() => toggleTheme()}>
                            <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all scale-0 dark:scale-100" />
                        </Button>
                    </div>
                </TooltipTrigger>
                <TooltipContent>모드 전환</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
