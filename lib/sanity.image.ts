import createImageUrlBuilder from "@sanity/image-url";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "@/lib/sanity.api";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

if (!SANITY_PROJECT_ID || !SANITY_DATASET)
  throw new Error("Missing SANITY_PROJECT_ID and/or SANITY_DATASET");

const imageBuilder = createImageUrlBuilder({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
});

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source).auto("format").fit("max");
