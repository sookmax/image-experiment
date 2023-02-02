import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { groq } from "next-sanity";

// https://www.sanity.io/docs/high-performance-groq#1b743110f831
// export const randomImageQuery = groq`
// *[_type == "randomImage"]{
//     "image": image,
//     ...(image.asset-> {
//       'url': url,
//       'preview': metadata.lqip,
//       'aspectRatio': metadata.dimensions.aspectRatio
//     }),
//     "caption": image.caption,
//   }
// `;

export type RandomImage = {
  imageObject: SanityImageObject;
  url: string;
  preview: string;
  aspectRatio: number;
  caption: string;
  loading: "eager" | "lazy";
};

export const articleQuery = groq`
*[_type == "article"][0]{
  ...,
  content[]{
    _type == 'block' => @,
    _type == 'imageRef' => {
      _type,
      loading,
      ...(reference->{
        "imageObject": image,
        "caption": image.caption,
        ...(image.asset-> {
          url,
        "preview": metadata.lqip,
        "aspectRatio": metadata.dimensions.aspectRatio
        })
      })
    }
  }
}
`;

export type Article = {
  title: string;
  content: (any | RandomImage)[];
};
