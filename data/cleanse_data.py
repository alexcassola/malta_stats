import pandas as pd
from pathlib import Path
import re

data_folder = Path(__file__).parent

global_column_name_mapping = {
    "DATAFLOW": "dataflow",
    "FREQ: Frequency": "frequency",
    "GEO: Geographical Region": "geographical_region",
    "AGE: Age Group": "age_group",
    "SEX: Sex": "sex",
    "TIME_PERIOD: Time Period": "time_period",
    "OBS_VALUE": "observation_value",
}

descriptive_column_regex = re.compile("\\w+: (.*)", re.I)


def descriptive_column_replace(m: re.Match) -> str:
    return m.group(1)


def cleanse_population_age_sex_region(
    original_file_name: str, clean_file_name: str
):
    """Cleanses the population by age group, sex and region of residence dataset.

    Columns:
        "DATAFLOW","FREQ: Frequency","GEO: Geographical Region","AGE: Age Group","SEX: Sex","TIME_PERIOD: Time Period","OBS_VALUE","CONF_STATUS: Confidentiality Status","OBS_STATUS: Observation Status","OBS_COMMENT: Observation Comment"

    """
    # Read the CSV file
    df = pd.read_csv(original_file_name, sep=",")

    # Select only the first 7 columns
    columns_to_keep = list(df.columns[1:7])
    df = df[columns_to_keep]

    # Rename columns using global mapping
    df = (
        df.rename(columns=global_column_name_mapping)
        .assign(
            frequency=lambda df: df["frequency"].str.replace(
                descriptive_column_regex,
                descriptive_column_replace,
                regex=True,
            ),
            geographical_region=lambda df: df[
                "geographical_region"
            ].str.replace(
                descriptive_column_regex,
                descriptive_column_replace,
                regex=True,
            ),
            age_group=lambda df: df["age_group"].str.replace(
                descriptive_column_regex,
                descriptive_column_replace,
                regex=True,
            ),
            sex=lambda df: df["sex"].str.replace(
                descriptive_column_regex,
                descriptive_column_replace,
                regex=True,
            ),
        )
        .drop_duplicates()
    )

    # Create cleansed directory if it doesn't exist
    clean_file_path = Path(clean_file_name)
    clean_file_path.parent.mkdir(parents=True, exist_ok=True)

    # Save cleansed data
    df.to_csv(f"{clean_file_name}.csv", index=False)
    df.to_json(f"{clean_file_name}.json", index=False, orient="records")


data_sets = [
    {
        "description": "Population by Age group, Sex and Region of residence",
        "short_description": "population_age_sex_region",
        "orignal_file_name": data_folder
        / "original/ESTAT_DF_POPSTAT_02R_1.0.csv",
        "clean_file_name": data_folder / "cleansed/population_age_sex_region",
        "function": cleanse_population_age_sex_region,
    }
]

if __name__ == "__main__":
    for d in data_sets:
        d["function"](d["orignal_file_name"], d["clean_file_name"])
