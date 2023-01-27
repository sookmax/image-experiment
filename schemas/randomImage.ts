import { defineField, defineType } from "sanity";
import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

export default defineType({
  type: "document",
  name: "randomImage",
  title: "Random Image",
  fields: [
    defineField({
      type: "image",
      name: "image",
      title: "Image",
      fields: [
        defineField({
          type: "text",
          name: "caption",
          title: "Caption",
          initialValue:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        }),
      ],
      options: {
        hotspot: true,
        sources: [unsplashAssetSource],
      },
    }),
  ],
  preview: {
    select: {
      image: "image",
    },
    prepare(value) {
      return {
        title: value.image.caption,
        media: value.image,
      };
    },
  },
});
