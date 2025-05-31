import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Details() {
    return (
        <div className="border-b border-muted-foreground p-4 flex items-start">
            <div className="flex items-start">
                <Avatar>
                    <AvatarFallback>AA</AvatarFallback>
                </Avatar>{" "}
                <span className="text-sm">details</span>
            </div>
            <span className="text-xs ml-auto text-muted-foreground">Oct 22, 2023, 9:00:00 AM</span>
        </div>
    );
}
