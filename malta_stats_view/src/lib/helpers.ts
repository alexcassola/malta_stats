import { promises as fs } from "fs";

class Cache {
  private cache: Map<string, any>;
  public get: (key: string) => any;
  public set: (key: string, value: any) => void;

  constructor() {
    this.cache = new Map<string, any>();
    this.get = (key: string) => this.cache.get(key);
    this.set = (key: string, value: any) => this.cache.set(key, value);
  }
}

const cache = new Cache();

export async function fetchJSONFile<T>(filePath: string): Promise<Array<T>> {
  let data: Array<T>;
  if (data = cache.get(filePath)) {
    return data;
  }
  const fileContents = await fs.readFile(filePath, "utf8");
  data = JSON.parse(fileContents);
  cache.set(filePath, data);
  return data;
}

export function pivotData(
  data: Array<{ [key: string]: any }>,
  pivotKey: string,
  valueKey: string,
  indexKeys: Array<string> = []
) {
  const result = new Map<string, { [key: string]: any }>();
  const newColumns = new Set<string>();
  data.forEach((row) => {
    const index = indexKeys.map((k) => row[k]).join("-");
    const pivotValue = row[pivotKey].toString();
    const value = row[valueKey];
    if (!result.has(index)) {
      result.set(index, Object.fromEntries(indexKeys.map((k) => [k, row[k]])));
    }
    result.get(index)![pivotValue] = value;
    newColumns.add(pivotValue);
  });
  return {
    data: Array.from(result.values()),
    columns: Array.from(newColumns),
  };
}
