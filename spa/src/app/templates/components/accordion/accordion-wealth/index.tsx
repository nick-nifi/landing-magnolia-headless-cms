// src/components/AccordionWealth.tsx or your file path


import { Typography } from "@/components/typography";
import { Grid } from "@/components/grid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

// === STEP 1: DEFINE THE DATA STRUCTURE ===

// Represents a single list item, which can have its own sub-list.
type ListItem = {
  text: string;
  subItems?: string[]; // For nested lists like in "Structured notes"
};

// Represents the content for a single accordion item.
type AccordionData = {
  id: string; // Unique value for the accordion item
  title: string;
  // Content can be a simple paragraph or a more complex list structure.
  content: {
    paragraph?: string;
    list?: ListItem[];
  };
};

// === STEP 2: POPULATE THE DATA FROM THE FIGMA DESIGN ===

const accordionContent: AccordionData[] = [
  {
    id: "equities",
    title: "Equities",
    content: {
      list: [
        {
          text: "Access 24-hour online / offline equity trading in Asian, European and North American markets",
        },
      ],
    },
  },
  {
    id: "funds",
    title: "Funds / Unit trusts",
    content: {
      paragraph:
        "Connections to over 80 local and global fund houses with over 800 funds covering multiple investment themes, including:",
      list: [
        { text: "<b>Global Asia Pacific</b> – Emerging Europe, Latin America" },
        {
          text: "<b>Fixed income</b> – Investment grade, high yield, emerging markets",
        },
        { text: "<b>Emerging markets</b> – ASEAN, BRIC, Middle East" },
        { text: "<b>Commodities</b> – Agribusiness, precious metals, energy" },
        {
          text: "<b>Single country</b> – China A-share, India, Korea, Singapore, Japan",
        },
        { text: "<b>Sectors</b> – Utility, property, mining, biotech" },
      ],
    },
  },
  {
    id: "options-futures",
    title: "Options and futures",
    content: {
      list: [
        { text: "Hong Kong and US stock options trading" },
        {
          text: "Index, forex, bullion, energy, commodity futures broking services",
        },
      ],
    },
  },
  {
    id: "fixed-income",
    title: "Fixed income",
    content: {
      list: [
        {
          text: "Investment grade and high yield bonds from various issuers and multiple geographic areas and industries",
        },
        {
          text: "All types available, from simple bullet bonds to complex bonds with embedded derivatives",
        },
      ],
    },
  },
  {
    id: "forex",
    title: "Forex / currency trading",
    content: {
      list: [
        {
          text: "Online currency trading platform, with round-the-clock trading facilities and global cross currency trading",
        },
      ],
    },
  },

  {
    id: "structured-products",
    title: "Customised structured products",
    content: {
      list: [
        {
          text: "<b>Structured notes</b>",
          subItems: [
            "Partner with global best-in-class investment banks",
            "Product can be tailored to meet your needs, such as underlying instruments, tenor and payoff structure",
            "Available types: Equity linked note (ELN), Reverse equity linked note (RELN), Daily range accrual note, Fixed coupon note, Autocallable booster note",
          ],
        },
        {
          text: "<b>Accrual forward contracts</b>",
          subItems: [
            "Buy (accumulator) / Sell (decumulator) specific equities / currencies at more favourable prices than the market during a predefined period",
            "Leverage can be embedded in products",
          ],
        },
        {
          text: "<b>OTC options</b>",
          subItems: [
            "Available types: European / American type call / put, covered call",
          ],
        },
      ],
    },
  },

  {
    id: "life-insurance",
    title: "Universal life insurance",
    content: {
      list: [
        { text: "Supported by leading insurance companies and brokers" },
        { text: "Wealth transfer and legacy planning support" },
        {
          text: "Premium financing available to manage cash flow with more flexibility",
        },
      ],
    },
  },
];

// Helper component to render lists and handle HTML for bold tags
const ContentRenderer = ({ item }: { item: ListItem }) => {
  return (
    <li>
      <Typography
        variant={"body-large"}
        weight={"light"}
        dangerouslySetInnerHTML={{ __html: item.text }}
      />
      {item.subItems && (
        <ul className="list-disc pl-5 mt-2">
          {item.subItems.map((sub, index) => (
            <li key={index}>
              <Typography variant={"body-large"} weight={"light"}>
                {sub}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default function AccordionWealth() {
  // Split data into two columns for the grid layout
  const column1 = accordionContent.slice(0, 4);
  const column2 = accordionContent.slice(4);

  return (
    <section data-name="accordion-e2" className="py-12 md:py-16 xl:px-20">
      <Typography
        variant={"h2"}
        className="mb-12 md:mb-16 lg:mb-20 text-center"
        weight={"light"}
      >
        A world of wealth-building opportunities
      </Typography>

      <div className="container mx-auto px-2 lg:px-2">
        <Accordion type="multiple">
          <Grid cols={1} lgCols={2} gap={0} className="lg:gap-x-16">
            {/* === STEP 3: RENDER THE COLUMNS DYNAMICALLY === */}

            {/* Column 1 */}
            <Grid cols={1} gap={0}>
              <div>
                {column1.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>
                      <Typography variant={"h4"} weight={"medium"}>
                        {item.title}
                      </Typography>
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.content.paragraph && (
                        <Typography
                          variant={"body-large"}
                          weight={"light"}
                          className="mb-4"
                        >
                          {item.content.paragraph}
                        </Typography>
                      )}
                      {item.content.list && (
                        <ul className="list-disc space-y-2 pl-4">
                          {item.content.list.map((listItem, index) => (
                            <ContentRenderer key={index} item={listItem} />
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            </Grid>

            {/* Column 2 */}
            <Grid cols={1} gap={0}>
              <div>
                {column2.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>
                      <Typography variant={"h4"} weight={"medium"}>
                        {item.title}
                      </Typography>
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.content.paragraph && (
                        <Typography
                          variant={"body-large"}
                          weight={"light"}
                          className="mb-4"
                        >
                          {item.content.paragraph}
                        </Typography>
                      )}
                      {item.content.list && (
                        <ul className="list-disc space-y-2 pl-4">
                          {item.content.list.map((listItem, index) => (
                            <ContentRenderer key={index} item={listItem} />
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            </Grid>
          </Grid>
        </Accordion>
      </div>
    </section>
  );
}
