import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "article",
  title: "Article",
  fields: [
    defineField({
      type: "string",
      title: "Title",
      name: "title",
    }),
    defineField({
      type: "array",
      title: "Content",
      name: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            // annotations: [
            //   {
            //     type: "object",
            //     title: "Image",
            //     name: "randomImage",
            //     fields: [
            //       {
            //         type: "reference",
            //         title: "Reference",
            //         name: "reference",
            //         to: [{ type: "randomImage" }],
            //       },
            //     ],
            //   },
            // ],
          },
        },
        {
          type: "imageRef",
          title: "Image",
          name: "imageRef",
        },
        // {
        //   type: "reference",
        //   title: "Image",
        //   name: "randomImage",
        //   to: [{ type: "randomImage" }],
        // },
      ],
    }),
  ],
});
