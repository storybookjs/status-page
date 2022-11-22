export interface TestResult {
  template: {
    id: string;
    name: string;
  };
  date: Date;
  storybookVersion: string;
  ciLink: string;
  features: Feature[];
}

export interface Feature {
    category: string;
    status: 'success' | 'failure' | 'unsupported';
}