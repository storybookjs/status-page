export interface StorybookTemplate {
  name: string;
  id: string;
}

export interface Feature {
  category: string;
  status: 'success' | 'failure' | 'unsupported' | 'indecisive';
}

export interface TestResult {
  date: string;
  storybookVersion: string;
  ciLink: string;
  result: 'success' | 'failure' | 'indecisive' | 'no-data';
  features: Feature[];
}

export interface TemplateTests extends StorybookTemplate {
  results: TestResult[];
}
