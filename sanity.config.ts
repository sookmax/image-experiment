import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import {
  SANITY_PROJECT_ID,
  SANITY_PROJECT_TITLE,
  SANITY_DATASET,
} from "@/lib/sanity.api";

if (!SANITY_PROJECT_ID || !SANITY_DATASET)
  throw "Missing SANITY_PROJECT_ID and/or SANITY_DATASET";

export default defineConfig({
  // https://github.com/sanity-io/next-sanity#next-sanitystudio
  // important that `basePath` matches the route you're mounting your studio from, it applies to both `/pages` and `/app`
  basePath: "/studio",
  title: SANITY_PROJECT_TITLE,

  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,

  plugins: [deskTool(), visionTool()],
});
