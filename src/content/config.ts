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

const pricingCollection = defineCollection({
  type: "data",
  schema: z.object({
    tagline: z.string(),
    title: z.string(),
    description: z.string(),
    tiers: z.array(
      z.object({
        name: z.string(),
        target: z.string(),
        description: z.string(),
        priceMonthly: z.string(),
        priceAnnually: z.string(),
        isPopular: z.boolean().default(false),
        buttonText: z.string().default("Get Started"),
        buttonUrl: z.string(),
        featuresList: z.array(z.string()),
      })
    ),
  }),
});

const aboutCollection = defineCollection({
  type: "data",
  schema: z.object({
    tagline: z.string(),
    title: z.string(),
    description: z.string(),
    storyTitle: z.string(),
    story: z.string(),
    stats: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
    values: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    team: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string(),
      })
    ),
    ctaTitle: z.string(),
    ctaButtonText: z.string(),
    ctaButtonUrl: z.string(),
  }),
});

export const collections = {
  hero: heroCollection,
  about: aboutCollection,
  faq: faqCollection,
  pricing: pricingCollection,
};
