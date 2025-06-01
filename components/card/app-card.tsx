import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Memo } from "@/hooks/use-memos";

export default function AppCard({ title, content, created_at }: Memo) {
    return (
        <Card className="mt-2 hover:bg-sidebar cursor-pointer transition-colors duration-100">
            <CardHeader>
                <div className="flex lg:flex-row sm:flex-col justify-between gap-1">
                    <CardTitle>{title}</CardTitle>
                    <span className="text-xs">{created_at}</span>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground whitespace-pre-wrap">{content}</p>
            </CardContent>
        </Card>
    );
}
