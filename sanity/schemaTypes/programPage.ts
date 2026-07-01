import { defineField, defineType } from "sanity";

export const programPage = defineType({
  name: "programPage",
  title: "Program Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "metaData",
      title: "SEO Metadata",
      type: "metaData",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string", title: "Question" }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "array",
              description:
                "Use the toolbar to add bold, italic, bullet lists, or hyperlinks (internal & external) in your answer.",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [
                    { title: "Bullet", value: "bullet" },
                    { title: "Numbered", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Strong", value: "strong" },
                      { title: "Emphasis", value: "em" },
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                          defineField({
                            name: "href",
                            type: "url",
                            title: "URL",
                            description:
                              "Paste any URL — internal paths like /programs/mathematics also work.",
                            validation: (Rule) =>
                              Rule.uri({
                                scheme: ["http", "https", "mailto", "tel"],
                                allowRelative: true,
                              }),
                          }),
                          defineField({
                            name: "blank",
                            type: "boolean",
                            title: "Open in new tab",
                            initialValue: false,
                          }),
                        ],
                      },
                    ],
                  },
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
