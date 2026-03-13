import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), "data");

type StoredRecord = Record<string, unknown>;

async function ensureDataDirectory() {
  await mkdir(dataDirectory, { recursive: true });
}

async function readRecords(fileName: string) {
  await ensureDataDirectory();
  const filePath = path.join(dataDirectory, fileName);

  try {
    const fileContents = await readFile(filePath, "utf8");
    const parsed = JSON.parse(fileContents) as StoredRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function getRecords(fileName: string) {
  return readRecords(fileName);
}

export async function appendRecord(fileName: string, record: StoredRecord) {
  const records = await readRecords(fileName);
  records.unshift(record);

  const filePath = path.join(dataDirectory, fileName);
  await writeFile(filePath, JSON.stringify(records.slice(0, 1000), null, 2), "utf8");
}
