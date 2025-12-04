export type VizItem = {
  title: string;
  description: string;
  data_set: string;
  data_source: string;
};

/*------  DATA TYPES  --------*/

// Population data - Age, Sex & Region
export interface PopAgeSexRegion {
  frequency: string;
  geographical_region: string;
  age_group: string;
  sex: "Total" | "Males" | "Females";
  time_period: number;
  observation_value: number;
}
