import createImageUrlBuilder from "@sanity/image-url";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "@/lib/sanity.api";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { RandomImage } from "./sanity.query";

if (!SANITY_PROJECT_ID || !SANITY_DATASET)
  throw new Error("Missing SANITY_PROJECT_ID and/or SANITY_DATASET");

const imageBuilder = createImageUrlBuilder({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
});

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source).auto("format").fit("max");

export function getAspectRatioAfterCrop(image: RandomImage) {
  let aspect = image.aspectRatio;

  const imageUrl = new URL(urlForImage(image.imageObject).url());

  if (imageUrl.searchParams.has("rect")) {
    const rect = imageUrl.searchParams.get("rect") as string;
    const [, , w, h] = rect.split(",").map((n) => parseInt(n, 10));
    aspect = w / h;
  }

  return aspect;
}
