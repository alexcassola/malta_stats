import type { Metadata } from "next";

import MiniViz from "@/components/MiniViz";
import type { VizItem } from "@/lib/types";

const vizItems: VizItem[] = [
  {
    title: "Totals",
    description: "Here goes the mini viz",
    data_set: "totals",
    data_source: 'NSO Malta'
  },
  {
    title: "By sex",
    description: "Here goes the mini viz",
    data_set: "by_sex",
    data_source: 'NSO Malta'
  },
];

export const metadata: Metadata = {
  title: "Population",
  description: "Statistics abour population",
};

export default async function PopulationPage() {
  return (
    <div>
      <h1 className="top-0">Population</h1>
      <p>Here you can view visualisations about the population</p>
      <div className="grid grid-cols-4 m-2">
        {vizItems.map((v) => (
          <MiniViz key={`miniviz-${v.title}`} vizItem={v} />
        ))}
      </div>
    </div>
  );
}
