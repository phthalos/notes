"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
const chartData = [
    { month: "일상", desktop: 40 },
    { month: "컴퓨터", desktop: 60 },
    { month: "RT", desktop: 45 },
    { month: "장르", desktop: 30 },
    { month: "급발진", desktop: 15 },
    { month: "교류", desktop: 30 },
];

const chartConfig = {
    desktop: {
        label: "트윗성향",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function Chart() {
    return (
        <Card className="w-96 mx-auto shadow-none border-none">
            {/* <CardHeader className="items-center pb-4">
                <CardTitle>트윗성향</CardTitle>
                <CardDescription>정확한 건 아니고 대충 이런 느낌</CardDescription>
            </CardHeader> */}
            <CardContent className="pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <RadarChart data={chartData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">January - June 2024</div>
            </CardFooter> */}
        </Card>
    );
}
