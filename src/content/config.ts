import { z, defineCollection } from "astro:content";

const heroCollection = defineCollection({
  type: "data",
  schema: z.object({
    tagline: z.string(),
    title: z.string(),
    description: z.string(),
    featuresList: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
});

const faqCollection = defineCollection({
  type: "data",
  schema: z.object({
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
  }),
});

export const collections = {
  hero: heroCollection,
  faq: faqCollection,
};
