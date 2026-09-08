import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    hero: singleton({
      label: 'Home Page Hero',
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
});
