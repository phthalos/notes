import TextareaForm from "@/components/form/textarea-form";
import AppCard from "@/components/card/app-card";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipList } from "@/components/custom/tooltip-list";
import Details from "@/components/details/details";
import Contents from "@/components/details/contents";
export default function Home() {
    return (
        <>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={40}>
                    <div className="p-4">
                        <TextareaForm />
                        <AppCard />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <TooltipList />
                    <Details />
                    <Contents />
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}
