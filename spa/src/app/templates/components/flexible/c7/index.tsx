import { Grid } from "@/components/grid";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FastFactTile, { FastFactTileProps } from "./fast-fact-tile";
import { environment } from "@/environments/environment";
import get from "lodash/get";
import has from "lodash/has";

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface ListItem {
  text?: string;
  itemText?: string;
  '@name'?: string;
  '@path'?: string;
  '@id'?: string;
  '@nodeType'?: string;
}

interface FastFactItem {
  logoChooser?: ImageChooser;
  text?: string;
  '@name'?: string;
  '@path'?: string;
  '@id'?: string;
  '@nodeType'?: string;
}

interface CtaChooser {
  field?: 'noCta' | 'withCta';
  ctaText?: string;
  ctaLink?: {
    field?: 'internalPageLink' | 'externalPageLink';
    internalLink?: string;
    externalLink?: string;
  };
}

interface FlexibleC7Props {
  title?: string;
  items?: { text: string }[] | Record<string, ListItem> | ListItem[];
  fastFacts?: FastFactTileProps[] | Record<string, FastFactItem> | FastFactItem[];
  footer?: {
    label?: string;
    href?: string;
  };
  footerCta?: CtaChooser;
}

// Helper function to convert Magnolia items to text array
const getItemsArray = (items: { text: string }[] | Record<string, ListItem> | ListItem[] | undefined): { text: string }[] => {
  if (!items) return [];
  if (Array.isArray(items)) {
    if (items.length > 0 && 'text' in items[0]) {
      return items as { text: string }[];
    }
    return items
      .filter(item => item && (item.text || (item as ListItem).itemText))
      .map(item => ({
        text: (item as ListItem).itemText || (item as { text: string }).text || '',
      }));
  }
  
  return Object.entries(items)
    .filter(([key, value]) => {
      if (key.startsWith('@')) return false;
      if (!value || typeof value !== 'object') return false;
      return true;
    })
    .map(([, value]) => {
      const listItem = value as ListItem;
      return {
        text: listItem.itemText || listItem.text || '',
      };
    });
};

// Helper function to convert Magnolia fastFacts to FastFactTileProps array
const getFastFactsArray = (fastFacts: FastFactTileProps[] | Record<string, FastFactItem> | FastFactItem[] | undefined): FastFactTileProps[] => {
  if (!fastFacts) return [];
  if (Array.isArray(fastFacts)) {
    if (fastFacts.length > 0 && ('logo' in fastFacts[0] || 'logoWidth' in fastFacts[0])) {
      return fastFacts as FastFactTileProps[];
    }
    return fastFacts
      .filter(item => item && (item.text || (item as FastFactItem).text))
      .map(item => {
        const fastFactItem = item as FastFactItem;
        let logo = '';
        if (fastFactItem.logoChooser) {
          if (fastFactItem.logoChooser.field === 'image' && fastFactItem.logoChooser.image) {
            logo = `${environment.damRawBase}${fastFactItem.logoChooser.image['@link']}`;
          } else if (fastFactItem.logoChooser.field === 'externalImage' && fastFactItem.logoChooser.externalImage) {
            logo = fastFactItem.logoChooser.externalImage;
          }
        }
        return {
          logo,
          text: fastFactItem.text || '',
        };
      });
  }
  
  return Object.entries(fastFacts)
    .filter(([key, value]) => {
      if (key.startsWith('@')) return false;
      if (!value || typeof value !== 'object') return false;
      return true;
    })
    .map(([, value]) => {
      const fastFactItem = value as FastFactItem;
      let logo = '';
      if (fastFactItem.logoChooser) {
        if (fastFactItem.logoChooser.field === 'image' && fastFactItem.logoChooser.image) {
          logo = `${environment.damRawBase}${fastFactItem.logoChooser.image['@link']}`;
        } else if (fastFactItem.logoChooser.field === 'externalImage' && fastFactItem.logoChooser.externalImage) {
          logo = fastFactItem.logoChooser.externalImage;
        }
      }
      return {
        logo,
        text: fastFactItem.text || '',
      };
    });
};

export default function FlexibleC7({
  title,
  items = [],
  fastFacts = [],
  footer,
  footerCta,
}: FlexibleC7Props) {
  const itemsArray = getItemsArray(items);
  const fastFactsArray = getFastFactsArray(fastFacts);
  
  // Get footer from footerCta if provided
  let footerData = footer;
  if (footerCta && footerCta.field === 'withCta' && footerCta.ctaLink) {
    let href = '';
    if (footerCta.ctaLink.field === 'externalPageLink') {
      href = footerCta.ctaLink.externalLink || '';
    } else if (footerCta.ctaLink.field === 'internalPageLink') {
      href = footerCta.ctaLink.internalLink || '';
    }
    footerData = {
      label: footerCta.ctaText || '',
      href,
    };
  }
  return (
    <section data-name="flexible-c7" className="py-12 md:py-16 xl:py-20">
      {title && (
        <Typography
          variant={"h2"}
          className="mb-12 md:mb-16 lg:mb-20 text-center"
          weight={"light"}
        >
          {title}
        </Typography>
      )}

      <div className="container mx-auto px-4 lg:px-0 mb-5">
        <Grid cols={1} className="gap-5 lg:gap-8">
          {fastFactsArray.map((item, idx) => (
            <FastFactTile key={idx} {...item} />
          ))}
        </Grid>
      </div>

      <div className="container mx-auto px-4 lg:px-0">
        <Grid cols={1} mdCols={2} className="gap-y-5 gap-x-5 lg:gap-x-16">
          {itemsArray.map((item, index) => (
            <Grid key={index} className="py-5 border-b">
              <Typography
                variant="body-large"
                weight="light"
                dangerouslySetInnerHTML={{ __html: item.text || "" }}
              />
            </Grid>
          ))}
        </Grid>

        {footerData && (
          <div className="flex justify-center md:justify-end mt-8 mx-auto">
            <Button asChild variant={"outline"}>
              <Link href={footerData.href || "#"}>
                {footerData.label} <ArrowRight />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}


