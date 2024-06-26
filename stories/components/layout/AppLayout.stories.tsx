import { StoryObj, Meta } from '@storybook/react';

import { AppLayout } from '~/components/layout/AppLayout';

const pageProps = {
  npmTag: 'next',
  contributors: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/50838?v=4',
      name: 'arunoda',
      url: 'https://github.com/arunoda',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/136691?v=4',
      name: 'thani-sh',
      url: 'https://github.com/thani-sh',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/321738?v=4',
      name: 'ghengeveld',
      url: 'https://github.com/ghengeveld',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/22988955?v=4',
      name: 'jonniebigodes',
      url: 'https://github.com/jonniebigodes',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/1671563?v=4',
      name: 'yannbf',
      url: 'https://github.com/yannbf',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/4112568?v=4',
      name: 'gaetanmaisse',
      url: 'https://github.com/gaetanmaisse',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/263385?v=4',
      name: 'domyen',
      url: 'https://github.com/domyen',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/4616705?v=4',
      name: 'IanVS',
      url: 'https://github.com/IanVS',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/1474548?v=4',
      name: 'danielduan',
      url: 'https://github.com/danielduan',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/5478899?v=4',
      name: 'kroeder',
      url: 'https://github.com/kroeder',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/599163?v=4',
      name: 'tooppaaa',
      url: 'https://github.com/tooppaaa',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/5678122?v=4',
      name: 'JReinhold',
      url: 'https://github.com/JReinhold',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/29763590?v=4',
      name: 'CodeByAlex',
      url: 'https://github.com/CodeByAlex',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/4974420?v=4',
      name: 'ThibaudAV',
      url: 'https://github.com/ThibaudAV',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/3867635?v=4',
      name: 'Gongreg',
      url: 'https://github.com/Gongreg',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/794579?v=4',
      name: 'patricklafrance',
      url: 'https://github.com/patricklafrance',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/1123119?v=4',
      name: 'MichaelArestad',
      url: 'https://github.com/MichaelArestad',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/6075606?v=4',
      name: 'atanasster',
      url: 'https://github.com/atanasster',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/1035299?v=4',
      name: 'kasperpeulen',
      url: 'https://github.com/kasperpeulen',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/15892571?v=4',
      name: 'lonyele',
      url: 'https://github.com/lonyele',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/1593752?v=4',
      name: 'alterx',
      url: 'https://github.com/alterx',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/5955441?v=4',
      name: 'Keraito',
      url: 'https://github.com/Keraito',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/573574?v=4',
      name: 'benoitdion',
      url: 'https://github.com/benoitdion',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/1872246?v=4',
      name: 'Tomastomaslol',
      url: 'https://github.com/Tomastomaslol',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/992373?v=4',
      name: 'phated',
      url: 'https://github.com/phated',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/2119212?v=4',
      name: 'jsoref',
      url: 'https://github.com/jsoref',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/486540?v=4',
      name: 'kylegach',
      url: 'https://github.com/kylegach',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/651122?v=4',
      name: 'plumpNation',
      url: 'https://github.com/plumpNation',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/14885189?v=4',
      name: 'usulpro',
      url: 'https://github.com/usulpro',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/9360417?v=4',
      name: 'Jessica-Koch',
      url: 'https://github.com/Jessica-Koch',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/274358?v=4',
      name: 'rhalff',
      url: 'https://github.com/rhalff',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/328224?v=4',
      name: 'jonspalmer',
      url: 'https://github.com/jonspalmer',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/174703?v=4',
      name: 'pksunkara',
      url: 'https://github.com/pksunkara',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/42671?v=4',
      name: 'winkerVSbecks',
      url: 'https://github.com/winkerVSbecks',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/6065744?v=4',
      name: 'alexandrebodin',
      url: 'https://github.com/alexandrebodin',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/17681528?v=4',
      name: 'darleendenno',
      url: 'https://github.com/darleendenno',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/25279263?v=4',
      name: 'jamesgeorge007',
      url: 'https://github.com/jamesgeorge007',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/35270620?v=4',
      name: 'wuweiweiwu',
      url: 'https://github.com/wuweiweiwu',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/1854811?v=4',
      name: 'gabrielcsapo',
      url: 'https://github.com/gabrielcsapo',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/5389035?v=4',
      name: 'ritz078',
      url: 'https://github.com/ritz078',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/1233790?v=4',
      name: 'libetl',
      url: 'https://github.com/libetl',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/4509692?v=4',
      name: 'dangreenisrael',
      url: 'https://github.com/dangreenisrael',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/5033585?v=4',
      name: 'brandonseydel',
      url: 'https://github.com/brandonseydel',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/3035355?v=4',
      name: 'kylesuss',
      url: 'https://github.com/kylesuss',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/1164024?v=4',
      name: 'thinkholic',
      url: 'https://github.com/thinkholic',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/37928?v=4',
      name: 'aaronmcadam',
      url: 'https://github.com/aaronmcadam',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/3195714?v=4',
      name: 'Armanio',
      url: 'https://github.com/Armanio',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/3250463?v=4',
      name: 'chadfawcett',
      url: 'https://github.com/chadfawcett',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/72989?v=4',
      name: 'kazupon',
      url: 'https://github.com/kazupon',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/188038?v=4',
      name: 'joscha',
      url: 'https://github.com/joscha',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/3842800?v=4',
      name: 'merceyz',
      url: 'https://github.com/merceyz',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/16613267?v=4',
      name: 'klimentru1986',
      url: 'https://github.com/klimentru1986',
    },
  ],
  discordMemberCount: 15861,
  githubContributorCount: 1867,
  githubStars: 75256,
  latestVersion: '6.5',
  npmDownloads: 16719157,
  sponsors: [
    {
      image: 'https://images.opencollective.com/airbnb/d327d66/logo.png',
      name: 'Airbnb',
      url: 'https://opencollective.com/airbnb',
    },
    {
      image: 'https://images.opencollective.com/indeed/4b8725e/logo.png',
      name: 'Indeed',
      url: 'https://opencollective.com/indeed',
    },
    {
      image: 'https://images.opencollective.com/applitoolseyes/de8a61f/logo.png',
      name: 'Applitools: AI-powered Visual Testing and Monitoring',
      url: 'https://opencollective.com/applitoolseyes',
    },
    {
      image: 'https://images.opencollective.com/amp/c8a3b25/logo.png',
      name: 'AMP Project',
      url: 'https://opencollective.com/amp',
    },
    {
      image: 'https://images.opencollective.com/chromatic/f73f7dd/logo.png',
      name: 'Chromatic',
      url: 'https://opencollective.com/chromatic',
    },
    {
      image: 'https://images.opencollective.com/frontendmasters/0b9cda4/logo.png',
      name: 'Frontend Masters',
      url: 'https://opencollective.com/frontendmasters',
    },
    {
      image: 'https://images.opencollective.com/nx/0efbe42/logo.png',
      name: 'Nx (by Nrwl)',
      url: 'https://opencollective.com/nx',
    },
    {
      image: 'https://images.opencollective.com/retoolapp1/3e6fdbf/logo.png',
      name: 'Retool',
      url: 'https://opencollective.com/retoolapp1',
    },
    {
      image: 'https://images.opencollective.com/turo/055f619/logo.png',
      name: 'Turo',
      url: 'https://opencollective.com/turo',
    },
    {
      image: 'https://images.opencollective.com/strapijs/d5c9a68/logo.png',
      name: 'Strapi',
      url: 'https://opencollective.com/strapijs',
    },
    {
      image: 'https://images.opencollective.com/gitguardian/b428eaa/logo.png',
      name: 'GitGuardian',
      url: 'https://opencollective.com/gitguardian',
    },
    {
      image: 'https://images.opencollective.com/inovexgmbh/ac5db3d/logo.png',
      name: 'inovex GmbH',
      url: 'https://opencollective.com/inovexgmbh',
    },
    {
      image: 'https://images.opencollective.com/fbopensource/fbb8a5b/logo.png',
      name: 'Facebook Open Source',
      url: 'https://opencollective.com/fbopensource',
    },
    {
      image: 'https://images.opencollective.com/sentry/9620d33/logo.png',
      name: 'Sentry',
      url: 'https://opencollective.com/sentry',
    },
    {
      image: 'https://images.opencollective.com/xebia/0bd8e4d/logo.png',
      name: 'Xebia',
      url: 'https://opencollective.com/xebia',
    },
    {
      image: 'https://images.opencollective.com/tipe/e51f24e/logo.png',
      name: 'Tipe',
      url: 'https://opencollective.com/tipe',
    },
    {
      image: 'https://images.opencollective.com/guest-d5004435/avatar.png',
      name: 'Regina',
      url: 'https://opencollective.com/guest-d5004435',
    },
    {
      image: 'https://images.opencollective.com/marfeel/4b88e30/logo.png',
      name: 'Marfeel',
      url: 'https://opencollective.com/marfeel',
    },
    {
      image: 'https://images.opencollective.com/percy_io/5e87867/logo.png',
      name: 'Percy',
      url: 'https://opencollective.com/percy_io',
    },
    {
      image: 'https://images.opencollective.com/viswiz_io/972852a/logo.png',
      name: 'VisWiz.io - Visual Regression Testing',
      url: 'https://opencollective.com/viswiz_io',
    },
    {
      image: 'https://images.opencollective.com/algolia/d69b553/logo.png',
      name: 'Algolia',
      url: 'https://opencollective.com/algolia',
    },
    {
      image: 'https://images.opencollective.com/principal/431e690/logo.png',
      name: 'Principal Financial Group',
      url: 'https://opencollective.com/principal',
    },
    {
      image: 'https://images.opencollective.com/gitbook/d35a8e7/logo.png',
      name: 'GitBook',
      url: 'https://opencollective.com/gitbook',
    },
    {
      image: 'https://images.opencollective.com/slalombuild/ad377b6/logo.png',
      name: 'Slalom Build',
      url: 'https://opencollective.com/slalombuild',
    },
    {
      image: 'https://images.opencollective.com/intuit-open-source/62f6394/logo.png',
      name: 'Intuit Open Source',
      url: 'https://opencollective.com/intuit-open-source',
    },
    {
      image: 'https://images.opencollective.com/skyscanner/dcc6fe7/logo.png',
      name: 'Skyscanner',
      url: 'https://opencollective.com/skyscanner',
    },
    {
      image: 'https://images.opencollective.com/ey-doberman/b269462/logo.png',
      name: 'EY Doberman',
      url: 'https://opencollective.com/ey-doberman',
    },
    {
      image: 'https://images.opencollective.com/sendcloud/fdc27e6/logo.png',
      name: 'Sendcloud',
      url: 'https://opencollective.com/sendcloud',
    },
    {
      image: 'https://images.opencollective.com/sebastiansoft/74395cd/logo.png',
      name: 'Sebastian Software GmbH',
      url: 'https://opencollective.com/sebastiansoft',
    },
    {
      image: 'https://images.opencollective.com/triplebyte/3f80e63/logo.png',
      name: 'Triplebyte',
      url: 'https://opencollective.com/triplebyte',
    },
    {
      image: 'https://images.opencollective.com/fusonic/02ed1e5/logo.png',
      name: 'Fusonic GmbH',
      url: 'https://opencollective.com/fusonic',
    },
    {
      image: 'https://images.opencollective.com/gocardless/0b942fa/logo.png',
      name: 'GoCardless',
      url: 'https://opencollective.com/gocardless',
    },
    {
      image: 'https://images.opencollective.com/st-galler-kantonalbank-ag/bfdd17f/logo.png',
      name: 'St. Galler Kantonalbank AG',
      url: 'https://opencollective.com/st-galler-kantonalbank-ag',
    },
    {
      image: 'https://images.opencollective.com/flowdash/e9f182e/logo.png',
      name: 'Flowdash',
      url: 'https://opencollective.com/flowdash',
    },
    {
      image: 'https://images.opencollective.com/worketc/e05e8c8/logo.png',
      name: 'WORKetc',
      url: 'https://opencollective.com/worketc',
    },
    {
      image: 'https://images.opencollective.com/takeshapeio/2a25ad2/logo.png',
      name: 'TakeShape',
      url: 'https://opencollective.com/takeshapeio',
    },
    {
      image: 'https://images.opencollective.com/jmlweb/ee58468/avatar.png',
      name: 'José Manuel Lucas Muñoz',
      url: 'https://opencollective.com/jmlweb',
    },
    {
      image: 'https://images.opencollective.com/livegraphicsys/0244296/logo.png',
      name: 'Live Graphic Systems',
      url: 'https://opencollective.com/livegraphicsys',
    },
    {
      image: 'https://images.opencollective.com/buttondownemail/02198e5/logo.png',
      name: 'Buttondown, LLC',
      url: 'https://opencollective.com/buttondownemail',
    },
    {
      image: 'https://images.opencollective.com/shogun-labs-inc/f9122d2/logo.png',
      name: 'Shogun Labs, Inc.',
      url: 'https://opencollective.com/shogun-labs-inc',
    },
  ],
  pageType: 'status',
  subscriberCount: 5866,
  twitterFollowerCount: 19185,
  youTubeSubscriberCount: 3160,
} as const;

const meta = {
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof AppLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Lorem ipsum',
    pageProps,
  },
};
