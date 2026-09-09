import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    navigation: {
      'Pages': ['hero', 'about', 'pricing', 'faq'],
      'Docs': ['docs'],
    },
  },
  singletons: {
    hero: singleton({
      label: 'Home Page',
      path: 'src/content/hero/index',
      format: { data: 'json' },
      schema: {
        tagline: fields.text({ label: 'Tagline' }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        featuresList: fields.array(
          fields.object({
            title: fields.text({ label: 'Feature Title' }),
            description: fields.text({ label: 'Feature Description' }),
          }),
          { label: 'Features List', itemLabel: props => props.fields.title.value }
        ),
      },
    }),
    about: singleton({
      label: 'About Page',
      path: 'src/content/about/index',
      format: { data: 'json' },
      schema: {
        tagline: fields.text({ label: 'Tagline' }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        storyTitle: fields.text({ label: 'Story Title' }),
        story: fields.text({ label: 'Story', multiline: true }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Value' }),
            label: fields.text({ label: 'Label' }),
          }),
          { label: 'Stats', itemLabel: props => props.fields.label.value }
        ),
        values: fields.array(
          fields.object({
            title: fields.text({ label: 'Value Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Values', itemLabel: props => props.fields.title.value }
        ),
        team: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            role: fields.text({ label: 'Role' }),
            bio: fields.text({ label: 'Bio', multiline: true }),
          }),
          { label: 'Team', itemLabel: props => props.fields.name.value }
        ),
        ctaTitle: fields.text({ label: 'CTA Title' }),
        ctaButtonText: fields.text({ label: 'CTA Button Text' }),
        ctaButtonUrl: fields.text({ label: 'CTA Button URL' }),
      },
    }),
    faq: singleton({
      label: 'FAQ Page',
      path: 'src/content/faq/index',
      format: { data: 'json' },
      schema: {
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'FAQs', itemLabel: props => props.fields.question.value }
        ),
      },
    }),
    pricing: singleton({
      label: 'Pricing Page',
      path: 'src/content/pricing/index',
      format: { data: 'json' },
      schema: {
        tagline: fields.text({ label: 'Tagline' }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        tiers: fields.array(
          fields.object({
            name: fields.text({ label: 'Plan Name' }),
            target: fields.text({ label: 'Target Audience' }),
            description: fields.text({ label: 'Description', multiline: true }),
            priceMonthly: fields.text({ label: 'Monthly Price' }),
            priceAnnually: fields.text({ label: 'Annual Price' }),
            isPopular: fields.checkbox({ label: 'Is Popular?' }),
            buttonText: fields.text({ label: 'Button Text', defaultValue: 'Get Started' }),
            buttonUrl: fields.text({ label: 'Button URL' }),
            featuresList: fields.array(
              fields.text({ label: 'Feature' }),
              { label: 'Features', itemLabel: props => props.value }
            ),
          }),
          { label: 'Pricing Tiers', itemLabel: props => props.fields.name.value }
        ),
      },
    }),
  },
  collections: {
    docs: collection({
      label: 'Docs',
      path: 'src/content/docs/*',
      slugField: 'title',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        order: fields.integer({ label: 'Sidebar order' }),
        body: fields.mdx({ label: 'Body' }),
      },
    }),
  },
});
