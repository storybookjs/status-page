const VERSIONS_ENDPOINT = 'https://storybook.js.org/versions.json';

type StorybookVersion = {
  version: string;
  info: {
    plain: string;
  };
};

type StorybookVersionData = {
  latest: StorybookVersion;
  next: StorybookVersion;
};

export type StorybookVersions = {
  latest: string;
  next: string;
};

export const getStorybookVersions = async (): Promise<StorybookVersions> => {
  const res = await fetch(VERSIONS_ENDPOINT);
  const data = (await res.json()) as StorybookVersionData;

  return {
    latest: data.latest.version.split('.').slice(0, -1).join('.'),
    next: data.next.version.split('.').slice(0, -1).join('.'),
  };
};
