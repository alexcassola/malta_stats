"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pages = [
  {
    name: "Population",
    path: "/population",
    description: "Statistics about country population",
  },
];

export default function PageDescriptors() {
  return (
    <section>
      {pages.map((v) => (
        <Card
          key={`page-${v.name}`}
          className="bg-slate-800 hover:bg-slate-600 hover:cursor-pointer"
          onClick={() => redirect(v.path)}
        >
          <CardHeader>
            <CardTitle>{v.name}</CardTitle>
          </CardHeader>
          <CardContent>{v.description}</CardContent>
        </Card>
      ))}
    </section>
  );
}
