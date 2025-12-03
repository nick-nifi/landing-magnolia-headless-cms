export interface SubLink {
  title: string;
  href: string;
}

export interface FeaturedItem {
  title: string;
  href: string;
  description: string;
  imageUrl: string;
}

export interface MegaMenuContent {
  intro: {
    title: string;
    description: string;
    imageUrl: string; // <-- THÊM DÒNG NÀY
  };
  linkGroups: {
    links: SubLink[];
  }[];
  featured: {
    sectionTitle: string;
    items: FeaturedItem[];
  };
}

const commonFeaturedSection = {
  sectionTitle: 'Featured',
  items: [
    {
      title: 'In-depth research',
      href: '/research',
      description: 'CIO Insights supported by 80+ analysts in key markets',
      imageUrl: '/assets/in-depth-research.png', // placeholder
    },
    {
      title: 'Wealth management',
      href: '/wealth-management',
      description: 'Private wealth management with care and expertise',
      imageUrl: 'https://placehold.co/140x105', // placeholder
    },
  ],
};

export interface MegaMenuItem {
  type: 'megaMenu';
  title: string;
  // Dùng để kiểm tra active state cho tất cả các trang con
  pathCheckPrefix: string;
  content: MegaMenuContent;
  key: string;
}

export const menuItems: MegaMenuItem[] = [
  {
    type: 'megaMenu',
    title: 'Investment services',
    pathCheckPrefix: '/services',
    key: 'investment-services',
    content: {
      intro: {
        title: 'Investment services',
        description:
          'Our platforms offer our multiple wealth-building solutions and opportunities in multiple markets.',
        imageUrl: 'https://placehold.co/330x360', // placeholder
      },
      linkGroups: [
        {
          links: [
            { title: 'Online trading', href: '/services/online-trading' },
            { title: 'Retail brokerage', href: '/services/retail-brokerage' },
            {
              title: 'Private wealth management',
              href: '/services/wealth-management',
            },
            {
              title: 'Investment banking services',
              href: '/services/investment-banking',
            },
            {
              title: 'Institutional partnerships',
              href: '/services/institutional-partnerships',
            },
          ],
        },
      ],
      featured: commonFeaturedSection, // Tái sử dụng
    },
  },
  {
    type: 'megaMenu',
    title: 'Research',
    pathCheckPrefix: '/research',
    key: 'research',
    content: {
      intro: {
        title: 'Research',
        description:
          "We're an authoritative voice in Southeast Asian markets with 80+ research analysis across the region.",
        imageUrl: 'https://placehold.co/330x360', // placeholder
      },
      linkGroups: [
        {
          links: [
            { title: 'CIO insights', href: '/research/cio-insights' },
            { title: 'Major markets', href: '/research/major-markets' },
            { title: 'Sectors', href: '/research/sectors' },
            { title: 'Companies', href: '/research/companies' },
          ],
        },
      ],
      featured: commonFeaturedSection, // Tái sử dụng
    },
  },
  {
    type: 'megaMenu',
    title: 'Investor relations',
    pathCheckPrefix: '/investor-relations',
    key: 'investor-relations',
    content: {
      intro: {
        title: 'Investor relations',
        description:
          'We believe in transparency and openness. Investors, analysts and media are invited to look deeper.',
        imageUrl: 'https://placehold.co/330x360', // placeholder
      },
      linkGroups: [
        {
          links: [
            {
              title: 'Announcements',
              href: '/investor-relations/announcements',
            },
            {
              title: 'Financial highlights',
              href: '/investor-relations/financial-highlights',
            },
            {
              title: 'Annual reports',
              href: '/investor-relations/annual-reports',
            },
          ],
        },
      ],
      featured: commonFeaturedSection, // Tái sử dụng
    },
  },
  {
    type: 'megaMenu',
    title: 'About',
    pathCheckPrefix: '/about',
    key: 'about',
    content: {
      intro: {
        title: 'About',
        description:
          'Honourable, enterprising, united and committed, we are serious about building more secure financial futures.',
        imageUrl: 'https://placehold.co/330x360', // placeholder
      },
      linkGroups: [
        {
          links: [
            { title: 'Why UOBKH', href: '/about/why-uobkh' },
            { title: 'Leadership', href: '/about/leadership' },
            { title: 'Careers', href: '/about/careers' },
          ],
        },
      ],
      featured: commonFeaturedSection, // Tái sử dụng
    },
  },
  {
    type: 'megaMenu',
    title: 'Contact',
    pathCheckPrefix: '/contact',
    key: 'contact',
    content: {
      intro: {
        title: 'Contact',
        description:
          'We listen carefully to understand your needs and aim to respond to them with openness and flexibility.',
        imageUrl: '/assets/bg-contact.png', // placeholder
      },
      linkGroups: [
        {
          links: [{ title: 'Locations', href: '/contacts/location' }],
        },
      ],
      featured: commonFeaturedSection, // Tái sử dụng
    },
  },
];
