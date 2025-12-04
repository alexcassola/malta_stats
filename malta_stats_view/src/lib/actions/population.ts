"use server";

import type { PopAgeSexRegion } from "@/lib/types";
import { fetchJSONFile, pivotData } from "@/lib/helpers";

const DATA_POP_AGE_SEX_REGION =
  "C:\\Users\\Lixu\\OneDrive\\Documents\\Coding\\malta_NSO_stats\\data\\cleansed\\population_age_sex_region.json";

export async function getPopulationTotals() {
  const data = await fetchJSONFile<PopAgeSexRegion>(DATA_POP_AGE_SEX_REGION);
  const filteredData = data.filter(
    (r) => r.age_group == "Total" && r.sex == "Total"
  );
  // Pivot on column 'geographical_region' with values 'observation_value'
  // and keep column 'time_period'
  const pivoted = pivotData(
    filteredData,
    "geographical_region",
    "observation_value",
    ["time_period"]
  );
  return pivoted;
}

export async function getPopulationBySex() {
  const data = await fetchJSONFile<PopAgeSexRegion>(DATA_POP_AGE_SEX_REGION);
  const filteredData = data.filter(
    (r) => r.age_group == "Total" && r.sex != "Total"
  );
  // Pivot on column 'geographical_region' with values 'observation_value'
  // and keep column 'time_period'
  const pivoted = pivotData(filteredData, "sex", "observation_value", [
    "geographical_region",
    "time_period",
  ]);
  return pivoted;
}
