import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { groq } from "next-sanity";

// https://www.sanity.io/docs/high-performance-groq#1b743110f831
export const randomImageQuery = groq`
*[_type == "randomImage"]{
    "image": image,
    ...(image.asset-> {
      'url': url,
      'preview': metadata.lqip,
      'aspectRatio': metadata.dimensions.aspectRatio
    }),
    "caption": image.caption,
  }
`;

export type RandomImage = {
  image: SanityImageObject;
  url: string;
  preview: string;
  aspectRatio: number;
  caption: string;
};

export const articleQuery = groq`
*[_type == "article"][0]{
  ...,
  content[]{
    ...,
    _type == 'randomImage' => @->{
      image,
      ...(image.asset -> {
        url,
        "preview": metadata.lqip,
        "aspectRatio": metadata.dimensions.aspectRatio
      }),
      "caption": image.caption
    }
  }
}
`;

export type Article = {
  title: string;
  content: (any | RandomImage)[];
};
