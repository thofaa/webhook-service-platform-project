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
  },
});
