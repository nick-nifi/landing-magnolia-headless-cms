export interface SubLink {
  title: string;
  href: string;
  subItems?: SubLink[];
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
  sectionTitle: "Featured",
  items: [
    {
      title: "In-depth research",
      href: "/research",
      description: "CIO Insights supported by 80+ analysts in key markets",
      imageUrl: "/assets/online-trading.jpg", // placeholder
    },
    {
      title: "Wealth management",
      href: "/wealth-management",
      description: "Private wealth management with care and expertise",
      imageUrl: "/assets/private-wealth-management.jpg", // placeholder
    },
  ],
};

export interface MegaMenuItem {
  type: "megaMenu";
  title: string;
  // Dùng để kiểm tra active state cho tất cả các trang con
  pathCheckPrefix: string;
  content: MegaMenuContent;
}

export const menuItems: MegaMenuItem[] = [
  {
    type: "megaMenu",
    title: "Services",
    pathCheckPrefix: "/services",
    content: {
      intro: {
        title: "Services",
        description:
          "Our platforms offer our multiple wealth-building solutions and opportunities in multiple markets.",
        imageUrl: "/assets/bg-header-investment.png", // placeholder
      },
      linkGroups: [
        {
          links: [
            {
              title: "Brokerage services",
              href: "#",
              subItems: [
                { title: "Retail online", href: "/services/brokerage-services-retail-online" },
                { title: "Retail assisted", href: "/services/brokerage-services-retail-assisted" },
                { title: "Institutional", href: "/services/institutional-partnerships" },
              ],
            },
            {
              title: "Partnerships",
              href: "#",
              subItems: [
                { title: "External asset management (EAM)", href: "/services/external-asset-management-eam" },
                { title: "Independent financial advisory (IFA)", href: "/services/independent-financial-advisory-ifa" },
                { title: "Insurance", href: "/services/insurance" },
                { title: "Financial Institutions", href: "/services/financial-institutions" },
              ],
            },
            {
              title: "Wealth",
              href: "#",
              subItems: [
                { title: "Private wealth management", href: "/services/wealth-management" },
              ],
            },
            {
              title: "Investment banking",
              href: "#",
              subItems: [
                { title: "Investment banking services", href: "/services/investment-banking" },
              ],
            },
          ],
        },
      ],
      featured: commonFeaturedSection, // Tái sử dụng
    },
  },
  {
    type: "megaMenu",
    title: "Research",
    pathCheckPrefix: "/research",
    content: {
      intro: {
        title: "Research",
        description:
          "We're an authoritative voice in Southeast Asian markets with 80+ research analysts across the region.",
        imageUrl: "/assets/bg-header-research.png", // placeholder
      },
      linkGroups: [
        {
          links: [
            { title: "Private wealth management", href: "/research/private-wealth-management" },
            { title: "Major markets", href: "/research/major-markets" },
            { title: "Sectors", href: "/research/sectors" },
            { title: "Companies", href: "/research/companies" },
          ],
        },
      ],
      featured: commonFeaturedSection, // Tái sử dụng
    },
  },
  {
    type: "megaMenu",
    title: "Investor relations",
    pathCheckPrefix: "/investor-relations",
    content: {
      intro: {
        title: "Investor relations",
        description:
          "We believe in transparency and openness. Investors, analysts and media are invited to look deeper.",
        imageUrl: "/assets/bg-header-investor.png", // placeholder
      },
      linkGroups: [
        {
          links: [
            {
              title: "Announcements",
              href: "/investor-relations/announcements",
            },
            {
              title: "Financial highlights",
              href: "/investor-relations/financial-highlights",
            },
            {
              title: "Annual reports",
              href: "/investor-relations/annual-reports",
            },
          ],
        },
      ],
      featured: commonFeaturedSection, // Tái sử dụng
    },
  },
  {
    type: "megaMenu",
    title: "About",
    pathCheckPrefix: "/about",
    content: {
      intro: {
        title: "About",
        description:
          "Honourable, enterprising, united and committed, we are serious about building more secure financial futures.",
        imageUrl: "/assets/bg-header-about.png", // placeholder
      },
      linkGroups: [
        {
          links: [
            { title: "Why UOBKH", href: "/about/why-uobkh" },
            { title: "Leadership", href: "/about/leadership" },
            { title: "Careers", href: "/about/careers" },
            { title: "Global offices", href: "/about/global-offices" },
          ],
        },
      ],
      featured: commonFeaturedSection, // Tái sử dụng
    },
  },
];
