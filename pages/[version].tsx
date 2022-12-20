import StatusPage, { getStaticProps } from './index';

export default StatusPage;

export { getStaticProps };

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          version: '7.0',
        },
      },
    ],
    fallback: false,
  };
};
