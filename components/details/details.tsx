// import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Details({ title, created_at }: { title: string; created_at: string }) {
    return (
        <div className="border-b border-muted-foreground p-4 flex items-start">
            <div className="flex items-start">
                {/* <Avatar>
                    <AvatarFallback>AA</AvatarFallback>
                </Avatar>{" "} */}
                <span className="text-sm">{title}</span>
            </div>
            <span className="text-xs ml-auto text-muted-foreground">{created_at}</span>
        </div>
    );
}
