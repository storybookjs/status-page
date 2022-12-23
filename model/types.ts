// TODO coming from SB monorepo, maybe we should get it from npm?
export interface TemplateConfig {
  /**
   * Storybook version
   */
  version: string;
  /**
   * Readable name for the template, which will be used for feedback and the status page
   */
  name: string;
  /**
   * Script used to generate the base project of a template.
   * The Storybook CLI will then initialize Storybook on top of that template.
   * This is used to generate projects which are pushed to https://github.com/storybookjs/repro-templates-temp
   */
  script: string;
  /**
   * Used to assert various things about the generated template.
   * If the template is generated with a different expected framework, it will fail, detecting a possible regression.
   */
  expected: {
    framework: string;
    renderer: string;
    builder: string;
  };

  expectedFailures?: Array<{
    feature: string;
    issues: string[];
  }>;

  unsupportedFeatures?: Array<{
    feature: string;
    issues: string[];
  }>;
}

export interface StorybookTemplate {
  name: string;
  id: string;
  config?: TemplateConfig;
}

export interface Feature {
  category: 'addon' | 'core';
  name: string;
  /**
   * unsupported, if no test ran for this feature
   * failure, if some tests were failing, skipped or system-out
   * success, if every test was successful
   * indecisive otherwise
   */
  status: 'success' | 'failure' | 'unsupported' | 'indecisive';
}

export type TestResult =
  | {
      /**
       * Cause is either:
       * 1. The pipeline did not run yet for this day.
       * 2. This specific template was not part of this pipeline.
       * 3. The sandbox tests did not complete (may be cancelled, or build failure)
       */
      status: 'no-data';
      date: Date;
      ciLink?: string;
    }
  | {
      date: Date;
      storybookVersion?: string;
      /** Link to the pipeline in circle ci. */
      ciLink: string;
      /**
       * We show success even if we don't support specific features.
       * Indecisive is shown when for some reason not any tests where run for this template.
       * Failure when there is at least one failing feature.
       */
      status: 'success' | 'failure' | 'indecisive';
      features: Feature[];
    };

export interface TemplateTests extends StorybookTemplate {
  results: TestResult[];
}
