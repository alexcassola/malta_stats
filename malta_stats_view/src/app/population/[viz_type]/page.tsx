import PopulationTotalsViz from "@/components/visualisations/population/PopulationTotalsViz";
import PopulationBySexViz from "@/components/visualisations/population/PopulationBySexViz";

export default async function PopulationVizPage({
  params,
}: {
  params: Promise<{ viz_type: string }>;
}) {
  const { viz_type } = await params;

  switch (viz_type) {
    case "by_sex":
      return (
        <div>
          <h1>By Sex</h1>
          <PopulationBySexViz />
        </div>
      );
    case "totals":
      return (
        <div>
          <h1>Totals</h1>
          <PopulationTotalsViz />
        </div>
      );
    default:
      return;
  }
}
