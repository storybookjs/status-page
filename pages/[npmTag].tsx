import StatusPage, { getStaticProps } from './index';

// This is a reexport of the Status page so the same component can be used in both / and /:version routes
export default StatusPage;

export { getStaticProps };

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          npmTag: 'next',
        },
      },
      {
        params: {
          npmTag: 'latest',
        },
      },
    ],
    fallback: false,
  };
};
