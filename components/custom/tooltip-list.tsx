import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ArrowRightFromLine, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Memo } from "@/hooks/use-memos";

type TootipTypes = {
    id: number;
    deleteMemo: (id: number) => Promise<void>;
    setPanelOpen: Dispatch<SetStateAction<boolean>>;
    startEdit: (memo: Memo) => void;
    cancelEdit: () => void;
    memo: Memo;
};

export function TooltipList({ id, deleteMemo, setPanelOpen, startEdit, memo }: TootipTypes) {
    return (
        <ul className="flex justify-end border-b border-muted-foreground p-2 sticky z-10">
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            id="tooltip_close"
                            className="p-0 h-9 w-9 hover:cursor-pointer mr-auto"
                            variant="ghost"
                            onClick={() => setPanelOpen(false)}
                        >
                            <ArrowRightFromLine />
                        </Button>
                    </TooltipTrigger>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            id="tooltip_pencil"
                            className="p-0 h-9 w-9 hover:cursor-pointer"
                            variant="ghost"
                            onClick={() => startEdit(memo)}
                        >
                            <Pencil />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>수정</p>
                    </TooltipContent>
                </Tooltip>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button id="tooltip_trash" className="p-0 h-9 w-9 hover:cursor-pointer" variant="ghost">
                                    <Trash2 />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>삭제</p>
                            </TooltipContent>
                        </Tooltip>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
                            <AlertDialogDescription>
                                이 메모는 완전히 삭제되며, 다시는 복구할 수 없습니다.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    setPanelOpen(false);
                                    deleteMemo(id);
                                }}
                            >
                                삭제
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button id="tooltip_more" className="p-0 h-9 w-9 hover:cursor-pointer" variant="ghost">
                            <MoreVertical />
                        </Button>
                    </TooltipTrigger>
                </Tooltip>
            </TooltipProvider>
        </ul>
    );
}
