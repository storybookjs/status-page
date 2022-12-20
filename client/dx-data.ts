import { PageProps } from '../components/layout/AppLayout';

const LAYOUT_DATA_ENDPOINT = 'https://storybook-dx.netlify.app/.netlify/functions/dx-data';

export const getDxData = async (): Promise<PageProps> => {
  const res = await fetch(LAYOUT_DATA_ENDPOINT);
  return await res.json();
};
