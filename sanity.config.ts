import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import {
  SANITY_PROJECT_ID,
  SANITY_PROJECT_TITLE,
  SANITY_DATASET,
} from "@/lib/sanity.api";
import randomImage from "./schemas/randomImage";
import article from "./schemas/article";
import imageRef from "./schemas/imageRef";

if (!SANITY_PROJECT_ID || !SANITY_DATASET)
  throw "Missing SANITY_PROJECT_ID and/or SANITY_DATASET";

export default defineConfig({
  // https://github.com/sanity-io/next-sanity#next-sanitystudio
  // important that `basePath` matches the route you're mounting your studio from, it applies to both `/pages` and `/app`
  basePath: "/studio",
  title: SANITY_PROJECT_TITLE,

  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,

  schema: {
    types: [randomImage, article, imageRef],
  },

  plugins: [deskTool(), visionTool(), unsplashImageAsset()],

  form: {
    image: {
      // assetSources: (prevSources) => {
      //   return prevSources.filter((source) => source.name === "unsplash");
      // },
      // assetSources: [unsplashAssetSource],
      // directUploads: false,
    },
  },
});
