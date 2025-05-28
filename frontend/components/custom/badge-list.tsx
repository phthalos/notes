import Link from "next/link";
import { Badge } from "../ui/badge";
import { BadgeItem } from "@/types/types";

export default function BadgeList({ list }: { list: BadgeItem[][] }) {
    return (
        <ul className="flex flex-col gap-1">
            {list.map((v, i) => (
                <li key={i}>
                    <ul className="flex gap-0.5">
                        {v.map((vv, ii) => (
                            <li key={ii}>
                                <Link href={vv.url || "#"}>
                                    <Badge variant="default">{vv.title}</Badge>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
