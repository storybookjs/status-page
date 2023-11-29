export const AMOUNT_OF_DAYS_TO_FETCH = 90;

export const SANDBOX_FILTER = (template: string) =>
  template.includes('vue-cli') || template.includes('vue2') || (!template.includes('js') && !template.includes('bench'));
