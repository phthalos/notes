import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const icons = [
    { id: "pencil", icon: <Pencil />, content: "Edit" },
    { id: "trash", icon: <Trash2 />, content: "Move to trash" },
    { id: "more", icon: <MoreVertical />, content: "" },
];

export function TooltipList() {
    return (
        <ul className="flex justify-end border-b border-muted-foreground p-2">
            {icons.map((v, i) => (
                <li key={i}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    id={`tooltip${v.id}`}
                                    className="p-0 h-9 w-9 hover:cursor-pointer"
                                    variant="ghost"
                                >
                                    {v.icon}
                                </Button>
                            </TooltipTrigger>
                            {v.content && (
                                <TooltipContent>
                                    <p>{v.content}</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </li>
            ))}
        </ul>
    );
}
