export interface StorybookTemplate {
  name: string;
  id: string;
}

export interface Feature {
  category: 'addons' | 'core';
  name: string;
  status: 'success' | 'failure' | 'unsupported' | 'indecisive';
}

export interface TestResult {
  date: Date;
  storybookVersion: string;
  ciLink: string;
  status: 'success' | 'failure' | 'indecisive' | 'no-data';
  features: Feature[];
}

export interface TemplateTests extends StorybookTemplate {
  results: TestResult[];
}
