"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VizItem } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MiniVisProps {
  vizItem: VizItem;
}

export default function MiniViz({ vizItem }: MiniVisProps) {
  const path = usePathname();
  console.log(path);

  return (
    <Link href={`${path}/${vizItem.data_set}`}>
      <Card
        key={`miniviz-${vizItem.title}`}
        className="bg-slate-800 hover:bg-slate-600 m-2 transition-opacity"
      >
        <CardHeader>
          <CardTitle>{vizItem.title}</CardTitle>
        </CardHeader>
        <CardContent>{vizItem.description}</CardContent>
      </Card>
    </Link>
  );
}
