import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AppCard() {
    return (
        <Card className="mt-8">
            <CardHeader>
                <div className="flex flex-row justify-between">
                    <CardTitle>Card Title</CardTitle>
                    <span className="text-xs">over 1 year ago</span>
                </div>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground">
                    Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details
                    and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the
                    project's success. Please come prepared with any questions or insights you may have. Looking forward
                    to our meeting! Best regards, William
                </p>
            </CardContent>
        </Card>
    );
}
