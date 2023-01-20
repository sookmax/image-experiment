import { createClient } from "next-sanity";
import {
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_API_VERSION,
  SANITY_USE_CDN,
} from "@/lib/sanity.api";
import { RandomImage, randomImageQuery } from "./sanity.query";

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_API_VERSION) {
  throw "Missing one or more of SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_API_VERSION";
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: SANITY_USE_CDN,
});

export async function getAllRandomImages() {
  const results = await client.fetch<RandomImage[]>(randomImageQuery);
  return results;
}
