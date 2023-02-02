import { defineField, defineType } from "sanity";

export default defineType({
  type: "object",
  title: "Image",
  name: "imageRef",
  preview: {
    select: {
      image: "reference.image",
      caption: "reference.image.caption",
      loading: "loading",
    },
    prepare({ image, loading, caption }) {
      return {
        title: caption,
        subtitle: `Loading: ${loading}`,
        media: image,
      };
    },
  },
  fields: [
    defineField({
      type: "reference",
      title: "Image",
      name: "reference",
      to: [{ type: "randomImage" }],
    }),
    defineField({
      type: "string",
      name: "loading",
      title: "Image loading strategy",
      initialValue: "lazy",
      options: {
        list: [
          { title: "Eager", value: "eager" },
          { title: "Lazy", value: "lazy" },
        ],
        layout: "radio",
      },
    }),
  ],
});
